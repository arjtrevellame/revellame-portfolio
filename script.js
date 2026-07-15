document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('textarea');
  const submitButton = document.getElementById('recommend_btn');
  const popup = document.getElementById('popup');

  function showPopUp() {
    if (!popup) return;

    popup.style.display = 'block';
    popup.classList.add('show');

    setTimeout(() => {
      popup.classList.remove('show');
      popup.style.display = 'none';
    }, 3500);
  }

  if (submitButton && textarea) {
    submitButton.addEventListener('click', () => {
      const recommendation = textarea.value.trim();

      if (!recommendation) return;

      showPopUp();
    });
  }
});