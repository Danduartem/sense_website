/**
 * Multi-Step Form Component - Sense Clinic
 * Professional patient registration form with validation
 */

class MultiStepForm {
  constructor(selector) {
    this.form = document.querySelector(selector);
    if (!this.form) return;
    
    this.currentStep = 1;
    this.totalSteps = 0;
    this.formData = {};
    this.validation = {
      errors: {},
      isValid: false
    };
    
    this.init();
  }
  
  init() {
    this.setupForm();
    this.bindEvents();
    this.updateProgress();
  }
  
  setupForm() {
    this.steps = this.form.querySelectorAll('.step');
    this.totalSteps = this.steps.length;
    this.prevBtn = this.form.querySelector('.step-prev');
    this.nextBtn = this.form.querySelector('.step-next');
    this.submitBtn = this.form.querySelector('.step-submit');
    this.progressBar = this.form.querySelector('.progress-fill');
    this.progressText = this.form.querySelector('.progress-text');
    this.stepIndicators = this.form.querySelectorAll('.step-indicator');
    
    // Hide all steps except first
    this.steps.forEach((step, index) => {
      if (index === 0) {
        step.classList.add('active');
      } else {
        step.classList.add('hidden');
      }
    });
  }
  
  bindEvents() {
    // Navigation buttons
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.nextStep();
      });
    }
    
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.prevStep();
      });
    }
    
    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.submitForm();
      });
    }
    
    // Input validation
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
    
    // Keyboard navigation
    this.form.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.target.matches('textarea')) {
        e.preventDefault();
        if (this.currentStep < this.totalSteps) {
          this.nextStep();
        } else {
          this.submitForm();
        }
      }
    });
  }
  
  nextStep() {
    if (!this.validateCurrentStep()) {
      this.showValidationErrors();
      return;
    }
    
    this.saveStepData();
    
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.showStep(this.currentStep);
      this.updateProgress();
      this.trackStepProgress();
    }
  }
  
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showStep(this.currentStep);
      this.updateProgress();
    }
  }
  
  showStep(stepNumber) {
    this.steps.forEach((step, index) => {
      if (index === stepNumber - 1) {
        step.classList.remove('hidden');
        step.classList.add('active');
        
        // Focus first input in step
        const firstInput = step.querySelector('input, select, textarea');
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 100);
        }
      } else {
        step.classList.add('hidden');
        step.classList.remove('active');
      }
    });
    
    // Update button visibility
    if (this.prevBtn) {
      this.prevBtn.style.display = stepNumber === 1 ? 'none' : 'inline-flex';
    }
    
    if (this.nextBtn && this.submitBtn) {
      if (stepNumber === this.totalSteps) {
        this.nextBtn.style.display = 'none';
        this.submitBtn.style.display = 'inline-flex';
      } else {
        this.nextBtn.style.display = 'inline-flex';
        this.submitBtn.style.display = 'none';
      }
    }
  }
  
  updateProgress() {
    const progressPercent = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
    
    if (this.progressBar) {
      this.progressBar.style.width = `${progressPercent}%`;
    }
    
    if (this.progressText) {
      this.progressText.textContent = `Etapa ${this.currentStep} de ${this.totalSteps}`;
    }
    
    // Update step indicators
    this.stepIndicators.forEach((indicator, index) => {
      if (index < this.currentStep) {
        indicator.classList.add('completed');
        indicator.classList.remove('active');
      } else if (index === this.currentStep - 1) {
        indicator.classList.add('active');
        indicator.classList.remove('completed');
      } else {
        indicator.classList.remove('active', 'completed');
      }
    });
  }
  
  validateCurrentStep() {
    const currentStepElement = this.steps[this.currentStep - 1];
    const requiredFields = currentStepElement.querySelectorAll('[required]');
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
    const fieldName = field.name;
    let errorMessage = '';
    
    // Clear previous error
    this.validation.errors[fieldName] = null;
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
      errorMessage = 'Este campo é obrigatório';
    }
    // Email validation
    else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Digite um email válido';
      }
    }
    // Phone validation
    else if (field.name === 'phone' && value) {
      const phoneRegex = /^\(?[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        errorMessage = 'Digite um telefone válido';
      }
    }
    // CPF validation
    else if (field.name === 'cpf' && value) {
      if (!this.isValidCPF(value)) {
        errorMessage = 'Digite um CPF válido';
      }
    }
    // Date validation
    else if (field.type === 'date' && value) {
      const date = new Date(value);
      const now = new Date();
      
      if (field.name === 'birth_date') {
        const age = now.getFullYear() - date.getFullYear();
        if (age < 18 || age > 120) {
          errorMessage = 'Data de nascimento inválida';
        }
      }
    }
    
    if (errorMessage) {
      this.validation.errors[fieldName] = errorMessage;
      this.showFieldError(field, errorMessage);
      return false;
    } else {
      this.clearFieldError(field);
      return true;
    }
  }
  
  isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validate check digits
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;
    
    return true;
  }
  
  showFieldError(field, message) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message text-red-600 text-sm mt-1';
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
  }
  
  clearFieldError(field) {
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  showValidationErrors() {
    const firstErrorField = this.form.querySelector('.error');
    if (firstErrorField) {
      firstErrorField.focus();
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  
  saveStepData() {
    const currentStepElement = this.steps[this.currentStep - 1];
    const inputs = currentStepElement.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      if (input.type === 'checkbox' || input.type === 'radio') {
        if (input.checked) {
          if (this.formData[input.name]) {
            if (Array.isArray(this.formData[input.name])) {
              this.formData[input.name].push(input.value);
            } else {
              this.formData[input.name] = [this.formData[input.name], input.value];
            }
          } else {
            this.formData[input.name] = input.value;
          }
        }
      } else {
        this.formData[input.name] = input.value;
      }
    });
  }
  
  async submitForm() {
    if (!this.validateCurrentStep()) {
      this.showValidationErrors();
      return;
    }
    
    this.saveStepData();
    
    // Show loading state
    const submitButton = this.submitBtn;
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Enviando...
    `;
    
    try {
      // Track form completion
      this.trackFormCompletion();
      
      // Submit form data
      const response = await this.sendFormData();
      
      if (response.ok) {
        this.showSuccess();
      } else {
        throw new Error('Erro ao enviar formulário');
      }
      
    } catch (error) {
      this.showError(error.message);
      
      // Restore button
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }
  
  async sendFormData() {
    // In a real implementation, this would be your API endpoint
    const endpoint = '/api/patient-registration';
    
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...this.formData,
        submitted_at: new Date().toISOString(),
        source: 'website_multistep_form'
      })
    });
  }
  
  showSuccess() {
    const modal = this.form.closest('.modal');
    const successMessage = `
      <div class="text-center py-8">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-navy-800 mb-2">Cadastro realizado com sucesso!</h3>
        <p class="text-navy-600 mb-6">
          Entraremos em contato em breve para confirmar sua consulta.
        </p>
        <button onclick="this.closest('.modal').classList.add('hidden')" 
                class="bg-burgundy-700 text-white px-6 py-2 rounded-lg hover:bg-burgundy-800 transition-colors">
          Fechar
        </button>
      </div>
    `;
    
    this.form.innerHTML = successMessage;
  }
  
  showError(message) {
    const errorDiv = this.form.querySelector('.form-error') || document.createElement('div');
    errorDiv.className = 'form-error bg-red-50 border border-red-200 rounded-lg p-4 mb-4';
    errorDiv.innerHTML = `
      <div class="flex">
        <svg class="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <div>
          <h3 class="text-sm font-medium text-red-800">Erro ao enviar formulário</h3>
          <p class="text-sm text-red-700 mt-1">${message}</p>
        </div>
      </div>
    `;
    
    if (!this.form.querySelector('.form-error')) {
      this.form.insertBefore(errorDiv, this.form.firstChild);
    }
  }
  
  trackStepProgress() {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'multi_step_progress',
        step_number: this.currentStep,
        step_name: this.getStepName(this.currentStep),
        total_steps: this.totalSteps,
        completion_percentage: ((this.currentStep - 1) / (this.totalSteps - 1)) * 100
      });
    }
  }
  
  trackFormCompletion() {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'form_completion',
        form_type: 'patient_registration',
        completion_time: Date.now() - this.startTime,
        total_steps: this.totalSteps
      });
    }
  }
  
  getStepName(stepNumber) {
    const stepNames = {
      1: 'personal_info',
      2: 'contact_info',
      3: 'medical_info',
      4: 'preferences'
    };
    return stepNames[stepNumber] || `step_${stepNumber}`;
  }
  
  // Public methods for external control
  goToStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
      this.currentStep = stepNumber;
      this.showStep(stepNumber);
      this.updateProgress();
    }
  }
  
  reset() {
    this.currentStep = 1;
    this.formData = {};
    this.validation.errors = {};
    this.showStep(1);
    this.updateProgress();
    
    // Clear all form fields
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      if (input.type === 'checkbox' || input.type === 'radio') {
        input.checked = false;
      } else {
        input.value = '';
      }
      this.clearFieldError(input);
    });
  }
  
  getFormData() {
    return { ...this.formData };
  }
}

// Make MultiStepForm globally available
window.MultiStepForm = MultiStepForm;

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const multiStepForms = document.querySelectorAll('.multi-step-form');
  multiStepForms.forEach(form => {
    const selector = '#' + form.id;
    new MultiStepForm(selector);
  });
});