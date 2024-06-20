// NAV BAR FUNCTION
const navBarIcon = document.querySelectorAll('.nav-link');

function clearCurrentPage() {
  navBarIcon.forEach((icon) => {
    icon.classList.remove('current-page');
  });
}

navBarIcon.forEach((icon) =>
  icon.addEventListener('click', () => {
    clearCurrentPage();
    const nameAttribute = icon.getAttribute('name');
    icon.style.setProperty('--content', `'${nameAttribute}'`);
    icon.classList.add('current-page');
  })
);
