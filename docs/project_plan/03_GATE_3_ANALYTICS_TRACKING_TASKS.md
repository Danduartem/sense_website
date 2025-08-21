# Gate 3: analytics_ok - Analytics & Tagging Engineer (ATE) Tasks
## Mentoria Seja Livre Landing Page - Analytics & Event Tracking Implementation

**Gate Owner:** Analytics & Tagging Engineer (ATE)  
**Gate Status:** PENDING  
**Dependencies:** Gate 1 (ui_ok) + Gate 2 (integrations_ok) MUST pass first  
**Blocking:** Gates 4, 5 until analytics_ok validation passes  

---

## GATE 3 VALIDATION CRITERIA

### Technical Requirements
- [ ] GTM container published with GA4 configuration and custom events
- [ ] Snake_case event implementation for all primary CTAs and interactions
- [ ] Google Consent Mode v2 functional for LGPD compliance
- [ ] Data layer structure implemented with proper event pushing
- [ ] Amanda match score tracking operational with qualification parameters
- [ ] No personally identifiable information in event parameters
- [ ] Enhanced ecommerce tracking ready for Stripe transactions

### Evidence Required for Gate Passage
1. **Tag Assistant Screenshots:** All events firing correctly with proper parameters
2. **GA4 DebugView Validation:** Real-time event validation in GA4 interface
3. **Consent Mode Demo:** LGPD compliance workflow with consent preferences
4. **Data Layer Inspection:** Structured event data with Amanda scoring parameters
5. **Event Documentation:** Complete parameter dictionary for all tracked events

---

## GTM CONTAINER SETUP AND CONFIGURATION

### Task 3.1: GTM Container Foundation
**Priority:** CRITICAL  
**Estimated Time:** 4 hours

Set up the complete GTM container with GA4 integration:

**GTM Container Structure:**
```
Container: Mentoria Seja Livre - Landing Page
├── Tags/
│   ├── GA4 Configuration Tag
│   ├── GA4 Event Tags (modal_open, lead_form_submit, etc.)
│   ├── Consent Mode Default Settings
│   └── Enhanced Ecommerce Tags
├── Triggers/
│   ├── Page View Triggers
│   ├── Custom Event Triggers (dataLayer events)
│   ├── Form Submission Triggers
│   └── Scroll Depth Triggers
├── Variables/
│   ├── GA4 Configuration Variable
│   ├── Amanda Score Variables
│   ├── UTM Parameter Variables
│   └── Custom JavaScript Variables
└── Built-in Variables/
    ├── Page URL
    ├── Referrer
    ├── User Agent
    └── Form Classes
```

**File:** `src/_data/tracking.json`
```json
{
  "gtm": {
    "container_id": "GTM-XXXXXXX",
    "ga4_measurement_id": "G-XXXXXXXXXX",
    "environment": {
      "development": {
        "gtm_preview_mode": true,
        "debug_mode": true
      },
      "production": {
        "gtm_preview_mode": false,
        "debug_mode": false
      }
    }
  },
  "events": {
    "critical_events": [
      "modal_open",
      "lead_form_submit",
      "questionnaire_click",
      "calendar_booking_complete",
      "whatsapp_message_sent"
    ],
    "secondary_events": [
      "scroll_depth_75",
      "video_play",
      "testimonial_view",
      "faq_expand"
    ]
  },
  "consent_mode": {
    "default_settings": {
      "ad_storage": "denied",
      "analytics_storage": "denied",
      "ad_user_data": "denied",
      "ad_personalization": "denied"
    },
    "consent_types": [
      "analytics_storage",
      "ad_storage",
      "ad_user_data",
      "ad_personalization"
    ]
  }
}
```

### Task 3.2: GA4 Configuration Tag Setup
**Priority:** CRITICAL  
**Estimated Time:** 2 hours

Configure the main GA4 tag with custom parameters:

**GA4 Configuration Tag Settings:**
```javascript
// Tag Configuration
Tag Name: GA4 Configuration - Mentoria Seja Livre
Tag Type: Google Analytics: GA4 Configuration
Measurement ID: {{GA4 Measurement ID}}

// Configuration Parameters
custom_parameters: {
  lead_id: {{Lead ID}},
  traffic_temperature: {{Traffic Temperature}},
  page_category: 'landing_page',
  business_vertical: 'female_entrepreneurship',
  target_avatar: 'amanda_exhausted_achiever'
}

// Enhanced Ecommerce
enable_enhanced_ecommerce: true
send_page_view: true

// User Properties
user_properties: {
  amanda_match_score: {{Amanda Score}},
  qualification_tier: {{Qualification Tier}},
  utm_source: {{UTM Source}},
  utm_medium: {{UTM Medium}},
  utm_campaign: {{UTM Campaign}}
}

// Triggers
All Pages (Page View)
```

---

## SNAKE_CASE EVENT IMPLEMENTATION

### Task 3.3: Primary Conversion Events
**Priority:** CRITICAL  
**Estimated Time:** 6 hours

Implement all critical conversion events with snake_case naming:

**Event 1: modal_open**
```javascript
// GTM Tag Configuration
Tag Name: GA4 Event - Modal Open
Tag Type: Google Analytics: GA4 Event
Configuration Tag: {{GA4 Configuration Tag}}

Event Parameters:
{
  event_name: 'modal_open',
  source_section: {{DLV - Source Section}},
  cta_id: {{DLV - CTA ID}},
  traffic_temperature: {{DLV - Traffic Temperature}},
  lead_id: {{DLV - Lead ID}},
  page_url: {{Page URL}},
  modal_type: 'amanda_qualification'
}

// Trigger
Custom Event: modal_open
```

**Event 2: lead_form_submit**
```javascript
// GTM Tag Configuration  
Tag Name: GA4 Event - Lead Form Submit
Tag Type: Google Analytics: GA4 Event
Configuration Tag: {{GA4 Configuration Tag}}

Event Parameters:
{
  event_name: 'lead_form_submit',
  amanda_match_score: {{DLV - Amanda Score}},
  qualification_tier: {{DLV - Qualification Tier}},
  qualification_inputs: {{DLV - Qualification Inputs}},
  form_completion_time: {{DLV - Form Completion Time}},
  lead_id: {{DLV - Lead ID}},
  pain_point_alignment: {{DLV - Pain Point Alignment}},
  demographic_match: {{DLV - Demographic Match}},
  behavior_indicators: {{DLV - Behavior Indicators}}
}

// Enhanced Ecommerce Parameters
items: [{
  item_id: 'lead_qualification',
  item_name: 'Amanda Avatar Qualification',
  item_category: 'lead_generation',
  item_variant: {{DLV - Qualification Tier}},
  quantity: 1,
  price: 0
}]

// Trigger
Custom Event: lead_form_submit
```

**Event 3: questionnaire_click**
```javascript
// GTM Tag Configuration
Tag Name: GA4 Event - Questionnaire Click  
Tag Type: Google Analytics: GA4 Event
Configuration Tag: {{GA4 Configuration Tag}}

Event Parameters:
{
  event_name: 'questionnaire_click',
  email_delivered: {{DLV - Email Delivered}},
  amanda_score: {{DLV - Amanda Score}},
  lead_id: {{DLV - Lead ID}},
  click_source: {{DLV - Click Source}},
  time_since_form_submit: {{DLV - Time Since Submit}}
}

// Trigger
Custom Event: questionnaire_click
```

**Event 4: calendar_booking_complete**
```javascript
// GTM Tag Configuration
Tag Name: GA4 Event - Calendar Booking Complete
Tag Type: Google Analytics: GA4 Event  
Configuration Tag: {{GA4 Configuration Tag}}

Event Parameters:
{
  event_name: 'calendar_booking_complete',
  booking_date: {{DLV - Booking Date}},
  booking_time: {{DLV - Booking Time}},
  amanda_score: {{DLV - Amanda Score}},
  lead_id: {{DLV - Lead ID}},
  booking_source: 'questionnaire_email',
  consultation_type: 'discovery_call'
}

// Enhanced Ecommerce - Booking as Conversion
items: [{
  item_id: 'discovery_call_booking',
  item_name: 'Discovery Call Consultation',
  item_category: 'consultation',
  item_variant: 'amanda_qualified',
  quantity: 1,
  price: 0
}]

// Trigger
Custom Event: calendar_booking_complete
```

**Event 5: whatsapp_message_sent**
```javascript
// GTM Tag Configuration
Tag Name: GA4 Event - WhatsApp Message Sent
Tag Type: Google Analytics: GA4 Event
Configuration Tag: {{GA4 Configuration Tag}}

Event Parameters:
{
  event_name: 'whatsapp_message_sent',
  message_type: {{DLV - Message Type}},
  automation_trigger: {{DLV - Automation Trigger}},
  amanda_score: {{DLV - Amanda Score}},
  lead_id: {{DLV - Lead ID}},
  sequence_step: {{DLV - Sequence Step}}
}

// Trigger
Custom Event: whatsapp_message_sent
```

### Task 3.4: Secondary Engagement Events
**Priority:** HIGH  
**Estimated Time:** 3 hours

Implement engagement and content interaction events:

**Scroll Depth Tracking:**
```javascript
// GTM Tag Configuration
Tag Name: GA4 Event - Scroll Depth
Tag Type: Google Analytics: GA4 Event
Configuration Tag: {{GA4 Configuration Tag}}

Event Parameters:
{
  event_name: 'scroll_depth',
  scroll_percentage: {{Scroll Depth Threshold}},
  page_section: {{DLV - Current Section}},
  lead_id: {{DLV - Lead ID}},
  time_on_page: {{DLV - Time on Page}}
}

// Triggers
Scroll Depth - 25%, 50%, 75%, 90%
```

**CTA Interaction Tracking:**
```javascript
// GTM Tag Configuration
Tag Name: GA4 Event - CTA Click
Tag Type: Google Analytics: GA4 Event
Configuration Tag: {{GA4 Configuration Tag}}

Event Parameters:
{
  event_name: 'cta_click',
  cta_id: {{DLV - CTA ID}},
  cta_text: {{Click Text}},
  source_section: {{DLV - Source Section}},
  cta_position: {{DLV - CTA Position}},
  lead_id: {{DLV - Lead ID}}
}

// Trigger
All Elements - CTA buttons with data-cta-id attribute
```

---

## GOOGLE CONSENT MODE V2 IMPLEMENTATION

### Task 3.5: LGPD Consent Framework
**Priority:** CRITICAL  
**Estimated Time:** 5 hours

Implement Google Consent Mode v2 for LGPD compliance:

**File:** `src/assets/js/consent-manager.js`
```javascript
class ConsentManager {
  constructor() {
    this.consentGiven = false;
    this.consentPreferences = {};
    this.init();
  }

  init() {
    // Set default consent state (denied)
    this.setDefaultConsent();
    
    // Check for existing consent
    this.loadStoredConsent();
    
    // Show consent banner if needed
    this.maybeShowConsentBanner();
  }

  setDefaultConsent() {
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        wait_for_update: 500
      });
    }

    // Also update dataLayer for GTM
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        event: 'consent_default',
        consent_state: {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        }
      });
    }
  }

  loadStoredConsent() {
    const storedConsent = localStorage.getItem('sense_consent_preferences');
    
    if (storedConsent) {
      try {
        this.consentPreferences = JSON.parse(storedConsent);
        this.updateConsent(this.consentPreferences, false);
      } catch (error) {
        console.error('Error loading stored consent:', error);
      }
    }
  }

  maybeShowConsentBanner() {
    const hasConsented = localStorage.getItem('sense_consent_given');
    
    if (!hasConsented) {
      this.showConsentBanner();
    }
  }

  showConsentBanner() {
    const banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.className = 'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-lg';
    banner.innerHTML = `
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div class="text-sm text-gray-700">
          <p class="mb-2">
            <strong>Sua privacidade é importante para nós.</strong>
          </p>
          <p>
            Usamos cookies e tecnologias similares para melhorar sua experiência, 
            analisar nosso tráfego e personalizar conteúdo. 
            Ao continuar navegando, você concorda com nossa 
            <a href="/privacidade" class="text-primary-600 hover:underline">Política de Privacidade</a>.
          </p>
        </div>
        <div class="flex space-x-3">
          <button id="consent-settings" 
                  class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Configurar
          </button>
          <button id="consent-accept-all" 
                  class="px-6 py-2 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600">
            Aceitar todos
          </button>
          <button id="consent-essential-only" 
                  class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
            Apenas essenciais
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    this.attachConsentBannerEvents(banner);
  }

  showConsentSettings() {
    const modal = document.createElement('div');
    modal.id = 'consent-settings-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
    modal.innerHTML = `
      <div class="bg-white rounded-lg max-w-2xl mx-4 p-6">
        <h3 class="text-xl font-semibold mb-4">Configurações de Privacidade</h3>
        
        <div class="space-y-4 mb-6">
          <div class="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <h4 class="font-medium">Cookies Essenciais</h4>
              <p class="text-sm text-gray-600">Necessários para o funcionamento básico do site</p>
            </div>
            <input type="checkbox" checked disabled class="toggle">
          </div>
          
          <div class="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <h4 class="font-medium">Cookies de Analytics</h4>
              <p class="text-sm text-gray-600">Nos ajudam a entender como você usa o site</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="analytics-consent" class="toggle">
              <span class="slider"></span>
            </label>
          </div>
          
          <div class="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <h4 class="font-medium">Cookies de Marketing</h4>
              <p class="text-sm text-gray-600">Permitem personalização e remarketing</p>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="marketing-consent" class="toggle">
              <span class="slider"></span>
            </label>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button id="consent-save-settings" 
                  class="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
            Salvar Preferências
          </button>
          <button id="consent-close-settings" 
                  class="px-4 py-2 text-gray-600 hover:text-gray-800">
            Fechar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.attachConsentSettingsEvents(modal);
  }

  updateConsent(preferences, showBanner = true) {
    const consentUpdate = {
      ad_storage: preferences.marketing ? 'granted' : 'denied',
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_user_data: preferences.marketing ? 'granted' : 'denied',
      ad_personalization: preferences.marketing ? 'granted' : 'denied'
    };

    // Update via gtag
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', consentUpdate);
    }

    // Update via dataLayer for GTM
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        event: 'consent_update',
        consent_state: consentUpdate
      });
    }

    // Store preferences
    localStorage.setItem('sense_consent_preferences', JSON.stringify(preferences));
    localStorage.setItem('sense_consent_given', Date.now().toString());
    
    this.consentPreferences = preferences;
    this.consentGiven = true;

    // Remove banner
    if (showBanner) {
      this.removeConsentBanner();
    }

    // Track consent decision
    this.trackConsentDecision(preferences);
  }

  trackConsentDecision(preferences) {
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        event: 'consent_decision',
        consent_analytics: preferences.analytics || false,
        consent_marketing: preferences.marketing || false,
        consent_method: preferences.method || 'unknown'
      });
    }
  }

  removeConsentBanner() {
    const banner = document.getElementById('consent-banner');
    if (banner) {
      banner.remove();
    }
  }

  attachConsentBannerEvents(banner) {
    banner.querySelector('#consent-accept-all').addEventListener('click', () => {
      this.updateConsent({
        analytics: true,
        marketing: true,
        method: 'accept_all'
      });
    });

    banner.querySelector('#consent-essential-only').addEventListener('click', () => {
      this.updateConsent({
        analytics: false,
        marketing: false,
        method: 'essential_only'
      });
    });

    banner.querySelector('#consent-settings').addEventListener('click', () => {
      this.showConsentSettings();
    });
  }

  attachConsentSettingsEvents(modal) {
    modal.querySelector('#consent-save-settings').addEventListener('click', () => {
      const analytics = modal.querySelector('#analytics-consent').checked;
      const marketing = modal.querySelector('#marketing-consent').checked;
      
      this.updateConsent({
        analytics,
        marketing,
        method: 'custom_settings'
      });
      
      modal.remove();
    });

    modal.querySelector('#consent-close-settings').addEventListener('click', () => {
      modal.remove();
    });
  }
}

// Initialize consent manager
document.addEventListener('DOMContentLoaded', () => {
  new ConsentManager();
});

export default ConsentManager;
```

---

## DATA LAYER IMPLEMENTATION

### Task 3.6: Structured Data Layer Events
**Priority:** CRITICAL  
**Estimated Time:** 4 hours

Implement comprehensive data layer structure with Amanda scoring integration:

**File:** `src/assets/js/analytics.js`
```javascript
class AnalyticsManager {
  constructor() {
    this.dataLayer = window.dataLayer || [];
    this.leadId = this.getLeadId();
    this.sessionId = this.generateSessionId();
    this.pageLoadTime = Date.now();
    
    this.init();
  }

  init() {
    // Initialize data layer
    this.initializeDataLayer();
    
    // Track initial page view
    this.trackPageView();
    
    // Set up event listeners
    this.setupEventListeners();
  }

  initializeDataLayer() {
    this.pushToDataLayer({
      event: 'data_layer_initialized',
      lead_id: this.leadId,
      session_id: this.sessionId,
      page_load_timestamp: this.pageLoadTime,
      user_properties: {
        traffic_temperature: this.determineTrafficTemperature(),
        device_type: this.getDeviceType(),
        browser_language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    });
  }

  trackPageView() {
    const utmParams = this.getUTMParams();
    
    this.pushToDataLayer({
      event: 'page_view',
      page_title: document.title,
      page_location: window.location.href,
      page_referrer: document.referrer,
      lead_id: this.leadId,
      session_id: this.sessionId,
      traffic_temperature: this.determineTrafficTemperature(),
      utm_source: utmParams.utm_source || 'direct',
      utm_medium: utmParams.utm_medium || 'none',
      utm_campaign: utmParams.utm_campaign || 'none',
      utm_term: utmParams.utm_term || 'none',
      utm_content: utmParams.utm_content || 'none'
    });
  }

  trackModalOpen(sourceSection, ctaId) {
    this.pushToDataLayer({
      event: 'modal_open',
      source_section: sourceSection,
      cta_id: ctaId,
      traffic_temperature: this.determineTrafficTemperature(),
      lead_id: this.leadId,
      session_id: this.sessionId,
      page_url: window.location.href,
      modal_type: 'amanda_qualification',
      timestamp: Date.now()
    });
  }

  trackFormStart(formType, sourceSection) {
    this.pushToDataLayer({
      event: 'form_start',
      form_type: formType,
      source_section: sourceSection,
      lead_id: this.leadId,
      session_id: this.sessionId,
      form_start_timestamp: Date.now()
    });
  }

  trackFormStepComplete(step, formType) {
    this.pushToDataLayer({
      event: 'form_step_complete',
      form_step: step,
      form_type: formType,
      lead_id: this.leadId,
      session_id: this.sessionId,
      step_completion_timestamp: Date.now()
    });
  }

  trackLeadFormSubmit(amandaScoreData, formCompletionTime) {
    this.pushToDataLayer({
      event: 'lead_form_submit',
      // Amanda Scoring Data
      amanda_match_score: amandaScoreData.totalScore,
      qualification_tier: amandaScoreData.qualificationTier,
      demographic_score: amandaScoreData.demographicScore,
      pain_point_score: amandaScoreData.painPointScore,
      behavior_score: amandaScoreData.behaviorScore,
      
      // Qualification Inputs
      qualification_inputs: amandaScoreData.qualificationInputs,
      
      // Form Metrics
      form_completion_time: formCompletionTime,
      form_type: 'amanda_qualification',
      
      // Lead Data
      lead_id: this.leadId,
      session_id: this.sessionId,
      
      // Enhanced Ecommerce
      ecommerce: {
        items: [{
          item_id: 'lead_qualification',
          item_name: 'Amanda Avatar Qualification',
          item_category: 'lead_generation',
          item_variant: amandaScoreData.qualificationTier,
          quantity: 1,
          price: 0
        }]
      },
      
      timestamp: Date.now()
    });
  }

  trackQuestionnaireClick(emailDelivered, amandaScore) {
    this.pushToDataLayer({
      event: 'questionnaire_click',
      email_delivered: emailDelivered,
      amanda_score: amandaScore,
      lead_id: this.leadId,
      session_id: this.sessionId,
      click_source: 'email_cta',
      timestamp: Date.now()
    });
  }

  trackCalendarBooking(bookingData, amandaScore) {
    this.pushToDataLayer({
      event: 'calendar_booking_complete',
      booking_date: bookingData.date,
      booking_time: bookingData.time,
      booking_type: bookingData.type || 'discovery_call',
      amanda_score: amandaScore,
      lead_id: this.leadId,
      session_id: this.sessionId,
      booking_source: 'questionnaire_email',
      
      // Enhanced Ecommerce - Booking as Conversion
      ecommerce: {
        items: [{
          item_id: 'discovery_call_booking',
          item_name: 'Discovery Call Consultation',
          item_category: 'consultation',
          item_variant: 'amanda_qualified',
          quantity: 1,
          price: 0
        }]
      },
      
      timestamp: Date.now()
    });
  }

  trackWhatsAppMessage(messageType, automationTrigger, amandaScore) {
    this.pushToDataLayer({
      event: 'whatsapp_message_sent',
      message_type: messageType,
      automation_trigger: automationTrigger,
      amanda_score: amandaScore,
      lead_id: this.leadId,
      session_id: this.sessionId,
      sequence_step: this.getSequenceStep(messageType),
      timestamp: Date.now()
    });
  }

  trackScrollDepth(percentage) {
    this.pushToDataLayer({
      event: 'scroll_depth',
      scroll_percentage: percentage,
      page_section: this.getCurrentSection(),
      lead_id: this.leadId,
      session_id: this.sessionId,
      time_on_page: Date.now() - this.pageLoadTime,
      timestamp: Date.now()
    });
  }

  trackCTAClick(ctaId, ctaText, sourceSection) {
    this.pushToDataLayer({
      event: 'cta_click',
      cta_id: ctaId,
      cta_text: ctaText,
      source_section: sourceSection,
      cta_position: this.getCTAPosition(ctaId),
      lead_id: this.leadId,
      session_id: this.sessionId,
      timestamp: Date.now()
    });
  }

  trackError(errorType, errorMessage, errorContext) {
    this.pushToDataLayer({
      event: 'error_occurred',
      error_type: errorType,
      error_message: errorMessage,
      error_context: errorContext,
      lead_id: this.leadId,
      session_id: this.sessionId,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      timestamp: Date.now()
    });
  }

  // Utility Methods
  pushToDataLayer(data) {
    this.dataLayer.push(data);
  }

  getLeadId() {
    return localStorage.getItem('sense_lead_id') || 'anonymous';
  }

  generateSessionId() {
    let sessionId = sessionStorage.getItem('sense_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sense_session_id', sessionId);
    }
    return sessionId;
  }

  getUTMParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content')
    };
  }

  determineTrafficTemperature() {
    const referrer = document.referrer;
    const utmSource = new URLSearchParams(window.location.search).get('utm_source');
    const hasReturnVisit = localStorage.getItem('sense_return_visitor');
    
    if (hasReturnVisit) return 'hot';
    if (utmSource === 'email' || utmSource === 'newsletter') return 'warm';
    if (referrer.includes('google') || referrer.includes('facebook')) return 'cold';
    if (referrer === '') return 'direct';
    
    return 'cold';
  }

  getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile';
    return 'desktop';
  }

  getCurrentSection() {
    // Determine which section is currently in view
    const sections = document.querySelectorAll('section[id]');
    let currentSection = 'unknown';
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentSection = section.id;
      }
    });
    
    return currentSection;
  }

  getCTAPosition(ctaId) {
    const cta = document.querySelector(`[data-cta-id="${ctaId}"]`);
    if (!cta) return 'unknown';
    
    const allCTAs = document.querySelectorAll('[data-cta-id]');
    return Array.from(allCTAs).indexOf(cta) + 1;
  }

  getSequenceStep(messageType) {
    const sequenceMap = {
      'welcome_message': 1,
      'jucana_video': 2,
      'booking_reminder': 3,
      'pre_call_prep': 4
    };
    return sequenceMap[messageType] || 0;
  }

  setupEventListeners() {
    // CTA click tracking
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-cta-id]')) {
        const ctaId = e.target.getAttribute('data-cta-id');
        const sourceSection = e.target.getAttribute('data-source-section');
        const ctaText = e.target.textContent.trim();
        
        this.trackCTAClick(ctaId, ctaText, sourceSection);
      }
    });

    // Scroll depth tracking
    let scrollDepthMarkers = [25, 50, 75, 90];
    let triggeredMarkers = new Set();
    
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      
      scrollDepthMarkers.forEach(marker => {
        if (scrollPercent >= marker && !triggeredMarkers.has(marker)) {
          triggeredMarkers.add(marker);
          this.trackScrollDepth(marker);
        }
      });
    });
  }
}

// Initialize analytics
const analytics = new AnalyticsManager();

// Export for use in other modules
export default analytics;
```

---

## GTM VARIABLES CONFIGURATION

### Task 3.7: Custom Variables Setup
**Priority:** HIGH  
**Estimated Time:** 3 hours

Configure all necessary GTM variables for event parameters:

**Data Layer Variables:**
```
Variable Name: DLV - Amanda Score
Variable Type: Data Layer Variable
Data Layer Variable Name: amanda_match_score

Variable Name: DLV - Qualification Tier  
Variable Type: Data Layer Variable
Data Layer Variable Name: qualification_tier

Variable Name: DLV - Lead ID
Variable Type: Data Layer Variable
Data Layer Variable Name: lead_id

Variable Name: DLV - Source Section
Variable Type: Data Layer Variable
Data Layer Variable Name: source_section

Variable Name: DLV - CTA ID
Variable Type: Data Layer Variable
Data Layer Variable Name: cta_id

Variable Name: DLV - Traffic Temperature
Variable Type: Data Layer Variable
Data Layer Variable Name: traffic_temperature

Variable Name: DLV - Form Completion Time
Variable Type: Data Layer Variable
Data Layer Variable Name: form_completion_time

Variable Name: DLV - Qualification Inputs
Variable Type: Data Layer Variable
Data Layer Variable Name: qualification_inputs
```

**Custom JavaScript Variables:**
```javascript
// Variable Name: UTM Source
function() {
  return new URLSearchParams(window.location.search).get('utm_source') || 'direct';
}

// Variable Name: UTM Medium  
function() {
  return new URLSearchParams(window.location.search).get('utm_medium') || 'none';
}

// Variable Name: UTM Campaign
function() {
  return new URLSearchParams(window.location.search).get('utm_campaign') || 'none';
}

// Variable Name: Device Type
function() {
  const userAgent = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile';
  return 'desktop';
}

// Variable Name: Traffic Temperature
function() {
  const referrer = document.referrer;
  const utmSource = new URLSearchParams(window.location.search).get('utm_source');
  const hasReturnVisit = localStorage.getItem('sense_return_visitor');
  
  if (hasReturnVisit) return 'hot';
  if (utmSource === 'email' || utmSource === 'newsletter') return 'warm';
  if (referrer.includes('google') || referrer.includes('facebook')) return 'cold';
  if (referrer === '') return 'direct';
  
  return 'cold';
}
```

---

## EVENT VALIDATION AND TESTING

### Task 3.8: Analytics Testing Framework
**Priority:** HIGH  
**Estimated Time:** 4 hours

Create comprehensive testing for all analytics implementation:

**File:** `src/assets/js/analytics-validator.js`
```javascript
class AnalyticsValidator {
  constructor() {
    this.testResults = [];
    this.isTestMode = window.location.search.includes('analytics_test=true');
    
    if (this.isTestMode) {
      this.init();
    }
  }

  init() {
    console.log('Analytics Validator initialized');
    this.setupTestInterface();
    this.monitorDataLayer();
  }

  setupTestInterface() {
    const testPanel = document.createElement('div');
    testPanel.id = 'analytics-test-panel';
    testPanel.className = 'fixed top-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50 max-w-md';
    testPanel.style.fontSize = '12px';
    testPanel.innerHTML = `
      <h4 class="font-bold mb-2">Analytics Test Panel</h4>
      <div class="space-y-2">
        <button id="test-modal-open" class="block w-full text-left p-2 bg-blue-100 rounded">Test Modal Open</button>
        <button id="test-form-submit" class="block w-full text-left p-2 bg-green-100 rounded">Test Form Submit</button>
        <button id="test-scroll-depth" class="block w-full text-left p-2 bg-yellow-100 rounded">Test Scroll Depth</button>
        <button id="test-cta-click" class="block w-full text-left p-2 bg-purple-100 rounded">Test CTA Click</button>
      </div>
      <div id="test-results" class="mt-4 text-xs">
        <h5 class="font-bold">Test Results:</h5>
        <div id="results-list"></div>
      </div>
    `;

    document.body.appendChild(testPanel);
    this.attachTestEvents(testPanel);
  }

  attachTestEvents(panel) {
    panel.querySelector('#test-modal-open').addEventListener('click', () => {
      this.testModalOpen();
    });

    panel.querySelector('#test-form-submit').addEventListener('click', () => {
      this.testFormSubmit();
    });

    panel.querySelector('#test-scroll-depth').addEventListener('click', () => {
      this.testScrollDepth();
    });

    panel.querySelector('#test-cta-click').addEventListener('click', () => {
      this.testCTAClick();
    });
  }

  testModalOpen() {
    if (typeof analytics !== 'undefined') {
      analytics.trackModalOpen('test_section', 'test_cta');
      this.logTest('Modal Open', 'PASS', 'Event fired successfully');
    } else {
      this.logTest('Modal Open', 'FAIL', 'Analytics object not found');
    }
  }

  testFormSubmit() {
    const mockAmandaData = {
      totalScore: 85,
      qualificationTier: 'high_priority',
      demographicScore: 20,
      painPointScore: 35,
      behaviorScore: 30,
      qualificationInputs: {
        age_match: true,
        gender_match: true,
        location_match: true,
        high_exhaustion: true,
        delegation_issues: true,
        is_business_owner: true
      }
    };

    if (typeof analytics !== 'undefined') {
      analytics.trackLeadFormSubmit(mockAmandaData, 125000);
      this.logTest('Form Submit', 'PASS', 'Event fired with Amanda data');
    } else {
      this.logTest('Form Submit', 'FAIL', 'Analytics object not found');
    }
  }

  testScrollDepth() {
    if (typeof analytics !== 'undefined') {
      analytics.trackScrollDepth(75);
      this.logTest('Scroll Depth', 'PASS', 'Event fired for 75%');
    } else {
      this.logTest('Scroll Depth', 'FAIL', 'Analytics object not found');
    }
  }

  testCTAClick() {
    if (typeof analytics !== 'undefined') {
      analytics.trackCTAClick('test_cta', 'Test CTA Button', 'test_section');
      this.logTest('CTA Click', 'PASS', 'Event fired successfully');
    } else {
      this.logTest('CTA Click', 'FAIL', 'Analytics object not found');
    }
  }

  logTest(testName, result, message) {
    const timestamp = new Date().toLocaleTimeString();
    this.testResults.push({ testName, result, message, timestamp });
    
    const resultsList = document.getElementById('results-list');
    if (resultsList) {
      const resultElement = document.createElement('div');
      resultElement.className = `p-1 rounded ${result === 'PASS' ? 'bg-green-50' : 'bg-red-50'}`;
      resultElement.innerHTML = `
        <strong>${testName}</strong> - ${result}<br>
        <span class="text-gray-600">${message}</span><br>
        <span class="text-gray-500">${timestamp}</span>
      `;
      resultsList.appendChild(resultElement);
    }

    console.log(`Analytics Test - ${testName}: ${result} - ${message}`);
  }

  monitorDataLayer() {
    // Monitor all dataLayer pushes
    const originalPush = window.dataLayer.push;
    
    window.dataLayer.push = function(...args) {
      console.log('DataLayer Push:', args);
      return originalPush.apply(this, args);
    };
  }

  validateEventStructure(event) {
    const requiredFields = ['event', 'lead_id', 'session_id', 'timestamp'];
    const missingFields = requiredFields.filter(field => !event.hasOwnProperty(field));
    
    if (missingFields.length > 0) {
      console.warn('Event missing required fields:', missingFields, event);
      return false;
    }
    
    return true;
  }

  validateAmandaScoring(scoringData) {
    const requiredFields = ['totalScore', 'qualificationTier', 'demographicScore', 'painPointScore', 'behaviorScore'];
    const missingFields = requiredFields.filter(field => !scoringData.hasOwnProperty(field));
    
    if (missingFields.length > 0) {
      console.warn('Amanda scoring data missing required fields:', missingFields, scoringData);
      return false;
    }
    
    // Validate score ranges
    if (scoringData.totalScore < 0 || scoringData.totalScore > 100) {
      console.warn('Amanda total score out of range:', scoringData.totalScore);
      return false;
    }
    
    return true;
  }
}

// Initialize validator in test mode
if (window.location.search.includes('analytics_test=true')) {
  new AnalyticsValidator();
}

export default AnalyticsValidator;
```

---

## GATE 3 COMPLETION CHECKLIST

### Technical Validation
- [ ] GTM container published and functional
- [ ] GA4 configuration tag firing correctly
- [ ] All snake_case events implemented and firing
- [ ] Google Consent Mode v2 operational
- [ ] Data layer structure validated
- [ ] Amanda scoring parameters captured correctly

### Quality Validation
- [ ] Tag Assistant shows all events firing properly
- [ ] GA4 DebugView validates event parameters
- [ ] No PII detected in event parameters
- [ ] Consent Mode compliance validated
- [ ] Cross-browser event tracking verified

### Compliance Validation  
- [ ] LGPD consent framework operational
- [ ] Default consent state set to 'denied'
- [ ] Consent preferences properly stored
- [ ] Analytics only fire after consent granted

### Documentation Deliverables
1. **Complete event dictionary** with all parameters
2. **GTM container export** for backup and deployment
3. **Tag Assistant screenshots** showing successful event firing
4. **GA4 DebugView validation** confirming event receipt
5. **Consent Mode workflow demonstration** showing LGPD compliance

**Gate 3 Status:** Ready for validation by EPL  
**Next Gate:** Gate 4 (backend_ok) - BWE implements serverless functions and webhook processing