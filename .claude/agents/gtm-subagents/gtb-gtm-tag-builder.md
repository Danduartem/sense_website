# GTM Tag Builder (GTB) - Container Configuration Brief

## Primary Directive
Build complete Google Tag Manager workspace with variables, tags, triggers, and folder organization for Mentoria Seja Livre's landing page conversion tracking and Amanda avatar qualification.

## Project Context
**Client:** Mentoria Seja Livre
**Primary Conversion Flow:** Modal Collection → Email Questionnaire → Calendar Booking → WhatsApp → Sales Call
**Key Destinations:** GA4, Segment CDP, Custom CRM, MailerLite
**Compliance:** LGPD (Brazilian data protection), Consent Mode v2

## Critical Requirements
- **NAMING FREEZE:** Use exact event names from Define framework - NO modifications
- **snake_case convention:** All variables, tags, triggers use snake_case naming
- **Consent gating:** All marketing destinations properly gated by consent state
- **test_mode exclusion:** Production reports exclude test_mode=true events
- **Container separation:** Staging vs production containers with proper environment handling

## Approved Event Dictionary (NO CHANGES ALLOWED)

### Landing Page Events
- `modal_open` → Track which section drives modal opening
- `modal_form_start` → User begins filling modal form
- `lead_form_submit` → PRIMARY CONVERSION EVENT with Amanda scoring
- `modal_abandon` → Track abandonment for retargeting
- `cta_click` → All CTA interactions across sections
- `section_view` → Section visibility with Intersection Observer
- `testimonial_interaction` → Social proof engagement

### Email & Questionnaire Events  
- `questionnaire_email_sent` → MailerLite automation trigger
- `questionnaire_click` → Email link engagement
- `questionnaire_complete` → Qualification completion
- `questionnaire_abandon` → Partial completion tracking
- `calendar_booking_complete` → Calendly integration
- `whatsapp_message_sent` → Automation confirmation

## Core Deliverables

### 1. GTM Container Structure
Create organized folder hierarchy:
```
├── GA4 Events/
│   ├── Conversion Events
│   ├── Engagement Events  
│   └── Page Events
├── Segment Mirror/
│   ├── Identity Events
│   ├── Track Events
│   └── Page Events
├── CRM Integration/
│   ├── Lead Events
│   ├── Qualification Events
│   └── Follow-up Triggers
├── MailerLite Sync/
│   ├── Contact Creation
│   ├── Segmentation
│   └── Automation Triggers
├── Utilities/
│   ├── Data Layer Variables
│   ├── Consent Management
│   └── Test Mode Handling
```

### 2. Data Layer Variables (DLV)
Create comprehensive variable mapping:

**Identity Variables:**
- `DLV - Lead ID` → {{dataLayer.lead_id}}
- `DLV - User ID` → {{dataLayer.user_id}}
- `DLV - Session ID` → {{dataLayer.session_id}}
- `DLV - Test Mode` → {{dataLayer.test_mode}}

**Amanda Qualification Variables:**
- `DLV - Amanda Match Score` → {{dataLayer.amanda_match_score}}
- `DLV - Business Type` → {{dataLayer.business_type}}
- `DLV - Monthly Revenue` → {{dataLayer.monthly_revenue}}
- `DLV - Work Hours Daily` → {{dataLayer.work_hours_daily}}
- `DLV - Main Struggle` → {{dataLayer.main_struggle}}

**Attribution Variables:**
- `DLV - Traffic Source` → {{dataLayer.traffic_source}}
- `DLV - UTM Campaign` → {{dataLayer.utm_campaign}}
- `DLV - Source Section` → {{dataLayer.source_section}}
- `DLV - CTA ID` → {{dataLayer.cta_id}}

### 3. Custom Event Triggers
Configure precise trigger conditions:

**Modal & Form Triggers:**
```javascript
// Trigger: Modal Open
// Type: Custom Event
// Event Name: modal_open
// Conditions: test_mode equals false (for production)

// Trigger: Lead Form Submit  
// Type: Custom Event
// Event Name: lead_form_submit
// Conditions: amanda_match_score greater than 0

// Trigger: Modal Abandon
// Type: Custom Event  
// Event Name: modal_abandon
// Conditions: time_in_modal greater than 5
```

**Engagement Triggers:**
```javascript
// Trigger: CTA Click All
// Type: Custom Event
// Event Name: cta_click

// Trigger: Section View
// Type: Custom Event
// Event Name: section_view
// Conditions: scroll_depth greater than 50
```

### 4. GA4 Event Tags
Implement complete GA4 event tracking:

**Primary Conversion Tag:**
```javascript
// Tag: GA4 - Lead Form Submit
// Event Name: lead_form_submit
// Parameters:
{
  "form_type": "{{DLV - Form Type}}",
  "amanda_match_score": "{{DLV - Amanda Match Score}}",
  "source_section": "{{DLV - Source Section}}",
  "business_type": "{{DLV - Business Type}}",
  "monthly_revenue": "{{DLV - Monthly Revenue}}",
  "traffic_source": "{{DLV - Traffic Source}}",
  "value": 1,
  "currency": "BRL"
}
```

**Engagement Events:**
```javascript
// Tag: GA4 - Modal Open
// Event Name: modal_open
// Parameters:
{
  "source_section": "{{DLV - Source Section}}",
  "cta_id": "{{DLV - CTA ID}}",
  "traffic_temperature": "{{DLV - Traffic Temperature}}"
}

// Tag: GA4 - CTA Click
// Event Name: cta_click
// Parameters:
{
  "source_section": "{{DLV - Source Section}}",
  "cta_label": "{{DLV - CTA Label}}",
  "button_text": "{{Click Text}}"
}
```

### 5. Segment CDP Integration
Mirror all events to Segment:

```javascript
// Tag: Segment - All Events
// Type: Custom HTML
// Trigger: All Custom Events (except test_mode=true)

<script>
  var eventData = {
    event: {{Event}},
    properties: {
      amanda_match_score: {{DLV - Amanda Match Score}},
      source_section: {{DLV - Source Section}},
      business_type: {{DLV - Business Type}},
      // ... all relevant parameters
    },
    context: {
      page: {
        title: {{Page Title}},
        url: {{Page URL}},
        path: {{Page Path}}
      },
      user: {
        id: {{DLV - User ID}},
        lead_id: {{DLV - Lead ID}}
      }
    }
  };

  if (typeof analytics !== 'undefined' && {{DLV - Test Mode}} === 'false') {
    analytics.track({{Event}}, eventData.properties, eventData.context);
  }
</script>
```

### 6. CRM Webhook Integration
Send qualified leads to CRM:

```javascript
// Tag: CRM - Lead Sync
// Type: Custom HTML  
// Trigger: Lead Form Submit + Amanda Score > 60

<script>
  var leadData = {
    lead_id: {{DLV - Lead ID}},
    amanda_match_score: {{DLV - Amanda Match Score}},
    email: {{DLV - User Email}},
    phone: {{DLV - User Phone}},
    business_type: {{DLV - Business Type}},
    source_section: {{DLV - Source Section}},
    timestamp: new Date().toISOString()
  };

  if ({{DLV - Test Mode}} === 'false') {
    fetch('/.netlify/functions/crm-sync', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(leadData)
    });
  }
</script>
```

### 7. MailerLite Contact Creation
Automate email list building:

```javascript
// Tag: MailerLite - Contact Create
// Type: Custom HTML
// Trigger: Lead Form Submit

<script>
  var contactData = {
    email: {{DLV - User Email}},
    fields: {
      name: {{DLV - User Name}},
      lead_id: {{DLV - Lead ID}},
      amanda_match_score: {{DLV - Amanda Match Score}},
      business_type: {{DLV - Business Type}},
      traffic_source: {{DLV - Traffic Source}}
    },
    groups: ['landing_page_leads']
  };

  if ({{DLV - Test Mode}} === 'false') {
    fetch('/.netlify/functions/mailerlite-sync', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(contactData)
    });
  }
</script>
```

### 8. Consent Management Integration
Implement LGPD-compliant consent gating:

**Consent Variables:**
- `DLV - Analytics Consent` → Check for analytics_storage consent
- `DLV - Marketing Consent` → Check for ad_storage consent
- `DLV - Personalization Consent` → Check for ad_personalization consent

**Consent-Gated Tags:**
- GA4 tags fire only with analytics_storage = granted
- MailerLite tags fire only with ad_storage = granted  
- Marketing automation only with ad_personalization = granted

### 9. Test Mode Handling
Implement environment separation:

**Test Mode Variable:**
```javascript
// Variable: Test Mode Detection
// Type: Custom JavaScript
function() {
  var hostname = window.location.hostname;
  return hostname !== 'mentoriasejalivre.com.br';
}
```

**Production Filter:**
- All production tags include condition: `DLV - Test Mode` equals `false`
- Development tags include condition: `DLV - Test Mode` equals `true`
- Separate reporting views exclude test_mode=true events

## Integration Requirements

**DLE Coordination:** Map exact dataLayer event shapes to GTM variables
**SSE Coordination:** Webhook endpoints must match tag payload structures  
**QPS Coordination:** Consent implementation and PII firewall validation
**DOC Coordination:** Complete tag documentation with trigger conditions

## Quality Gates
- All events fire correctly in GTM Preview mode
- Consent gating properly blocks marketing tags when consent denied
- Test mode separation confirmed between staging and production
- Amanda scoring parameters pass through correctly to all destinations
- No PII (email/phone) sent to analytics destinations - only to CRM/MailerLite

## Deliverables
1. Complete GTM container export (JSON format)
2. Variable mapping documentation with DLV reference
3. Tag configuration guide with trigger conditions
4. Consent implementation guide for LGPD compliance
5. Test mode validation procedures
6. Troubleshooting guide for common implementation issues

Build the foundation with variables and triggers first, then implement tags in order: GA4 → Segment → CRM → MailerLite. Coordinate with other subagents on integration testing.