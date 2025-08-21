/**
 * Questionnaire Submission Processing - Netlify Function
 * 
 * Handles detailed qualification questionnaire with transformation readiness scoring
 * Updates lead records across CRM, MailerLite, and triggers calendar booking access
 * 
 * @author Server/SS-GTM Engineer & Analytics Program Lead
 */

const { v4: uuidv4 } = require('uuid');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const questionnaireData = JSON.parse(event.body);
    
    // Validate questionnaire data
    if (!validateQuestionnaireData(questionnaireData)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Invalid questionnaire data',
          message: 'Required fields are missing'
        })
      };
    }

    // Calculate transformation readiness score
    const transformationScore = calculateTransformationReadiness(questionnaireData);
    
    // Prepare update data
    const updateData = {
      leadId: questionnaireData.leadId,
      questionnaireComplete: true,
      transformationReadiness: transformationScore,
      businessDetails: {
        teamSize: questionnaireData.teamSize,
        currentChallenges: questionnaireData.currentChallenges,
        previousMentoring: questionnaireData.previousMentoring,
        investmentCapacity: questionnaireData.investmentCapacity,
        timeCommitment: questionnaireData.timeCommitment,
        expectedOutcomes: questionnaireData.expectedOutcomes
      },
      responses: questionnaireData.responses,
      completionTimestamp: new Date().toISOString()
    };

    // Update all platforms
    const updatePromises = [
      updateCRMRecord(updateData),
      updateMailerLiteFields(questionnaireData.email, updateData),
      updateSegmentProfile(updateData),
      triggerCalendlyAccess(updateData)
    ];

    const results = await Promise.allSettled(updatePromises);
    
    // Count successful updates
    const successCount = results.filter(r => r.status === 'fulfilled').length;
    console.log(`Questionnaire updates: ${successCount}/${results.length} successful`);

    // Determine next step based on transformation score
    const nextStep = determineNextStep(transformationScore, questionnaireData.amanda_match_score);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        transformationScore,
        nextStep,
        calendlyUrl: nextStep === 'calendar_booking' ? generateCalendlyUrl(questionnaireData.leadId) : null,
        message: 'Questionnaire processed successfully'
      })
    };

  } catch (error) {
    console.error('Questionnaire processing error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Erro ao processar questionário. Tente novamente.'
      })
    };
  }
};

/**
 * Validate questionnaire submission data
 */
function validateQuestionnaireData(data) {
  const required = ['leadId', 'email', 'teamSize', 'currentChallenges', 'timeCommitment'];
  
  for (const field of required) {
    if (!data[field]) {
      console.error(`Missing required questionnaire field: ${field}`);
      return false;
    }
  }
  
  return true;
}

/**
 * Calculate transformation readiness score (0-100)
 */
function calculateTransformationReadiness(data) {
  let score = 0;
  
  // Time commitment readiness (25 points)
  const timeCommitment = parseInt(data.timeCommitment);
  if (timeCommitment >= 5) score += 25;
  else if (timeCommitment >= 3) score += 15;
  else if (timeCommitment >= 1) score += 5;
  
  // Investment readiness (25 points)
  if (data.investmentCapacity === 'ready_now') score += 25;
  else if (data.investmentCapacity === 'ready_soon') score += 15;
  else if (data.investmentCapacity === 'need_info') score += 10;
  
  // Implementation urgency (25 points)
  if (data.urgencyLevel === 'urgent') score += 25;
  else if (data.urgencyLevel === 'high') score += 20;
  else if (data.urgencyLevel === 'medium') score += 10;
  
  // Support system availability (25 points)
  if (data.supportSystem === 'strong') score += 25;
  else if (data.supportSystem === 'moderate') score += 15;
  else if (data.supportSystem === 'limited') score += 5;
  
  // Bonus points for specific indicators
  if (data.previousMentoring === 'successful_experience') score += 10;
  if (data.teamSize >= 3) score += 5;
  if (data.currentChallenges.includes('exhaustion_burnout')) score += 5;
  
  return Math.min(score, 100);
}

/**
 * Update CRM record with questionnaire data
 */
async function updateCRMRecord(updateData) {
  const crmUpdatePayload = {
    external_id: updateData.leadId,
    custom_fields: {
      questionnaire_complete: updateData.questionnaireComplete,
      transformation_readiness_score: updateData.transformationReadiness,
      team_size: updateData.businessDetails.teamSize,
      current_challenges: updateData.businessDetails.currentChallenges.join(','),
      previous_mentoring: updateData.businessDetails.previousMentoring,
      investment_capacity: updateData.businessDetails.investmentCapacity,
      time_commitment_hours: updateData.businessDetails.timeCommitment,
      expected_outcomes: updateData.businessDetails.expectedOutcomes.join(','),
      questionnaire_completion_date: updateData.completionTimestamp
    },
    tags: [
      'questionnaire_complete',
      `transformation_readiness_${getReadinessCategory(updateData.transformationReadiness)}`,
      `investment_${updateData.businessDetails.investmentCapacity}`,
      `team_size_${categorizeTeamSize(updateData.businessDetails.teamSize)}`
    ]
  };

  return await fetch(process.env.CRM_WEBHOOK_URL + '/update', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${process.env.CRM_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(crmUpdatePayload)
  });
}

/**
 * Update MailerLite contact fields
 */
async function updateMailerLiteFields(email, updateData) {
  const mailerliteUpdatePayload = {
    email: email,
    fields: {
      questionnaire_completed: 'yes',
      transformation_readiness: updateData.transformationReadiness,
      team_size: updateData.businessDetails.teamSize,
      investment_capacity: updateData.businessDetails.investmentCapacity,
      time_commitment: updateData.businessDetails.timeCommitment,
      questionnaire_completion_date: updateData.completionTimestamp,
      transformation_stage: 'qualification_complete'
    }
  };

  // Update contact
  const response = await fetch(`https://api.mailerlite.com/api/v2/subscribers/${email}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY
    },
    body: JSON.stringify(mailerliteUpdatePayload)
  });

  // Move to appropriate group based on readiness score
  if (response.ok) {
    const readinessGroup = getReadinessGroup(updateData.transformationReadiness);
    await addToMailerLiteGroup(email, readinessGroup);
  }

  return response;
}

/**
 * Update Segment user profile
 */
async function updateSegmentProfile(updateData) {
  if (!process.env.SEGMENT_WRITE_KEY) return;

  const segmentPayload = {
    userId: updateData.leadId,
    traits: {
      questionnaire_complete: true,
      transformation_readiness_score: updateData.transformationReadiness,
      team_size: updateData.businessDetails.teamSize,
      investment_capacity: updateData.businessDetails.investmentCapacity,
      time_commitment_hours: updateData.businessDetails.timeCommitment,
      transformation_stage: 'qualification_complete'
    },
    timestamp: updateData.completionTimestamp
  };

  const segmentAuth = Buffer.from(process.env.SEGMENT_WRITE_KEY + ':').toString('base64');
  
  return await fetch('https://api.segment.io/v1/identify', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${segmentAuth}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(segmentPayload)
  });
}

/**
 * Trigger Calendly access for qualified leads
 */
async function triggerCalendlyAccess(updateData) {
  // Only trigger for leads with high transformation readiness
  if (updateData.transformationReadiness < 60) {
    console.log(`Lead ${updateData.leadId} not qualified for immediate calendar access (score: ${updateData.transformationReadiness})`);
    return;
  }

  // Here you would integrate with Calendly API or send calendar link
  const calendlyData = {
    leadId: updateData.leadId,
    accessLevel: updateData.transformationReadiness >= 80 ? 'priority' : 'standard',
    calendarUrl: generateCalendlyUrl(updateData.leadId),
    accessGrantedAt: updateData.completionTimestamp
  };

  // For now, just log the calendar access grant
  console.log('Calendar access granted:', calendlyData);
  
  return calendlyData;
}

/**
 * Determine next step in the flow
 */
function determineNextStep(transformationScore, amandaScore) {
  // High readiness and high Amanda score = calendar booking
  if (transformationScore >= 70 && amandaScore >= 70) {
    return 'calendar_booking';
  }
  
  // Medium readiness = additional nurturing
  if (transformationScore >= 50) {
    return 'nurture_sequence';
  }
  
  // Low readiness = educational content
  return 'education_sequence';
}

/**
 * Generate personalized Calendly URL
 */
function generateCalendlyUrl(leadId) {
  const baseUrl = process.env.CALENDLY_URL || 'https://calendly.com/mentoria-seja-livre';
  return `${baseUrl}?lead_id=${leadId}&utm_source=questionnaire`;
}

/**
 * Add contact to MailerLite group
 */
async function addToMailerLiteGroup(email, groupName) {
  try {
    const response = await fetch(`https://api.mailerlite.com/api/v2/groups/${groupName}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY
      },
      body: JSON.stringify({ email: email })
    });

    return response.ok;
  } catch (error) {
    console.error('MailerLite group assignment error:', error);
    return false;
  }
}

/**
 * Utility functions
 */
function getReadinessCategory(score) {
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
}

function getReadinessGroup(score) {
  if (score >= 80) return 'questionnaire_high_readiness';
  if (score >= 60) return 'questionnaire_medium_readiness';
  return 'questionnaire_low_readiness';
}

function categorizeTeamSize(size) {
  if (size === 0) return 'solo';
  if (size <= 2) return 'small';
  if (size <= 5) return 'medium';
  return 'large';
}