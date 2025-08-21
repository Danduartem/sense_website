/**
 * Data Layer Foundation - Mentoria Seja Livre GTM Implementation
 * 
 * Core JavaScript utilities for landing page tracking with Amanda avatar qualification
 * Compatible with 11ty + Vite + Tailwind + Netlify + GTM stack
 * 
 * @version 1.0.0
 * @author GTM Analytics Program Lead & Data Layer Engineer
 */

// Global DataLayer initialization
window.dataLayer = window.dataLayer || [];

/**
 * Identity Management System
 * Handles lead_id generation, user_id progression, and cross-session persistence
 */
class IdentityManager {
  constructor() {
    this.cookiePrefix = 'mslu_';
    this.cookieDomain = window.location.hostname.includes('localhost') 
      ? 'localhost' 
      : '.mentoriasejalivre.com.br';
    this.cookieExpiry = 365; // days
    this.sessionTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds
    
    this.init();
  }

  init() {
    this.setLeadId();
    this.trackSession(); 
    this.identifyTrafficSource();
    this.detectTestMode();
  }

  /**
   * Generate or retrieve existing lead_id
   * Creates UUID on first interaction, persists for 365 days
   */
  setLeadId() {
    let leadId = this.getCookie('lead_id');
    if (!leadId) {
      leadId = this.generateUUID();
      this.setCookie('lead_id', leadId);
      
      // Track lead_id creation event
      this.pushDataLayerEvent('lead_id_created', {
        lead_id: leadId,
        is_new_lead: true
      });
    }
    
    // Always push lead_id to dataLayer for GTM access
    window.dataLayer.push({ lead_id: leadId });
    return leadId;
  }

  /**
   * Promote lead_id to user_id upon program enrollment
   * Called when user completes payment and becomes customer
   */
  promoteToUser(userId) {
    const leadId = this.getCookie('lead_id');
    
    this.setCookie('user_id', userId);
    this.setCookie('conversion_date', new Date().toISOString());
    
    // Track identity promotion event
    this.pushDataLayerEvent('identity_promotion', {
      user_id: userId,
      previous_lead_id: leadId,
      conversion_timestamp: new Date().toISOString()
    });
    
    window.dataLayer.push({ 
      user_id: userId,
      lead_id: leadId 
    });
  }

  /**
   * Session tracking with 30-minute timeout
   * Generates new session_id when needed
   */
  trackSession() {
    let sessionId = sessionStorage.getItem('mslu_session_id');
    let sessionStart = sessionStorage.getItem('mslu_session_start');
    
    const now = Date.now();
    
    // Create new session if none exists or if session expired
    if (!sessionId || !sessionStart || (now - parseInt(sessionStart)) > this.sessionTimeout) {
      sessionId = this.generateUUID();
      sessionStart = now.toString();
      
      sessionStorage.setItem('mslu_session_id', sessionId);
      sessionStorage.setItem('mslu_session_start', sessionStart);
      
      // Track session start
      this.pushDataLayerEvent('session_start', {
        session_id: sessionId,
        is_new_session: true,
        previous_session_expired: !!sessionStorage.getItem('mslu_session_id')
      });
    }
    
    // Update dataLayer with session info
    window.dataLayer.push({ 
      session_id: sessionId,
      session_start: new Date(parseInt(sessionStart)).toISOString()
    });
    
    return sessionId;
  }

  /**
   * Traffic source detection and UTM persistence
   * Identifies Instagram, referral, direct, and paid sources
   */
  identifyTrafficSource() {
    let trafficSource = this.getCookie('traffic_source');
    
    if (!trafficSource) {
      const urlParams = new URLSearchParams(window.location.search);
      const referrer = document.referrer;
      
      // UTM source takes priority
      if (urlParams.get('utm_source')) {
        trafficSource = urlParams.get('utm_source');
      }
      // Instagram organic detection
      else if (referrer.includes('instagram.com')) {
        trafficSource = 'instagram_organic';
      }
      // WhatsApp direct link
      else if (referrer.includes('whatsapp') || urlParams.get('source') === 'whatsapp') {
        trafficSource = 'whatsapp_direct';
      }
      // No referrer = direct traffic
      else if (referrer === '') {
        trafficSource = 'direct';
      }
      // Other referrals
      else {
        trafficSource = 'referral';
      }
      
      this.setCookie('traffic_source', trafficSource);
      
      // Store UTM parameters if present
      if (urlParams.get('utm_campaign')) {
        this.setCookie('utm_campaign', urlParams.get('utm_campaign'));
      }
      if (urlParams.get('utm_medium')) {
        this.setCookie('utm_medium', urlParams.get('utm_medium'));
      }
      if (urlParams.get('utm_content')) {
        this.setCookie('utm_content', urlParams.get('utm_content'));
      }
    }
    
    // Push traffic attribution to dataLayer
    window.dataLayer.push({ 
      traffic_source: trafficSource,
      utm_campaign: this.getCookie('utm_campaign') || null,
      utm_medium: this.getCookie('utm_medium') || null,
      utm_content: this.getCookie('utm_content') || null
    });
  }

  /**
   * Test mode detection based on hostname
   * Critical for separating development/staging from production data
   */
  detectTestMode() {
    const hostname = window.location.hostname;
    const isProduction = hostname === 'mentoriasejalivre.com.br';
    const testMode = !isProduction;
    
    window.dataLayer.push({ 
      test_mode: testMode,
      environment: testMode ? 'development' : 'production',
      hostname: hostname
    });
    
    return testMode;
  }

  /**
   * Standard dataLayer event push with required metadata
   */
  pushDataLayerEvent(eventName, eventData = {}) {
    const standardEvent = {
      event: eventName,
      event_timestamp: new Date().toISOString(),
      test_mode: this.detectTestMode(),
      lead_id: this.getCookie('lead_id'),
      user_id: this.getCookie('user_id') || null,
      session_id: sessionStorage.getItem('mslu_session_id'),
      traffic_source: this.getCookie('traffic_source'),
      ...eventData
    };
    
    window.dataLayer.push(standardEvent);
    
    // Console log for debugging in development
    if (standardEvent.test_mode) {
      console.log('DataLayer Event:', eventName, standardEvent);
    }
  }

  /**
   * Cookie management utilities
   */
  setCookie(name, value) {
    const expires = new Date();
    expires.setDate(expires.getDate() + this.cookieExpiry);
    
    const cookieString = `${this.cookiePrefix}${name}=${value};expires=${expires.toUTCString()};domain=${this.cookieDomain};path=/;secure;samesite=lax`;
    document.cookie = cookieString;
  }

  getCookie(name) {
    const nameEQ = `${this.cookiePrefix}${name}=`;
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  /**
   * UUID v4 generator for lead_id and session_id
   */
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

/**
 * Amanda Avatar Scoring System
 * Calculates 0-100 qualification score based on Define framework
 */
class AmandaScoring {
  /**
   * Calculate Amanda match score from form data
   * Demographics (20pts) + Pain Points (40pts) + Behavioral Indicators (40pts) = 100pts
   */
  static calculateScore(formData) {
    let score = 0;
    
    // Demographics scoring (20 points total)
    if (this.getFormValue(formData, 'gender') === 'feminino') {
      score += 10;
    }
    
    const age = parseInt(this.getFormValue(formData, 'age'));
    if (age >= 30 && age <= 40) {
      score += 5;
    }
    
    if (this.getFormValue(formData, 'monthly_revenue') === '15k_25k') {
      score += 5;
    }
    
    // Pain points scoring (40 points total)
    const workHours = parseInt(this.getFormValue(formData, 'work_hours_daily'));
    if (workHours >= 10) {
      score += 15;
    }
    
    if (this.getFormValue(formData, 'main_struggle') === 'exhaustion_overwork') {
      score += 15;
    }
    
    if (this.getFormValue(formData, 'delegation_struggle') === 'sim') {
      score += 10;
    }
    
    // Behavioral indicators scoring (40 points total)
    if (this.getFormValue(formData, 'feminine_energy_importance') === 'muito_importante') {
      score += 15;
    }
    
    if (this.getFormValue(formData, 'leadership_interest') === 'alto') {
      score += 15;
    }
    
    const transformationReadiness = parseInt(this.getFormValue(formData, 'transformation_readiness'));
    if (transformationReadiness >= 8) {
      score += 10;
    }
    
    return Math.min(score, 100);
  }

  /**
   * Determine Amanda score tier for segmentation
   */
  static getScoreTier(score) {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  }

  /**
   * Get qualification result based on score
   */
  static getQualificationResult(score) {
    if (score >= 80) return 'priority_enrollment';
    if (score >= 60) return 'qualification_required';
    return 'redirect_alternative_resources';
  }

  /**
   * Helper to get form value from FormData or object
   */
  static getFormValue(formData, fieldName) {
    if (formData instanceof FormData) {
      return formData.get(fieldName);
    }
    return formData[fieldName] || '';
  }
}

/**
 * Landing Page Event Tracking
 * Implements all approved events from Define framework
 */
class LandingPageTracking {
  constructor(identityManager) {
    this.identityManager = identityManager;
    this.setupIntersectionObserver();
    this.attachEventListeners();
  }

  /**
   * Track modal opening with source attribution
   */
  trackModalOpen(sourceSection, ctaId, trafficTemperature = 'unknown') {
    this.identityManager.pushDataLayerEvent('modal_open', {
      source_section: sourceSection,
      cta_id: ctaId,
      traffic_temperature: trafficTemperature,
      modal_open_timestamp: new Date().toISOString()
    });
  }

  /**
   * Track form field interaction start
   */
  trackModalFormStart(formFieldFocus, timeToStart = null) {
    this.identityManager.pushDataLayerEvent('modal_form_start', {
      form_field_focus: formFieldFocus,
      time_to_start: timeToStart,
      form_start_timestamp: new Date().toISOString()
    });
  }

  /**
   * Track lead form submission with Amanda scoring
   */
  trackLeadFormSubmit(formData, calculatedAmandaScore, sourceSection, ctaId) {
    const qualificationInputs = {
      business_type: AmandaScoring.getFormValue(formData, 'business_type'),
      monthly_revenue: AmandaScoring.getFormValue(formData, 'monthly_revenue'),
      work_hours_daily: AmandaScoring.getFormValue(formData, 'work_hours_daily'),
      main_struggle: AmandaScoring.getFormValue(formData, 'main_struggle'),
      delegation_struggle: AmandaScoring.getFormValue(formData, 'delegation_struggle'),
      feminine_energy_importance: AmandaScoring.getFormValue(formData, 'feminine_energy_importance'),
      leadership_interest: AmandaScoring.getFormValue(formData, 'leadership_interest'),
      transformation_readiness: AmandaScoring.getFormValue(formData, 'transformation_readiness')
    };

    this.identityManager.pushDataLayerEvent('lead_form_submit', {
      amanda_match_score: calculatedAmandaScore,
      amanda_score_tier: AmandaScoring.getScoreTier(calculatedAmandaScore),
      qualification_result: AmandaScoring.getQualificationResult(calculatedAmandaScore),
      lead_source: 'landing_page_modal',
      source_section: sourceSection,
      cta_id: ctaId,
      qualification_inputs: qualificationInputs,
      form_completion_time: this.getFormCompletionTime(),
      user_email: AmandaScoring.getFormValue(formData, 'email'),
      user_name: AmandaScoring.getFormValue(formData, 'name'),
      user_phone: AmandaScoring.getFormValue(formData, 'phone')
    });
  }

  /**
   * Track modal abandonment
   */
  trackModalAbandon(sourceSection, timeInModal, fieldsCompleted, abandonReason = 'unknown') {
    this.identityManager.pushDataLayerEvent('modal_abandon', {
      source_section: sourceSection,
      time_in_modal: timeInModal,
      fields_completed: fieldsCompleted,
      abandon_reason: abandonReason,
      abandon_timestamp: new Date().toISOString()
    });
  }

  /**
   * Track CTA clicks across all sections
   */
  trackCtaClick(sourceSection, ctaId, ctaLabel, trafficTemperature = 'unknown') {
    this.identityManager.pushDataLayerEvent('cta_click', {
      source_section: sourceSection,
      cta_id: ctaId,
      cta_label: ctaLabel,
      traffic_temperature: trafficTemperature,
      click_timestamp: new Date().toISOString()
    });
  }

  /**
   * Track section visibility with Intersection Observer
   */
  trackSectionView(sectionName, timeToView, scrollDepth) {
    this.identityManager.pushDataLayerEvent('section_view', {
      section_name: sectionName,
      time_to_view: timeToView,
      scroll_depth: scrollDepth,
      viewport_height: window.innerHeight,
      section_view_timestamp: new Date().toISOString()
    });
  }

  /**
   * Track testimonial interactions
   */
  trackTestimonialInteraction(testimonialId, interactionType, timeSpent = null) {
    this.identityManager.pushDataLayerEvent('testimonial_interaction', {
      testimonial_id: testimonialId,
      interaction_type: interactionType, // 'view', 'click', 'hover', 'expand'
      time_spent: timeSpent,
      interaction_timestamp: new Date().toISOString()
    });
  }

  /**
   * Setup Intersection Observer for section tracking
   */
  setupIntersectionObserver() {
    if (!window.IntersectionObserver) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // 50% of section must be visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.dataset.section || entry.target.id;
          const timeToView = Date.now() - this.pageLoadTime;
          const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
          
          this.trackSectionView(sectionName, timeToView, scrollDepth);
        }
      });
    }, options);

    // Observe all sections
    document.addEventListener('DOMContentLoaded', () => {
      const sections = document.querySelectorAll('[data-section], section[id]');
      sections.forEach(section => observer.observe(section));
    });
  }

  /**
   * Attach event listeners for CTA tracking
   */
  attachEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      // Track all CTA clicks
      const ctaButtons = document.querySelectorAll('[data-cta]');
      ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          const sourceSection = this.findParentSection(button);
          const ctaId = button.dataset.cta;
          const ctaLabel = button.textContent.trim();
          
          this.trackCtaClick(sourceSection, ctaId, ctaLabel);
        });
      });

      // Track testimonial interactions
      const testimonials = document.querySelectorAll('[data-testimonial]');
      testimonials.forEach(testimonial => {
        testimonial.addEventListener('click', (e) => {
          const testimonialId = testimonial.dataset.testimonial;
          this.trackTestimonialInteraction(testimonialId, 'click');
        });
      });
    });
  }

  /**
   * Helper to find parent section of an element
   */
  findParentSection(element) {
    let parent = element.parentElement;
    while (parent && parent !== document.body) {
      if (parent.dataset.section || parent.tagName === 'SECTION') {
        return parent.dataset.section || parent.id || 'unknown';
      }
      parent = parent.parentElement;
    }
    return 'unknown';
  }

  /**
   * Calculate form completion time (placeholder - implement based on form start tracking)
   */
  getFormCompletionTime() {
    // This would be calculated from modal_form_start timestamp
    // Implementation depends on form interaction tracking
    return null;
  }
}

/**
 * Email & Questionnaire Tracking
 * Events for post-modal conversion flow
 */
class EmailQuestionnairTracking {
  constructor(identityManager) {
    this.identityManager = identityManager;
  }

  /**
   * Track questionnaire email sent (triggered by server)
   */
  trackQuestionnaireEmailSent(leadId, emailTemplate = 'questionnaire_initial') {
    this.identityManager.pushDataLayerEvent('questionnaire_email_sent', {
      lead_id: leadId,
      email_template: emailTemplate,
      send_timestamp: new Date().toISOString()
    });
  }

  /**
   * Track questionnaire email click
   */
  trackQuestionnaireClick(leadId, timeSinceSend = null, emailOpenCount = null) {
    this.identityManager.pushDataLayerEvent('questionnaire_click', {
      lead_id: leadId,
      time_since_send: timeSinceSend,
      email_open_count: emailOpenCount,
      click_timestamp: new Date().toISOString()
    });
  }

  /**
   * Track questionnaire completion
   */
  trackQuestionnaireComplete(leadId, completionTime, transformationReadinessScore) {
    this.identityManager.pushDataLayerEvent('questionnaire_complete', {
      lead_id: leadId,
      completion_time: completionTime,
      transformation_readiness_score: transformationReadinessScore,
      completion_timestamp: new Date().toISOString()
    });
  }

  /**
   * Track questionnaire abandonment
   */
  trackQuestionnaireAbandon(leadId, questionsCompleted, abandonSection) {
    this.identityManager.pushDataLayerEvent('questionnaire_abandon', {
      lead_id: leadId,
      questions_completed: questionsCompleted,
      abandon_section: abandonSection,
      abandon_timestamp: new Date().toISOString()
    });
  }

  /**
   * Track calendar booking completion
   */
  trackCalendarBookingComplete(leadId, bookingTimestamp, selectedTimeSlot) {
    this.identityManager.pushDataLayerEvent('calendar_booking_complete', {
      lead_id: leadId,
      booking_timestamp: bookingTimestamp,
      selected_time_slot: selectedTimeSlot,
      booking_complete_timestamp: new Date().toISOString()
    });
  }

  /**
   * Track WhatsApp message sent
   */
  trackWhatsAppMessageSent(leadId, messageType, deliveryStatus = 'sent') {
    this.identityManager.pushDataLayerEvent('whatsapp_message_sent', {
      lead_id: leadId,
      message_type: messageType, // 'welcome', 'reminder_24h', 'reminder_2h'
      delivery_status: deliveryStatus,
      sent_timestamp: new Date().toISOString()
    });
  }

  /**
   * Track consultation call completion
   */
  trackCallCompletion(leadId, callDuration, outcomeStatus) {
    this.identityManager.pushDataLayerEvent('call_completion', {
      lead_id: leadId,
      call_duration: callDuration,
      outcome_status: outcomeStatus, // 'enrolled', 'follow_up', 'not_qualified'
      call_completion_timestamp: new Date().toISOString()
    });
  }
}

/**
 * Initialize all tracking systems
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize identity management
  window.msluIdentityManager = new IdentityManager();
  
  // Initialize landing page tracking
  window.msluLandingTracking = new LandingPageTracking(window.msluIdentityManager);
  
  // Initialize email/questionnaire tracking
  window.msluEmailTracking = new EmailQuestionnairTracking(window.msluIdentityManager);
  
  // Track initial page view with enhanced data
  window.msluIdentityManager.pushDataLayerEvent('page_view_enhanced', {
    page_title: document.title,
    page_path: window.location.pathname,
    page_url: window.location.href,
    referrer: document.referrer,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    screen_resolution: `${screen.width}x${screen.height}`,
    user_agent: navigator.userAgent,
    language: navigator.language
  });

  // Set page load time for section view calculations
  window.msluLandingTracking.pageLoadTime = Date.now();
});

// Global utility functions for external use
window.msluTrackingUtils = {
  trackModalOpen: (sourceSection, ctaId, trafficTemp) => {
    window.msluLandingTracking.trackModalOpen(sourceSection, ctaId, trafficTemp);
  },
  
  trackFormSubmit: (formData, amandaScore, sourceSection, ctaId) => {
    window.msluLandingTracking.trackLeadFormSubmit(formData, amandaScore, sourceSection, ctaId);
  },
  
  calculateAmandaScore: (formData) => {
    return AmandaScoring.calculateScore(formData);
  },
  
  getLeadId: () => {
    return window.msluIdentityManager.getCookie('lead_id');
  },
  
  promoteToUser: (userId) => {
    window.msluIdentityManager.promoteToUser(userId);
  }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    IdentityManager,
    AmandaScoring,
    LandingPageTracking,
    EmailQuestionnairTracking
  };
}