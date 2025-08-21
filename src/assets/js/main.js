/**
 * Main JavaScript - Mentoria Seja Livre
 * Landing page interactions, accessibility enhancements, and user experience
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initializeScrollBehavior();
  initializeFAQAccordion();
  initializeAccessibilityFeatures();
  initializeAnimations();
  initializeFormValidation();
  initializeModalTriggers();
  
  console.log('Mentoria Seja Livre - Landing Page Loaded');
});

/**
 * Smooth scroll behavior for anchor links
 */
function initializeScrollBehavior() {
  // Handle scroll to sections
  document.addEventListener('click', function(e) {
    const scrollTarget = e.target.dataset.scrollTo || e.target.closest('[data-scroll-to]')?.dataset.scrollTo;
    
    if (scrollTarget && scrollTarget.startsWith('#')) {
      e.preventDefault();
      
      const targetElement = document.querySelector(scrollTarget);
      if (targetElement) {
        const offset = 80; // Account for any fixed headers
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Track scroll interaction
        if (window.msluTrackingUtils) {
          window.msluTrackingUtils.trackScrollToSection(scrollTarget.substring(1));
        }
        
        // Update focus for accessibility
        setTimeout(() => {
          targetElement.focus({ preventScroll: true });
          targetElement.setAttribute('tabindex', '-1');
        }, 500);
      }
    }
  });
}

/**
 * FAQ Accordion functionality
 */
function initializeFAQAccordion() {
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQs
      faqTriggers.forEach(otherTrigger => {
        if (otherTrigger !== this) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          otherTrigger.nextElementSibling.classList.add('hidden');
        }
      });
      
      // Toggle current FAQ
      if (isExpanded) {
        this.setAttribute('aria-expanded', 'false');
        content.classList.add('hidden');
      } else {
        this.setAttribute('aria-expanded', 'true');
        content.classList.remove('hidden');
        
        // Track FAQ interaction
        if (window.msluLandingTracking) {
          window.msluLandingTracking.trackFAQInteraction(
            this.querySelector('h3').textContent.trim(),
            'open'
          );
        }
      }
    });
    
    // Initialize ARIA state
    trigger.setAttribute('aria-expanded', 'false');
  });
}

/**
 * Accessibility enhancements
 */
function initializeAccessibilityFeatures() {
  // Skip link functionality
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus();
        mainContent.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Enhanced focus management for modal triggers
  const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // High contrast mode detection
  if (window.matchMedia('(prefers-contrast: high)').matches) {
    document.documentElement.classList.add('high-contrast');
  }
  
  // Reduced motion support
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduce-motion');
  }
  
  // Tab trap for floating CTA when focused
  const floatingCTA = document.querySelector('.fixed.bottom-6.right-6');
  if (floatingCTA) {
    floatingCTA.addEventListener('focus', function() {
      this.classList.add('focused');
    });
    
    floatingCTA.addEventListener('blur', function() {
      this.classList.remove('focused');
    });
  }
}

/**
 * Scroll animations with Intersection Observer
 */
function initializeAnimations() {
  // Only initialize if user hasn't requested reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  if (animatedElements.length === 0) return;
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.dataset.animate;
        
        switch (animationType) {
          case 'slide-up':
            element.classList.add('animate-slide-up');
            break;
          case 'fade-in':
            element.classList.add('animate-fade-in');
            break;
          case 'scale-in':
            element.classList.add('animate-scale-in');
            break;
          default:
            element.classList.add('animate-fade-in');
        }
        
        // Stop observing this element
        observer.unobserve(element);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Modal trigger initialization
 */
function initializeModalTriggers() {
  const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(event) {
      event.preventDefault();
      
      const sourceSection = this.dataset.sourceSection || 'unknown';
      const ctaId = this.dataset.ctaId || 'unknown';
      const modalId = this.dataset.modalTrigger || 'questionario-modal';
      
      // Find the modal element
      const modal = document.getElementById(modalId);
      if (modal) {
        // Show the modal using our simple approach
        showModal(modal);
        
        // Track modal open
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'modal_open',
            modal_id: modalId,
            source_section: sourceSection,
            cta_id: ctaId
          });
        }
      }
    });
  });
}

/**
 * Show modal function
 */
function showModal(modal) {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
  
  // Focus first input
  setTimeout(() => {
    const firstInput = modal.querySelector('input[type="text"], input[type="email"]');
    if (firstInput) {
      firstInput.focus();
    }
  }, 100);
}

/**
 * Hide modal function
 */
function hideModal(modal) {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

/**
 * Form validation enhancements
 */
function initializeFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      // Real-time validation on blur
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      // Clear errors on input
      input.addEventListener('input', function() {
        clearFieldError(this);
      });
      
      // Phone number formatting for Brazilian phones
      if (input.type === 'tel') {
        input.addEventListener('input', function() {
          formatBrazilianPhone(this);
        });
      }
    });
    
    // Handle form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      handleFormSubmission(this);
    });
  });
  
  // Setup modal close functionality
  setupModalCloseHandlers();
}

/**
 * Setup modal close handlers
 */
function setupModalCloseHandlers() {
  // Close button handlers
  const closeButtons = document.querySelectorAll('.modal-close');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        hideModal(modal);
      }
    });
  });
  
  // Click outside to close
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', function(event) {
      if (event.target === this) {
        hideModal(this);
      }
    });
  });
  
  // Escape key to close
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const visibleModal = document.querySelector('.modal:not(.hidden)');
      if (visibleModal) {
        hideModal(visibleModal);
      }
    }
  });
}

/**
 * Handle form submission
 */
function handleFormSubmission(form) {
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  
  // Show loading state
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
  }
  
  // Basic validation
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      showFieldError(field, 'Este campo é obrigatório');
      isValid = false;
    }
  });
  
  if (!isValid) {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Enviar respostas';
    }
    return;
  }
  
  // Track form submission
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'form_submit',
      form_type: 'lead_qualification',
      form_fields_completed: requiredFields.length
    });
  }
  
  // Simulate form submission (replace with actual endpoint)
  setTimeout(() => {
    // Redirect to thank you page
    window.location.href = '/obrigada';
  }, 1000);
}

/**
 * Validate individual form field
 */
function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let errorMessage = '';
  
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
  // Phone validation (Brazilian format)
  else if (field.type === 'tel' && value) {
    const phoneRegex = /^\+?55\s?\(?[1-9]{2}\)?\s?[9]?[0-9]{4}-?[0-9]{4}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      errorMessage = 'Digite um WhatsApp válido (ex: +55 11 99999-9999)';
    }
  }
  
  if (errorMessage) {
    showFieldError(field, errorMessage);
    return false;
  } else {
    clearFieldError(field);
    return true;
  }
}

/**
 * Show field validation error
 */
function showFieldError(field, message) {
  field.classList.add('error');
  field.setAttribute('aria-invalid', 'true');
  
  const errorElement = document.getElementById(`${field.name}-error`);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  }
}

/**
 * Clear field validation error
 */
function clearFieldError(field) {
  field.classList.remove('error');
  field.setAttribute('aria-invalid', 'false');
  
  const errorElement = document.getElementById(`${field.name}-error`);
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  }
}

/**
 * Format Brazilian phone number as user types
 */
function formatBrazilianPhone(input) {
  let value = input.value.replace(/\D/g, '');
  
  // Limit to 13 digits (including country code)
  if (value.length > 13) {
    value = value.substring(0, 13);
  }
  
  // Format based on length
  if (value.length >= 11) {
    // Full format: +55 (11) 99999-9999
    value = value.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, '+$1 ($2) $3-$4');
  } else if (value.length >= 7) {
    // Partial format: (11) 99999-9999
    value = value.replace(/^(\d{2})(\d{4,5})(\d{0,4})$/, '($1) $2-$3');
  } else if (value.length >= 3) {
    // Area code format: (11) 9999
    value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
  }
  
  input.value = value;
}

/**
 * Testimonial Carousel Class
 */
class TestimonialCarousel {
  constructor(selector) {
    this.carousel = document.querySelector(selector);
    if (!this.carousel) return;
    
    this.track = this.carousel.querySelector('.testimonial-track');
    this.slides = this.carousel.querySelectorAll('.testimonial-slide');
    this.prevButton = this.carousel.querySelector('.carousel-prev');
    this.nextButton = this.carousel.querySelector('.carousel-next');
    this.dots = this.carousel.querySelectorAll('.dot');
    
    this.currentIndex = 0;
    this.autoplay = this.carousel.dataset.autoplay === 'true';
    this.autoplayInterval = null;
    
    this.init();
  }
  
  init() {
    if (this.slides.length <= 1) return;
    
    this.setupEventListeners();
    this.updateCarousel();
    
    if (this.autoplay) {
      this.startAutoplay();
    }
    
    // Touch/swipe support
    this.setupTouchEvents();
  }
  
  setupEventListeners() {
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.prev());
    }
    
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.next());
    }
    
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Pause autoplay on hover
    this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
    this.carousel.addEventListener('mouseleave', () => this.resumeAutoplay());
    
    // Keyboard navigation
    this.carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }
  
  setupTouchEvents() {
    let startX = 0;
    let endX = 0;
    
    this.carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    
    this.carousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      
      if (Math.abs(diffX) > 50) { // Minimum swipe distance
        if (diffX > 0) {
          this.next(); // Swipe left - next slide
        } else {
          this.prev(); // Swipe right - previous slide
        }
      }
    }, { passive: true });
  }
  
  prev() {
    this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
    this.updateCarousel();
    this.resetAutoplay();
  }
  
  next() {
    this.currentIndex = this.currentIndex === this.slides.length - 1 ? 0 : this.currentIndex + 1;
    this.updateCarousel();
    this.resetAutoplay();
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
    this.resetAutoplay();
  }
  
  updateCarousel() {
    // Update track position
    const translateX = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${translateX}%)`;
    
    // Update navigation buttons
    if (this.prevButton) {
      this.prevButton.disabled = this.currentIndex === 0;
    }
    if (this.nextButton) {
      this.nextButton.disabled = this.currentIndex === this.slides.length - 1;
    }
    
    // Update dots
    this.dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('bg-burgundy-700');
        dot.classList.remove('bg-neutral-300');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('bg-burgundy-700');
        dot.classList.add('bg-neutral-300');
        dot.setAttribute('aria-selected', 'false');
      }
    });
    
    // Update ARIA labels
    this.slides.forEach((slide, index) => {
      slide.setAttribute('aria-hidden', index !== this.currentIndex);
    });
    
    // Track testimonial view
    if (window.msluLandingTracking) {
      const currentSlide = this.slides[this.currentIndex];
      const testimonialId = currentSlide.dataset.testimonialId;
      if (testimonialId) {
        window.msluLandingTracking.trackTestimonialInteraction(testimonialId, 'view');
      }
    }
  }
  
  startAutoplay() {
    if (!this.autoplay) return;
    
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, 5000);
  }
  
  pauseAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }
  
  resumeAutoplay() {
    if (this.autoplay && !this.autoplayInterval) {
      this.startAutoplay();
    }
  }
  
  resetAutoplay() {
    this.pauseAutoplay();
    if (this.autoplay) {
      setTimeout(() => this.startAutoplay(), 2000);
    }
  }
}

// Make TestimonialCarousel globally available
window.TestimonialCarousel = TestimonialCarousel;

/**
 * Performance monitoring
 */
function initializePerformanceMonitoring() {
  // Track Core Web Vitals
  if ('web-vital' in window) {
    // This would be implemented with web-vitals library
    // For now, basic performance tracking
  }
  
  // Track long tasks
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Long task threshold
            if (window.dataLayer) {
              window.dataLayer.push({
                event: 'long_task',
                task_duration: entry.duration,
                task_start_time: entry.startTime
              });
            }
          }
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // PerformanceObserver not supported
    }
  }
  
  // Track largest contentful paint
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (window.dataLayer) {
            window.dataLayer.push({
              event: 'lcp',
              lcp_value: entry.startTime,
              lcp_element: entry.element?.tagName
            });
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Not supported
    }
  }
}

// Initialize performance monitoring
initializePerformanceMonitoring();

/**
 * Error tracking
 */
window.addEventListener('error', (event) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'javascript_error',
      error_message: event.message,
      error_filename: event.filename,
      error_line: event.lineno,
      error_column: event.colno
    });
  }
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'promise_rejection',
      error_message: event.reason?.message || 'Unhandled promise rejection',
      error_stack: event.reason?.stack
    });
  }
});

/**
 * Utility functions
 */
window.msluUtils = {
  // Debounce function for performance
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Throttle function for scroll events
  throttle: function(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  },
  
  // Check if element is in viewport
  isInViewport: function(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};