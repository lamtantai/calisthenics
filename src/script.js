'use-strict';
const addExerciseDialog = document.querySelector('.exercise-dialog');
const closeDialogBtn = document.querySelector('.close-dialog');
const submitDialogBtn = document.querySelector('.submit-dialog');
const exerciseNameOption = document.getElementById('exercise-name');
const exerciseForm = document.getElementById('exercise-form');
const exerciseLogContainer = document.getElementById('exercise-log-container');
const minusButtons = document.querySelectorAll('.minus-button');
const plusButtons = document.querySelectorAll('.plus-button');
const exercisePartSelect = document.getElementById('exercise-part');
const exerciseNameSelect = document.getElementById('exercise-name');

let inputWeight = document.getElementById('exercise-weight-input');
let inputRep = document.getElementById('exercise-rep-input');
let inputTime = document.getElementById('exercise-time-input');

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

const todayExerciseData = {};
let currentExerciseSet = {};

// EXERCISE FORM FUNCTION

function openModal() {
  addExerciseDialog.showModal();
  changeExerciseName();
}

closeDialogBtn.addEventListener('click', () => {
  addExerciseDialog.close();
});

submitDialogBtn.addEventListener('click', () => {
  addExerciseDialog.close();
});

function addOrUpdateExercise() {
  const exerciseNameValue = exerciseNameSelect.value;
  const unique = exerciseNameValue + '-' + Date.now();
  const exerciseObj = {
    uniqueClass: unique,
    part: exercisePartSelect.value,
    rep: inputRep.value,
    weight: inputWeight.value,
    time: inputTime.value,
  };

  if (!todayExerciseData[exerciseNameValue]) {
    todayExerciseData[exerciseNameValue] = [exerciseObj];
  } else {
    const dataArrIndex = todayExerciseData[exerciseNameValue].findIndex(
      (set) => set.uniqueClass == currentExerciseSet.uniqueClass
    );

    if (dataArrIndex == -1) {
      todayExerciseData[exerciseNameValue].push(exerciseObj);
    } else {
      todayExerciseData[exerciseNameValue][dataArrIndex] = exerciseObj;
    }
  }

  renderExerciseData();
  exerciseForm.reset();
}

function renderExerciseData() {
  exerciseLogContainer.innerHTML = '';
  for (let [exerciseName, exerciseData] of Object.entries(todayExerciseData)) {
    exerciseData.forEach(({ part, rep, time, uniqueClass, weight }, index) => {
      const HTML1 = `
      <div id= "${exerciseName}" class="exercise-log" style="background-color:${partsColor[part]}">
              <h3 class="exercise-name">${allExercise[part][exerciseName]}</h3>
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
                  <tr class="${uniqueClass}" name="${exerciseName}">
                    <td class='delete-icon' onclick='deleteExerciseSet(this)'>
                      <ion-icon name='trash-outline'></ion-icon>
                    </td>
                    <td class="exercise-weight-log"  onclick='editExerciseSet(this)'>${weight}</td>
                    <td class="exercise-rep-log"  onclick='editExerciseSet(this)'>${rep}</td>
                    <td class="exercise-time-log"  onclick='editExerciseSet(this)'>${time}</td>
                  </tr>
                </tbody>
              </table>
            </div> 
      `;

      const HTML2 = `
              <tr class="${uniqueClass}" name="${exerciseName}">
                <td class='delete-icon' onclick='deleteExerciseSet(this)'>
                  <ion-icon name='trash-outline'></ion-icon>
                </td>
                <td class="exercise-weight-log"  onclick='editExerciseSet(this)'>${weight}</td>
                <td class="exercise-rep-log"  onclick='editExerciseSet(this)'>${rep}</td>
                <td class="exercise-time-log"  onclick='editExerciseSet(this)'>${time}</td>
              </tr>
  `;

      if (index === 0) {
        exerciseLogContainer.insertAdjacentHTML('beforeend', HTML1);
      } else {
        const exerciseTableBody = document.querySelector(
          `#${exerciseName} tbody`
        );
        if (exerciseTableBody) {
          exerciseTableBody.insertAdjacentHTML('beforeend', HTML2);
        } else {
          console.error(`Table body not found for exercise: ${exerciseName}`);
        }
      }
    });
  }
}

function editExerciseSet(exerciseSet) {
  const exerciseSetRow = exerciseSet.parentElement;
  const exerciseNameValue = exerciseSetRow.getAttribute('name');
  const dataArrIndex = todayExerciseData[exerciseNameValue].findIndex(
    (set) => set.uniqueClass === exerciseSetRow.className
  );

  currentExerciseSet = todayExerciseData[exerciseNameValue][dataArrIndex];

  exercisePartSelect.value = currentExerciseSet.part;
  exerciseNameSelect.value = exerciseNameValue;
  inputRep.value = currentExerciseSet.rep;
  inputWeight.value = currentExerciseSet.weight;
  inputTime.value = currentExerciseSet.time;

  addExerciseDialog.showModal();
}

function deleteExerciseSet(btn) {
  const exerciseSetRow = btn.parentElement;
  const exerciseNameValue = exerciseSetRow.getAttribute('name');
  const dataArrIndex = todayExerciseData[exerciseNameValue].findIndex(
    (set) => set.uniqueClass === exerciseSetRow.className
  );

  todayExerciseData[exerciseNameValue].splice(dataArrIndex, 1);

  if (todayExerciseData[exerciseNameValue].length == 0) {
    const exerciseNameContainer = document.getElementById(exerciseNameValue);
    exerciseNameContainer.remove();
  } else {
    exerciseSetRow.remove();
  }
}

exerciseForm.addEventListener('submit', function (event) {
  event.preventDefault();
  addOrUpdateExercise();
});

function changeExerciseName() {
  exerciseNameOption.innerHTML = '';
  const partChoose = allExercise[exercisePartSelect.value];
  for (const [key, value] of Object.entries(partChoose)) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = value;
    exerciseNameOption.appendChild(option);
  }
}

exercisePartSelect.addEventListener('change', changeExerciseName);

function changeNumberInput(btn) {
  const inputTarget = btn.parentElement.querySelector('input');
  const step = parseFloat(inputTarget.step) || 1;
  const min = parseFloat(inputTarget.min) || 0;

  let value = parseFloat(inputTarget.value) || 0;

  if (btn.classList.contains('minus-button')) {
    value = Math.max(value - step, min);
  } else if (btn.classList.contains('plus-button')) {
    value = value + step;
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
