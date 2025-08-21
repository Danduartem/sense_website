/**
 * Lead Capture Modal Web Component - Mentoria Seja Livre
 * 
 * Custom Web Component for landing page modal with Amanda avatar qualification
 * Integrates with DataLayer foundation for complete event tracking
 * 
 * @version 1.0.0
 * @author Data Layer Engineer & GTM Analytics Program Lead
 */

class LeadCaptureModal extends HTMLElement {
  constructor() {
    super();
    
    // Component state
    this.isOpen = false;
    this.formStartTime = null;
    this.sourceSection = '';
    this.ctaId = '';
    this.trafficTemperature = 'unknown';
    this.amandaScore = 0;
    
    // Form validation state
    this.validationErrors = {};
    this.isSubmitting = false;
    
    // Bind methods to maintain context
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldFocus = this.handleFieldFocus.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
    this.setupAccessibility();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  /**
   * Render modal HTML structure
   */
  render() {
    this.innerHTML = `
      <div class="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-50 hidden" aria-hidden="true">
        <div class="modal-container flex items-center justify-center min-h-screen p-4">
          <div class="modal-content bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
            
            <!-- Modal Header -->
            <div class="modal-header p-6 pb-4">
              <div class="flex items-center justify-between">
                <h2 id="modal-title" class="text-2xl font-bold text-gray-900">
                  Quero minha transformação
                </h2>
                <button type="button" class="close-button text-gray-400 hover:text-gray-600 transition-colors" aria-label="Fechar modal">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <p id="modal-description" class="text-gray-600 mt-2">
                Preencha os dados abaixo para descobrir se você é uma candidata ideal para a Mentoria Seja Livre
              </p>
            </div>

            <!-- Modal Form -->
            <form class="modal-form p-6 pt-0" novalidate>
              
              <!-- Progress Indicator -->
              <div class="progress-indicator mb-6">
                <div class="flex items-center text-sm text-gray-500">
                  <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                  Informações básicas
                </div>
              </div>

              <!-- Basic Information -->
              <div class="form-section mb-6">
                <div class="grid grid-cols-1 gap-4">
                  
                  <div class="form-field">
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                      Nome completo *
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                      aria-describedby="name-error"
                    >
                    <div id="name-error" class="error-message text-red-600 text-sm mt-1 hidden" role="alert"></div>
                  </div>

                  <div class="form-field">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="seu@email.com"
                      aria-describedby="email-error"
                    >
                    <div id="email-error" class="error-message text-red-600 text-sm mt-1 hidden" role="alert"></div>
                  </div>

                  <div class="form-field">
                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp *
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+55 11 99999-9999"
                      aria-describedby="phone-error"
                    >
                    <div id="phone-error" class="error-message text-red-600 text-sm mt-1 hidden" role="alert"></div>
                  </div>

                </div>
              </div>

              <!-- Business Information -->
              <div class="form-section mb-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Sobre seu negócio</h3>
                
                <div class="grid grid-cols-1 gap-4">
                  
                  <div class="form-field">
                    <label for="business_type" class="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de negócio *
                    </label>
                    <select 
                      id="business_type" 
                      name="business_type" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-describedby="business_type-error"
                    >
                      <option value="">Selecione seu tipo de negócio</option>
                      <option value="clinica_estetica">Clínica Estética</option>
                      <option value="loja_roupas">Loja de Roupas</option>
                      <option value="maquiadora">Maquiadora</option>
                      <option value="nutricionista">Nutricionista</option>
                      <option value="arquiteta">Arquiteta</option>
                      <option value="advogada">Advogada</option>
                      <option value="academia">Academia</option>
                      <option value="consultoria">Consultoria</option>
                      <option value="coaching">Coaching</option>
                      <option value="designer">Designer</option>
                      <option value="fotografa">Fotógrafa</option>
                      <option value="outro">Outro</option>
                    </select>
                    <div id="business_type-error" class="error-message text-red-600 text-sm mt-1 hidden" role="alert"></div>
                  </div>

                  <div class="form-field">
                    <label for="monthly_revenue" class="block text-sm font-medium text-gray-700 mb-1">
                      Faturamento mensal atual *
                    </label>
                    <select 
                      id="monthly_revenue" 
                      name="monthly_revenue" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-describedby="monthly_revenue-error"
                    >
                      <option value="">Selecione sua faixa de faturamento</option>
                      <option value="under_10k">Até R$ 10.000</option>
                      <option value="10k_15k">R$ 10.000 - R$ 15.000</option>
                      <option value="15k_25k">R$ 15.000 - R$ 25.000</option>
                      <option value="25k_35k">R$ 25.000 - R$ 35.000</option>
                      <option value="35k_plus">Acima de R$ 35.000</option>
                    </select>
                    <div id="monthly_revenue-error" class="error-message text-red-600 text-sm mt-1 hidden" role="alert"></div>
                  </div>

                  <div class="form-field">
                    <label for="work_hours_daily" class="block text-sm font-medium text-gray-700 mb-1">
                      Quantas horas trabalha por dia? *
                    </label>
                    <select 
                      id="work_hours_daily" 
                      name="work_hours_daily" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-describedby="work_hours_daily-error"
                    >
                      <option value="">Selecione</option>
                      <option value="6">6 horas ou menos</option>
                      <option value="8">7-8 horas</option>
                      <option value="10">9-10 horas</option>
                      <option value="12">11-12 horas</option>
                      <option value="14">Mais de 12 horas</option>
                    </select>
                    <div id="work_hours_daily-error" class="error-message text-red-600 text-sm mt-1 hidden" role="alert"></div>
                  </div>

                </div>
              </div>

              <!-- Amanda Qualification Questions -->
              <div class="form-section mb-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Qualificação personalizada</h3>
                
                <div class="grid grid-cols-1 gap-4">
                  
                  <div class="form-field">
                    <label for="main_struggle" class="block text-sm font-medium text-gray-700 mb-1">
                      Qual é sua maior dificuldade atual? *
                    </label>
                    <select 
                      id="main_struggle" 
                      name="main_struggle" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-describedby="main_struggle-error"
                    >
                      <option value="">Selecione</option>
                      <option value="exhaustion_overwork">Exaustão por trabalhar demais</option>
                      <option value="low_revenue">Faturamento baixo</option>
                      <option value="time_management">Falta de tempo pessoal</option>
                      <option value="team_management">Dificuldade com equipe</option>
                      <option value="client_acquisition">Captação de clientes</option>
                      <option value="pricing_strategy">Precificação</option>
                    </select>
                    <div id="main_struggle-error" class="error-message text-red-600 text-sm mt-1 hidden" role="alert"></div>
                  </div>

                  <div class="form-field">
                    <label for="delegation_struggle" class="block text-sm font-medium text-gray-700 mb-1">
                      Você tem dificuldade para delegar tarefas? *
                    </label>
                    <select 
                      id="delegation_struggle" 
                      name="delegation_struggle" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-describedby="delegation_struggle-error"
                    >
                      <option value="">Selecione</option>
                      <option value="sim">Sim, prefiro fazer tudo eu mesma</option>
                      <option value="parcialmente">Às vezes consigo delegar</option>
                      <option value="nao">Não, delego facilmente</option>
                    </select>
                    <div id="delegation_struggle-error" class="error-message text-red-600 text-sm mt-1 hidden" role="alert"></div>
                  </div>

                  <div class="form-field">
                    <label for="feminine_energy_importance" class="block text-sm font-medium text-gray-700 mb-1">
                      Como você vê a importância de honrar a energia feminina nos negócios? *
                    </label>
                    <select 
                      id="feminine_energy_importance" 
                      name="feminine_energy_importance" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-describedby="feminine_energy_importance-error"
                    >
                      <option value="">Selecione</option>
                      <option value="muito_importante">Muito importante - busco equilíbrio</option>
                      <option value="importante">Importante mas difícil de aplicar</option>
                      <option value="pouco_importante">Pouco importante - foco em resultados</option>
                      <option value="nao_conheco">Não conheço esse conceito</option>
                    </select>
                    <div id="feminine_energy_importance-error" class="error-message text-red-600 text-sm mt-1 hidden" role="alert"></div>
                  </div>

                  <div class="form-field">
                    <label for="leadership_interest" class="block text-sm font-medium text-gray-700 mb-1">
                      Qual seu interesse em desenvolver liderança? *
                    </label>
                    <select 
                      id="leadership_interest" 
                      name="leadership_interest" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-describedby="leadership_interest-error"
                    >
                      <option value="">Selecione</option>
                      <option value="alto">Alto - quero liderar com confiança</option>
                      <option value="medio">Médio - preciso melhorar</option>
                      <option value="baixo">Baixo - prefiro trabalhar sozinha</option>
                      <option value="nao_sei">Não sei como desenvolver</option>
                    </select>
                    <div id="leadership_interest-error" class="error-message text-red-600 text-sm mt-1 hidden" role="alert"></div>
                  </div>

                  <div class="form-field">
                    <label for="transformation_readiness" class="block text-sm font-medium text-gray-700 mb-1">
                      Em uma escala de 1 a 10, o quanto você está pronta para uma transformação? *
                    </label>
                    <select 
                      id="transformation_readiness" 
                      name="transformation_readiness" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-describedby="transformation_readiness-error"
                    >
                      <option value="">Selecione</option>
                      <option value="10">10 - Totalmente pronta</option>
                      <option value="9">9 - Muito pronta</option>
                      <option value="8">8 - Pronta</option>
                      <option value="7">7 - Moderadamente pronta</option>
                      <option value="6">6 - Parcialmente pronta</option>
                      <option value="5">5 - Neutro</option>
                      <option value="4">4 - Pouco pronta</option>
                      <option value="3">3 - Muito pouco pronta</option>
                      <option value="2">2 - Quase nada pronta</option>
                      <option value="1">1 - Não estou pronta</option>
                    </select>
                    <div id="transformation_readiness-error" class="error-message text-red-600 text-sm mt-1 hidden" role="alert"></div>
                  </div>

                </div>
              </div>

              <!-- Form Actions -->
              <div class="form-actions">
                <button 
                  type="submit" 
                  class="submit-button w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  <span class="button-text">Descobrir meu potencial</span>
                  <span class="loading-spinner hidden">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                </button>
                
                <p class="text-xs text-gray-500 mt-3 text-center">
                  Seus dados estão seguros. Respeitamos sua privacidade conforme a LGPD.
                </p>
              </div>

            </form>

          </div>
        </div>
      </div>
    `;
  }

  /**
   * Open modal with source attribution
   */
  open(sourceSection, ctaId, trafficTemperature = 'unknown') {
    this.sourceSection = sourceSection;
    this.ctaId = ctaId;
    this.trafficTemperature = trafficTemperature;
    this.isOpen = true;

    // Show modal
    const overlay = this.querySelector('.modal-overlay');
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first input for accessibility
    setTimeout(() => {
      const firstInput = this.querySelector('input[name="name"]');
      if (firstInput) firstInput.focus();
    }, 100);

    // Track modal open event
    if (window.msluTrackingUtils) {
      window.msluTrackingUtils.trackModalOpen(sourceSection, ctaId, trafficTemperature);
    }
  }

  /**
   * Close modal
   */
  close() {
    if (!this.isOpen) return;

    const overlay = this.querySelector('.modal-overlay');
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Track modal abandon if form was started but not submitted
    if (this.formStartTime && !this.isSubmitting) {
      const timeInModal = Date.now() - this.formStartTime;
      const fieldsCompleted = this.getCompletedFieldsCount();
      
      if (window.msluLandingTracking) {
        window.msluLandingTracking.trackModalAbandon(
          this.sourceSection, 
          timeInModal, 
          fieldsCompleted, 
          'close_button'
        );
      }
    }
    
    this.isOpen = false;
    this.formStartTime = null;
  }

  /**
   * Handle form submission
   */
  async handleSubmit(event) {
    event.preventDefault();
    
    if (this.isSubmitting) return;
    
    const formData = new FormData(event.target);
    
    // Validate form
    if (!this.validateForm(formData)) {
      return;
    }
    
    this.setSubmitting(true);
    
    try {
      // Calculate Amanda score
      this.amandaScore = window.msluTrackingUtils.calculateAmandaScore(formData);
      
      // Track form submission
      window.msluTrackingUtils.trackFormSubmit(
        formData, 
        this.amandaScore, 
        this.sourceSection, 
        this.ctaId
      );
      
      // Submit to Netlify Function
      const response = await this.submitToWebhook(formData);
      
      if (response.success) {
        this.redirectToThankYou(response.leadId);
      } else {
        throw new Error(response.message || 'Erro ao enviar formulário');
      }
      
    } catch (error) {
      this.showErrorMessage(error.message);
      console.error('Form submission error:', error);
    } finally {
      this.setSubmitting(false);
    }
  }

  /**
   * Handle field focus for form start tracking
   */
  handleFieldFocus(event) {
    if (!this.formStartTime) {
      this.formStartTime = Date.now();
      
      // Track form start
      if (window.msluLandingTracking) {
        window.msluLandingTracking.trackModalFormStart(
          event.target.name,
          Date.now() - (window.msluLandingTracking.pageLoadTime || Date.now())
        );
      }
    }
    
    // Enable submit button when first field is focused
    const submitButton = this.querySelector('.submit-button');
    if (submitButton.disabled) {
      submitButton.disabled = false;
    }
  }

  /**
   * Validate form data
   */
  validateForm(formData) {
    this.clearValidationErrors();
    let isValid = true;
    
    // Required fields validation
    const requiredFields = [
      'name', 'email', 'phone', 'business_type', 'monthly_revenue', 
      'work_hours_daily', 'main_struggle', 'delegation_struggle', 
      'feminine_energy_importance', 'leadership_interest', 'transformation_readiness'
    ];
    
    requiredFields.forEach(fieldName => {
      const value = formData.get(fieldName);
      if (!value || value.trim() === '') {
        this.showFieldError(fieldName, 'Este campo é obrigatório');
        isValid = false;
      }
    });
    
    // Email validation
    const email = formData.get('email');
    if (email && !this.isValidEmail(email)) {
      this.showFieldError('email', 'Por favor, insira um email válido');
      isValid = false;
    }
    
    // Phone validation (basic Brazilian phone format)
    const phone = formData.get('phone');
    if (phone && !this.isValidPhone(phone)) {
      this.showFieldError('phone', 'Por favor, insira um WhatsApp válido');
      isValid = false;
    }
    
    return isValid;
  }

  /**
   * Submit form data to Netlify Function
   */
  async submitToWebhook(formData) {
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      businessType: formData.get('business_type'),
      monthlyRevenue: formData.get('monthly_revenue'),
      workHoursDaily: parseInt(formData.get('work_hours_daily')),
      mainStruggle: formData.get('main_struggle'),
      delegationStruggle: formData.get('delegation_struggle'),
      feminineEnergyImportance: formData.get('feminine_energy_importance'),
      leadershipInterest: formData.get('leadership_interest'),
      transformationReadiness: parseInt(formData.get('transformation_readiness')),
      amandaScore: this.amandaScore,
      sourceSection: this.sourceSection,
      ctaId: this.ctaId,
      leadId: window.msluTrackingUtils.getLeadId(),
      timestamp: new Date().toISOString()
    };
    
    const response = await fetch('/.netlify/functions/lead-submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  }

  /**
   * Redirect to thank you page
   */
  redirectToThankYou(leadId) {
    const thankYouUrl = `/obrigada?lead_id=${leadId}&amanda_score=${this.amandaScore}&source=${this.sourceSection}`;
    window.location.href = thankYouUrl;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Form submission
    const form = this.querySelector('.modal-form');
    form.addEventListener('submit', this.handleSubmit);
    
    // Form field focus tracking
    const formFields = this.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
      field.addEventListener('focus', this.handleFieldFocus);
    });
    
    // Close button
    const closeButton = this.querySelector('.close-button');
    closeButton.addEventListener('click', this.close);
    
    // Outside click to close
    const overlay = this.querySelector('.modal-overlay');
    overlay.addEventListener('click', this.handleOutsideClick);
    
    // Escape key to close
    document.addEventListener('keydown', this.handleEscapeKey);
  }

  /**
   * Remove event listeners
   */
  removeEventListeners() {
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  /**
   * Handle clicks outside modal content
   */
  handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  /**
   * Handle escape key
   */
  handleEscapeKey(event) {
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  /**
   * Setup accessibility features
   */
  setupAccessibility() {
    // Set initial ARIA states
    const overlay = this.querySelector('.modal-overlay');
    overlay.setAttribute('aria-hidden', 'true');
    
    // Focus trap would be implemented here for production
  }

  /**
   * Set submitting state
   */
  setSubmitting(isSubmitting) {
    this.isSubmitting = isSubmitting;
    const submitButton = this.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const loadingSpinner = submitButton.querySelector('.loading-spinner');
    
    if (isSubmitting) {
      submitButton.disabled = true;
      buttonText.classList.add('hidden');
      loadingSpinner.classList.remove('hidden');
    } else {
      submitButton.disabled = false;
      buttonText.classList.remove('hidden');
      loadingSpinner.classList.add('hidden');
    }
  }

  /**
   * Show validation error for specific field
   */
  showFieldError(fieldName, message) {
    const field = this.querySelector(`[name="${fieldName}"]`);
    const errorElement = this.querySelector(`#${fieldName}-error`);
    
    if (field && errorElement) {
      field.classList.add('border-red-500');
      field.setAttribute('aria-invalid', 'true');
      errorElement.textContent = message;
      errorElement.classList.remove('hidden');
    }
  }

  /**
   * Clear all validation errors
   */
  clearValidationErrors() {
    const fields = this.querySelectorAll('input, select, textarea');
    const errorElements = this.querySelectorAll('.error-message');
    
    fields.forEach(field => {
      field.classList.remove('border-red-500');
      field.removeAttribute('aria-invalid');
    });
    
    errorElements.forEach(error => {
      error.textContent = '';
      error.classList.add('hidden');
    });
  }

  /**
   * Show general error message
   */
  showErrorMessage(message) {
    // Could implement a general error display area
    alert(`Erro: ${message}\n\nTente novamente ou entre em contato via WhatsApp.`);
  }

  /**
   * Count completed form fields
   */
  getCompletedFieldsCount() {
    const fields = this.querySelectorAll('input, select, textarea');
    let completed = 0;
    
    fields.forEach(field => {
      if (field.value && field.value.trim() !== '') {
        completed++;
      }
    });
    
    return completed;
  }

  /**
   * Email validation
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Basic Brazilian phone validation
   */
  isValidPhone(phone) {
    // Remove all non-digits
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Brazilian mobile: 11 digits (including country code) or 10-11 digits
    return cleanPhone.length >= 10 && cleanPhone.length <= 13;
  }
}

// Register the custom element
customElements.define('lead-capture-modal', LeadCaptureModal);

// Global function to open modal (for use by CTA buttons)
window.openLeadModal = function(sourceSection, ctaId, trafficTemperature = 'unknown') {
  const modal = document.getElementById('questionario');
  if (modal) {
    modal.open(sourceSection, ctaId, trafficTemperature);
  }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LeadCaptureModal;
}