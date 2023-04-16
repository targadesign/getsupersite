const form = document.getElementById("website-lead");
const modal = document.getElementById("form-alert-modal");

function validateForm() {
  let isValid = true;
  const slideButtons = document.querySelectorAll('.slide-btn');
  const slides = document.querySelectorAll('.slide');
  slideButtons.forEach((button, index) => {
    const alertIcon = button.querySelector('.form-sidepane_validation-alert');
    alertIcon.classList.remove('is-visible');
    const slide = slides[index];
    const requiredInputs = slide.querySelectorAll('input[required], textarea[required], select[required]');
    let hasEmptyRequiredInput = false;
    requiredInputs.forEach((input) => {
      const alertMessage = input.parentNode.querySelector('.form_input-validation');
      if (!input.value.trim()) {
        hasEmptyRequiredInput = true;
        alertMessage.classList.add('is-visible');
      } else {
        alertMessage.classList.remove('is-visible');
      }
    });
    if (hasEmptyRequiredInput) {
      alertIcon.classList.add('is-visible');
      isValid = false;
    }
  });
  return isValid;
}

function submitForm(e) {
  e.preventDefault();
  if (validateForm()) {
    console.log('Form submitted');
    // Replace the above console.log statement with your form submission logic
  } else {
    modal.classList.add('is-visible');
  }
}

form.addEventListener("submit", submitForm);
