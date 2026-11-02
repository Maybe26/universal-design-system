/**
 * Universal Design System - Interactive Controller
 * Theme management, accessible modals, and toast triggers
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initModals();
  initCopyTokens();
});

/**
 * Dark/Light Mode Management with LocalStorage and System Prefers
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('uds-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('uds-theme', theme);

  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');
  
  if (themeIcon && themeLabel) {
    if (theme === 'dark') {
      themeIcon.innerHTML = `<path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>`;
      themeLabel.textContent = 'Dark Mode';
    } else {
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>`;
      themeLabel.textContent = 'Light Mode';
    }
  }
}

/**
 * Accessible Modal Handlers
 */
function initModals() {
  const openModalBtn = document.getElementById('open-demo-modal');
  const closeModalBtn = document.getElementById('close-demo-modal');
  const modalBackdrop = document.getElementById('demo-modal');

  if (openModalBtn && modalBackdrop) {
    openModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        closeModal();
      }
    });
  }
}

/**
 * Toast Notification Trigger
 */
function showToast(message, type = 'primary') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 200ms ease';
    setTimeout(() => toast.remove(), 200);
  }, 3000);
}

/**
 * Click to Copy Token Values
 */
function initCopyTokens() {
  const tokenSwatches = document.querySelectorAll('.token-swatch');
  tokenSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const tokenName = swatch.getAttribute('data-token');
      if (tokenName) {
        navigator.clipboard.writeText(tokenName).then(() => {
          showToast(`Copied token ${tokenName} to clipboard!`);
        });
      }
    });
  });
}
