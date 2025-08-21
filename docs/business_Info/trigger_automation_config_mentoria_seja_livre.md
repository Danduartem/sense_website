# Trigger & Automation Configuration — Mentoria Seja Livre

**System:** Multi-Channel Automation (Email + WhatsApp)  
**Timezone:** Europe/Lisbon  
**Target Avatar:** Amanda - The Exhausted Achiever  
**Compliance:** GDPR + WhatsApp Business API Requirements  

---

## Core Automation Sequences

### NO-PAY Lead Nurture Sequence

#### Entry Conditions
```json
{
  "sequence_id": "nopay_lead_nurture",
  "entry_event": "lead_form_submit",
  "entry_conditions": [
    {
      "condition": "NOT purchase_success",
      "timeframe": "20_minutes"
    },
    {
      "condition": "email_valid",
      "validation": "true"
    },
    {
      "condition": "amanda_match_score",
      "operator": ">=",
      "value": 40
    }
  ],
  "entry_suppression": [
    "do_not_email",
    "unsubscribed_global",
    "active_customer"
  ]
}
```

#### Email Sequence Timing
```json
{
  "email_steps": [
    {
      "step": 1,
      "asset_id": "nopay.d0p20m.email.nudge",
      "delay": "20_minutes",
      "conditions": ["NOT questionnaire_complete"]
    },
    {
      "step": 2, 
      "asset_id": "nopay.d1.email.value",
      "delay": "1_day",
      "conditions": ["NOT questionnaire_complete", "NOT purchase_success"]
    },
    {
      "step": 3,
      "asset_id": "nopay.d3.email.objections", 
      "delay": "3_days",
      "conditions": ["NOT questionnaire_complete", "NOT purchase_success"]
    },
    {
      "step": 4,
      "asset_id": "nopay.d5.email.case",
      "delay": "5_days", 
      "conditions": ["NOT questionnaire_complete", "NOT purchase_success"]
    },
    {
      "step": 5,
      "asset_id": "nopay.d7.email.last_call",
      "delay": "7_days",
      "conditions": ["NOT questionnaire_complete", "NOT purchase_success"]
    }
  ]
}
```

#### WhatsApp Sequence Timing (Optional - Requires Opt-in)
```json
{
  "whatsapp_steps": [
    {
      "step": 1,
      "template_id": "nopay_d5_case_study_engagement",
      "delay": "5_days",
      "conditions": [
        "whatsapp_opt_in = true",
        "NOT questionnaire_complete",
        "NOT purchase_success"
      ]
    },
    {
      "step": 2,
      "template_id": "nopay_d7_final_opportunity",
      "delay": "7_days",
      "conditions": [
        "whatsapp_opt_in = true", 
        "NOT questionnaire_complete",
        "NOT purchase_success"
      ]
    }
  ]
}
```

#### Exit Conditions
```json
{
  "exit_events": [
    "purchase_success",
    "program_enrollment_complete",
    "questionnaire_complete",
    "unsubscribe_global",
    "unsubscribe_sequence",
    "spam_complaint",
    "email_bounce_hard"
  ],
  "suppression_events": [
    "active_sales_thread",
    "support_ticket_open",
    "consultation_booked_24h"
  ]
}
```

---

### CUSTOMER Onboarding Sequence

#### Entry Conditions
```json
{
  "sequence_id": "customer_onboarding",
  "entry_event": "program_enrollment_complete",
  "entry_conditions": [
    {
      "condition": "payment_success",
      "validation": "true"
    },
    {
      "condition": "trello_access_granted", 
      "validation": "true"
    },
    {
      "condition": "customer_status",
      "value": "active"
    }
  ],
  "entry_suppression": [
    "refund_in_progress",
    "payment_failed",
    "do_not_email"
  ]
}
```

#### Email Sequence Timing
```json
{
  "email_steps": [
    {
      "step": 1,
      "asset_id": "customer.d0.email.welcome",
      "delay": "immediate",
      "priority": "high"
    },
    {
      "step": 2,
      "asset_id": "customer.d1.email.onboarding",
      "delay": "1_day",
      "conditions": ["NOT refund_success"]
    },
    {
      "step": 3,
      "asset_id": "customer.d7.email.progress",
      "delay": "7_days",
      "conditions": ["NOT refund_success", "customer_status = active"]
    }
  ]
}
```

#### WhatsApp Sequence Timing (Utility - Automatic if Phone Provided)
```json
{
  "whatsapp_steps": [
    {
      "step": 1,
      "template_id": "customer_d0_access_delivery",
      "delay": "5_minutes",
      "conditions": [
        "phone_number_provided = true",
        "whatsapp_opt_in = true"
      ],
      "priority": "high"
    },
    {
      "step": 2,
      "template_id": "customer_d3_progress_checkin", 
      "delay": "3_days",
      "conditions": ["NOT refund_success"]
    },
    {
      "step": 3,
      "template_id": "customer_d7_milestone_celebration",
      "delay": "7_days",
      "conditions": ["NOT refund_success", "module_1_1_accessed = true"]
    }
  ]
}
```

#### Exit Conditions
```json
{
  "exit_events": [
    "refund_success",
    "account_cancelled",
    "unsubscribe_global",
    "customer_status_inactive"
  ],
  "suppression_events": [
    "support_ticket_critical",
    "payment_dispute_open"
  ]
}
```

---

## Timing & Scheduling Configuration

### Europe/Lisbon Timezone Compliance

#### Quiet Hours Enforcement
```json
{
  "quiet_hours": {
    "timezone": "Europe/Lisbon",
    "daily_quiet": {
      "start": "21:00",
      "end": "09:00"
    },
    "weekend_quiet": {
      "saturday": {
        "whatsapp_marketing": "no_send",
        "whatsapp_utility": "allow",
        "email": "allow"
      },
      "sunday": {
        "whatsapp_marketing": "no_send", 
        "whatsapp_utility": "allow",
        "email": "allow"
      }
    },
    "delivery_window": "09:00-18:00"
  }
}
```

#### Daylight Saving Time Handling
```json
{
  "dst_configuration": {
    "auto_adjust": true,
    "reference_timezone": "Europe/Lisbon",
    "dst_period": "last_sunday_march_to_last_sunday_october",
    "non_dst_offset": "UTC+0",
    "dst_offset": "UTC+1"
  }
}
```

#### Send Time Optimization
```json
{
  "optimal_send_times": {
    "email": {
      "weekday": ["09:00", "14:00", "19:00"],
      "saturday": ["10:00", "15:00"],
      "sunday": ["19:00"]
    },
    "whatsapp_utility": {
      "weekday": ["09:00", "12:00", "17:00"],
      "weekend": ["10:00", "16:00"]  
    },
    "whatsapp_marketing": {
      "weekday": ["10:00", "19:00"],
      "weekend": "no_send"
    }
  }
}
```

---

## Suppression & Anti-Spam Rules

### Global Suppression List
```json
{
  "global_suppressions": [
    {
      "type": "unsubscribe_global",
      "applies_to": ["email", "whatsapp"],
      "permanent": true
    },
    {
      "type": "spam_complaint",
      "applies_to": ["email"],
      "duration": "permanent"
    },
    {
      "type": "hard_bounce",
      "applies_to": ["email"], 
      "auto_suppress": true
    },
    {
      "type": "whatsapp_block",
      "applies_to": ["whatsapp"],
      "permanent": true
    }
  ]
}
```

### Sequence-Specific Suppressions
```json
{
  "nopay_suppressions": [
    {
      "event": "active_sales_thread",
      "pause_duration": "48_hours",
      "resume_condition": "thread_resolved"
    },
    {
      "event": "consultation_booked",
      "pause_duration": "72_hours", 
      "resume_condition": "consultation_completed"
    },
    {
      "event": "questionnaire_complete",
      "exit_sequence": true,
      "transition_to": "consultation_sequence"
    }
  ],
  "customer_suppressions": [
    {
      "event": "support_ticket_critical",
      "pause_duration": "24_hours",
      "resume_condition": "ticket_resolved"
    },
    {
      "event": "payment_dispute",
      "pause_duration": "until_resolved"
    },
    {
      "event": "refund_request", 
      "exit_sequence": true,
      "transition_to": "refund_sequence"
    }
  ]
}
```

### Frequency Caps
```json
{
  "frequency_limits": {
    "email": {
      "max_per_day": 2,
      "max_per_week": 8,
      "minimum_gap": "4_hours"
    },
    "whatsapp_utility": {
      "max_per_day": 3,
      "max_per_week": 10,
      "minimum_gap": "2_hours"
    },
    "whatsapp_marketing": {
      "max_per_day": 1,
      "max_per_week": 3,
      "minimum_gap": "24_hours"
    }
  }
}
```

---

## Event-Driven Triggers

### Lead Behavior Triggers

#### Engagement-Based Actions
```json
{
  "high_engagement_triggers": [
    {
      "trigger": "email_multiple_opens",
      "threshold": "3_opens_in_24h",
      "action": "tag_as_hot_lead",
      "alert_sales_team": true
    },
    {
      "trigger": "whatsapp_quick_response", 
      "threshold": "response_within_15min",
      "action": "priority_queue_sales",
      "escalation": "immediate"
    },
    {
      "trigger": "multiple_link_clicks",
      "threshold": "3_clicks_same_session",
      "action": "trigger_consultation_offer",
      "sequence": "hot_lead_acceleration"
    }
  ]
}
```

#### Drop-off Alert Triggers
```json
{
  "dropout_triggers": [
    {
      "trigger": "modal_abandon",
      "conditions": ["amanda_score > 80", "time_in_modal > 60s"],
      "action": "immediate_sales_alert",
      "followup": "personal_email_24h"
    },
    {
      "trigger": "questionnaire_email_no_click",
      "timeframe": "48_hours",
      "action": "sales_team_notification", 
      "priority": "medium"
    },
    {
      "trigger": "sequence_abandon_step_3",
      "conditions": ["amanda_score > 60"],
      "action": "trigger_phone_call_attempt",
      "timing": "next_business_day"
    }
  ]
}
```

### Customer Success Triggers

#### Activation Milestones
```json
{
  "activation_triggers": [
    {
      "milestone": "trello_board_access",
      "timeframe": "within_2_hours",
      "success_action": "tag_as_activated",
      "failure_action": "tech_support_alert"
    },
    {
      "milestone": "module_1_1_completion",
      "timeframe": "within_1_week", 
      "success_action": "celebration_message",
      "failure_action": "engagement_support_sequence"
    },
    {
      "milestone": "first_whatsapp_response",
      "timeframe": "within_48_hours",
      "success_action": "tag_as_engaged",
      "celebration": "personal_mentor_message"
    }
  ]
}
```

#### Risk Detection Triggers
```json
{
  "risk_triggers": [
    {
      "risk": "no_engagement_7_days",
      "conditions": ["no_email_opens", "no_whatsapp_response", "no_trello_access"],
      "action": "at_risk_sequence",
      "escalation": "mentor_personal_outreach"
    },
    {
      "risk": "support_ticket_multiple",
      "threshold": "3_tickets_in_week",
      "action": "account_review",
      "priority": "high"
    }
  ]
}
```

---

## Cross-Platform Integration

### CRM Synchronization
```json
{
  "crm_sync_rules": [
    {
      "event": "email_sent",
      "sync_fields": ["template_id", "send_timestamp", "delivery_status"],
      "webhook_endpoint": "/api/crm/email-activity"
    },
    {
      "event": "whatsapp_delivered",
      "sync_fields": ["template_id", "delivery_timestamp", "response_received"],
      "webhook_endpoint": "/api/crm/whatsapp-activity" 
    },
    {
      "event": "sequence_completion",
      "sync_fields": ["sequence_id", "completion_rate", "next_action"],
      "webhook_endpoint": "/api/crm/sequence-complete"
    }
  ]
}
```

### Analytics Event Mapping
```json
{
  "analytics_events": [
    {
      "trigger": "sequence_entry",
      "ga4_event": "sequence_start",
      "parameters": ["sequence_type", "lead_source", "amanda_score"]
    },
    {
      "trigger": "email_open",
      "ga4_event": "email_engagement", 
      "parameters": ["email_template", "open_count", "device_type"]
    },
    {
      "trigger": "whatsapp_response",
      "ga4_event": "whatsapp_engagement",
      "parameters": ["template_id", "response_type", "response_speed"]
    },
    {
      "trigger": "sequence_exit",
      "ga4_event": "sequence_complete",
      "parameters": ["exit_reason", "completion_rate", "conversion_outcome"]
    }
  ]
}
```

### Identity Resolution
```json
{
  "identity_mapping": [
    {
      "event": "lead_form_submit",
      "identity_action": "create_lead_id",
      "cross_platform_sync": ["email", "whatsapp", "crm", "analytics"]
    },
    {
      "event": "program_enrollment_complete",
      "identity_action": "promote_to_user_id",
      "maintain_lead_id": true,
      "update_platforms": ["all"]
    },
    {
      "event": "whatsapp_opt_in",
      "identity_action": "add_channel_preference",
      "sync_to": ["crm", "automation_platform"]
    }
  ]
}
```

---

## Testing & Validation Framework

### Staging Environment
```json
{
  "staging_config": {
    "test_mode": true,
    "email_override": "test@mentoriasejalivre.com.br",
    "whatsapp_override": "+351999999999",
    "accelerated_timing": {
      "1_day": "5_minutes",
      "3_days": "15_minutes", 
      "7_days": "30_minutes"
    },
    "webhook_testing": true
  }
}
```

### Production Validation
```json
{
  "validation_checks": [
    {
      "check": "timezone_accuracy",
      "test": "send_time_matches_lisbon_timezone"
    },
    {
      "check": "suppression_enforcement",
      "test": "unsubscribed_contacts_not_messaged"
    },
    {
      "check": "sequence_logic",
      "test": "exit_conditions_properly_terminate"
    },
    {
      "check": "cross_platform_sync",
      "test": "events_appear_in_all_destinations"
    }
  ]
}
```

### Performance Monitoring
```json
{
  "monitoring_thresholds": {
    "email_delivery_rate": ">95%",
    "whatsapp_delivery_rate": ">90%",
    "sequence_completion_rate": ">80%",
    "webhook_success_rate": ">99%",
    "timezone_accuracy": "100%",
    "suppression_compliance": "100%"
  }
}
```

---

## Implementation Priority

### Phase 1: Core Email Automation (Week 1-2)
1. NO-PAY email sequence with basic timing
2. CUSTOMER email sequence with welcome flow
3. Basic suppression rules (unsubscribe, bounce)
4. Europe/Lisbon timezone configuration

### Phase 2: WhatsApp Integration (Week 3-4)  
1. CUSTOMER utility templates (immediate access)
2. Opt-in consent mechanism on landing page
3. Template approval and BSP configuration
4. Cross-platform identity sync

### Phase 3: Advanced Logic (Week 5-6)
1. NO-PAY WhatsApp marketing templates
2. Engagement-based triggers and alerts
3. Drop-off detection and sales team notifications
4. Advanced suppression and frequency caps

### Phase 4: Optimization (Week 7-8)
1. A/B testing framework for timing
2. Performance monitoring and alerting
3. Analytics event tracking validation
4. Customer success milestone automation

---

*This trigger configuration was created by the Messaging Program Lead system to provide complete automation logic for both NO-PAY and CUSTOMER sequences with full compliance and cross-platform integration.*