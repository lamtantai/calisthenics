'use-strict';
const navBarIcon = document.querySelectorAll('.nav-link');
const addExerciseDialog = document.querySelector('.exercise-dialog');
const closeDialogBtn = document.querySelector('.close-dialog');
const submitDialogBtn = document.querySelector('.submit-dialog');
const partOfExercise = document.getElementById('exercise-part');
const inputWeight = document.getElementById('exercise-weight-input');
const inputRep = document.getElementById('exercise-rep-input');
const inputTime = document.getElementById('exercise-time-input');
const exerciseNameOption = document.getElementById('exercise-name');
const exerciseForm = document.getElementById('exercise-form');
const exerciseLogContainer = document.getElementById('exercise-log-container');
const minusButtons = document.querySelectorAll('.minus-button');
const plusButtons = document.querySelectorAll('.plus-button');

const partsColor = {
  chest: '#ADD8E6', // Light Blue
  back: '#FFB6C1', // Light Pink
  leg: '#FFFFE0', // Light Yellow
  triceps: '#98FB98', // Pale Green
  biceps: '#F08080', // Light Coral
  shoulder: '#E6E6FA', // Lavender (Light Purple)
  abs: '#E0FFFF', // Light Cyan
  cardio: '#C7B4D6', // Light Cyan
};

const allExercise = {
  chest: {
    chest1: 'Push ups',
    chest2: 'Planche push ups',
    chest3: 'Incline push ups',
    chest4: 'Decline push ups',
    chest5: 'Wall push ups',
    chest6: 'Wide hands push ups',
    chest7: 'Narrow hands push ups',
    chest8: 'Dips',
  },
  back: {
    back1: 'Pull ups',
    back2: 'Chin ups',
    back3: 'Inverted row',
    back4: 'Wide grip pull ups',
    back5: 'Narrow grip pull ups',
    back6: 'Face pulls',
  },
  leg: {
    leg1: 'Squats',
    leg2: 'Jump squats',
    leg3: 'Split squats',
    leg4: 'Pistol squats',
    leg5: 'Lunges',
    leg6: 'Calf raises',
  },
  triceps: {
    triceps1: 'Diamond push ups',
    triceps2: 'Bench dips',
    triceps3: 'Tricep ring dips',
    triceps4: 'Triceps extension',
  },
  biceps: {
    biceps1: 'Bicep curls',
    biceps2: 'Hammer curls',
  },
  shoulder: {
    shoulder1: 'Pike push ups',
    shoulder2: 'Handstand hold',
    shoulder3: 'Rear delt fly',
    shoulder4: 'Lateral raise',
  },
  abs: {
    abs1: 'Crunches',
    abs2: 'Leg raises',
    abs3: 'Plank',
    abs4: 'Hollow rock',
    abs5: 'Sitting twists',
  },
  cardio: {
    cardio1: 'Jump rope',
    cardio2: 'Running',
  },
};

const todayExercises = {};

// EXERCISE FORM FUNCTION
function getFormData() {
  const formData = new FormData(exerciseForm);
  const data = Object.fromEntries(formData);
  return data;
}
function openModal() {
  exerciseForm.reset();
  changeExerciseName();
  addExerciseDialog.showModal();
}

function addSet(exerciseName, setDetails) {
  if (todayExercises[exerciseName]) {
    todayExercises[exerciseName].push(setDetails);
  } else {
    todayExercises[exerciseName] = [setDetails];
  }
}

function deleteSet(btn) {
  // const deleteSetBtn = document.querySelectorAll('.delete-icon ion-icon');
  // deleteSetBtn.forEach((btn) => {
  //   btn.addEventListener('click', () => {
  //     const setDeleteExercise = btn.closest('tr').getAttribute('name');
  //     const uniqueClass = btn.closest('tr').className;
  //     const setRemove = document.querySelector(`.${uniqueClass}`);
  //     console.log(setRemove);
  //     removeExerciseFromLog(todayExercises, setDeleteExercise, uniqueClass);
  //     console.log(todayExercises);
  //   });
  // });

  btn.forEach((btn) => {
    btn.addEventListener('click', () => {
      const setRow = btn.closest('tr');
      const setDeleteExercise = setRow.getAttribute('name');
      const uniqueClass = setRow.className;
      const exerciseContainer = document.getElementById(`${setDeleteExercise}`);

      // Update the data structure
      removeExerciseFromLog(todayExercises, setDeleteExercise, uniqueClass);

      if (todayExercises[setDeleteExercise].length == 0) {
        exerciseContainer.remove();
      } else {
        // Remove the set from the DOM
        setRow.remove();
      }
    });
  });
}

// Function to remove an object with a specific uniqueClass
function removeExerciseFromLog(exercises, part, uniqueClass) {
  if (exercises[part]) {
    exercises[part] = exercises[part].filter(
      (exercise) => exercise.uniqueClass != uniqueClass
    );
  } else {
    console.error(`Part ${part} not found in exercises`);
  }
}

function renderSet(exerciseName, setDetails) {
  const color = partsColor[setDetails.part];
  const name = allExercise[setDetails.part][exerciseName];
  const HTML1 = `
  <div id= "${exerciseName}" class="exercise-log" style="background-color:${color}">
          <h3 class="exercise-name">${name}</h3>
          <hr />

          <table class="exercise-table">
            <thead>
              <tr>
                <th></th>
                <th class="exercise-weight">Weight</th>
                <th class="exercise-rep">Rep</th>
                <th class="exercise-time">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr class="${setDetails.uniqueClass}" name="${exerciseName}">
                <td class='delete-icon'>
                  <ion-icon name='trash-outline'></ion-icon>
                </td>
                <td class="exercise-weight-log">${setDetails.weight}</td>
                <td class="exercise-rep-log">${setDetails.rep}</td>
                <td class="exercise-time-log">${setDetails.time}</td>
              </tr>
            </tbody>
          </table>
        </div> 
  `;

  const HTML2 = `
              <tr class="${setDetails.uniqueClass}" name="${exerciseName}">
                <td class='delete-icon'>
                  <ion-icon name='trash-outline'></ion-icon>
                </td>
                <td class="exercise-weight-log">${setDetails.weight}</td>
                <td class="exercise-rep-log">${setDetails.rep}</td>
                <td class="exercise-time-log">${setDetails.time}</td>
              </tr>
  `;

  if (todayExercises[exerciseName].length == 1) {
    exerciseLogContainer.insertAdjacentHTML('beforeend', HTML1);
  } else {
    document
      .querySelector(`#${exerciseName} tbody`)
      .insertAdjacentHTML('beforeend', HTML2);
  }

  const deleteSetBtns = document.querySelectorAll('.delete-icon ion-icon');
  deleteSet(deleteSetBtns);

  const trows = document.querySelectorAll('tbody tr');
  trows.forEach((trow) => {
    trow.addEventListener('click', () => {
      const classTrow = trow.className;
    });
  });
}

function removeSet(event) {
  console.log(event.target);
}

function renderExerciseInput() {
  const data = getFormData();
  const exercisePart = data['exercise-part'];
  const exerciseName = data['exercise-name'];
  const exerciseRep = data['exercise-rep-input'];
  const exerciseWeight = data['exercise-weight-input'];
  const exerciseTime = data['exercise-time-input'];
  const unique = exerciseName + '-' + Number(new Date());

  const exerciseSetObj = {
    uniqueClass: unique,
    part: exercisePart,
    rep: exerciseRep,
    weight: exerciseWeight,
    time: exerciseTime,
  };

  addSet(exerciseName, exerciseSetObj);
  renderSet(exerciseName, exerciseSetObj);
}

submitDialogBtn.addEventListener('click', () => {
  renderExerciseInput();
  addExerciseDialog.close();
});

closeDialogBtn.addEventListener('click', (e) => {
  addExerciseDialog.close();
});

function submitInputExerciseForm(form) {}

exerciseForm.addEventListener('submit', function (event) {
  event.preventDefault();
});

function changeExerciseName() {
  exerciseNameOption.innerHTML = '';
  const partChoose = allExercise[partOfExercise.value];
  for (const [key, value] of Object.entries(partChoose)) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = value;
    option.className = 'exercise-type';
    exerciseNameOption.appendChild(option);
  }
}

partOfExercise.addEventListener('change', changeExerciseName);

function changeNumberInput(btn) {
  const inputTarget = btn.parentElement.querySelector('input');
  const step = parseFloat(inputTarget.step) || 1;
  const min = parseFloat(inputTarget.min) || 0;
  const max = parseFloat(inputTarget.max) || Infinity;

  let value = parseFloat(inputTarget.value) || 0;

  if (btn.classList.contains('minus-button')) {
    value = Math.max(value - step, min);
  } else if (btn.classList.contains('plus-button')) {
    value = Math.min(value + step, max);
  }
  inputTarget.value = value;
}

minusButtons.forEach((button) => {
  button.addEventListener('click', function () {
    changeNumberInput(button);
  });
});

plusButtons.forEach((button) => {
  button.addEventListener('click', function () {
    changeNumberInput(button);
  });
});

// NAV BAR FUNCTION
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
