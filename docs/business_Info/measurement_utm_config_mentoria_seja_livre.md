# Measurement & UTM Configuration — Mentoria Seja Livre

**Measurement Framework:** Aligned with Define Phase v1B  
**Event Naming:** snake_case convention throughout  
**Identity Management:** lead_id → user_id progression  
**Cross-Platform:** GA4, Segment, CRM, MailerLite integration  

---

## UTM Parameter Conventions

### Standard UTM Structure (snake_case aligned)
```json
{
  "utm_parameter_structure": {
    "utm_source": "email|whatsapp|landing_page",
    "utm_medium": "automation|manual|organic",
    "utm_campaign": "nopay|customer|acquisition",
    "utm_content": "<asset_id_snake_case>",
    "utm_term": "optional_keyword_targeting"
  }
}
```

### NO-PAY Sequence UTM Mapping
```json
{
  "nopay_utm_conventions": [
    {
      "asset_id": "nopay.d0p20m.email.nudge",
      "utm_source": "email",
      "utm_medium": "automation",
      "utm_campaign": "nopay",
      "utm_content": "d0p20m_nudge",
      "primary_cta": "questionnaire_completion"
    },
    {
      "asset_id": "nopay.d1.email.value",
      "utm_source": "email", 
      "utm_medium": "automation",
      "utm_campaign": "nopay",
      "utm_content": "d1_value_mindset",
      "primary_cta": "questionnaire_completion"
    },
    {
      "asset_id": "nopay.d3.email.objections",
      "utm_source": "email",
      "utm_medium": "automation", 
      "utm_campaign": "nopay",
      "utm_content": "d3_objection_handling",
      "primary_cta": "questionnaire_completion"
    },
    {
      "asset_id": "nopay.d5.email.case",
      "utm_source": "email",
      "utm_medium": "automation",
      "utm_campaign": "nopay", 
      "utm_content": "d5_rita_case_study",
      "primary_cta": "questionnaire_completion"
    },
    {
      "asset_id": "nopay.d7.email.last_call",
      "utm_source": "email",
      "utm_medium": "automation",
      "utm_campaign": "nopay",
      "utm_content": "d7_final_urgency",
      "primary_cta": "questionnaire_completion"
    }
  ]
}
```

### CUSTOMER Sequence UTM Mapping
```json
{
  "customer_utm_conventions": [
    {
      "asset_id": "customer.d0.email.welcome",
      "utm_source": "email",
      "utm_medium": "automation",
      "utm_campaign": "customer",
      "utm_content": "d0_welcome_onboarding",
      "primary_cta": "trello_board_access"
    },
    {
      "asset_id": "customer.d1.email.onboarding", 
      "utm_source": "email",
      "utm_medium": "automation",
      "utm_campaign": "customer",
      "utm_content": "d1_module_guidance",
      "primary_cta": "module_1_1_start"
    },
    {
      "asset_id": "customer.d7.email.progress",
      "utm_source": "email",
      "utm_medium": "automation", 
      "utm_campaign": "customer",
      "utm_content": "d7_progress_assessment",
      "primary_cta": "module_1_4_access"
    }
  ]
}
```

### WhatsApp UTM Mapping
```json
{
  "whatsapp_utm_conventions": [
    {
      "template_id": "customer_d0_access_delivery",
      "utm_source": "whatsapp",
      "utm_medium": "automation",
      "utm_campaign": "customer", 
      "utm_content": "d0_access_delivery",
      "category": "utility"
    },
    {
      "template_id": "customer_d3_progress_checkin",
      "utm_source": "whatsapp",
      "utm_medium": "automation",
      "utm_campaign": "customer",
      "utm_content": "d3_progress_checkin",
      "category": "utility"
    },
    {
      "template_id": "nopay_d5_case_study_engagement",
      "utm_source": "whatsapp", 
      "utm_medium": "automation",
      "utm_campaign": "nopay",
      "utm_content": "d5_case_study_whatsapp",
      "category": "marketing"
    },
    {
      "template_id": "nopay_d7_final_opportunity",
      "utm_source": "whatsapp",
      "utm_medium": "automation",
      "utm_campaign": "nopay",
      "utm_content": "d7_final_whatsapp", 
      "category": "marketing"
    }
  ]
}
```

---

## Event Dictionary (snake_case naming)

### Email Engagement Events
```json
{
  "email_message_sent": {
    "description": "Email automation message delivered to recipient",
    "required_parameters": [
      "email_template_id",
      "recipient_lead_id", 
      "sequence_type",
      "send_timestamp"
    ],
    "optional_parameters": [
      "amanda_match_score",
      "delivery_provider",
      "timezone_offset"
    ],
    "destinations": ["ga4", "segment", "crm", "mailerlite"],
    "measurement_alignment": "messaging_engagement_tracking"
  },
  
  "email_message_open": {
    "description": "Email opened by recipient (tracking pixel fired)",
    "required_parameters": [
      "email_template_id",
      "recipient_lead_id",
      "open_timestamp",
      "open_count"
    ],
    "optional_parameters": [
      "device_type",
      "email_client",
      "location_country"
    ],
    "destinations": ["ga4", "segment", "crm"],
    "measurement_alignment": "content_engagement_tracking"
  },
  
  "email_link_click": {
    "description": "Link clicked within email content",
    "required_parameters": [
      "email_template_id",
      "link_url",
      "utm_parameters",
      "recipient_lead_id"
    ],
    "optional_parameters": [
      "link_position",
      "cta_type",
      "click_timestamp"
    ],
    "destinations": ["ga4", "segment", "crm"],
    "conversion_event": true
  }
}
```

### WhatsApp Engagement Events
```json
{
  "whatsapp_message_sent": {
    "description": "WhatsApp template message delivered via Business API",
    "required_parameters": [
      "template_id", 
      "recipient_lead_id",
      "message_type",
      "delivery_status"
    ],
    "optional_parameters": [
      "delivery_timestamp",
      "template_language",
      "opt_in_consent_timestamp"
    ],
    "destinations": ["segment", "crm"],
    "compliance_required": "gdpr_consent_validation"
  },
  
  "whatsapp_message_read": {
    "description": "WhatsApp message read receipt received",
    "required_parameters": [
      "template_id",
      "recipient_lead_id", 
      "read_timestamp"
    ],
    "destinations": ["segment", "crm"],
    "engagement_indicator": "high_value"
  },
  
  "whatsapp_link_click": {
    "description": "URL button or link clicked in WhatsApp message",
    "required_parameters": [
      "template_id",
      "link_url",
      "utm_parameters",
      "recipient_lead_id"
    ],
    "destinations": ["ga4", "segment", "crm"],
    "conversion_event": true
  },
  
  "whatsapp_response_received": {
    "description": "User replies to WhatsApp automation message",
    "required_parameters": [
      "original_template_id",
      "response_content",
      "recipient_lead_id",
      "response_type"
    ],
    "optional_parameters": [
      "response_sentiment",
      "requires_human_intervention"
    ],
    "destinations": ["segment", "crm"],
    "high_value_engagement": true
  }
}
```

### Conversion & Journey Events
```json
{
  "questionnaire_email_click": {
    "description": "User clicks questionnaire link from email automation",
    "required_parameters": [
      "source_email_template",
      "questionnaire_url",
      "recipient_lead_id",
      "time_since_email_sent"
    ],
    "destinations": ["ga4", "segment", "crm"],
    "conversion_event": true,
    "measurement_alignment": "lead_progression_tracking"
  },
  
  "sequence_completion": {
    "description": "User completes entire email/WhatsApp sequence",
    "required_parameters": [
      "sequence_type",
      "completion_rate",
      "final_action_taken",
      "recipient_lead_id"
    ],
    "optional_parameters": [
      "time_to_complete",
      "engagement_score",
      "conversion_outcome"
    ],
    "destinations": ["ga4", "segment", "crm"],
    "measurement_alignment": "sequence_effectiveness_tracking"
  },
  
  "automation_exit": {
    "description": "User exits automation sequence via trigger event",
    "required_parameters": [
      "sequence_type",
      "exit_reason",
      "exit_step",
      "recipient_lead_id"
    ],
    "optional_parameters": [
      "conversion_achieved",
      "manual_intervention_required"
    ],
    "destinations": ["segment", "crm"],
    "measurement_alignment": "dropout_analysis_tracking"
  }
}
```

### Customer Success Events
```json
{
  "trello_board_access": {
    "description": "Customer successfully accesses mentoring program Trello board", 
    "required_parameters": [
      "user_id",
      "board_access_timestamp",
      "access_source"
    ],
    "optional_parameters": [
      "time_since_enrollment",
      "device_type"
    ],
    "destinations": ["ga4", "segment", "crm"],
    "success_milestone": true
  },
  
  "module_content_access": {
    "description": "Customer accesses specific module content in program",
    "required_parameters": [
      "user_id",
      "module_id", 
      "content_type",
      "access_timestamp"
    ],
    "optional_parameters": [
      "time_spent",
      "completion_status"
    ],
    "destinations": ["segment", "crm"],
    "engagement_tracking": true
  },
  
  "mentor_whatsapp_contact": {
    "description": "Customer initiates WhatsApp contact with mentor",
    "required_parameters": [
      "user_id",
      "contact_source",
      "message_type",
      "contact_timestamp"
    ],
    "destinations": ["segment", "crm"],
    "high_value_engagement": true
  }
}
```

---

## Landing Page Expected Events

### Modal & Form Events (from Landing Page Strategy)
```json
{
  "expected_landing_events": [
    {
      "event": "modal_open",
      "utm_source_expected": "email|whatsapp", 
      "utm_campaign_expected": "nopay|customer",
      "measurement_purpose": "attribution_tracking"
    },
    {
      "event": "lead_form_submit", 
      "triggers_sequence": "nopay_lead_nurture",
      "identity_creation": "lead_id_generated",
      "measurement_purpose": "conversion_tracking"
    },
    {
      "event": "thank_you_page_view",
      "expected_utm_passthrough": true,
      "triggers_email": "questionnaire_delivery",
      "measurement_purpose": "funnel_tracking"  
    }
  ]
}
```

### Cross-Channel Attribution
```json
{
  "attribution_logic": [
    {
      "touchpoint": "email_automation_click",
      "attribution_weight": "last_click",
      "overrides": ["direct_landing_page_access"],
      "measurement_window": "30_days"
    },
    {
      "touchpoint": "whatsapp_link_click", 
      "attribution_weight": "last_click",
      "overrides": ["email_automation_click"],
      "measurement_window": "7_days"
    },
    {
      "touchpoint": "organic_landing_page",
      "attribution_weight": "first_touch",
      "maintained_throughout": "customer_journey"
    }
  ]
}
```

---

## Identity Management & Progression

### Lead ID to User ID Mapping
```json
{
  "identity_progression": {
    "lead_creation": {
      "trigger": "lead_form_submit",
      "identifier": "lead_id",
      "format": "uuid_v4",
      "persistence": "365_days"
    },
    "user_promotion": {
      "trigger": "program_enrollment_complete", 
      "identifier": "user_id",
      "maintains": "lead_id_reference",
      "persistence": "lifetime"
    },
    "cross_platform_sync": {
      "mailerlite": "custom_field_lead_id",
      "crm": "external_id_mapping",
      "segment": "user_traits_object",
      "ga4": "user_id_dimension"
    }
  }
}
```

### Identity Resolution Logic
```javascript
// Identity Management Functions for Messaging
function getOrCreateIdentity(email, phone = null) {
  let leadId = getCookie('mslu_lead_id');
  let userId = getCookie('mslu_user_id');
  
  // Check if user is already customer
  if (userId) {
    return {
      type: 'user',
      id: userId,
      lead_id: leadId, // Maintain reference
      sequence_eligibility: 'customer_only'
    };
  }
  
  // Check if lead exists
  if (leadId) {
    return {
      type: 'lead',
      id: leadId,
      sequence_eligibility: 'nopay_eligible'  
    };
  }
  
  // Create new lead identity
  leadId = generateUUID();
  setCookie('mslu_lead_id', leadId);
  
  return {
    type: 'lead',
    id: leadId,
    sequence_eligibility: 'nopay_eligible',
    created: new Date().toISOString()
  };
}

// Promote lead to customer
function promoteToCustomer(leadId, transactionData) {
  const userId = generateUUID();
  setCookie('mslu_user_id', userId);
  
  // Maintain lead_id reference for attribution
  const identityMapping = {
    user_id: userId,
    lead_id: leadId,
    promotion_timestamp: new Date().toISOString(),
    transaction_id: transactionData.transactionId
  };
  
  // Sync to all platforms
  syncIdentityToPlatforms(identityMapping);
  
  return userId;
}
```

---

## Measurement Index by Asset

### Email Assets Measurement Map
```json
{
  "email_measurement_index": [
    {
      "asset_id": "nopay.d0p20m.email.nudge",
      "primary_cta_url": "questionnaire_url",
      "expected_events": [
        "email_message_sent",
        "email_message_open", 
        "email_link_click",
        "questionnaire_email_click"
      ],
      "conversion_goal": "questionnaire_completion",
      "success_metric": "click_to_complete_rate"
    },
    {
      "asset_id": "customer.d0.email.welcome",
      "primary_cta_url": "trello_board_url",
      "expected_events": [
        "email_message_sent",
        "email_message_open",
        "trello_board_access", 
        "mentor_whatsapp_contact"
      ],
      "conversion_goal": "program_activation",
      "success_metric": "board_access_within_24h"
    }
  ]
}
```

### WhatsApp Assets Measurement Map
```json
{
  "whatsapp_measurement_index": [
    {
      "template_id": "customer_d0_access_delivery",
      "primary_cta_url": "trello_board_url",
      "expected_events": [
        "whatsapp_message_sent",
        "whatsapp_message_read",
        "whatsapp_link_click",
        "trello_board_access"
      ],
      "conversion_goal": "immediate_activation",
      "success_metric": "click_to_access_rate"
    },
    {
      "template_id": "nopay_d5_case_study_engagement", 
      "primary_cta_url": "questionnaire_url",
      "expected_events": [
        "whatsapp_message_sent",
        "whatsapp_link_click",
        "questionnaire_email_click"
      ],
      "conversion_goal": "questionnaire_completion", 
      "success_metric": "whatsapp_to_questionnaire_rate"
    }
  ]
}
```

---

## Analytics Configuration

### Google Analytics 4 Integration
```json
{
  "ga4_configuration": {
    "custom_dimensions": [
      {
        "parameter_name": "email_template_id",
        "display_name": "Email Template", 
        "scope": "event"
      },
      {
        "parameter_name": "sequence_type",
        "display_name": "Automation Sequence",
        "scope": "event"
      },
      {
        "parameter_name": "amanda_match_score", 
        "display_name": "Amanda Avatar Score",
        "scope": "user"
      },
      {
        "parameter_name": "whatsapp_template_id",
        "display_name": "WhatsApp Template",
        "scope": "event"
      }
    ],
    "conversion_events": [
      "email_link_click",
      "whatsapp_link_click", 
      "questionnaire_email_click",
      "trello_board_access",
      "sequence_completion"
    ],
    "audience_definitions": [
      {
        "name": "Email Engaged Users",
        "conditions": ["email_message_open > 0", "days_since_last_email_open <= 30"]
      },
      {
        "name": "WhatsApp Responsive Users",
        "conditions": ["whatsapp_response_received > 0"]
      }
    ]
  }
}
```

### Segment CDP Configuration
```json
{
  "segment_configuration": {
    "track_events": "all_messaging_events",
    "identify_traits": [
      "email_engagement_score",
      "whatsapp_opt_in_status",
      "sequence_completion_rate",
      "amanda_match_score",
      "customer_activation_status"
    ],
    "destinations": {
      "google_analytics": "enabled",
      "facebook_conversions": "enabled", 
      "custom_crm_webhook": "enabled",
      "data_warehouse": "enabled"
    }
  }
}
```

---

## Performance Monitoring

### Key Performance Indicators
```json
{
  "messaging_kpis": {
    "email_performance": {
      "delivery_rate": {
        "target": ">95%",
        "measurement": "emails_delivered / emails_sent"
      },
      "open_rate": {
        "target_nopay": ">25%",
        "target_customer": ">40%",
        "measurement": "unique_opens / emails_delivered"
      },
      "click_rate": {
        "target": ">5%", 
        "measurement": "unique_clicks / emails_delivered"
      }
    },
    "whatsapp_performance": {
      "delivery_rate": {
        "target": ">90%",
        "measurement": "messages_delivered / messages_sent"
      },
      "read_rate": {
        "target": ">70%",
        "measurement": "messages_read / messages_delivered"
      },
      "response_rate": {
        "target_utility": ">60%",
        "target_marketing": ">20%",
        "measurement": "responses_received / messages_delivered"
      }
    }
  }
}
```

### Attribution Success Metrics
```json
{
  "attribution_kpis": {
    "cross_platform_tracking": {
      "identity_resolution_rate": {
        "target": ">95%",
        "measurement": "successful_identity_matches / total_interactions"
      },
      "utm_parameter_accuracy": {
        "target": ">98%",
        "measurement": "links_with_correct_utm / total_links_sent"
      },
      "conversion_attribution": {
        "target": ">90%",
        "measurement": "conversions_with_clear_source / total_conversions"
      }
    }
  }
}
```

---

## Implementation Checklist

### Technical Setup Validation
- [ ] **UTM Parameters:** All email/WhatsApp links include proper UTM structure
- [ ] **Event Naming:** All events follow snake_case convention from Define v1B
- [ ] **Identity Mapping:** lead_id to user_id progression working correctly
- [ ] **Cross-Platform Sync:** Events appearing in GA4, Segment, CRM consistently
- [ ] **Landing Page Integration:** Expected events firing from email/WhatsApp traffic

### Measurement Validation
- [ ] **Attribution Logic:** First-touch and last-click attribution working properly
- [ ] **Conversion Tracking:** Email clicks leading to landing page conversions
- [ ] **Funnel Analysis:** Complete journey from email send to final conversion
- [ ] **Segmentation:** Amanda avatar scoring integrated across all platforms
- [ ] **Performance Metrics:** All KPI calculations producing expected ranges

### Compliance Validation  
- [ ] **GDPR Requirements:** Consent tracking and data retention policies implemented
- [ ] **Privacy Controls:** User opt-out mechanisms tested and functional
- [ ] **Data Security:** All PII properly encrypted and access-controlled
- [ ] **Audit Trail:** Complete measurement logging for compliance verification

---

*This measurement configuration ensures perfect alignment between messaging automation and Define Phase v1B specifications, enabling comprehensive tracking of Amanda - The Exhausted Achiever's journey from lead to customer transformation.*