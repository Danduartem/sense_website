# Server/SS-GTM Engineer (SSE) - Webhook & Server Events Brief

## Primary Directive
Build complete server-side infrastructure using Netlify Functions for webhook processing, CRM/MailerLite integration, GA4 server events, and idempotent cross-platform data sync for Mentoria Seja Livre.

## Project Context
**Conversion Flow:** Modal Submit → CRM Sync → MailerLite → Email Questionnaire → Calendar Booking → WhatsApp Automation
**Server Stack:** Netlify Functions (Node.js), Serverless architecture
**Integrations:** Custom CRM, MailerLite, GA4 Measurement Protocol, Segment, WhatsApp API

## Critical Requirements
- **Idempotency:** All webhook processing must handle duplicate events gracefully
- **Reliability:** Failed events logged and retried with exponential backoff
- **Security:** Proper webhook signature verification and input validation
- **Performance:** Parallel webhook distribution, <3 second response times
- **LGPD Compliance:** PII handling according to Brazilian data protection laws
- **Error Monitoring:** Comprehensive logging and alerting for failed integrations

## Core Server Functions to Build

### 1. Lead Submission Processing (`lead-submit.js`)
Primary form submission handler with parallel webhook distribution:

```javascript
// netlify/functions/lead-submit.js
exports.handler = async (event, context) => {
  // Input validation and rate limiting
  const requestData = JSON.parse(event.body);
  
  // Generate or validate lead_id
  const leadId = requestData.leadId || generateUUID();
  
  // Calculate Amanda match score server-side for validation
  const amandaScore = calculateAmandaScoreServer(requestData);
  
  // Prepare standardized lead data
  const leadData = {
    leadId,
    name: requestData.name,
    email: requestData.email,
    phone: requestData.phone,
    businessType: requestData.businessType,
    monthlyRevenue: requestData.monthlyRevenue,
    workHoursDaily: requestData.workHoursDaily,
    mainStruggle: requestData.mainStruggle,
    amandaScore,
    sourceSection: requestData.sourceSection,
    submissionTimestamp: new Date().toISOString()
  };
  
  // Parallel webhook distribution
  const webhookPromises = [
    syncToCRM(leadData),
    syncToMailerLite(leadData),
    syncToSegment(leadData),
    sendGA4ServerEvent(leadData)
  ];
  
  const results = await Promise.allSettled(webhookPromises);
  
  // Return success regardless of individual webhook failures
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      leadId: leadId,
      amandaScore: amandaScore
    })
  };
};
```

### 2. CRM Integration (`crm-sync.js`)
Robust CRM webhook with retry logic:

```javascript
// netlify/functions/crm-sync.js
async function syncToCRM(leadData) {
  const crmPayload = {
    external_id: leadData.leadId,
    name: leadData.name,
    email: leadData.email,
    phone: leadData.phone,
    source: 'landing_page_modal',
    custom_fields: {
      amanda_match_score: leadData.amandaScore,
      business_type: leadData.businessType,
      monthly_revenue: leadData.monthlyRevenue,
      work_hours_daily: leadData.workHoursDaily,
      main_struggle: leadData.mainStruggle,
      source_section: leadData.sourceSection
    },
    tags: [
      'landing_page_lead',
      `amanda_score_${getAmandaScoreTier(leadData.amandaScore)}`,
      `source_${leadData.sourceSection}`,
      'mentoria_seja_livre'
    ],
    automation_triggers: [
      leadData.amandaScore >= 80 ? 'high_priority_follow_up' : 'standard_nurture'
    ]
  };
  
  // Webhook with retry logic
  const response = await retryWebhook(
    process.env.CRM_WEBHOOK_URL,
    crmPayload,
    {
      headers: {
        'Authorization': `Bearer ${process.env.CRM_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  return response;
}
```

### 3. MailerLite Integration (`mailerlite-sync.js`)
Email automation with segmentation:

```javascript
// netlify/functions/mailerlite-sync.js
async function syncToMailerLite(leadData) {
  const contactData = {
    email: leadData.email,
    name: leadData.name,
    fields: {
      lead_id: leadData.leadId,
      amanda_match_score: leadData.amandaScore,
      business_type: leadData.businessType,
      traffic_source: leadData.trafficSource || 'landing_page',
      signup_date: leadData.submissionTimestamp,
      transformation_stage: 'awareness'
    },
    groups: [
      'landing_page_leads',
      getAmandaScoreGroup(leadData.amandaScore),
      `business_type_${leadData.businessType}`
    ]
  };
  
  // Create/update contact
  const contactResponse = await createMailerLiteContact(contactData);
  
  // Trigger questionnaire automation
  if (contactResponse.success) {
    await triggerQuestionnaireAutomation(leadData.email, leadData.leadId);
  }
  
  return contactResponse;
}

async function triggerQuestionnaireAutomation(email, leadId) {
  const automationData = {
    email: email,
    automation_id: process.env.QUESTIONNAIRE_AUTOMATION_ID,
    custom_fields: {
      questionnaire_url: `${process.env.SITE_URL}/questionario?lead_id=${leadId}`,
      deadline: getQuestionnaireDeadline() // 48 hours from now
    }
  };
  
  return await triggerMailerLiteAutomation(automationData);
}
```

### 4. GA4 Server Events (`ga4-server-events.js`)
Enhanced measurement for server-side attribution:

```javascript
// netlify/functions/ga4-server-events.js
async function sendGA4ServerEvent(leadData) {
  const measurementPayload = {
    client_id: leadData.leadId,
    events: [{
      name: 'lead_form_submit_server',
      params: {
        amanda_match_score: leadData.amandaScore,
        business_type: leadData.businessType,
        source_section: leadData.sourceSection,
        value: 1,
        currency: 'BRL',
        custom_parameter_amanda_score: leadData.amandaScore,
        custom_parameter_business_type: leadData.businessType
      }
    }]
  };
  
  const response = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA4_MEASUREMENT_ID}&api_secret=${process.env.GA4_API_SECRET}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(measurementPayload)
    }
  );
  
  return response;
}
```

### 5. Questionnaire Processing (`questionnaire-submit.js`)
Handle detailed qualification completion:

```javascript
// netlify/functions/questionnaire-submit.js
exports.handler = async (event, context) => {
  const questionnaireData = JSON.parse(event.body);
  
  // Calculate transformation readiness score
  const transformationScore = calculateTransformationReadiness(questionnaireData);
  
  // Update lead record across all platforms
  const updatePromises = [
    updateCRMRecord(questionnaireData.leadId, {
      questionnaire_complete: true,
      transformation_readiness: transformationScore,
      detailed_responses: questionnaireData.responses
    }),
    updateMailerLiteFields(questionnaireData.email, {
      questionnaire_completed: 'yes',
      transformation_readiness: transformationScore
    }),
    triggerCalendlyAccess(questionnaireData.leadId, transformationScore)
  ];
  
  await Promise.allSettled(updatePromises);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      transformationScore,
      nextStep: 'calendar_booking'
    })
  };
};
```

### 6. Calendar Integration (`calendar-webhook.js`)
Calendly booking confirmation handler:

```javascript
// netlify/functions/calendar-webhook.js
exports.handler = async (event, context) => {
  // Verify Calendly webhook signature
  const isValidSignature = verifyCalendlySignature(event);
  if (!isValidSignature) {
    return { statusCode: 401, body: 'Unauthorized' };
  }
  
  const bookingData = JSON.parse(event.body);
  
  // Extract lead_id from booking custom questions
  const leadId = extractLeadIdFromBooking(bookingData);
  
  // Trigger WhatsApp automation
  await triggerWhatsAppSequence(leadId, bookingData.scheduled_event);
  
  // Update CRM with call scheduled
  await updateCRMRecord(leadId, {
    call_scheduled: true,
    call_datetime: bookingData.scheduled_event.start_time,
    calendly_event_id: bookingData.scheduled_event.uuid
  });
  
  return { statusCode: 200, body: 'Webhook processed' };
};
```

### 7. WhatsApp Integration (`whatsapp-automation.js`)
Automated messaging sequence:

```javascript
// netlify/functions/whatsapp-automation.js
async function triggerWhatsAppSequence(leadId, scheduledEvent) {
  const leadData = await getCRMRecord(leadId);
  
  const messages = [
    {
      delay: 0, // Immediate
      template: 'welcome_booking_confirmation',
      variables: {
        name: leadData.name,
        call_date: formatDate(scheduledEvent.start_time),
        preparation_link: `${process.env.SITE_URL}/preparacao-chamada?lead_id=${leadId}`
      }
    },
    {
      delay: 86400000, // 24 hours before call
      template: 'call_reminder_24h',
      variables: {
        name: leadData.name,
        call_time: formatTime(scheduledEvent.start_time)
      }
    },
    {
      delay: 7200000, // 2 hours before call  
      template: 'call_reminder_2h',
      variables: {
        name: leadData.name,
        call_time: formatTime(scheduledEvent.start_time),
        zoom_link: scheduledEvent.join_url
      }
    }
  ];
  
  // Schedule all messages
  for (const message of messages) {
    await scheduleWhatsAppMessage(leadData.phone, message, message.delay);
  }
}
```

## Infrastructure Requirements

### Error Handling & Monitoring
```javascript
// Comprehensive error logging
function logWebhookError(functionName, error, requestData) {
  console.error({
    function: functionName,
    error: error.message,
    stack: error.stack,
    requestData: sanitizeForLogging(requestData),
    timestamp: new Date().toISOString()
  });
  
  // Send to monitoring service
  if (process.env.ENVIRONMENT === 'production') {
    sendToMonitoring({
      service: 'netlify-functions',
      error: error.message,
      function: functionName
    });
  }
}
```

### Retry Logic Implementation
```javascript
async function retryWebhook(url, payload, options, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        ...options
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      if (attempt === maxRetries) {
        throw new Error(`Webhook failed after ${maxRetries} attempts`);
      }
      
      // Exponential backoff
      await delay(Math.pow(2, attempt) * 1000);
      
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      await delay(Math.pow(2, attempt) * 1000);
    }
  }
}
```

### Idempotency Implementation
```javascript
// Use Redis or simple in-memory cache for request deduplication
const processedRequests = new Map();

function ensureIdempotency(requestId, ttl = 300000) { // 5 minutes
  if (processedRequests.has(requestId)) {
    return false; // Already processed
  }
  
  processedRequests.set(requestId, Date.now());
  
  // Cleanup old entries
  setTimeout(() => {
    processedRequests.delete(requestId);
  }, ttl);
  
  return true; // Safe to process
}
```

## Security & Validation

### Input Validation
```javascript
function validateLeadSubmission(data) {
  const required = ['name', 'email', 'businessType', 'amandaScore'];
  const missing = required.filter(field => !data[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  // Email validation
  if (!isValidEmail(data.email)) {
    throw new Error('Invalid email format');
  }
  
  // Amanda score validation  
  if (data.amandaScore < 0 || data.amandaScore > 100) {
    throw new Error('Invalid Amanda score range');
  }
  
  return true;
}
```

### Rate Limiting
```javascript
const rateLimits = new Map();

function checkRateLimit(clientIP, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimits.has(clientIP)) {
    rateLimits.set(clientIP, []);
  }
  
  const requests = rateLimits.get(clientIP);
  
  // Remove old requests outside the window
  const recentRequests = requests.filter(time => time > windowStart);
  
  if (recentRequests.length >= maxRequests) {
    return false; // Rate limit exceeded
  }
  
  recentRequests.push(now);
  rateLimits.set(clientIP, recentRequests);
  
  return true; // Within rate limit
}
```

## Integration Coordination

**DLE Integration:** Match webhook payload structures to dataLayer event shapes
**GTB Integration:** Webhook endpoints must receive data from GTM tag configurations
**QPS Integration:** PII handling validation and consent compliance
**DOC Integration:** Complete API documentation and error handling guides

## Deliverables
1. Complete Netlify Functions codebase ready for deployment
2. Webhook endpoint documentation with payload schemas
3. Error handling and monitoring implementation
4. Rate limiting and security validation
5. Idempotency and retry logic implementation
6. Integration testing procedures with sample data
7. Production deployment guide with environment variables
8. Monitoring and alerting configuration

Start with the lead-submit function and CRM integration, then build out MailerLite and GA4 server events. Coordinate testing with other subagents once webhook endpoints are ready.