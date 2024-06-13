const navBarIcon = document.querySelectorAll('.nav-link');
const addExerciseBtn = document.querySelector('.add-workout');
const addExerciseDialog = document.querySelector('.add-exercise-dialog');
const closeDialogBtn = document.querySelector('.close-dialog');
const submitDialogBtn = document.querySelector('.submit-dialog');

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

addExerciseBtn.addEventListener('click', () => {
  addExerciseDialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
  addExerciseDialog.close();
});

submitDialogBtn.addEventListener('click', () => {
  addExerciseDialog.close();
});
