/**
 * Dr. Abhijeet A. Gadiwadd Website - Form Validation & Consultation Submission
 */

document.addEventListener('DOMContentLoaded', () => {
  initFormHandling('mainConsultationForm');
  initFormHandling('modalConsultationForm');
});

function initFormHandling(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const successBanner = form.parentElement.querySelector('.form-success-banner');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const formData = {};

    // Validate Full Name
    const nameInput = form.querySelector('[name="name"]');
    if (nameInput) {
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showError(nameInput, 'Please enter your full name (minimum 2 characters)');
        isValid = false;
      } else {
        clearError(nameInput);
        formData.name = nameInput.value.trim();
      }
    }

    // Validate Phone Number
    const phoneInput = form.querySelector('[name="phone"]');
    if (phoneInput) {
      const phoneVal = phoneInput.value.replace(/\D/g, '');
      if (!phoneVal || phoneVal.length < 10) {
        showError(phoneInput, 'Please enter a valid 10-digit phone number');
        isValid = false;
      } else {
        clearError(phoneInput);
        formData.phone = phoneVal;
      }
    }

    // Validate Email (Optional, but if filled must be valid)
    const emailInput = form.querySelector('[name="email"]');
    if (emailInput && emailInput.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError(emailInput);
        formData.email = emailInput.value.trim();
      }
    } else if (emailInput) {
      clearError(emailInput);
      formData.email = '';
    }

    // Validate Health Concern
    const healthConcernSelect = form.querySelector('[name="healthConcern"]');
    if (healthConcernSelect) {
      if (!healthConcernSelect.value || healthConcernSelect.value === '') {
        showError(healthConcernSelect, 'Please select your area of consultation');
        isValid = false;
      } else {
        clearError(healthConcernSelect);
        formData.healthConcern = healthConcernSelect.value;
      }
    }

    // Optional Message
    const messageInput = form.querySelector('[name="message"]');
    if (messageInput) {
      formData.message = messageInput.value.trim();
    }

    if (!isValid) return;

    // Submit handler architecture (Ready for backend/API integration)
    handleFormSubmission(formData, form, successBanner);
  });

  // Real-time input error clearing
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      clearError(input);
    });
    input.addEventListener('change', () => {
      clearError(input);
    });
  });
}

function showError(element, message) {
  element.classList.add('error');
  const errorContainer = element.parentElement.querySelector('.form-error-msg');
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
  }
}

function clearError(element) {
  element.classList.remove('error');
  const errorContainer = element.parentElement.querySelector('.form-error-msg');
  if (errorContainer) {
    errorContainer.textContent = '';
    errorContainer.style.display = 'none';
  }
}

function handleFormSubmission(data, formElement, successBanner) {
  const submitBtn = formElement.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Request Consultation';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" width="20" height="20" viewBox="0 0 50 50" style="animation: spin 1s linear infinite; display: inline-block; vertical-align: middle;">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="31.415, 31.415" stroke-linecap="round"></circle>
      </svg>
      Processing...
    `;
  }

  // Simulated asynchronous API submission
  setTimeout(() => {
    console.log('Consultation Request Submitted successfully:', data);

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }

    // Reset Form
    formElement.reset();

    // Show Success Banner
    if (successBanner) {
      successBanner.classList.add('visible');
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      // Auto dismiss success banner after 8 seconds
      setTimeout(() => {
        successBanner.classList.remove('visible');
      }, 8000);
    } else {
      alert('Thank you. Your consultation request has been received.');
    }
  }, 750);
}

// Add CSS keyframe animation for spinner if needed
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
