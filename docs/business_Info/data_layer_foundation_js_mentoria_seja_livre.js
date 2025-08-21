/**
 * Data Layer Foundation for Mentoria Seja Livre
 * Complete tracking implementation for Amanda - The Exhausted Achiever avatar
 * 
 * Tech Stack: 11ty + Vite + Tailwind + GTM + GA4 + Segment + MailerLite + CRM
 * Version: 1.0
 * Date: 2025-08-20
 */

// Global DataLayer initialization
window.dataLayer = window.dataLayer || [];

// Site configuration
window.gtm_config = {
  container_id: window.location.hostname === 'mentoriasejalivre.com.br' ? 'GTM-PROD456' : 'GTM-DEV123',
  environment: window.location.hostname === 'mentoriasejalivre.com.br' ? 'production' : 'development',
  test_mode: window.location.hostname !== 'mentoriasejalivre.com.br',
  lead_id_cookie: 'mslu_lead_id',
  user_id_cookie: 'mslu_user_id',
  session_timeout: 1800000, // 30 minutes
  amanda_score_threshold: {
    high: 80,
    medium: 60,
    low: 0
  }
};

/**
 * Identity Management System
 * Handles lead_id creation, user_id promotion, and cross-session persistence
 */
class IdentityManager {
  constructor() {
    this.cookiePrefix = 'mslu_';
    this.cookieDomain = '.mentoriasejalivre.com.br';
    this.cookieExpiry = 365; // days
    this.leadId = null;
    this.userId = null;
    this.sessionId = null;
    this.trafficSource = null;
    this.init();
  }

  init() {
    this.leadId = this.getOrCreateLeadId();
    this.userId = this.getCookie('user_id');
    this.sessionId = this.getOrCreateSessionId();
    this.trafficSource = this.getOrCreateTrafficSource();
    this.initializeDataLayer();
  }

  getOrCreateLeadId() {
    let leadId = this.getCookie('lead_id');
    if (!leadId) {
      leadId = this.generateUUID();
      this.setCookie('lead_id', leadId);
      
      // Track new lead creation
      this.pushEvent('lead_id_created', {
        lead_id: leadId,
        is_new_lead: true,
        creation_timestamp: new Date().toISOString()
      });
    }
    return leadId;
  }

  getOrCreateSessionId() {
    let sessionId = sessionStorage.getItem('mslu_session_id');
    if (!sessionId) {
      sessionId = this.generateUUID();
      sessionStorage.setItem('mslu_session_id', sessionId);
      sessionStorage.setItem('session_start_time', Date.now().toString());
      
      this.pushEvent('session_start', {
        session_id: sessionId,
        is_new_session: true,
        referrer: document.referrer,
        landing_page: window.location.pathname
      });
    }
    return sessionId;
  }

  getOrCreateTrafficSource() {
    let trafficSource = this.getCookie('traffic_source');
    if (!trafficSource) {
      const urlParams = new URLSearchParams(window.location.search);
      const referrer = document.referrer;
      
      if (urlParams.get('utm_source')) {
        trafficSource = urlParams.get('utm_source');
      } else if (referrer.includes('instagram.com')) {
        trafficSource = 'instagram_organic';
      } else if (referrer.includes('whatsapp')) {
        trafficSource = 'whatsapp_direct';
      } else if (referrer === '') {
        trafficSource = 'direct';
      } else {
        trafficSource = 'referral';
      }
      
      this.setCookie('traffic_source', trafficSource);
      this.setCookie('utm_campaign', urlParams.get('utm_campaign') || '');
      this.setCookie('utm_medium', urlParams.get('utm_medium') || '');
      this.setCookie('utm_content', urlParams.get('utm_content') || '');
    }
    return trafficSource;
  }

  promoteToUser(userId) {
    // Called when lead converts to enrolled user
    this.userId = userId;
    this.setCookie('user_id', userId);
    this.setCookie('conversion_date', new Date().toISOString());
    
    this.pushEvent('identity_promotion', {
      user_id: userId,
      previous_lead_id: this.leadId,
      conversion_timestamp: new Date().toISOString(),
      traffic_source_attribution: this.trafficSource
    });
  }

  initializeDataLayer() {
    // Push initial identity data to dataLayer
    this.pushEvent('identity_initialized', {
      lead_id: this.leadId,
      user_id: this.userId,
      session_id: this.sessionId,
      traffic_source: this.trafficSource,
      is_returning_visitor: !!this.userId,
      session_count: this.getSessionCount()
    });
  }

  // Amanda avatar scoring algorithm
  calculateAmandaScore(formData) {
    let score = 0;
    
    // Demographics scoring (20 points total)
    if (formData.get('gender') === 'feminino') score += 10;
    
    const age = parseInt(formData.get('age'));
    if (age >= 30 && age <= 40) score += 5;
    
    if (formData.get('monthly_revenue') === '15k_25k') score += 5;
    
    // Pain points scoring (40 points total)
    const workHours = parseInt(formData.get('work_hours_daily'));
    if (workHours >= 10) score += 15;
    
    if (formData.get('main_struggle') === 'exhaustion_overwork') score += 15;
    
    if (formData.get('delegation_struggle') === 'sim') score += 10;
    
    // Behavioral indicators scoring (40 points total)
    if (formData.get('feminine_energy_importance') === 'muito_importante') score += 15;
    
    if (formData.get('leadership_interest') === 'alto') score += 15;
    
    const readiness = parseInt(formData.get('transformation_readiness'));
    if (readiness >= 8) score += 10;
    
    return Math.min(score, 100);
  }

  getAmandaScoreTier(score) {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  }

  // Utility methods
  pushEvent(eventName, eventData) {
    const baseData = {
      event: eventName,
      timestamp: new Date().toISOString(),
      test_mode: window.gtm_config.test_mode,
      lead_id: this.leadId,
      user_id: this.userId,
      session_id: this.sessionId,
      traffic_source: this.trafficSource
    };

    window.dataLayer.push({ ...baseData, ...eventData });
  }

  getSessionCount() {
    const count = parseInt(this.getCookie('session_count') || '0') + 1;
    this.setCookie('session_count', count.toString());
    return count;
  }

  setCookie(name, value) {
    const expires = new Date();
    expires.setDate(expires.getDate() + this.cookieExpiry);
    const cookieString = `${this.cookiePrefix}${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};domain=${this.cookieDomain};path=/;secure;samesite=lax`;
    document.cookie = cookieString;
  }

  getCookie(name) {
    const nameEQ = `${this.cookiePrefix}${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

/**
 * Modal Tracking System
 * Handles all modal interactions and form submissions
 */
class ModalTracker {
  constructor() {
    this.modalElement = null;
    this.formStartTime = null;
    this.sourceSection = null;
    this.ctaId = null;
    this.fieldsCompleted = [];
    this.timeInModal = 0;
    this.modalOpenTime = null;
  }

  trackModalOpen(sourceSection, ctaId, trafficTemperature = 'unknown') {
    this.sourceSection = sourceSection;
    this.ctaId = ctaId;
    this.modalOpenTime = Date.now();
    
    window.identityManager.pushEvent('modal_open', {
      source_section: sourceSection,
      cta_id: ctaId,
      traffic_temperature: trafficTemperature,
      page_path: window.location.pathname,
      page_title: document.title
    });
  }

  trackFormStart(fieldName) {
    if (!this.formStartTime) {
      this.formStartTime = Date.now();
      
      window.identityManager.pushEvent('modal_form_start', {
        source_section: this.sourceSection,
        cta_id: this.ctaId,
        first_field_focus: fieldName,
        time_to_start: this.formStartTime - this.modalOpenTime
      });
    }
  }

  trackFieldCompletion(fieldName, fieldValue) {
    if (!this.fieldsCompleted.includes(fieldName)) {
      this.fieldsCompleted.push(fieldName);
      
      window.identityManager.pushEvent('form_field_complete', {
        field_name: fieldName,
        fields_completed_count: this.fieldsCompleted.length,
        completion_progress: (this.fieldsCompleted.length / 8) * 100 // Assuming 8 total fields
      });
    }
  }

  trackFormSubmit(formData) {
    const amandaScore = window.identityManager.calculateAmandaScore(formData);
    const completionTime = Date.now() - this.formStartTime;
    const totalTimeInModal = Date.now() - this.modalOpenTime;
    
    const eventData = {
      amanda_match_score: amandaScore,
      amanda_score_tier: window.identityManager.getAmandaScoreTier(amandaScore),
      lead_source: 'landing_page_modal',
      form_completion_time: completionTime,
      total_time_in_modal: totalTimeInModal,
      source_section: this.sourceSection,
      cta_id: this.ctaId,
      qualification_inputs: {
        business_type: formData.get('business_type'),
        monthly_revenue: formData.get('monthly_revenue'),
        work_hours_daily: formData.get('work_hours_daily'),
        main_struggle: formData.get('main_struggle'),
        gender: formData.get('gender'),
        age: formData.get('age'),
        delegation_struggle: formData.get('delegation_struggle'),
        feminine_energy_importance: formData.get('feminine_energy_importance'),
        leadership_interest: formData.get('leadership_interest'),
        transformation_readiness: formData.get('transformation_readiness')
      },
      user_email: formData.get('email'),
      user_name: formData.get('name'),
      user_phone: formData.get('phone'),
      fields_completed: this.fieldsCompleted.length,
      form_abandonment_rate: (this.fieldsCompleted.length / 8) * 100
    };

    window.identityManager.pushEvent('lead_form_submit', eventData);
  }

  trackModalAbandon() {
    const timeInModal = Date.now() - this.modalOpenTime;
    
    window.identityManager.pushEvent('modal_abandon', {
      source_section: this.sourceSection,
      cta_id: this.ctaId,
      time_in_modal: timeInModal,
      fields_completed: this.fieldsCompleted.length,
      abandon_reason: this.inferAbandonReason(),
      completion_percentage: (this.fieldsCompleted.length / 8) * 100
    });
  }

  inferAbandonReason() {
    if (this.fieldsCompleted.length === 0) return 'immediate_exit';
    if (this.fieldsCompleted.length < 3) return 'early_abandon';
    if (this.fieldsCompleted.length < 6) return 'mid_form_abandon';
    return 'near_completion_abandon';
  }
}

/**
 * Landing Page Section Tracking
 * Tracks section visibility and engagement
 */
class SectionTracker {
  constructor() {
    this.visibleSections = new Set();
    this.sectionTimers = new Map();
    this.observerOptions = {
      threshold: 0.5, // 50% visibility
      rootMargin: '0px 0px -100px 0px' // Trigger before reaching bottom
    };
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        this.observerOptions
      );
      
      // Observe all sections
      document.querySelectorAll('[data-section]').forEach(section => {
        this.observer.observe(section);
      });
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      const sectionName = entry.target.dataset.section;
      
      if (entry.isIntersecting) {
        if (!this.visibleSections.has(sectionName)) {
          this.visibleSections.add(sectionName);
          this.sectionTimers.set(sectionName, Date.now());
          
          window.identityManager.pushEvent('section_view', {
            section_name: sectionName,
            scroll_depth: this.calculateScrollDepth(),
            time_to_view: this.calculateTimeToView(sectionName)
          });
        }
      } else {
        if (this.visibleSections.has(sectionName)) {
          const viewTime = Date.now() - this.sectionTimers.get(sectionName);
          
          window.identityManager.pushEvent('section_exit', {
            section_name: sectionName,
            time_in_section: viewTime
          });
          
          this.visibleSections.delete(sectionName);
          this.sectionTimers.delete(sectionName);
        }
      }
    });
  }

  calculateScrollDepth() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return Math.round((scrollTop / docHeight) * 100);
  }

  calculateTimeToView(sectionName) {
    const sessionStartTime = parseInt(sessionStorage.getItem('session_start_time') || Date.now().toString());
    return Date.now() - sessionStartTime;
  }
}

/**
 * CTA Tracking System
 * Tracks all call-to-action button clicks
 */
class CTATracker {
  constructor() {
    this.init();
  }

  init() {
    // Track all CTA button clicks
    document.addEventListener('click', this.handleCTAClick.bind(this));
  }

  handleCTAClick(event) {
    const ctaElement = event.target.closest('[data-cta]');
    if (!ctaElement) return;

    const ctaData = {
      cta_id: ctaElement.dataset.cta,
      cta_label: ctaElement.textContent.trim(),
      cta_type: ctaElement.dataset.ctaType || 'primary',
      source_section: this.findParentSection(ctaElement),
      cta_position: this.calculateCTAPosition(ctaElement),
      page_path: window.location.pathname
    };

    window.identityManager.pushEvent('cta_click', ctaData);

    // Special handling for modal-opening CTAs
    if (ctaElement.dataset.cta === 'cta_primary') {
      window.modalTracker.trackModalOpen(
        ctaData.source_section,
        ctaData.cta_id,
        this.getTrafficTemperature()
      );
    }
  }

  findParentSection(element) {
    const sectionElement = element.closest('[data-section]');
    return sectionElement ? sectionElement.dataset.section : 'unknown';
  }

  calculateCTAPosition(element) {
    const rect = element.getBoundingClientRect();
    const isAboveFold = rect.top < window.innerHeight;
    return isAboveFold ? 'above_fold' : 'below_fold';
  }

  getTrafficTemperature() {
    const isReturning = !!window.identityManager.userId;
    const sessionCount = parseInt(window.identityManager.getCookie('session_count') || '1');
    
    if (isReturning || sessionCount > 3) return 'hot';
    if (sessionCount > 1) return 'warm';
    return 'cold';
  }
}

/**
 * Enhanced Page View Tracking
 * Comprehensive page load and user context tracking
 */
class PageTracker {
  constructor() {
    this.pageLoadTime = Date.now();
    this.init();
  }

  init() {
    // Track enhanced page view
    window.addEventListener('DOMContentLoaded', () => {
      this.trackPageView();
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.trackPageUnload();
    });
  }

  trackPageView() {
    const pageData = {
      page_title: document.title,
      page_path: window.location.pathname,
      page_search: window.location.search,
      page_hash: window.location.hash,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      device_type: this.getDeviceType(),
      browser_language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      page_load_time: Date.now() - this.pageLoadTime,
      utm_parameters: this.getUTMParameters()
    };

    window.identityManager.pushEvent('page_view_enhanced', pageData);
  }

  trackPageUnload() {
    const timeOnPage = Date.now() - this.pageLoadTime;
    const scrollDepth = this.calculateMaxScrollDepth();
    
    window.identityManager.pushEvent('page_unload', {
      time_on_page: timeOnPage,
      max_scroll_depth: scrollDepth,
      page_path: window.location.pathname
    });
  }

  getDeviceType() {
    if (window.innerWidth <= 768) return 'mobile';
    if (window.innerWidth <= 1024) return 'tablet';
    return 'desktop';
  }

  getUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || ''
    };
  }

  calculateMaxScrollDepth() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return Math.round((scrollTop / docHeight) * 100);
  }
}

/**
 * Error Tracking System
 * Captures and reports JavaScript errors and tracking failures
 */
class ErrorTracker {
  constructor() {
    this.init();
  }

  init() {
    // Global error handling
    window.addEventListener('error', this.handleError.bind(this));
    window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
    
    // Track GTM failures
    this.monitorGTMLoad();
  }

  handleError(event) {
    const errorData = {
      error_message: event.message,
      error_source: event.filename,
      error_line: event.lineno,
      error_column: event.colno,
      error_stack: event.error ? event.error.stack : '',
      page_path: window.location.pathname,
      user_agent: navigator.userAgent
    };

    window.identityManager.pushEvent('javascript_error', errorData);
  }

  handlePromiseRejection(event) {
    const errorData = {
      error_message: event.reason,
      error_type: 'promise_rejection',
      page_path: window.location.pathname
    };

    window.identityManager.pushEvent('promise_rejection', errorData);
  }

  monitorGTMLoad() {
    // Check if GTM loaded successfully
    setTimeout(() => {
      if (typeof window.google_tag_manager === 'undefined') {
        window.identityManager.pushEvent('gtm_load_failure', {
          container_id: window.gtm_config.container_id,
          page_path: window.location.pathname
        });
      }
    }, 5000);
  }
}

// Initialize all tracking systems when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Global instances
  window.identityManager = new IdentityManager();
  window.modalTracker = new ModalTracker();
  window.sectionTracker = new SectionTracker();
  window.ctaTracker = new CTATracker();
  window.pageTracker = new PageTracker();
  window.errorTracker = new ErrorTracker();

  // Global utility functions for templates
  window.trackEvent = function(eventName, eventData) {
    window.identityManager.pushEvent(eventName, eventData);
  };

  window.getLeadId = function() {
    return window.identityManager.leadId;
  };

  window.getUserId = function() {
    return window.identityManager.userId;
  };

  window.calculateAmandaScore = function(formData) {
    return window.identityManager.calculateAmandaScore(formData);
  };

  // Debug mode for development
  if (window.gtm_config.test_mode) {
    window.debugTracking = function() {
      console.log('Identity Manager:', window.identityManager);
      console.log('DataLayer:', window.dataLayer);
      console.log('GTM Config:', window.gtm_config);
    };
    
    console.log('🎯 Mentoria Seja Livre Tracking Initialized (DEBUG MODE)');
    console.log('Lead ID:', window.identityManager.leadId);
    console.log('Traffic Source:', window.identityManager.trafficSource);
  }
});