# Gate 2: integrations_ok - Forms, Checkout & Integrations Engineer (FCI) Tasks
## Mentoria Seja Livre Landing Page - Forms & Integration Implementation

**Gate Owner:** Forms, Checkout & Integrations Engineer (FCI)  
**Gate Status:** PENDING  
**Dependencies:** Gate 1 (ui_ok) MUST pass first  
**Blocking:** Gates 3, 4, 5 until integrations_ok validation passes  

---

## GATE 2 VALIDATION CRITERIA

### Technical Requirements
- [ ] Amanda avatar scoring algorithm implemented and tested
- [ ] Lead capture forms with progressive disclosure functional
- [ ] lead_id generation and UTM parameter capture working
- [ ] Client-side form validation with Portuguese error messaging
- [ ] Stripe Payment Element setup (for future payment processing)
- [ ] Error handling and graceful degradation implemented
- [ ] Form submission success/error states properly handled

### Evidence Required for Gate Passage
1. **Amanda Scoring Demo:** Test scenarios with expected outputs (20/40/40 distribution)
2. **Form Functionality:** All form states working with validation
3. **UTM Capture:** URL parameters properly captured and stored
4. **Error Handling:** Graceful degradation demonstrations
5. **Stripe Setup:** Payment Element loading and test mode validation

---

## AMANDA AVATAR SCORING IMPLEMENTATION

### Task 2.1: Core Scoring Algorithm
**Priority:** CRITICAL  
**Estimated Time:** 6 hours

Implement the Amanda avatar scoring system with 100-point scale:

**File:** `src/assets/js/amanda-scoring.js`
```javascript
class AmandaScoring {
  constructor() {
    this.totalScore = 0;
    this.demographicScore = 0;
    this.painPointScore = 0;
    this.behaviorScore = 0;
    this.qualificationInputs = {};
  }

  // Demographics Section (20 points maximum)
  calculateDemographicScore(formData) {
    let score = 0;
    
    // Age: 35-42 years (5 points)
    const age = parseInt(formData.age);
    if (age >= 35 && age <= 42) {
      score += 5;
      this.qualificationInputs.age_match = true;
    }
    
    // Gender: Female (5 points)
    if (formData.gender === 'feminino') {
      score += 5;
      this.qualificationInputs.gender_match = true;
    }
    
    // Location: Brazil/Portugal (5 points)
    if (['brasil', 'portugal'].includes(formData.location.toLowerCase())) {
      score += 5;
      this.qualificationInputs.location_match = true;
    }
    
    // Income: R$15k-30k/month (5 points)
    const monthlyIncome = parseInt(formData.monthly_income);
    if (monthlyIncome >= 15000 && monthlyIncome <= 30000) {
      score += 5;
      this.qualificationInputs.income_match = true;
    }
    
    this.demographicScore = score;
    return score;
  }

  // Pain Points Section (40 points maximum)
  calculatePainPointScore(formData) {
    let score = 0;
    
    // Work Hours: 10+ hours/day (10 points)
    const dailyHours = parseInt(formData.daily_work_hours);
    if (dailyHours >= 10) {
      score += 10;
      this.qualificationInputs.excessive_hours = true;
    }
    
    // Exhaustion Level: Rating 7-10 (10 points)
    const exhaustionLevel = parseInt(formData.exhaustion_level);
    if (exhaustionLevel >= 7) {
      score += 10;
      this.qualificationInputs.high_exhaustion = true;
    }
    
    // Delegation Struggle: Rating 7-10 (10 points)
    const delegationStruggles = parseInt(formData.delegation_difficulty);
    if (delegationStruggles >= 7) {
      score += 10;
      this.qualificationInputs.delegation_issues = true;
    }
    
    // Feeling Trapped: Rating 7-10 (10 points)
    const trappedFeeling = parseInt(formData.trapped_feeling);
    if (trappedFeeling >= 7) {
      score += 10;
      this.qualificationInputs.feeling_trapped = true;
    }
    
    this.painPointScore = score;
    return score;
  }

  // Behavior Section (40 points maximum)
  calculateBehaviorScore(formData) {
    let score = 0;
    
    // Business Owner: Yes (10 points)
    if (formData.business_owner === 'sim') {
      score += 10;
      this.qualificationInputs.is_business_owner = true;
    }
    
    // Team Size: 3+ employees (10 points)
    const teamSize = parseInt(formData.team_size);
    if (teamSize >= 3) {
      score += 10;
      this.qualificationInputs.has_team = true;
    }
    
    // Investment Ready: R$5k+ budget (10 points)
    const investmentBudget = parseInt(formData.investment_budget);
    if (investmentBudget >= 5000) {
      score += 10;
      this.qualificationInputs.investment_ready = true;
    }
    
    // Time Commitment: Available for mentoring (10 points)
    if (formData.time_availability === 'sim') {
      score += 10;
      this.qualificationInputs.time_available = true;
    }
    
    this.behaviorScore = score;
    return score;
  }

  // Calculate total score and qualification tier
  calculateTotalScore(formData) {
    const demographic = this.calculateDemographicScore(formData);
    const painPoint = this.calculatePainPointScore(formData);
    const behavior = this.calculateBehaviorScore(formData);
    
    this.totalScore = demographic + painPoint + behavior;
    
    return {
      totalScore: this.totalScore,
      demographicScore: demographic,
      painPointScore: painPoint, 
      behaviorScore: behavior,
      qualificationTier: this.getQualificationTier(),
      qualificationInputs: this.qualificationInputs
    };
  }

  getQualificationTier() {
    if (this.totalScore >= 80) return 'high_priority';
    if (this.totalScore >= 60) return 'qualified';
    if (this.totalScore >= 40) return 'lower_priority';
    return 'unqualified';
  }

  // Get qualification message for user feedback
  getQualificationMessage() {
    const tier = this.getQualificationTier();
    
    const messages = {
      high_priority: 'Perfeito! Você é exatamente o perfil que mais se beneficia da mentoria.',
      qualified: 'Ótimo! Você tem um perfil compatível com nossa metodologia.',
      lower_priority: 'Você pode se beneficiar da mentoria com algumas adaptações.',
      unqualified: 'Obrigada pelo interesse. Vamos te enviar conteúdo educativo primeiro.'
    };
    
    return messages[tier];
  }
}

export default AmandaScoring;
```

### Task 2.2: Form Integration and Progressive Disclosure
**Priority:** CRITICAL  
**Estimated Time:** 5 hours

Integrate Amanda scoring with progressive form disclosure:

**File:** `src/assets/js/form-handler.js`
```javascript
import AmandaScoring from './amanda-scoring.js';
import { generateLeadId, captureUTMParams } from './lead-utils.js';

class FormHandler {
  constructor(formElement) {
    this.form = formElement;
    this.currentStep = 1;
    this.maxSteps = 3;
    this.amandaScoring = new AmandaScoring();
    this.leadId = generateLeadId();
    this.utmParams = captureUTMParams();
    this.formStartTime = Date.now();
    
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.setLeadIdInForm();
    this.trackFormStart();
  }

  attachEventListeners() {
    // Step navigation
    this.form.addEventListener('click', (e) => {
      if (e.target.matches('.next-step')) {
        this.nextStep();
      }
      if (e.target.matches('.prev-step')) {
        this.prevStep();
      }
    });

    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission();
    });

    // Real-time validation
    this.form.addEventListener('input', (e) => {
      this.validateField(e.target);
    });
  }

  nextStep() {
    if (this.validateCurrentStep() && this.currentStep < this.maxSteps) {
      this.hideStep(this.currentStep);
      this.currentStep++;
      this.showStep(this.currentStep);
      this.updateProgressIndicator();
      
      // Track step progression
      this.trackStepProgression(this.currentStep);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.hideStep(this.currentStep);
      this.currentStep--;
      this.showStep(this.currentStep);
      this.updateProgressIndicator();
    }
  }

  validateCurrentStep() {
    const currentStepElement = this.form.querySelector(`[data-step="${this.currentStep}"]`);
    const requiredFields = currentStepElement.querySelectorAll('input[required], select[required]');
    
    let isValid = true;
    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Este campo é obrigatório.';
    }

    // Email validation
    if (fieldType === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Por favor, insira um email válido.';
      }
    }

    // Phone validation (Brazilian format)
    if (fieldName === 'phone' && value) {
      const phoneRegex = /^\(?[1-9]{2}\)?[\s-]?9?[0-9]{4}[\s-]?[0-9]{4}$/;
      if (!phoneRegex.test(value.replace(/\D/g, ''))) {
        isValid = false;
        errorMessage = 'Por favor, insira um telefone válido.';
      }
    }

    // Age validation
    if (fieldName === 'age' && value) {
      const age = parseInt(value);
      if (age < 18 || age > 70) {
        isValid = false;
        errorMessage = 'Idade deve estar entre 18 e 70 anos.';
      }
    }

    this.displayFieldValidation(field, isValid, errorMessage);
    return isValid;
  }

  displayFieldValidation(field, isValid, errorMessage) {
    const fieldContainer = field.closest('.form-group');
    const errorElement = fieldContainer.querySelector('.form-error');
    
    if (isValid) {
      field.classList.remove('border-red-500');
      field.classList.add('border-success-500');
      errorElement.classList.add('hidden');
      errorElement.textContent = '';
    } else {
      field.classList.remove('border-success-500');
      field.classList.add('border-red-500');
      errorElement.classList.remove('hidden');
      errorElement.textContent = errorMessage;
    }
  }

  async handleFormSubmission() {
    if (!this.validateCurrentStep()) {
      return;
    }

    const formData = this.collectFormData();
    const scoringResult = this.amandaScoring.calculateTotalScore(formData);
    
    // Track form completion
    this.trackFormSubmit(scoringResult);
    
    try {
      const response = await this.submitToServer({
        ...formData,
        ...scoringResult,
        leadId: this.leadId,
        utmParams: this.utmParams,
        formCompletionTime: Date.now() - this.formStartTime
      });

      if (response.success) {
        this.handleSubmissionSuccess(scoringResult);
      } else {
        this.handleSubmissionError(response.error);
      }
    } catch (error) {
      this.handleSubmissionError(error.message);
    }
  }

  collectFormData() {
    const formData = new FormData(this.form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    return data;
  }

  async submitToServer(data) {
    const response = await fetch('/.netlify/functions/lead-capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    return await response.json();
  }

  handleSubmissionSuccess(scoringResult) {
    // Show success message based on Amanda score
    const message = this.amandaScoring.getQualificationMessage();
    this.showSuccessModal(message, scoringResult.qualificationTier);
    
    // Redirect based on qualification tier
    setTimeout(() => {
      const redirectUrl = this.getRedirectUrl(scoringResult.qualificationTier);
      window.location.href = redirectUrl;
    }, 3000);
  }

  handleSubmissionError(errorMessage) {
    this.showErrorModal(errorMessage);
  }

  getRedirectUrl(qualificationTier) {
    const urls = {
      high_priority: '/obrigada?priority=high',
      qualified: '/obrigada?priority=normal',
      lower_priority: '/obrigada?priority=low',
      unqualified: '/obrigada?priority=nurture'
    };
    
    return urls[qualificationTier] || '/obrigada';
  }

  // Analytics tracking methods
  trackFormStart() {
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        event: 'form_start',
        form_type: 'amanda_qualification',
        lead_id: this.leadId,
        source_section: this.form.dataset.sourceSection || 'unknown'
      });
    }
  }

  trackStepProgression(step) {
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        event: 'form_step_complete',
        form_step: step,
        form_type: 'amanda_qualification',
        lead_id: this.leadId
      });
    }
  }

  trackFormSubmit(scoringResult) {
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        event: 'lead_form_submit',
        amanda_match_score: scoringResult.totalScore,
        qualification_tier: scoringResult.qualificationTier,
        qualification_inputs: scoringResult.qualificationInputs,
        form_completion_time: Date.now() - this.formStartTime,
        lead_id: this.leadId
      });
    }
  }
}

export default FormHandler;
```

---

## LEAD ID AND UTM MANAGEMENT

### Task 2.3: Lead Identification System
**Priority:** CRITICAL  
**Estimated Time:** 3 hours

Implement lead_id generation and UTM parameter capture:

**File:** `src/assets/js/lead-utils.js`
```javascript
// Lead ID generation and management
export function generateLeadId() {
  // Check if lead_id already exists in localStorage
  let leadId = localStorage.getItem('sense_lead_id');
  
  if (!leadId) {
    // Generate new lead_id with timestamp and random component
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    leadId = `lead_${timestamp}_${random}`;
    
    localStorage.setItem('sense_lead_id', leadId);
    
    // Track new lead creation
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        event: 'lead_id_created',
        lead_id: leadId,
        timestamp: timestamp
      });
    }
  }
  
  return leadId;
}

// UTM parameter capture and storage
export function captureUTMParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};
  
  // Standard UTM parameters
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  
  utmKeys.forEach(key => {
    if (urlParams.has(key)) {
      utmParams[key] = urlParams.get(key);
    }
  });
  
  // Additional tracking parameters
  const additionalKeys = ['gclid', 'fbclid', 'ref'];
  additionalKeys.forEach(key => {
    if (urlParams.has(key)) {
      utmParams[key] = urlParams.get(key);
    }
  });
  
  // Store in localStorage with timestamp
  if (Object.keys(utmParams).length > 0) {
    const utmData = {
      params: utmParams,
      captured_at: Date.now(),
      page_url: window.location.href
    };
    
    localStorage.setItem('sense_utm_params', JSON.stringify(utmData));
  }
  
  return utmParams;
}

// Session and page tracking
export function trackPageView() {
  const leadId = generateLeadId();
  const utmParams = captureUTMParams();
  
  // Determine traffic temperature
  const trafficTemperature = determineTrafficTemperature();
  
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      event: 'page_view',
      lead_id: leadId,
      utm_params: utmParams,
      traffic_temperature: trafficTemperature,
      page_url: window.location.href,
      referrer: document.referrer
    });
  }
}

function determineTrafficTemperature() {
  const referrer = document.referrer;
  const utmSource = new URLSearchParams(window.location.search).get('utm_source');
  const hasReturnVisit = localStorage.getItem('sense_return_visitor');
  
  if (hasReturnVisit) return 'hot';
  if (utmSource === 'email' || utmSource === 'newsletter') return 'warm';
  if (referrer.includes('google') || referrer.includes('facebook')) return 'cold';
  if (referrer === '') return 'direct';
  
  return 'cold';
}

// Mark user as return visitor
export function markReturnVisitor() {
  localStorage.setItem('sense_return_visitor', Date.now().toString());
}
```

---

## STRIPE INTEGRATION SETUP

### Task 2.4: Stripe Payment Element Foundation
**Priority:** MEDIUM  
**Estimated Time:** 4 hours

Set up Stripe integration for future payment processing:

**File:** `src/assets/js/stripe-integration.js`
```javascript
// Stripe Payment Element setup for future use
class StripeIntegration {
  constructor() {
    this.stripe = null;
    this.elements = null;
    this.paymentElement = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Load Stripe.js
      if (!window.Stripe) {
        await this.loadStripeScript();
      }

      // Initialize Stripe with publishable key
      this.stripe = window.Stripe(this.getPublishableKey());
      
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
    }
  }

  loadStripeScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  getPublishableKey() {
    // Return test key for development, production key for production
    const isProduction = window.location.hostname !== 'localhost';
    return isProduction 
      ? 'pk_live_...' // Production key (to be added later)
      : 'pk_test_...'; // Test key (to be added later)
  }

  async createPaymentIntent(amount, metadata = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'brl',
        metadata: {
          lead_id: generateLeadId(),
          amanda_score: metadata.amanda_score || 0,
          ...metadata
        }
      }),
    });

    return await response.json();
  }

  async setupPaymentElement(clientSecret, containerId) {
    if (!this.initialized) {
      await this.initialize();
    }

    const appearance = {
      theme: 'stripe',
      variables: {
        colorPrimary: '#ec4899', // Primary pink color
        colorBackground: '#ffffff',
        colorText: '#374151',
        colorDanger: '#ef4444',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    };

    this.elements = this.stripe.elements({
      clientSecret,
      appearance
    });

    this.paymentElement = this.elements.create('payment');
    this.paymentElement.mount(`#${containerId}`);

    return this.paymentElement;
  }

  async confirmPayment(elements, confirmParams = {}) {
    const { error } = await this.stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/pagamento-confirmado`,
        ...confirmParams
      },
    });

    return { error };
  }
}

export default StripeIntegration;
```

---

## ERROR HANDLING AND VALIDATION

### Task 2.5: Comprehensive Error Handling
**Priority:** HIGH  
**Estimated Time:** 3 hours

Implement robust error handling with Portuguese messaging:

**File:** `src/assets/js/error-handler.js`
```javascript
class ErrorHandler {
  constructor() {
    this.errorMessages = {
      // Network errors
      network_error: 'Erro de conexão. Verifique sua internet e tente novamente.',
      timeout_error: 'A requisição demorou muito. Tente novamente.',
      
      // Form validation errors
      required_field: 'Este campo é obrigatório.',
      invalid_email: 'Por favor, insira um email válido.',
      invalid_phone: 'Por favor, insira um telefone válido.',
      invalid_age: 'Idade deve estar entre 18 e 70 anos.',
      
      // Server errors
      server_error: 'Erro interno do servidor. Nossa equipe foi notificada.',
      rate_limit: 'Muitas tentativas. Aguarde alguns minutos.',
      
      // Payment errors
      card_declined: 'Cartão recusado. Verifique os dados ou tente outro cartão.',
      insufficient_funds: 'Saldo insuficiente.',
      
      // General errors
      generic_error: 'Algo deu errado. Tente novamente ou entre em contato conosco.'
    };
  }

  handleFormError(error, formElement) {
    const errorType = this.categorizeError(error);
    const message = this.errorMessages[errorType] || this.errorMessages.generic_error;
    
    this.displayFormError(formElement, message);
    this.trackError(error, 'form_error');
  }

  handleNetworkError(error) {
    const message = error.code === 'ECONNABORTED' 
      ? this.errorMessages.timeout_error
      : this.errorMessages.network_error;
    
    this.showErrorModal(message);
    this.trackError(error, 'network_error');
  }

  categorizeError(error) {
    if (error.name === 'ValidationError') return 'required_field';
    if (error.code === 'ECONNABORTED') return 'timeout_error';
    if (error.status === 429) return 'rate_limit';
    if (error.status >= 500) return 'server_error';
    
    return 'generic_error';
  }

  displayFormError(formElement, message) {
    let errorContainer = formElement.querySelector('.form-error-container');
    
    if (!errorContainer) {
      errorContainer = document.createElement('div');
      errorContainer.className = 'form-error-container bg-red-50 border border-red-200 p-4 rounded-lg mt-4';
      formElement.appendChild(errorContainer);
    }

    errorContainer.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        <div class="text-red-700">
          <p class="font-medium">Erro no formulário</p>
          <p class="text-sm">${message}</p>
        </div>
      </div>
    `;

    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  showErrorModal(message) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-lg max-w-md mx-4">
        <div class="flex items-center mb-4">
          <svg class="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900">Oops! Algo deu errado</h3>
        </div>
        <p class="text-gray-700 mb-6">${message}</p>
        <div class="flex justify-end">
          <button class="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600" 
                  onclick="this.closest('.fixed').remove()">
            Entendi
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
    }, 5000);
  }

  trackError(error, errorType) {
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        event: 'error_occurred',
        error_type: errorType,
        error_message: error.message || 'Unknown error',
        error_stack: error.stack || '',
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        timestamp: Date.now()
      });
    }

    // Also log to console for debugging
    console.error(`${errorType}:`, error);
  }
}

export default ErrorHandler;
```

---

## FORM TEMPLATES AND COMPONENTS

### Task 2.6: Progressive Form Templates
**Priority:** HIGH  
**Estimated Time:** 4 hours

Create the complete form templates with progressive disclosure:

**File:** `src/_includes/components/amanda-qualification-form.njk`
```html
<form class="amanda-form" data-form-type="amanda-qualification">
  <!-- Progress Indicator -->
  <div class="form-progress mb-6">
    <div class="flex justify-between items-center">
      <span class="text-sm text-gray-600">Etapa <span class="current-step">1</span> de 3</span>
      <div class="flex space-x-2">
        <div class="step-indicator active bg-primary-500 w-8 h-2 rounded"></div>
        <div class="step-indicator bg-gray-200 w-8 h-2 rounded"></div>
        <div class="step-indicator bg-gray-200 w-8 h-2 rounded"></div>
      </div>
    </div>
  </div>

  <!-- Step 1: Demographics (20 points) -->
  <div class="form-step" data-step="1">
    <h3 class="text-xl font-heading text-primary-900 mb-4">
      Primeiro, me conte um pouco sobre você
    </h3>
    
    <div class="space-y-4">
      <div class="form-group">
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
          Seu nome completo *
        </label>
        <input type="text" 
               id="name" 
               name="name" 
               required
               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
               placeholder="Digite seu nome completo">
        <div class="form-error hidden text-red-600 text-sm mt-1" role="alert"></div>
      </div>

      <div class="form-group">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Seu melhor email *
        </label>
        <input type="email" 
               id="email" 
               name="email" 
               required
               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
               placeholder="seuemail@exemplo.com">
        <div class="form-hint text-gray-500 text-sm mt-1">
          Enviaremos o questionário completo por email
        </div>
        <div class="form-error hidden text-red-600 text-sm mt-1" role="alert"></div>
      </div>

      <div class="form-group">
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
          WhatsApp *
        </label>
        <input type="tel" 
               id="phone" 
               name="phone" 
               required
               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
               placeholder="(11) 99999-9999">
        <div class="form-error hidden text-red-600 text-sm mt-1" role="alert"></div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label for="age" class="block text-sm font-medium text-gray-700 mb-2">
            Idade *
          </label>
          <select id="age" name="age" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            <option value="">Selecione</option>
            {% for age in range(25, 56) %}
            <option value="{{ age }}">{{ age }} anos</option>
            {% endfor %}
          </select>
          <div class="form-error hidden text-red-600 text-sm mt-1" role="alert"></div>
        </div>

        <div class="form-group">
          <label for="location" class="block text-sm font-medium text-gray-700 mb-2">
            País *
          </label>
          <select id="location" name="location" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            <option value="">Selecione</option>
            <option value="brasil">Brasil</option>
            <option value="portugal">Portugal</option>
            <option value="outros">Outro país</option>
          </select>
          <div class="form-error hidden text-red-600 text-sm mt-1" role="alert"></div>
        </div>
      </div>
    </div>

    <div class="form-actions mt-6">
      <button type="button" 
              class="next-step w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors">
        Continuar
      </button>
    </div>
  </div>

  <!-- Step 2: Pain Points (40 points) -->
  <div class="form-step hidden" data-step="2">
    <h3 class="text-xl font-heading text-primary-900 mb-4">
      Agora, sobre sua rotina atual
    </h3>
    
    <div class="space-y-6">
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Quantas horas por dia você trabalha? *
        </label>
        <div class="grid grid-cols-2 gap-3">
          <label class="radio-option">
            <input type="radio" name="daily_work_hours" value="6" required>
            <span>Até 6 horas</span>
          </label>
          <label class="radio-option">
            <input type="radio" name="daily_work_hours" value="8" required>
            <span>7-8 horas</span>
          </label>
          <label class="radio-option">
            <input type="radio" name="daily_work_hours" value="10" required>
            <span>9-10 horas</span>
          </label>
          <label class="radio-option">
            <input type="radio" name="daily_work_hours" value="12" required>
            <span>Mais de 10 horas</span>
          </label>
        </div>
        <div class="form-error hidden text-red-600 text-sm mt-1" role="alert"></div>
      </div>

      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-3">
          Como você se sente ao final do dia? *
        </label>
        <div class="scale-selector">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>Energizada</span>
            <span>Completamente exausta</span>
          </div>
          <div class="flex justify-between">
            {% for i in range(1, 11) %}
            <label class="scale-option">
              <input type="radio" name="exhaustion_level" value="{{ i }}" required>
              <span class="scale-number">{{ i }}</span>
            </label>
            {% endfor %}
          </div>
        </div>
        <div class="form-error hidden text-red-600 text-sm mt-1" role="alert"></div>
      </div>

      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-3">
          Delegar tarefas é difícil para você? *
        </label>
        <div class="scale-selector">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>Super fácil</span>
            <span>Impossível</span>
          </div>
          <div class="flex justify-between">
            {% for i in range(1, 11) %}
            <label class="scale-option">
              <input type="radio" name="delegation_difficulty" value="{{ i }}" required>
              <span class="scale-number">{{ i }}</span>
            </label>
            {% endfor %}
          </div>
        </div>
        <div class="form-error hidden text-red-600 text-sm mt-1" role="alert"></div>
      </div>
    </div>

    <div class="form-actions mt-6 flex space-x-4">
      <button type="button" 
              class="prev-step flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
        Voltar
      </button>
      <button type="button" 
              class="next-step flex-1 bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors">
        Continuar
      </button>
    </div>
  </div>

  <!-- Step 3: Business & Behavior (40 points) -->
  <div class="form-step hidden" data-step="3">
    <h3 class="text-xl font-heading text-primary-900 mb-4">
      Por último, sobre seu negócio
    </h3>
    
    <div class="space-y-6">
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Qual seu faturamento mensal atual? *
        </label>
        <select name="monthly_income" required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
          <option value="">Selecione</option>
          <option value="5000">Até R$ 5.000</option>
          <option value="10000">R$ 5.001 - R$ 10.000</option>
          <option value="20000">R$ 10.001 - R$ 20.000</option>
          <option value="30000">R$ 20.001 - R$ 30.000</option>
          <option value="50000">R$ 30.001 - R$ 50.000</option>
          <option value="100000">Mais de R$ 50.000</option>
        </select>
        <div class="form-error hidden text-red-600 text-sm mt-1" role="alert"></div>
      </div>

      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Quantas pessoas trabalham no seu negócio? *
        </label>
        <select name="team_size" required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
          <option value="">Selecione</option>
          <option value="0">Só eu</option>
          <option value="1">1 pessoa</option>
          <option value="3">2-3 pessoas</option>
          <option value="5">4-5 pessoas</option>
          <option value="10">Mais de 5 pessoas</option>
        </select>
        <div class="form-error hidden text-red-600 text-sm mt-1" role="alert"></div>
      </div>

      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Você teria disponibilidade para uma mentoria semanal? *
        </label>
        <div class="grid grid-cols-2 gap-3">
          <label class="radio-option">
            <input type="radio" name="time_availability" value="sim" required>
            <span>Sim, tenho interesse</span>
          </label>
          <label class="radio-option">
            <input type="radio" name="time_availability" value="nao" required>
            <span>Não tenho tempo agora</span>
          </label>
        </div>
        <div class="form-error hidden text-red-600 text-sm mt-1" role="alert"></div>
      </div>
    </div>

    <div class="form-actions mt-6 flex space-x-4">
      <button type="button" 
              class="prev-step flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
        Voltar
      </button>
      <button type="submit" 
              class="flex-1 bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors">
        Descobrir meu perfil
      </button>
    </div>
  </div>

  <!-- Hidden fields -->
  <input type="hidden" name="lead_id" value="">
  <input type="hidden" name="utm_source" value="">
  <input type="hidden" name="utm_medium" value="">
  <input type="hidden" name="utm_campaign" value="">
</form>
```

---

## GATE 2 TESTING AND VALIDATION

### Task 2.7: Integration Testing Suite
**Priority:** HIGH  
**Estimated Time:** 3 hours

Create comprehensive testing for form functionality:

**Test Scenarios:**
1. **Amanda Scoring Accuracy:**
   - Perfect Amanda profile (100 points)
   - High-priority profile (80-99 points)
   - Qualified profile (60-79 points)
   - Lower priority profile (40-59 points)
   - Unqualified profile (0-39 points)

2. **Form Flow Testing:**
   - Progressive disclosure functionality
   - Validation error handling
   - Step navigation (forward/backward)
   - Form submission success/error states

3. **UTM Parameter Capture:**
   - URL parameters properly captured
   - localStorage persistence
   - Multiple visit handling

4. **Error Handling:**
   - Network error scenarios
   - Server error responses
   - Form validation errors
   - Graceful degradation

---

## GATE 2 COMPLETION CHECKLIST

### Technical Validation
- [ ] Amanda scoring algorithm implemented and tested
- [ ] Progressive form disclosure working correctly
- [ ] Lead ID generation and UTM capture functional
- [ ] Client-side validation with Portuguese error messages
- [ ] Stripe Payment Element setup complete
- [ ] Error handling comprehensive and user-friendly

### Quality Validation
- [ ] All form states tested and working
- [ ] Amanda scoring accuracy verified with test data
- [ ] UTM parameter capture validated
- [ ] Error scenarios handled gracefully
- [ ] Mobile form experience optimized

### Integration Readiness
- [ ] Form ready for backend processing
- [ ] Analytics events prepared for ATE implementation
- [ ] Lead data structure defined for webhook distribution
- [ ] Stripe integration ready for future activation

### Deliverables for Gate Progression
1. **Working form system** with all validation and scoring
2. **Amanda scoring demonstration** with various profile types
3. **UTM capture validation** showing parameter storage
4. **Error handling showcase** demonstrating graceful degradation
5. **Integration documentation** for handoff to ATE and BWE

**Gate 2 Status:** Ready for validation by EPL  
**Next Gate:** Gate 3 (analytics_ok) - ATE implements comprehensive event tracking