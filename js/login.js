document.addEventListener('DOMContentLoaded', () => {
  const setUserLabel = () => {
    const user = localStorage.getItem('urbanUser') || 'Usuario';
    document.querySelectorAll('[data-user-label]').forEach((element) => {
      element.textContent = user;
    });
  };

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!email || !password) {
        alert('Completa tus datos para continuar.');
        return;
      }

      localStorage.setItem('urbanUser', email.split('@')[0] || 'Cliente');
      setUserLabel();
      window.location.href = 'index.html';
    });
  }

  const createAccountBtn = document.getElementById('createAccountBtn');
  if (createAccountBtn) {
    createAccountBtn.addEventListener('click', () => {
      alert('Función de creación de cuenta en desarrollo.');
    });
  }

  const recoverPasswordBtn = document.getElementById('recoverPasswordBtn');
  if (recoverPasswordBtn) {
    recoverPasswordBtn.addEventListener('click', () => {
      alert('Recuperación de contraseña en desarrollo.');
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('urbanUser');
      setUserLabel();
      window.location.href = 'login.html';
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Tu mensaje fue enviado correctamente.');
      contactForm.reset();
    });
  }

  setUserLabel();
});
