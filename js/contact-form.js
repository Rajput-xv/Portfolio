/**
 * Contact Form Validation and Submission
 * For Web3Forms integration
 */

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('form[action="https://api.web3forms.com/submit"]');
  
  if (!contactForm) return;
  
  // Create a toast/notification element for messages
  const notification = document.createElement('div');
  notification.className = 'form-notification';
  document.body.appendChild(notification);
  
  // Show notification function
  function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = type === 'success' 
      ? 'form-notification success show' 
      : 'form-notification error show';
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 5000);
  }
  
  // Form submission handler
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = contactForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('is-invalid');
      } else {
        field.classList.remove('is-invalid');
      }
    });
    
    // Email validation
    const emailField = contactForm.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(emailField.value)) {
        isValid = false;
        emailField.classList.add('is-invalid');
        showNotification('Please enter a valid email address', 'error');
        return;
      }
    }
    
    if (!isValid) {
      showNotification('Please fill all required fields correctly', 'error');
      return;
    }
    
    // Submit the form if valid
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('btn-loading');
    
    const formData = new FormData(contactForm);
    
    fetch(contactForm.action, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showNotification('Message sent successfully! Thank you for contacting me.', 'success');
        contactForm.reset();
      } else {
        showNotification('Something went wrong. Please try again later.', 'error');
      }
    })
    .catch(error => {
      showNotification('An error occurred. Please try again later.', 'error');
      console.error('Form submission error:', error);
    })
    .finally(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      submitBtn.classList.remove('btn-loading');
    });
  });
  
  // Field validation on input
  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', function() {
      if (this.hasAttribute('required') && this.value.trim()) {
        this.classList.remove('is-invalid');
      }
    });
  });
});
