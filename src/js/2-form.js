const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';
let formData = { email: '', message: '' };


const saveFormData = () => {
  localStorage.setItem(storageKey, JSON.stringify(formData));
};

const loadFormData = () => {
  try {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      formData = JSON.parse(savedData);
      emailInput.value = formData.email;
      messageInput.value = formData.message;
    }
  } catch (error) {
    console.error('Помилка завантаження даних з локального сховища:', error);
  }
};


document.addEventListener('DOMContentLoaded', loadFormData);


feedbackForm.addEventListener('input', (event) => {
  if (event.target.name === 'email') {
    formData.email = event.target.value.trim();
  } else if (event.target.name === 'message') {
    formData.message = event.target.value.trim();
  }
  saveFormData();
});


feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log('Дані форми:', formData);
  localStorage.removeItem(storageKey);
  formData = { email: '', message: '' };
  emailInput.value = '';
  messageInput.value = '';
});