# Gate 4: backend_ok - Backend/Webhooks & CRM Integrations (BWE) Tasks
## Mentoria Seja Livre Landing Page - Backend Processing & Integration Implementation

**Gate Owner:** Backend/Webhooks & CRM Integrations Engineer (BWE)  
**Gate Status:** PENDING  
**Dependencies:** Gates 1, 2, 3 (ui_ok + integrations_ok + analytics_ok) MUST pass first  
**Blocking:** Gate 5 until backend_ok validation passes  

---

## GATE 4 VALIDATION CRITERIA

### Technical Requirements
- [ ] Netlify Functions processing form submissions with Amanda scoring
- [ ] Webhook distribution to CRM + MailerLite + Segment operational
- [ ] Amanda score-based lead routing and sales team alerts functional
- [ ] Server-side GA4 event implementation for lead qualification tracking
- [ ] WhatsApp automation triggers working with "Jucana video" sequence
- [ ] Error handling and retry logic implemented with idempotent processing
- [ ] Secure environment variable management for all API keys

### Evidence Required for Gate Passage
1. **Webhook Processing Logs:** All integrations receiving data correctly
2. **Lead Routing Validation:** Amanda score tiers routing to proper sequences
3. **Server-side Event Confirmation:** GA4 events firing from backend
4. **Multi-platform Sync Test:** CRM + MailerLite + Segment data consistency
5. **Error Handling Demo:** Retry logic and failure recovery working

---

## NETLIFY FUNCTIONS ARCHITECTURE

### Task 4.1: Lead Capture Function
**Priority:** CRITICAL  
**Estimated Time:** 6 hours

Create the primary form processing function with Amanda scoring and multi-platform distribution:

**File:** `src/functions/lead-capture.js`
```javascript
const { GoogleAuth } = require('google-auth-library');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const data = JSON.parse(event.body);
    
    // Validate required fields
    const validation = validateLeadData(data);
    if (!validation.valid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Validation failed', details: validation.errors })
      };
    }

    // Process Amanda scoring
    const amandaScoring = calculateAmandaScore(data);
    
    // Enrich lead data
    const enrichedLead = {
      ...data,
      ...amandaScoring,
      timestamp: new Date().toISOString(),
      server_processed: true,
      ip_address: event.headers['client-ip'] || event.headers['x-forwarded-for'],
      user_agent: event.headers['user-agent'],
      processing_id: generateProcessingId()
    };

    // Distribute to all platforms in parallel
    const distributionPromises = [
      sendToCRM(enrichedLead),
      sendToMailerLite(enrichedLead),
      sendToSegment(enrichedLead),
      sendToGA4Server(enrichedLead),
      triggerWhatsAppAutomation(enrichedLead)
    ];

    const distributionResults = await Promise.allSettled(distributionPromises);
    
    // Check for any failures
    const failures = distributionResults
      .map((result, index) => ({ index, result }))
      .filter(({ result }) => result.status === 'rejected');

    if (failures.length > 0) {
      console.error('Distribution failures:', failures);
      // Log failures but don't fail the entire process
      await logFailures(enrichedLead, failures);
    }

    // Send success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        lead_id: enrichedLead.lead_id,
        amanda_score: amandaScoring.amanda_match_score,
        qualification_tier: amandaScoring.qualification_tier,
        message: getQualificationMessage(amandaScoring.qualification_tier)
      })
    };

  } catch (error) {
    console.error('Lead capture error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Nossa equipe foi notificada do erro.'
      })
    };
  }
};

function validateLeadData(data) {
  const required = ['name', 'email', 'phone', 'lead_id'];
  const errors = [];

  required.forEach(field => {
    if (!data[field]) {
      errors.push(`Campo obrigatório: ${field}`);
    }
  });

  // Email validation
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Email inválido');
  }

  // Phone validation (Brazilian format)
  if (data.phone && !/^[\d\s\(\)\-\+]{10,}$/.test(data.phone.replace(/\D/g, ''))) {
    errors.push('Telefone inválido');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function calculateAmandaScore(data) {
  // Demographics (20 points)
  let demographicScore = 0;
  const age = parseInt(data.age);
  if (age >= 35 && age <= 42) demographicScore += 5;
  if (data.gender === 'feminino') demographicScore += 5;
  if (['brasil', 'portugal'].includes(data.location?.toLowerCase())) demographicScore += 5;
  const income = parseInt(data.monthly_income);
  if (income >= 15000 && income <= 30000) demographicScore += 5;

  // Pain Points (40 points)
  let painPointScore = 0;
  const dailyHours = parseInt(data.daily_work_hours);
  if (dailyHours >= 10) painPointScore += 10;
  const exhaustion = parseInt(data.exhaustion_level);
  if (exhaustion >= 7) painPointScore += 10;
  const delegation = parseInt(data.delegation_difficulty);
  if (delegation >= 7) painPointScore += 10;
  const trapped = parseInt(data.trapped_feeling);
  if (trapped >= 7) painPointScore += 10;

  // Behavior (40 points)
  let behaviorScore = 0;
  if (data.business_owner === 'sim') behaviorScore += 10;
  const teamSize = parseInt(data.team_size);
  if (teamSize >= 3) behaviorScore += 10;
  const investment = parseInt(data.investment_budget);
  if (investment >= 5000) behaviorScore += 10;
  if (data.time_availability === 'sim') behaviorScore += 10;

  const totalScore = demographicScore + painPointScore + behaviorScore;

  let qualificationTier;
  if (totalScore >= 80) qualificationTier = 'high_priority';
  else if (totalScore >= 60) qualificationTier = 'qualified';
  else if (totalScore >= 40) qualificationTier = 'lower_priority';
  else qualificationTier = 'unqualified';

  return {
    amanda_match_score: totalScore,
    demographic_score: demographicScore,
    pain_point_score: painPointScore,
    behavior_score: behaviorScore,
    qualification_tier: qualificationTier,
    pain_point_alignment: getPainPointAlignment(painPointScore),
    demographic_match: getDemographicMatch(demographicScore),
    behavior_indicators: getBehaviorIndicators(behaviorScore)
  };
}

async function sendToCRM(leadData) {
  const crmPayload = {
    contact: {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      lead_id: leadData.lead_id,
      amanda_score: leadData.amanda_match_score,
      qualification_tier: leadData.qualification_tier,
      utm_source: leadData.utm_source,
      utm_medium: leadData.utm_medium,
      utm_campaign: leadData.utm_campaign,
      created_at: leadData.timestamp,
      tags: [
        `amanda_${leadData.qualification_tier}`,
        `score_${leadData.amanda_match_score}`,
        'landing_page_lead'
      ]
    }
  };

  const response = await fetch(process.env.CRM_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CRM_API_KEY}`
    },
    body: JSON.stringify(crmPayload)
  });

  if (!response.ok) {
    throw new Error(`CRM API error: ${response.status}`);
  }

  return await response.json();
}

async function sendToMailerLite(leadData) {
  const mailerLitePayload = {
    email: leadData.email,
    fields: {
      name: leadData.name,
      phone: leadData.phone,
      lead_id: leadData.lead_id,
      amanda_score: leadData.amanda_match_score.toString(),
      qualification_tier: leadData.qualification_tier,
      utm_source: leadData.utm_source || '',
      utm_campaign: leadData.utm_campaign || ''
    },
    groups: [getMailerLiteGroupId(leadData.qualification_tier)],
    status: 'active',
    type: 'unconfirmed'
  };

  const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY
    },
    body: JSON.stringify(mailerLitePayload)
  });

  if (!response.ok) {
    throw new Error(`MailerLite API error: ${response.status}`);
  }

  return await response.json();
}

async function sendToSegment(leadData) {
  const segmentPayload = {
    userId: leadData.lead_id,
    event: 'Lead Qualified',
    properties: {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      amanda_match_score: leadData.amanda_match_score,
      qualification_tier: leadData.qualification_tier,
      demographic_score: leadData.demographic_score,
      pain_point_score: leadData.pain_point_score,
      behavior_score: leadData.behavior_score,
      utm_source: leadData.utm_source,
      utm_medium: leadData.utm_medium,
      utm_campaign: leadData.utm_campaign,
      page_url: leadData.page_url,
      form_completion_time: leadData.form_completion_time
    },
    context: {
      ip: leadData.ip_address,
      userAgent: leadData.user_agent
    },
    timestamp: leadData.timestamp
  };

  const response = await fetch('https://api.segment.io/v1/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.SEGMENT_WRITE_KEY + ':').toString('base64')}`
    },
    body: JSON.stringify(segmentPayload)
  });

  if (!response.ok) {
    throw new Error(`Segment API error: ${response.status}`);
  }

  return { success: true };
}

async function sendToGA4Server(leadData) {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  const payload = {
    client_id: leadData.lead_id,
    user_id: leadData.lead_id,
    events: [
      {
        name: 'lead_qualified_server',
        params: {
          amanda_match_score: leadData.amanda_match_score,
          qualification_tier: leadData.qualification_tier,
          demographic_match: leadData.demographic_match,
          pain_point_alignment: leadData.pain_point_alignment,
          behavior_indicators: leadData.behavior_indicators,
          utm_source: leadData.utm_source || 'direct',
          utm_medium: leadData.utm_medium || 'none',
          utm_campaign: leadData.utm_campaign || 'none',
          engagement_time_msec: leadData.form_completion_time || 0
        }
      }
    ]
  };

  const response = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`GA4 Server API error: ${response.status}`);
  }

  return { success: true };
}

async function triggerWhatsAppAutomation(leadData) {
  // Only trigger for qualified leads
  if (leadData.qualification_tier === 'unqualified') {
    return { skipped: true, reason: 'unqualified' };
  }

  const whatsappPayload = {
    phone: leadData.phone,
    lead_id: leadData.lead_id,
    name: leadData.name,
    amanda_score: leadData.amanda_match_score,
    qualification_tier: leadData.qualification_tier,
    trigger_sequence: getWhatsAppSequence(leadData.qualification_tier),
    delay_minutes: getWhatsAppDelay(leadData.qualification_tier)
  };

  const response = await fetch(process.env.WHATSAPP_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`
    },
    body: JSON.stringify(whatsappPayload)
  });

  if (!response.ok) {
    throw new Error(`WhatsApp API error: ${response.status}`);
  }

  return await response.json();
}

// Utility functions
function generateProcessingId() {
  return `proc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getQualificationMessage(tier) {
  const messages = {
    high_priority: 'Perfeito! Você é exatamente o perfil que mais se beneficia da mentoria.',
    qualified: 'Ótimo! Você tem um perfil compatível com nossa metodologia.',
    lower_priority: 'Você pode se beneficiar da mentoria com algumas adaptações.',
    unqualified: 'Obrigada pelo interesse. Vamos te enviar conteúdo educativo primeiro.'
  };
  return messages[tier];
}

function getPainPointAlignment(score) {
  if (score >= 30) return 'high';
  if (score >= 20) return 'medium';
  return 'low';
}

function getDemographicMatch(score) {
  if (score >= 15) return 'perfect';
  if (score >= 10) return 'partial';
  return 'minimal';
}

function getBehaviorIndicators(score) {
  if (score >= 30) return 'strong';
  if (score >= 20) return 'moderate';
  return 'weak';
}

function getMailerLiteGroupId(tier) {
  const groups = {
    high_priority: process.env.MAILERLITE_GROUP_HIGH_PRIORITY,
    qualified: process.env.MAILERLITE_GROUP_QUALIFIED,
    lower_priority: process.env.MAILERLITE_GROUP_LOWER_PRIORITY,
    unqualified: process.env.MAILERLITE_GROUP_UNQUALIFIED
  };
  return groups[tier];
}

function getWhatsAppSequence(tier) {
  const sequences = {
    high_priority: 'immediate_welcome_sequence',
    qualified: 'standard_welcome_sequence',
    lower_priority: 'nurture_sequence'
  };
  return sequences[tier] || 'nurture_sequence';
}

function getWhatsAppDelay(tier) {
  const delays = {
    high_priority: 2,    // 2 minutes
    qualified: 15,       // 15 minutes
    lower_priority: 60   // 1 hour
  };
  return delays[tier] || 60;
}

async function logFailures(leadData, failures) {
  console.error('Distribution failures for lead:', leadData.lead_id, failures);
  
  // Could implement retry logic here or send to dead letter queue
  // For now, just log the failures
}
```

### Task 4.2: Webhook Distribution Function
**Priority:** HIGH  
**Estimated Time:** 4 hours

Create a specialized function for reliable webhook distribution with retry logic:

**File:** `src/functions/webhook-distributor.js`
```javascript
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method not allowed' };
  }

  try {
    const { webhookData, retryCount = 0, maxRetries = 3 } = JSON.parse(event.body);

    const results = await distributeWebhooks(webhookData, retryCount, maxRetries);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        results,
        webhook_id: webhookData.webhook_id || generateWebhookId()
      })
    };

  } catch (error) {
    console.error('Webhook distribution error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Webhook distribution failed' })
    };
  }
};

async function distributeWebhooks(data, retryCount, maxRetries) {
  const webhooks = [
    {
      name: 'CRM',
      url: process.env.CRM_WEBHOOK_URL,
      headers: { 'Authorization': `Bearer ${process.env.CRM_API_KEY}` },
      payload: transformForCRM(data)
    },
    {
      name: 'MailerLite',
      url: 'https://api.mailerlite.com/api/v2/webhooks',
      headers: { 'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY },
      payload: transformForMailerLite(data)
    },
    {
      name: 'Segment',
      url: 'https://api.segment.io/v1/track',
      headers: { 'Authorization': `Basic ${Buffer.from(process.env.SEGMENT_WRITE_KEY + ':').toString('base64')}` },
      payload: transformForSegment(data)
    }
  ];

  const results = [];

  for (const webhook of webhooks) {
    try {
      const result = await sendWebhookWithRetry(webhook, retryCount, maxRetries);
      results.push({ name: webhook.name, status: 'success', result });
    } catch (error) {
      results.push({ name: webhook.name, status: 'failed', error: error.message });
      
      // If we haven't exceeded max retries, queue for retry
      if (retryCount < maxRetries) {
        await queueForRetry(webhook, data, retryCount + 1, maxRetries);
      }
    }
  }

  return results;
}

async function sendWebhookWithRetry(webhook, retryCount, maxRetries) {
  const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
  
  if (retryCount > 0) {
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  const response = await fetch(webhook.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...webhook.headers
    },
    body: JSON.stringify(webhook.payload)
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.json();
}

async function queueForRetry(webhook, originalData, newRetryCount, maxRetries) {
  // In a production environment, this would use a queue service like SQS or Redis
  // For now, we'll implement a simple retry mechanism using setTimeout
  
  const retryDelay = Math.pow(2, newRetryCount) * 1000;
  
  setTimeout(async () => {
    try {
      await sendWebhookWithRetry(webhook, newRetryCount, maxRetries);
      console.log(`Retry successful for ${webhook.name} after ${newRetryCount} attempts`);
    } catch (error) {
      console.error(`Retry failed for ${webhook.name}:`, error);
      
      if (newRetryCount < maxRetries) {
        await queueForRetry(webhook, originalData, newRetryCount + 1, maxRetries);
      } else {
        await sendToDeadLetterQueue(webhook, originalData, error);
      }
    }
  }, retryDelay);
}

async function sendToDeadLetterQueue(webhook, data, error) {
  // Log failed webhooks for manual processing
  console.error('Webhook permanently failed:', {
    webhook: webhook.name,
    data: data,
    error: error.message,
    timestamp: new Date().toISOString()
  });
  
  // In production, this would send to a dead letter queue or notification system
}

function transformForCRM(data) {
  return {
    contact: {
      external_id: data.lead_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      custom_fields: {
        amanda_score: data.amanda_match_score,
        qualification_tier: data.qualification_tier,
        utm_source: data.utm_source,
        utm_campaign: data.utm_campaign,
        form_completion_time: data.form_completion_time
      },
      tags: [`amanda_${data.qualification_tier}`, 'landing_page']
    }
  };
}

function transformForMailerLite(data) {
  return {
    email: data.email,
    name: data.name,
    fields: {
      phone: data.phone,
      lead_id: data.lead_id,
      amanda_score: data.amanda_match_score.toString(),
      qualification: data.qualification_tier
    },
    groups: [getMailerLiteGroupId(data.qualification_tier)]
  };
}

function transformForSegment(data) {
  return {
    userId: data.lead_id,
    event: 'Lead Form Submitted',
    properties: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      amanda_match_score: data.amanda_match_score,
      qualification_tier: data.qualification_tier,
      utm_source: data.utm_source,
      utm_campaign: data.utm_campaign
    },
    timestamp: data.timestamp
  };
}

function generateWebhookId() {
  return `wh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getMailerLiteGroupId(tier) {
  const groups = {
    high_priority: process.env.MAILERLITE_GROUP_HIGH_PRIORITY,
    qualified: process.env.MAILERLITE_GROUP_QUALIFIED,
    lower_priority: process.env.MAILERLITE_GROUP_LOWER_PRIORITY,
    unqualified: process.env.MAILERLITE_GROUP_UNQUALIFIED
  };
  return groups[tier] || process.env.MAILERLITE_GROUP_DEFAULT;
}
```

---

## WHATSAPP AUTOMATION INTEGRATION

### Task 4.3: WhatsApp Sequence Trigger Function
**Priority:** HIGH  
**Estimated Time:** 5 hours

Create automated WhatsApp messaging with the "Jucana video" sequence:

**File:** `src/functions/whatsapp-automation.js`
```javascript
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method not allowed' };
  }

  try {
    const { trigger, leadData, messageType = 'welcome_message' } = JSON.parse(event.body);

    let result;
    
    switch (trigger) {
      case 'form_submission':
        result = await handleFormSubmissionSequence(leadData);
        break;
      case 'questionnaire_complete':
        result = await handleQuestionnaireComplete(leadData);
        break;
      case 'calendar_booking':
        result = await handleCalendarBooking(leadData);
        break;
      case 'manual_message':
        result = await sendManualMessage(leadData, messageType);
        break;
      default:
        throw new Error(`Unknown trigger: ${trigger}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        result,
        lead_id: leadData.lead_id
      })
    };

  } catch (error) {
    console.error('WhatsApp automation error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'WhatsApp automation failed' })
    };
  }
};

async function handleFormSubmissionSequence(leadData) {
  // Different sequences based on Amanda qualification
  const sequence = getSequenceForQualification(leadData.qualification_tier);
  
  // Schedule welcome message
  const welcomeResult = await scheduleMessage(leadData, sequence.welcome, 2); // 2 minutes delay
  
  // Schedule follow-up messages
  const followUpResults = [];
  for (const message of sequence.followUps) {
    const result = await scheduleMessage(leadData, message, message.delay);
    followUpResults.push(result);
  }

  return {
    welcome: welcomeResult,
    followUps: followUpResults,
    sequence_type: sequence.type
  };
}

async function handleQuestionnaireComplete(leadData) {
  // Send immediate response with Jucana video
  const jucanaMessage = {
    type: 'jucana_video',
    template: 'jucana_video_share',
    variables: {
      name: leadData.name,
      video_url: process.env.JUCANA_VIDEO_URL,
      calendar_link: generateCalendarLink(leadData)
    }
  };

  const result = await sendWhatsAppMessage(leadData, jucanaMessage);
  
  // Schedule booking reminder for 24 hours later
  await scheduleMessage(leadData, {
    type: 'booking_reminder',
    template: 'calendar_booking_reminder',
    variables: {
      name: leadData.name,
      calendar_link: generateCalendarLink(leadData)
    }
  }, 1440); // 24 hours in minutes

  return result;
}

async function handleCalendarBooking(leadData) {
  // Send booking confirmation
  const confirmationMessage = {
    type: 'booking_confirmation',
    template: 'call_confirmation',
    variables: {
      name: leadData.name,
      booking_date: leadData.booking_date,
      booking_time: leadData.booking_time,
      zoom_link: generateZoomLink(leadData)
    }
  };

  const confirmResult = await sendWhatsAppMessage(leadData, confirmationMessage);

  // Schedule pre-call preparation message
  await scheduleMessage(leadData, {
    type: 'pre_call_prep',
    template: 'pre_call_preparation',
    variables: {
      name: leadData.name,
      prep_guide_url: process.env.PREP_GUIDE_URL
    }
  }, calculatePreCallDelay(leadData.booking_date, leadData.booking_time));

  return confirmResult;
}

async function sendWhatsAppMessage(leadData, messageConfig) {
  const payload = {
    to: formatPhoneNumber(leadData.phone),
    type: 'template',
    template: {
      name: messageConfig.template,
      language: { code: 'pt_BR' },
      components: [
        {
          type: 'body',
          parameters: Object.keys(messageConfig.variables).map(key => ({
            type: 'text',
            text: messageConfig.variables[key]
          }))
        }
      ]
    }
  };

  const response = await fetch(`${process.env.WHATSAPP_API_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`WhatsApp API error: ${response.status}`);
  }

  const result = await response.json();

  // Track the message send event
  await trackWhatsAppEvent(leadData, messageConfig.type, result);

  return result;
}

async function scheduleMessage(leadData, messageConfig, delayMinutes) {
  // In production, this would use a scheduling service like AWS SQS with delay
  // For now, we'll implement a simple setTimeout approach
  
  setTimeout(async () => {
    try {
      await sendWhatsAppMessage(leadData, messageConfig);
      console.log(`Scheduled message sent: ${messageConfig.type} for lead ${leadData.lead_id}`);
    } catch (error) {
      console.error(`Failed to send scheduled message:`, error);
    }
  }, delayMinutes * 60 * 1000); // Convert minutes to milliseconds

  return {
    scheduled: true,
    delay_minutes: delayMinutes,
    message_type: messageConfig.type,
    scheduled_for: new Date(Date.now() + delayMinutes * 60 * 1000).toISOString()
  };
}

async function trackWhatsAppEvent(leadData, messageType, whatsappResult) {
  // Send server-side event to GA4
  const payload = {
    client_id: leadData.lead_id,
    user_id: leadData.lead_id,
    events: [
      {
        name: 'whatsapp_message_sent',
        params: {
          message_type: messageType,
          automation_trigger: 'server_side',
          amanda_score: leadData.amanda_match_score || 0,
          qualification_tier: leadData.qualification_tier || 'unknown',
          whatsapp_message_id: whatsappResult.messages?.[0]?.id || 'unknown',
          sequence_step: getSequenceStep(messageType)
        }
      }
    ]
  };

  await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA4_MEASUREMENT_ID}&api_secret=${process.env.GA4_API_SECRET}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

function getSequenceForQualification(tier) {
  const sequences = {
    high_priority: {
      type: 'immediate_attention',
      welcome: {
        type: 'welcome_message',
        template: 'high_priority_welcome',
        variables: {}
      },
      followUps: [
        {
          type: 'questionnaire_link',
          template: 'questionnaire_priority',
          delay: 15, // 15 minutes
          variables: {}
        }
      ]
    },
    qualified: {
      type: 'standard_nurture',
      welcome: {
        type: 'welcome_message',
        template: 'standard_welcome',
        variables: {}
      },
      followUps: [
        {
          type: 'questionnaire_link',
          template: 'questionnaire_standard',
          delay: 60, // 1 hour
          variables: {}
        }
      ]
    },
    lower_priority: {
      type: 'extended_nurture',
      welcome: {
        type: 'welcome_message',
        template: 'nurture_welcome',
        variables: {}
      },
      followUps: [
        {
          type: 'educational_content',
          template: 'educational_sequence_1',
          delay: 240, // 4 hours
          variables: {}
        },
        {
          type: 'questionnaire_link',
          template: 'questionnaire_nurture',
          delay: 1440, // 24 hours
          variables: {}
        }
      ]
    }
  };

  return sequences[tier] || sequences.lower_priority;
}

function formatPhoneNumber(phone) {
  // Clean phone number and format for WhatsApp API
  const cleaned = phone.replace(/\D/g, '');
  
  // Add Brazilian country code if not present
  if (cleaned.length === 11 && !cleaned.startsWith('55')) {
    return '55' + cleaned;
  }
  
  return cleaned;
}

function generateCalendarLink(leadData) {
  const baseUrl = process.env.CALENDLY_BASE_URL || 'https://calendly.com/mentoria-seja-livre';
  const params = new URLSearchParams({
    lead_id: leadData.lead_id,
    utm_source: leadData.utm_source || 'whatsapp',
    amanda_score: leadData.amanda_match_score?.toString() || '0'
  });
  
  return `${baseUrl}?${params.toString()}`;
}

function generateZoomLink(leadData) {
  // In production, this would integrate with Zoom API to create meeting
  return `${process.env.ZOOM_BASE_URL}?lead_id=${leadData.lead_id}`;
}

function calculatePreCallDelay(bookingDate, bookingTime) {
  // Calculate delay to send prep message 2 hours before the call
  const bookingDateTime = new Date(`${bookingDate} ${bookingTime}`);
  const prepTime = new Date(bookingDateTime.getTime() - (2 * 60 * 60 * 1000)); // 2 hours before
  const now = new Date();
  
  const delayMs = prepTime.getTime() - now.getTime();
  return Math.max(0, Math.floor(delayMs / (60 * 1000))); // Convert to minutes
}

function getSequenceStep(messageType) {
  const steps = {
    welcome_message: 1,
    questionnaire_link: 2,
    jucana_video: 3,
    booking_reminder: 4,
    booking_confirmation: 5,
    pre_call_prep: 6
  };
  return steps[messageType] || 0;
}
```

---

## AMANDA SCORE-BASED LEAD ROUTING

### Task 4.4: Sales Team Alert System
**Priority:** MEDIUM  
**Estimated Time:** 3 hours

Create automated sales team alerts based on Amanda qualification:

**File:** `src/functions/sales-alerts.js`
```javascript
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method not allowed' };
  }

  try {
    const leadData = JSON.parse(event.body);
    
    // Only alert for qualified leads
    if (shouldAlertSalesTeam(leadData)) {
      const alertResult = await sendSalesAlert(leadData);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          alert_sent: true,
          alert_type: getAlertType(leadData.qualification_tier),
          result: alertResult
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        alert_sent: false,
        reason: 'Lead does not meet alert criteria'
      })
    };

  } catch (error) {
    console.error('Sales alert error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Sales alert failed' })
    };
  }
};

function shouldAlertSalesTeam(leadData) {
  // Alert for high priority and qualified leads
  return ['high_priority', 'qualified'].includes(leadData.qualification_tier);
}

async function sendSalesAlert(leadData) {
  const alertType = getAlertType(leadData.qualification_tier);
  
  // Send different types of alerts based on qualification
  const promises = [];
  
  if (alertType === 'immediate') {
    // High priority leads get immediate Slack notification
    promises.push(sendSlackAlert(leadData, true));
    
    // And email alert to sales manager
    promises.push(sendEmailAlert(leadData, 'sales_manager'));
  } else {
    // Qualified leads get standard Slack notification
    promises.push(sendSlackAlert(leadData, false));
  }

  // All qualified leads get added to sales dashboard
  promises.push(updateSalesDashboard(leadData));

  const results = await Promise.allSettled(promises);
  
  return {
    slack_sent: results[0]?.status === 'fulfilled',
    email_sent: results[1]?.status === 'fulfilled' || null,
    dashboard_updated: results[results.length - 1]?.status === 'fulfilled'
  };
}

async function sendSlackAlert(leadData, isUrgent = false) {
  const webhookUrl = process.env.SLACK_SALES_WEBHOOK_URL;
  
  const message = {
    channel: isUrgent ? '#sales-urgent' : '#sales-leads',
    username: 'Lead Alert Bot',
    icon_emoji: isUrgent ? ':rotating_light:' : ':new:',
    attachments: [
      {
        color: isUrgent ? '#ff0000' : '#36a64f',
        title: `${isUrgent ? '🚨 URGENT' : '✨ New'} Qualified Lead: ${leadData.name}`,
        fields: [
          {
            title: 'Amanda Score',
            value: `${leadData.amanda_match_score}/100`,
            short: true
          },
          {
            title: 'Qualification',
            value: leadData.qualification_tier.replace('_', ' ').toUpperCase(),
            short: true
          },
          {
            title: 'Email',
            value: leadData.email,
            short: true
          },
          {
            title: 'Phone',
            value: leadData.phone,
            short: true
          },
          {
            title: 'UTM Source',
            value: leadData.utm_source || 'Direct',
            short: true
          },
          {
            title: 'Submitted',
            value: new Date(leadData.timestamp).toLocaleString('pt-BR'),
            short: true
          }
        ],
        actions: [
          {
            type: 'button',
            text: 'View in CRM',
            url: `${process.env.CRM_BASE_URL}/contacts/${leadData.lead_id}`,
            style: 'primary'
          },
          {
            type: 'button',
            text: 'Send WhatsApp',
            url: `https://wa.me/${formatPhoneNumber(leadData.phone)}`,
            style: 'default'
          }
        ],
        footer: 'Mentoria Seja Livre - Landing Page',
        ts: Math.floor(Date.now() / 1000)
      }
    ]
  };

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  });

  if (!response.ok) {
    throw new Error(`Slack webhook error: ${response.status}`);
  }

  return await response.json();
}

async function sendEmailAlert(leadData, recipientType) {
  const recipients = getEmailRecipients(recipientType);
  
  const emailPayload = {
    to: recipients,
    subject: `🚨 High Priority Lead Alert - Amanda Score: ${leadData.amanda_match_score}`,
    html: generateAlertEmailHTML(leadData),
    text: generateAlertEmailText(leadData)
  };

  // Using SendGrid or similar email service
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`
    },
    body: JSON.stringify({
      personalizations: [{ to: recipients.map(email => ({ email })) }],
      from: { email: process.env.FROM_EMAIL, name: 'Lead Alert System' },
      subject: emailPayload.subject,
      content: [
        { type: 'text/html', value: emailPayload.html },
        { type: 'text/plain', value: emailPayload.text }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`SendGrid error: ${response.status}`);
  }

  return { email_sent: true, recipients: recipients.length };
}

async function updateSalesDashboard(leadData) {
  // Update internal sales dashboard/CRM with lead scoring
  const dashboardPayload = {
    lead_id: leadData.lead_id,
    name: leadData.name,
    email: leadData.email,
    phone: leadData.phone,
    amanda_score: leadData.amanda_match_score,
    qualification_tier: leadData.qualification_tier,
    priority: getPriorityLevel(leadData.qualification_tier),
    source: 'landing_page',
    utm_data: {
      source: leadData.utm_source,
      medium: leadData.utm_medium,
      campaign: leadData.utm_campaign
    },
    created_at: leadData.timestamp,
    next_action: getRecommendedAction(leadData.qualification_tier),
    expected_close_probability: getCloseProbability(leadData.amanda_match_score)
  };

  const response = await fetch(`${process.env.SALES_DASHBOARD_API_URL}/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SALES_DASHBOARD_API_KEY}`
    },
    body: JSON.stringify(dashboardPayload)
  });

  if (!response.ok) {
    throw new Error(`Sales dashboard error: ${response.status}`);
  }

  return await response.json();
}

function getAlertType(qualificationTier) {
  const alertTypes = {
    high_priority: 'immediate',
    qualified: 'standard',
    lower_priority: 'none',
    unqualified: 'none'
  };
  return alertTypes[qualificationTier];
}

function getEmailRecipients(type) {
  const recipients = {
    sales_manager: [process.env.SALES_MANAGER_EMAIL],
    sales_team: [
      process.env.SALES_MANAGER_EMAIL,
      process.env.SALES_REP_1_EMAIL,
      process.env.SALES_REP_2_EMAIL
    ].filter(Boolean)
  };
  return recipients[type] || [];
}

function generateAlertEmailHTML(leadData) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #ef4444; color: white; padding: 20px; text-align: center;">
        <h1>🚨 High Priority Lead Alert</h1>
      </div>
      
      <div style="padding: 30px; background-color: #f8f9fa;">
        <h2>New High-Value Lead Detected</h2>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Lead Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${leadData.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${leadData.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${leadData.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Amanda Score:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${leadData.amanda_match_score}/100</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Qualification:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${leadData.qualification_tier.toUpperCase()}</td>
            </tr>
          </table>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CRM_BASE_URL}/contacts/${leadData.lead_id}" 
             style="background-color: #ec4899; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View in CRM
          </a>
        </div>
        
        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>Recommended Action:</strong> ${getRecommendedAction(leadData.qualification_tier)}
        </div>
      </div>
    </div>
  `;
}

function generateAlertEmailText(leadData) {
  return `
HIGH PRIORITY LEAD ALERT

Lead Information:
- Name: ${leadData.name}
- Email: ${leadData.email}
- Phone: ${leadData.phone}
- Amanda Score: ${leadData.amanda_match_score}/100
- Qualification: ${leadData.qualification_tier.toUpperCase()}

Recommended Action: ${getRecommendedAction(leadData.qualification_tier)}

View in CRM: ${process.env.CRM_BASE_URL}/contacts/${leadData.lead_id}
  `;
}

function formatPhoneNumber(phone) {
  return phone.replace(/\D/g, '');
}

function getPriorityLevel(qualificationTier) {
  const priorities = {
    high_priority: 1,
    qualified: 2,
    lower_priority: 3,
    unqualified: 4
  };
  return priorities[qualificationTier];
}

function getRecommendedAction(qualificationTier) {
  const actions = {
    high_priority: 'Contact within 2 hours via WhatsApp. Schedule discovery call immediately.',
    qualified: 'Send welcome sequence via WhatsApp. Follow up within 24 hours.',
    lower_priority: 'Add to nurture sequence. Follow up in 3-5 days.',
    unqualified: 'Add to educational content sequence.'
  };
  return actions[qualificationTier];
}

function getCloseProbability(amandaScore) {
  if (amandaScore >= 80) return 0.75;
  if (amandaScore >= 60) return 0.45;
  if (amandaScore >= 40) return 0.25;
  return 0.10;
}
```

---

## ERROR HANDLING AND MONITORING

### Task 4.5: Comprehensive Error Handling
**Priority:** HIGH  
**Estimated Time:** 3 hours

Implement robust error handling with monitoring and alerting:

**File:** `src/functions/error-handler.js`
```javascript
class BackendErrorHandler {
  constructor() {
    this.errorCategories = {
      VALIDATION: 'validation_error',
      NETWORK: 'network_error',
      API_LIMIT: 'api_limit_error',
      AUTH: 'authentication_error',
      DATA: 'data_processing_error',
      TIMEOUT: 'timeout_error'
    };
  }

  async handleError(error, context = {}) {
    const errorDetails = this.categorizeError(error, context);
    
    // Log error
    console.error('Backend Error:', errorDetails);
    
    // Send to monitoring service
    await this.sendToMonitoring(errorDetails);
    
    // Alert if critical
    if (errorDetails.severity === 'critical') {
      await this.sendCriticalAlert(errorDetails);
    }
    
    return this.getErrorResponse(errorDetails);
  }

  categorizeError(error, context) {
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context: context,
      severity: 'medium'
    };

    // Categorize by error type
    if (error.name === 'ValidationError') {
      errorDetails.category = this.errorCategories.VALIDATION;
      errorDetails.severity = 'low';
    } else if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND') {
      errorDetails.category = this.errorCategories.NETWORK;
      errorDetails.severity = 'high';
    } else if (error.status === 429) {
      errorDetails.category = this.errorCategories.API_LIMIT;
      errorDetails.severity = 'high';
    } else if (error.status === 401 || error.status === 403) {
      errorDetails.category = this.errorCategories.AUTH;
      errorDetails.severity = 'critical';
    } else if (error.status >= 500) {
      errorDetails.category = this.errorCategories.DATA;
      errorDetails.severity = 'critical';
    } else {
      errorDetails.category = 'unknown_error';
      errorDetails.severity = 'medium';
    }

    return errorDetails;
  }

  async sendToMonitoring(errorDetails) {
    try {
      // Send to error monitoring service (e.g., Sentry, Datadog)
      await fetch(process.env.ERROR_MONITORING_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: errorDetails,
          service: 'mentoria-backend',
          environment: process.env.NODE_ENV || 'development'
        })
      });
    } catch (monitoringError) {
      console.error('Failed to send error to monitoring:', monitoringError);
    }
  }

  async sendCriticalAlert(errorDetails) {
    const alertMessage = {
      text: `🚨 Critical Backend Error - Mentoria Seja Livre`,
      attachments: [
        {
          color: '#ff0000',
          title: `${errorDetails.category}: ${errorDetails.message}`,
          fields: [
            {
              title: 'Severity',
              value: errorDetails.severity,
              short: true
            },
            {
              title: 'Function',
              value: errorDetails.context.functionName || 'unknown',
              short: true
            },
            {
              title: 'Timestamp',
              value: errorDetails.timestamp,
              short: false
            }
          ]
        }
      ]
    };

    try {
      await fetch(process.env.SLACK_ERROR_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alertMessage)
      });
    } catch (alertError) {
      console.error('Failed to send critical alert:', alertError);
    }
  }

  getErrorResponse(errorDetails) {
    const userFriendlyMessages = {
      [this.errorCategories.VALIDATION]: 'Por favor, verifique os dados enviados.',
      [this.errorCategories.NETWORK]: 'Erro de conexão. Tente novamente.',
      [this.errorCategories.API_LIMIT]: 'Sistema temporariamente sobrecarregado. Tente em alguns minutos.',
      [this.errorCategories.AUTH]: 'Erro de autorização. Nossa equipe foi notificada.',
      [this.errorCategories.DATA]: 'Erro interno do servidor. Nossa equipe foi notificada.',
      [this.errorCategories.TIMEOUT]: 'A operação demorou mais que o esperado. Tente novamente.'
    };

    return {
      statusCode: this.getStatusCode(errorDetails.category),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: true,
        message: userFriendlyMessages[errorDetails.category] || 'Erro interno do servidor.',
        error_id: this.generateErrorId(),
        timestamp: errorDetails.timestamp
      })
    };
  }

  getStatusCode(category) {
    const statusCodes = {
      [this.errorCategories.VALIDATION]: 400,
      [this.errorCategories.NETWORK]: 502,
      [this.errorCategories.API_LIMIT]: 429,
      [this.errorCategories.AUTH]: 401,
      [this.errorCategories.DATA]: 500,
      [this.errorCategories.TIMEOUT]: 504
    };
    return statusCodes[category] || 500;
  }

  generateErrorId() {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = { BackendErrorHandler };
```

---

## ENVIRONMENT CONFIGURATION

### Task 4.6: Environment Variables Setup
**Priority:** CRITICAL  
**Estimated Time:** 2 hours

Configure all necessary environment variables for integrations:

**File:** `.env.example`
```bash
# GA4 Server-Side Tracking
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=your_ga4_api_secret

# CRM Integration
CRM_WEBHOOK_URL=https://your-crm.com/api/webhooks/leads
CRM_API_KEY=your_crm_api_key
CRM_BASE_URL=https://your-crm.com

# MailerLite Integration
MAILERLITE_API_KEY=your_mailerlite_api_key
MAILERLITE_GROUP_HIGH_PRIORITY=group_id_high_priority
MAILERLITE_GROUP_QUALIFIED=group_id_qualified
MAILERLITE_GROUP_LOWER_PRIORITY=group_id_lower_priority
MAILERLITE_GROUP_UNQUALIFIED=group_id_unqualified
MAILERLITE_GROUP_DEFAULT=group_id_default

# Segment Integration
SEGMENT_WRITE_KEY=your_segment_write_key

# WhatsApp Business API
WHATSAPP_API_URL=https://graph.facebook.com/v17.0/your_phone_id
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
WHATSAPP_WEBHOOK_URL=https://your-whatsapp-service.com/webhooks
WHATSAPP_API_KEY=your_whatsapp_service_api_key

# Video and Calendar Links
JUCANA_VIDEO_URL=https://vimeo.com/your_jucana_video
CALENDLY_BASE_URL=https://calendly.com/mentoria-seja-livre
ZOOM_BASE_URL=https://zoom.us/j/your_meeting_room
PREP_GUIDE_URL=https://your-site.com/prep-guide

# Sales Team Alerts
SLACK_SALES_WEBHOOK_URL=https://hooks.slack.com/services/your/sales/webhook
SLACK_ERROR_WEBHOOK_URL=https://hooks.slack.com/services/your/error/webhook
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=alerts@mentoriasejar.com
SALES_MANAGER_EMAIL=manager@mentoriasejar.com
SALES_REP_1_EMAIL=rep1@mentoriasejar.com
SALES_REP_2_EMAIL=rep2@mentoriasejar.com

# Sales Dashboard API
SALES_DASHBOARD_API_URL=https://your-dashboard.com/api
SALES_DASHBOARD_API_KEY=your_dashboard_api_key

# Error Monitoring
ERROR_MONITORING_WEBHOOK_URL=https://your-monitoring-service.com/webhooks
```

**File:** `netlify.toml`
```toml
[build]
  publish = "dist"
  command = "npm run build"
  functions = "src/functions"

[build.environment]
  NODE_VERSION = "18"

[context.production.environment]
  NODE_ENV = "production"

[context.deploy-preview.environment]
  NODE_ENV = "staging"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/.netlify/functions/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Headers = "Content-Type"
    Access-Control-Allow-Methods = "GET, POST, OPTIONS"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://api.segment.io;"
```

---

## GATE 4 TESTING AND VALIDATION

### Task 4.7: Backend Integration Testing
**Priority:** HIGH  
**Estimated Time:** 4 hours

Create comprehensive testing for all backend integrations:

**File:** `src/functions/test-integrations.js`
```javascript
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request' })
    };
  }

  const { test_type } = JSON.parse(event.body);
  
  try {
    let results;
    
    switch (test_type) {
      case 'full_integration':
        results = await testFullIntegration();
        break;
      case 'webhook_distribution':
        results = await testWebhookDistribution();
        break;
      case 'whatsapp_automation':
        results = await testWhatsAppAutomation();
        break;
      case 'sales_alerts':
        results = await testSalesAlerts();
        break;
      default:
        results = await runAllTests();
    }
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        test_type,
        results,
        timestamp: new Date().toISOString()
      })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

async function testFullIntegration() {
  const testLead = generateTestLead();
  const results = {};
  
  // Test CRM integration
  try {
    await sendToCRM(testLead);
    results.crm = { status: 'pass', message: 'CRM integration working' };
  } catch (error) {
    results.crm = { status: 'fail', error: error.message };
  }
  
  // Test MailerLite integration
  try {
    await sendToMailerLite(testLead);
    results.mailerlite = { status: 'pass', message: 'MailerLite integration working' };
  } catch (error) {
    results.mailerlite = { status: 'fail', error: error.message };
  }
  
  // Test Segment integration
  try {
    await sendToSegment(testLead);
    results.segment = { status: 'pass', message: 'Segment integration working' };
  } catch (error) {
    results.segment = { status: 'fail', error: error.message };
  }
  
  // Test GA4 server events
  try {
    await sendToGA4Server(testLead);
    results.ga4_server = { status: 'pass', message: 'GA4 server events working' };
  } catch (error) {
    results.ga4_server = { status: 'fail', error: error.message };
  }
  
  return results;
}

function generateTestLead() {
  return {
    lead_id: `test_${Date.now()}`,
    name: 'Amanda Test Silva',
    email: 'amanda.test@example.com',
    phone: '+5511999999999',
    age: 38,
    gender: 'feminino',
    location: 'brasil',
    monthly_income: 25000,
    daily_work_hours: 12,
    exhaustion_level: 8,
    delegation_difficulty: 9,
    trapped_feeling: 7,
    business_owner: 'sim',
    team_size: 5,
    investment_budget: 8000,
    time_availability: 'sim',
    amanda_match_score: 85,
    qualification_tier: 'high_priority',
    utm_source: 'test',
    utm_campaign: 'integration_test',
    timestamp: new Date().toISOString()
  };
}

// Additional test functions would be implemented here...
```

---

## GATE 4 COMPLETION CHECKLIST

### Technical Validation
- [ ] Netlify Functions deploying and executing successfully
- [ ] Lead capture processing with Amanda scoring operational
- [ ] Multi-platform webhook distribution working (CRM + MailerLite + Segment)
- [ ] Server-side GA4 events firing correctly
- [ ] WhatsApp automation triggers functional with message templates
- [ ] Sales team alerts operational for qualified leads
- [ ] Error handling and retry logic implemented

### Quality Validation
- [ ] End-to-end lead processing tested with real data
- [ ] Amanda score calculation accuracy verified
- [ ] Webhook reliability tested under various scenarios
- [ ] WhatsApp message templates approved and tested
- [ ] Sales alert delivery confirmed across channels

### Integration Validation
- [ ] CRM receiving and processing lead data correctly
- [ ] MailerLite automation sequences triggered properly
- [ ] Segment events tracking user journey accurately
- [ ] GA4 server-side events matching client-side data
- [ ] WhatsApp messages delivering with proper formatting

### Security and Performance
- [ ] Environment variables properly secured
- [ ] API rate limiting and error handling implemented
- [ ] Function execution times under performance budgets
- [ ] Security headers configured in netlify.toml
- [ ] Idempotent webhook processing preventing duplicates

### Documentation Deliverables
1. **Integration test results** with success/failure status for each service
2. **Webhook payload examples** for each platform integration
3. **Amanda scoring validation** with test scenarios and expected outputs
4. **WhatsApp automation flowchart** showing message sequences
5. **Error handling demonstration** with recovery scenarios

**Gate 4 Status:** Ready for validation by EPL  
**Next Gate:** Gate 5 (release_ok) - DQE implements CI/CD pipeline and production deployment