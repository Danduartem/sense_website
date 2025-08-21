/**
 * Lead Submission Processing - Netlify Function
 * 
 * Handles modal form submissions with Amanda scoring and webhook distribution
 * Integrates with CRM, MailerLite, GA4 Server Events, and Segment
 * 
 * @author Server/SS-GTM Engineer & Analytics Program Lead
 */

const { v4: uuidv4 } = require('uuid');

// Rate limiting storage (in production, use Redis or similar)
const rateLimits = new Map();

exports.handler = async (event, context) => {
  // CORS headers for cross-origin requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        error: 'Method Not Allowed',
        message: 'Only POST requests are accepted'
      })
    };
  }

  try {
    // Rate limiting check
    const clientIP = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.'
        })
      };
    }

    // Parse and validate request data
    const requestData = JSON.parse(event.body);
    
    if (!validateSubmissionData(requestData)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Invalid Request',
          message: 'Required fields are missing or invalid'
        })
      };
    }

    // Generate or use existing lead_id
    const leadId = requestData.leadId || uuidv4();
    
    // Server-side Amanda score validation
    const serverAmandaScore = calculateAmandaScoreServer(requestData);
    
    // Use client score if it matches server calculation (within tolerance)
    const amandaScore = Math.abs(serverAmandaScore - (requestData.amandaScore || 0)) <= 5 
      ? requestData.amandaScore 
      : serverAmandaScore;

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
      delegationStruggle: requestData.delegationStruggle,
      feminineEnergyImportance: requestData.feminineEnergyImportance,
      leadershipInterest: requestData.leadershipInterest,
      transformationReadiness: requestData.transformationReadiness,
      amandaScore,
      amandaScoreTier: getAmandaScoreTier(amandaScore),
      qualificationResult: getQualificationResult(amandaScore),
      sourceSection: requestData.sourceSection,
      ctaId: requestData.ctaId,
      submissionTimestamp: new Date().toISOString(),
      userAgent: event.headers['user-agent'],
      ipAddress: clientIP
    };

    // Parallel webhook distribution for better performance
    const webhookPromises = [
      syncToCRM(leadData),
      syncToMailerLite(leadData),
      syncToSegment(leadData),
      sendGA4ServerEvent(leadData)
    ];

    // Execute all webhooks simultaneously
    const results = await Promise.allSettled(webhookPromises);

    // Log any failures but don't block the response
    const failures = results.filter(result => result.status === 'rejected');
    if (failures.length > 0) {
      console.error('Webhook failures:', failures.map(f => f.reason));
    }

    // Track webhook success rates
    const successCount = results.filter(result => result.status === 'fulfilled').length;
    console.log(`Webhook distribution: ${successCount}/${results.length} successful`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        leadId: leadId,
        amandaScore: amandaScore,
        amandaScoreTier: getAmandaScoreTier(amandaScore),
        qualificationResult: getQualificationResult(amandaScore),
        message: 'Lead captured successfully',
        webhookResults: {
          total: results.length,
          successful: successCount,
          failed: failures.length
        }
      })
    };

  } catch (error) {
    console.error('Lead submission error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: 'Erro interno. Tente novamente ou entre em contato via WhatsApp.',
        timestamp: new Date().toISOString()
      })
    };
  }
};

/**
 * Rate limiting implementation
 */
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

/**
 * Validate required submission data
 */
function validateSubmissionData(data) {
  const required = [
    'name', 'email', 'phone', 'businessType', 'monthlyRevenue', 
    'workHoursDaily', 'mainStruggle', 'sourceSection'
  ];

  // Check required fields
  for (const field of required) {
    if (!data[field] || data[field].toString().trim() === '') {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }

  // Email validation
  if (!isValidEmail(data.email)) {
    console.error('Invalid email format:', data.email);
    return false;
  }

  // Amanda score validation (if provided)
  if (data.amandaScore !== undefined && (data.amandaScore < 0 || data.amandaScore > 100)) {
    console.error('Invalid Amanda score:', data.amandaScore);
    return false;
  }

  return true;
}

/**
 * Server-side Amanda score calculation for validation
 */
function calculateAmandaScoreServer(data) {
  let score = 0;

  // Demographics (20 points)
  if (data.gender === 'feminino') score += 10;
  if (data.age >= 30 && data.age <= 40) score += 5;
  if (data.monthlyRevenue === '15k_25k') score += 5;

  // Pain points (40 points)
  if (parseInt(data.workHoursDaily) >= 10) score += 15;
  if (data.mainStruggle === 'exhaustion_overwork') score += 15;
  if (data.delegationStruggle === 'sim') score += 10;

  // Behavioral indicators (40 points)
  if (data.feminineEnergyImportance === 'muito_importante') score += 15;
  if (data.leadershipInterest === 'alto') score += 15;
  if (parseInt(data.transformationReadiness) >= 8) score += 10;

  return Math.min(score, 100);
}

/**
 * Get Amanda score tier for segmentation
 */
function getAmandaScoreTier(score) {
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
}

/**
 * Get qualification result
 */
function getQualificationResult(score) {
  if (score >= 80) return 'priority_enrollment';
  if (score >= 60) return 'qualification_required';
  return 'redirect_alternative_resources';
}

/**
 * CRM Integration with retry logic
 */
async function syncToCRM(leadData) {
  const crmPayload = {
    external_id: leadData.leadId,
    name: leadData.name,
    email: leadData.email,
    phone: leadData.phone,
    source: 'landing_page_modal',
    custom_fields: {
      amanda_match_score: leadData.amandaScore,
      amanda_score_tier: leadData.amandaScoreTier,
      business_type: leadData.businessType,
      monthly_revenue: leadData.monthlyRevenue,
      work_hours_daily: leadData.workHoursDaily,
      main_struggle: leadData.mainStruggle,
      delegation_struggle: leadData.delegationStruggle,
      feminine_energy_importance: leadData.feminineEnergyImportance,
      leadership_interest: leadData.leadershipInterest,
      transformation_readiness: leadData.transformationReadiness,
      source_section: leadData.sourceSection,
      cta_id: leadData.ctaId,
      qualification_result: leadData.qualificationResult
    },
    tags: [
      'landing_page_lead',
      `amanda_score_${leadData.amandaScoreTier}`,
      `source_${leadData.sourceSection}`,
      `business_type_${leadData.businessType}`,
      'mentoria_seja_livre'
    ],
    automation_triggers: [
      leadData.amandaScore >= 80 ? 'high_priority_follow_up' : 'standard_nurture',
      `qualification_${leadData.qualificationResult}`
    ]
  };

  return await retryWebhook(
    process.env.CRM_WEBHOOK_URL,
    crmPayload,
    {
      headers: {
        'Authorization': `Bearer ${process.env.CRM_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Webhook-Source': 'netlify-function'
      }
    }
  );
}

/**
 * MailerLite Integration with contact creation and automation
 */
async function syncToMailerLite(leadData) {
  const contactData = {
    email: leadData.email,
    name: leadData.name,
    fields: {
      lead_id: leadData.leadId,
      amanda_match_score: leadData.amandaScore,
      amanda_score_tier: leadData.amandaScoreTier,
      business_type: leadData.businessType,
      monthly_revenue: leadData.monthlyRevenue,
      work_hours_daily: leadData.workHoursDaily,
      main_struggle: leadData.mainStruggle,
      traffic_source: leadData.trafficSource || 'landing_page',
      source_section: leadData.sourceSection,
      signup_date: leadData.submissionTimestamp,
      transformation_stage: 'awareness',
      qualification_result: leadData.qualificationResult
    },
    groups: [
      'landing_page_leads',
      getAmandaScoreGroup(leadData.amandaScore),
      `business_type_${leadData.businessType}`,
      `source_${leadData.sourceSection}`
    ]
  };

  // Create/update contact
  const contactResponse = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY
    },
    body: JSON.stringify(contactData)
  });

  if (!contactResponse.ok) {
    throw new Error(`MailerLite sync failed: ${contactResponse.status}`);
  }

  // Trigger questionnaire automation
  await triggerQuestionnaireAutomation(leadData.email, leadData.leadId);

  return await contactResponse.json();
}

/**
 * Trigger questionnaire email automation
 */
async function triggerQuestionnaireAutomation(email, leadId) {
  const automationData = {
    email: email,
    automation_id: process.env.QUESTIONNAIRE_AUTOMATION_ID,
    custom_fields: {
      questionnaire_url: `${process.env.SITE_URL}/questionario?lead_id=${leadId}`,
      deadline: getQuestionnaireDeadline(), // 48 hours from now
      lead_id: leadId
    }
  };

  try {
    const response = await fetch(`https://api.mailerlite.com/api/v2/campaigns/${process.env.QUESTIONNAIRE_AUTOMATION_ID}/actions/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY
      },
      body: JSON.stringify(automationData)
    });

    if (!response.ok) {
      console.error('Questionnaire automation trigger failed:', response.status);
    }

    return response.ok;
  } catch (error) {
    console.error('Questionnaire automation error:', error);
    return false;
  }
}

/**
 * Segment CDP Integration
 */
async function syncToSegment(leadData) {
  if (!process.env.SEGMENT_WRITE_KEY) {
    console.warn('Segment write key not configured');
    return;
  }

  const segmentPayload = {
    userId: leadData.leadId,
    event: 'Lead Form Submit',
    properties: {
      amanda_match_score: leadData.amandaScore,
      amanda_score_tier: leadData.amandaScoreTier,
      business_type: leadData.businessType,
      monthly_revenue: leadData.monthlyRevenue,
      work_hours_daily: leadData.workHoursDaily,
      main_struggle: leadData.mainStruggle,
      source_section: leadData.sourceSection,
      cta_id: leadData.ctaId,
      qualification_result: leadData.qualificationResult,
      form_source: 'landing_page_modal'
    },
    context: {
      ip: leadData.ipAddress,
      userAgent: leadData.userAgent,
      page: {
        url: `${process.env.SITE_URL}`,
        title: 'Mentoria Seja Livre - Landing Page'
      }
    },
    timestamp: leadData.submissionTimestamp
  };

  // Also identify the user
  const identifyPayload = {
    userId: leadData.leadId,
    traits: {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      amanda_match_score: leadData.amandaScore,
      business_type: leadData.businessType,
      source_section: leadData.sourceSection
    },
    context: segmentPayload.context,
    timestamp: leadData.submissionTimestamp
  };

  // Send both identify and track events
  const segmentAuth = Buffer.from(process.env.SEGMENT_WRITE_KEY + ':').toString('base64');
  
  const [identifyResponse, trackResponse] = await Promise.allSettled([
    fetch('https://api.segment.io/v1/identify', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${segmentAuth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(identifyPayload)
    }),
    fetch('https://api.segment.io/v1/track', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${segmentAuth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(segmentPayload)
    })
  ]);

  return {
    identify: identifyResponse.status === 'fulfilled',
    track: trackResponse.status === 'fulfilled'
  };
}

/**
 * GA4 Server Events (Measurement Protocol)
 */
async function sendGA4ServerEvent(leadData) {
  if (!process.env.GA4_MEASUREMENT_ID || !process.env.GA4_API_SECRET) {
    console.warn('GA4 server events not configured');
    return;
  }

  const measurementPayload = {
    client_id: leadData.leadId,
    events: [{
      name: 'lead_form_submit_server',
      params: {
        amanda_match_score: leadData.amandaScore,
        amanda_score_tier: leadData.amandaScoreTier,
        business_type: leadData.businessType,
        source_section: leadData.sourceSection,
        qualification_result: leadData.qualificationResult,
        value: 1,
        currency: 'BRL',
        event_source: 'server_side'
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

  return response.ok;
}

/**
 * Retry webhook with exponential backoff
 */
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
        throw new Error(`Webhook failed after ${maxRetries} attempts: ${response.status} ${response.statusText}`);
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

/**
 * Utility functions
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getAmandaScoreGroup(score) {
  if (score >= 80) return 'amanda_high_priority';
  if (score >= 60) return 'amanda_qualified';
  return 'amanda_nurture';
}

function getQuestionnaireDeadline() {
  const deadline = new Date();
  deadline.setHours(deadline.getHours() + 48);
  return deadline.toISOString();
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}