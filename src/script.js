'use-strict';
const navBarIcon = document.querySelectorAll('.nav-link');
const addExerciseDialog = document.querySelector('.add-exercise-dialog');
const closeDialogBtn = document.querySelector('.close-dialog');
const submitDialogBtn = document.querySelector('.submit-dialog');
const partOfExercise = document.getElementById('exercise-part');
const inputWeight = document.getElementById('exercise-weight-input');
const inputRep = document.getElementById('exercise-rep-input');
const inputTime = document.getElementById('exercise-time-input');
const exerciseNameOption = document.getElementById('exercise-name');
const exerciseForm = document.getElementById('exercise-form');
const exerciseLogContainer = document.getElementById('exercise-log-container');

const partsColor = {
  chest: '#ADD8E6', // Light Blue
  back: '#FFB6C1', // Light Pink
  leg: '#FFFFE0', // Light Yellow
  triceps: '#98FB98', // Pale Green
  biceps: '#F08080', // Light Coral
  shoulder: '#E6E6FA', // Lavender (Light Purple)
  abs: '#E0FFFF', // Light Cyan
  cardio: '#E0FFFF', // Light Cyan
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
function showModal() {
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
  console.log(todayExercises);
}

function renderSet(exerciseName, setDetails) {
  const color = partsColor[setDetails.part];
  const name = allExercise[setDetails.part][exerciseName];
  const html1 = `
  <div id= "${exerciseName}" class="exercise-log" style="background-color:${color}">
          <h3 class="exercise-name">${name}</h3>
          <hr />

          <table class="exercise-table">
            <thead>
              <tr>
                <th class="exercise-set">Set</th>
                <th class="exercise-weight">Weight</th>
                <th class="exercise-rep">Rep</th>
                <th class="exercise-time">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="exercise-set-log">${setDetails.set}</td>
                <td class="exercise-weight-log">${setDetails.weight}</td>
                <td class="exercise-rep-log">${setDetails.rep}</td>
                <td class="exercise-time-log">${setDetails.time}</td>
              </tr>
            </tbody>
          </table>
        </div> 
  `;

  const html2 = `
              <tr>
                <td class="exercise-set-log">${setDetails.set}</td>
                <td class="exercise-weight-log">${setDetails.weight}</td>
                <td class="exercise-rep-log">${setDetails.rep}</td>
                <td class="exercise-time-log">${setDetails.time}</td>
              </tr>
  `;
  if (todayExercises[exerciseName].length == 1) {
    exerciseLogContainer.insertAdjacentHTML('beforeend', html1);
  } else {
    document
      .querySelector(`#${exerciseName} tbody`)
      .insertAdjacentHTML('beforeend', html2);
  }
}

function renderExerciseInput() {
  const formData = new FormData(exerciseForm);
  const data = Object.fromEntries(formData);
  const exercisePart = data['exercise-part'];
  const exerciseName = data['exercise-name'];
  const exerciseRep = data['exercise-rep-input'];
  const exerciseWeight = data['exercise-weight-input'];
  const exerciseTime = data['exercise-time-input'];

  const exerciseObj = {
    part: exercisePart,
    rep: exerciseRep,
    weight: exerciseWeight,
    time: exerciseTime,
    set: 1,
  };

  addSet(exerciseName, exerciseObj);
  renderSet(exerciseName, exerciseObj);
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

const minusButtons = document.querySelectorAll('.minus-button');
const plusButtons = document.querySelectorAll('.plus-button');

minusButtons.forEach((button) => {
  button.addEventListener('click', function () {
    changeNumberInput(this);
  });
});

plusButtons.forEach((button) => {
  button.addEventListener('click', function () {
    changeNumberInput(this);
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
