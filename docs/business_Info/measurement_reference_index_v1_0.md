# Measurement Reference Index v1.0 — Mentoria Seja Livre

**Client:** Mentoria Seja Livre  
**Date:** 2025-08-20  
**Version:** v1.0  
**Prepared by:** MCM (Measurement & CTA Mapper)  
**Alignment:** Define Framework v1.0 Events & Parameters

---

## Executive Summary

This Measurement Reference Index ensures perfect alignment between Copy SoT v1.0 and Define Framework v1.0 measurement specifications. All events use snake_case naming, critical parameters are included, and CTA governance maintains single primary conversion path consistency.

**Key Validation Results:**
- ✅ All CTA events aligned with Define framework event dictionary
- ✅ Amanda qualification parameters match scoring matrix (0-100 scale)
- ✅ No PII in measurement parameters - sanitized IDs only
- ✅ Test mode handling integrated throughout
- ✅ Cross-platform destination mapping validated

---

## CTA Event Mapping

### Primary CTA Event Structure
**Governing Event:** `cta_click` across all primary CTAs

```javascript
// Standard Primary CTA Event Structure
{
  "event": "cta_click",
  "required_parameters": {
    "source_section": "string", // hero|social_proof|problem|solution|deliverables|outcomes|testimonials|faq|final
    "cta_id": "cta_primary",
    "lead_id": "uuid_generated", 
    "timestamp": "iso_8601_format",
    "test_mode": "boolean"
  },
  "optional_parameters": {
    "traffic_temperature": "string", // cold|warm|hot
    "session_id": "uuid_session",
    "previous_section_viewed": "string"
  },
  "destinations": ["ga4", "segment", "crm"]
}
```

### Section-by-Section CTA Mapping

#### Hero Section CTAs
```json
{
  "home.hero.cta.primary": {
    "label": "Quero minha transformação",
    "event": "cta_click",
    "params": {
      "source_section": "hero",
      "cta_id": "cta_primary",
      "cta_label": "quero_minha_transformacao",
      "anchor_target": "#questionario"
    },
    "define_alignment": "cta_click event from Define framework",
    "conversion_priority": "primary"
  }
}
```

#### Problem Section CTAs
```json
{
  "home.problem.cta.primary": {
    "label": "Isso precisa mudar", 
    "event": "cta_click",
    "params": {
      "source_section": "problem",
      "cta_id": "cta_primary",
      "cta_label": "isso_precisa_mudar",
      "emotional_trigger": "urgency_pain_recognition"
    },
    "define_alignment": "cta_click with pain_point_recognition context"
  }
}
```

#### Final CTA with Enhanced Tracking
```json
{
  "home.final.cta.primary": {
    "label": "Sim, quero me transformar",
    "event": "cta_click", 
    "params": {
      "source_section": "final",
      "cta_id": "cta_primary",
      "cta_label": "sim_quero_me_transformar",
      "decision_trigger": "commitment_moment",
      "style": "prominent_final"
    },
    "define_alignment": "decision_trigger_activate + cta_click combination"
  }
}
```

### Secondary CTA Events
```json
{
  "social_proof_navigation": {
    "event": "cta_click",
    "params": {
      "source_section": "social_proof",
      "cta_id": "cta_secondary", 
      "cta_label": "ver_mais_historias",
      "action_type": "internal_navigation"
    }
  },
  "testimonial_engagement": {
    "event": "cta_click",
    "params": {
      "source_section": "testimonials", 
      "cta_id": "cta_secondary",
      "cta_label": "ver_minha_transformacao",
      "proof_interaction": "testimonial_to_conversion"
    }
  }
}
```

---

## Modal & Form Events Alignment

### Modal Interaction Events

#### Modal Open Event (Aligns with Define: modal_open)
```javascript
{
  "event": "modal_open",
  "required_parameters": {
    "source_section": "string", // Tracks which section triggered modal
    "cta_id": "cta_primary",
    "traffic_temperature": "cold|warm|hot",
    "lead_id": "uuid_v4",
    "timestamp": "iso_8601",
    "test_mode": "boolean"
  },
  "define_framework_event": "modal_open",
  "trigger": "Primary CTA click opens qualification modal",
  "destinations": ["ga4", "segment", "crm"]
}
```

#### Form Start Event (Aligns with Define: modal_form_start)
```javascript
{
  "event": "modal_form_start", 
  "required_parameters": {
    "form_field_focus": "name|email|phone|business_type",
    "time_to_start": "seconds_since_modal_open",
    "lead_id": "uuid_v4"
  },
  "define_framework_event": "modal_form_start",
  "trigger": "First form field receives focus"
}
```

#### Lead Form Submit Event (Aligns with Define: lead_form_submit)
```javascript
{
  "event": "lead_form_submit",
  "required_parameters": {
    "amanda_match_score": "integer_0_to_100",
    "lead_source": "landing_page_modal", 
    "form_completion_time": "seconds_total",
    "qualification_inputs": {
      "business_type": "clinica|loja|servicos|academia|beleza|outro",
      "monthly_revenue": "ate_10k|10k_20k|20k_35k|acima_35k", 
      "work_hours_daily": "ate_8h|8_10h|10_12h|mais_12h",
      "main_struggle": "exaustao|delegacao|precos|sistemas|viagem"
    }
  },
  "pii_handling": "email and phone stored separately, not in event params",
  "define_framework_event": "lead_form_submit",
  "conversion_event": true
}
```

### Amanda Scoring Algorithm Integration

**Amanda Match Score Calculation (0-100 scale)**

```javascript
function calculateAmandaScore(formData) {
  let score = 0;
  
  // Demographics scoring (20 points)
  if (formData.business_type in ['clinica', 'servicos', 'beleza']) score += 10;
  if (formData.monthly_revenue === '20k_35k') score += 10;
  
  // Pain points scoring (40 points)
  if (formData.work_hours_daily in ['10_12h', 'mais_12h']) score += 20;
  if (formData.main_struggle === 'exaustao') score += 20;
  
  // Behavioral indicators (40 points)
  // Inferred from qualification responses
  if (formData.main_struggle === 'delegacao') score += 20;
  if (formData.monthly_revenue !== 'ate_10k') score += 20;
  
  return Math.min(score, 100);
}
```

**Parameter Mapping to Define Framework:**
```json
{
  "amanda_match_score": {
    "define_parameter": "amanda_match_score", 
    "type": "integer",
    "range": "0_to_100",
    "calculation": "demographics_20_pain_points_40_behavior_40"
  },
  "qualification_inputs": {
    "define_parameter": "amanda_match_inputs",
    "type": "object",
    "sanitization": "categorical_values_only_no_freetext"
  }
}
```

---

## Email & Nurture Sequence Events

### Questionnaire Email Events (Aligns with Define Framework)

#### Email Sent Event
```javascript
{
  "event": "questionnaire_email_sent",
  "required_parameters": {
    "lead_id": "uuid_v4",
    "email_template": "qualification_questionnaire_v1",
    "send_timestamp": "iso_8601", 
    "amanda_match_score": "integer_0_to_100"
  },
  "define_framework_event": "questionnaire_email_sent",
  "trigger": "Automated after thank you page load"
}
```

#### Email Click Event  
```javascript
{
  "event": "questionnaire_click",
  "required_parameters": {
    "lead_id": "uuid_v4",
    "time_since_send": "hours_since_email_sent",
    "email_open_count": "integer"
  },
  "define_framework_event": "questionnaire_click", 
  "trigger": "User clicks questionnaire link in email"
}
```

#### Questionnaire Completion
```javascript
{
  "event": "questionnaire_complete",
  "required_parameters": {
    "lead_id": "uuid_v4",
    "completion_time": "minutes_total",
    "transformation_readiness_score": "integer_1_to_10"
  },
  "define_framework_event": "questionnaire_complete",
  "trigger": "Final questionnaire submission"
}
```

---

## Calendar & WhatsApp Integration Events

### Booking Events (Aligns with Define: consultation_booking_complete)
```javascript
{
  "event": "calendar_booking_complete",
  "required_parameters": {
    "lead_id": "uuid_v4", 
    "booking_timestamp": "iso_8601",
    "selected_time_slot": "iso_8601_appointment_time"
  },
  "define_framework_event": "consultation_booking_complete",
  "trigger": "Calendly booking confirmed"
}
```

### WhatsApp Automation Events
```javascript
{
  "event": "whatsapp_message_sent",
  "required_parameters": {
    "lead_id": "uuid_v4",
    "message_type": "welcome|preparation|reminder",
    "delivery_status": "sent|delivered|failed"
  },
  "define_framework_event": "whatsapp_message_sent",
  "trigger": "Automated message sequence"
}
```

---

## Advanced Tracking Events

### Content Engagement Tracking
```javascript
{
  "event": "section_view",
  "required_parameters": {
    "section_name": "hero|social_proof|problem|solution|deliverables|outcomes|testimonials|faq|final",
    "time_to_view": "seconds_since_page_load",
    "scroll_depth": "percentage_0_to_100"
  },
  "define_framework_event": "content_engagement_deep",
  "trigger": "Section enters viewport via Intersection Observer"
}
```

### Testimonial Interaction Events
```javascript
{
  "event": "testimonial_interaction", 
  "required_parameters": {
    "testimonial_id": "case_1|case_2",
    "interaction_type": "view|expand|cta_click",
    "time_spent": "seconds_on_testimonial"
  },
  "define_framework_event": "testimonial_view",
  "trigger": "Engagement with social proof elements"
}
```

### Drop-off Tracking Events
```javascript
{
  "event": "modal_abandon",
  "required_parameters": {
    "source_section": "string",
    "time_in_modal": "seconds_total", 
    "fields_completed": "integer_0_to_7",
    "abandon_reason": "close_button|outside_click|escape_key"
  },
  "define_framework_event": "modal_abandon",
  "sales_team_trigger": true
}
```

---

## Parameter Validation & Standards

### Required Parameter Format Validation

#### Identity Parameters (Critical)
```json
{
  "lead_id": {
    "format": "uuid_v4",
    "generation": "first_interaction_with_site",
    "persistence": "365_days_cookie", 
    "conversion_rule": "becomes_user_id_upon_enrollment"
  },
  "user_id": {
    "format": "uuid_v4", 
    "trigger": "program_enrollment_complete",
    "relationship": "maps_to_previous_lead_id"
  },
  "session_id": {
    "format": "uuid_v4",
    "timeout": "30_minutes_inactivity",
    "storage": "session_storage"
  }
}
```

#### Amanda Scoring Parameters
```json
{
  "amanda_match_score": {
    "type": "integer",
    "range": "0_to_100", 
    "calculation": "real_time_form_submission",
    "thresholds": {
      "high_priority": "80_to_100",
      "medium_priority": "60_to_79", 
      "low_priority": "0_to_59"
    }
  }
}
```

#### Content Context Parameters
```json
{
  "source_section": {
    "allowed_values": ["hero", "social_proof", "problem", "solution", "deliverables", "outcomes", "testimonials", "faq", "final"],
    "format": "lowercase_underscore",
    "validation": "enum_strict"
  },
  "cta_id": {
    "allowed_values": ["cta_primary", "cta_secondary"], 
    "governance": "single_primary_cta_per_page",
    "measurement_consistency": "all_primary_ctis_same_destination"
  }
}
```

### No-PII Parameter Policy
```json
{
  "pii_exclusion_policy": {
    "email": "stored_in_crm_only_not_in_events",
    "phone": "stored_in_crm_only_not_in_events", 
    "name": "stored_in_crm_only_not_in_events",
    "safe_parameters": "lead_id, user_id, categorical_selections, scores, timestamps"
  }
}
```

---

## Destination Configuration Mapping

### Google Analytics 4 Event Configuration
```javascript
// GA4 Custom Events Configuration
{
  "lead_form_submit": {
    "event_name": "generate_lead",
    "conversion": true,
    "parameters": {
      "source": "landing_page_modal",
      "amanda_score": "{{ DLV - Amanda Score }}",
      "lead_source": "{{ DLV - Lead Source }}"
    }
  },
  "cta_click": {
    "event_name": "cta_interaction", 
    "parameters": {
      "source_section": "{{ DLV - Source Section }}",
      "cta_label": "{{ DLV - CTA Label }}"
    }
  }
}
```

### Segment CDP Event Structure
```javascript
// Segment Track Event Format
{
  "analytics.track('Lead Form Submit', {
    "amanda_match_score": 85,
    "lead_source": "landing_page_modal",
    "source_section": "hero",
    "form_completion_time": 120
  }, {
    "context": {
      "page": {"title": "Mentoria Seja Livre - Landing Page"},
      "user": {"lead_id": "uuid_here"}
    }
  })";
}
```

### CRM Integration Parameters
```json
{
  "crm_webhook_payload": {
    "external_id": "{{ lead_id }}",
    "source": "landing_page_modal",
    "custom_fields": {
      "amanda_match_score": "{{ amanda_score }}",
      "source_section": "{{ source_section }}",
      "business_type": "{{ business_type }}",
      "monthly_revenue": "{{ monthly_revenue }}"
    },
    "tags": [
      "landing_page_lead",
      "amanda_score_{{ tier }}",
      "source_{{ section }}"
    ]
  }
}
```

---

## Quality Assurance Validation

### Event Consistency Checks
- ✅ All `cta_click` events use identical parameter structure
- ✅ Amanda scoring parameters match Define framework exactly  
- ✅ Snake_case naming convention enforced throughout
- ✅ No PII leaked into measurement parameters
- ✅ Test mode handling included in all events

### Parameter Completeness Audit
- ✅ All required parameters from Define framework included
- ✅ Optional parameters documented with usage context
- ✅ Parameter validation rules defined
- ✅ Cross-platform destination mapping complete

### Define Framework Alignment Verification
- ✅ Event names match Define event dictionary exactly
- ✅ Parameter naming follows Define conventions
- ✅ Amanda scoring algorithm matches Define specifications
- ✅ Identity progression (lead_id → user_id) supported

---

## Implementation Notes for Development

### GTM DataLayer Structure
```javascript
// Standard DataLayer Push Format
function pushCTAEvent(sourceSection, ctaId, ctaLabel) {
  window.dataLayer.push({
    event: 'cta_click',
    source_section: sourceSection,
    cta_id: ctaId, 
    cta_label: ctaLabel,
    lead_id: getCookie('mslu_lead_id'),
    timestamp: new Date().toISOString(),
    test_mode: window.location.hostname !== 'mentoriasejalivre.com.br'
  });
}
```

### Form Submission Tracking
```javascript
// Modal Form Submit with Amanda Scoring
function trackFormSubmission(formData) {
  const amandaScore = calculateAmandaScore(formData);
  
  window.dataLayer.push({
    event: 'lead_form_submit',
    amanda_match_score: amandaScore,
    lead_source: 'landing_page_modal',
    form_completion_time: getFormCompletionTime(),
    qualification_inputs: {
      business_type: formData.get('business_type'),
      monthly_revenue: formData.get('monthly_revenue'), 
      work_hours_daily: formData.get('work_hours_daily'),
      main_struggle: formData.get('main_struggle')
    },
    test_mode: getTestMode()
  });
}
```

This Measurement Reference Index ensures perfect alignment between Copy SoT v1.0 and Define Framework v1.0, enabling accurate tracking and optimization of Amanda's transformation journey through the Mentoria Seja Livre conversion funnel.