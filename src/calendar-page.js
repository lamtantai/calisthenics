const monthScrollBarContainer = document.querySelector('.month-scroll-bar');
const monthButtons = document.querySelectorAll('.month-button');
const calendarDateContainer = document.querySelector(
  '.calendar-date-container'
);
let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

const month = [
  'january',
  'febuary',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

monthScrollBarContainer.addEventListener('wheel', (event) => {
  event.preventDefault();
  console.log(monthScrollBarContainer.scrollLeft);

  monthScrollBarContainer.scrollLeft += event.deltaY;
});

function renderCalendar() {
  let firstDayOfCurrentMonth = new Date(currentYear, currentMonth).getDay();
  let lastDateOfCurrentMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  let lastDayOfCurrentMonth = new Date(
    currentYear,
    currentMonth,
    lastDateOfCurrentMonth
  ).getDay();

  let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
  let liHTML = '';

  // RENDER DATE OF LAST MONTH
  for (let i = firstDayOfCurrentMonth; i > 0; i--) {
    liHTML += `
     <li class="date-last-month">${lastDateOfLastMonth - i + 1}</li>
    `;
  }

  // RENDER DATE OF CURRENT MONTH
  for (let i = 1; i <= lastDateOfCurrentMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
        ? 'date-active'
        : '';
    liHTML += `
     <li class="${isToday}">${i}</li>
    `;
  }

  // RENDER DATE OF NEXT MONTH
  for (let i = lastDayOfCurrentMonth; i < 6; i++) {
    liHTML += `
     <li class="date-next-month">${i - lastDayOfCurrentMonth + 1}</li>
    `;
  }

  calendarDateContainer.innerHTML = liHTML;
}
renderCalendar();

function clearCurrentMonth() {
  monthButtons.forEach((btn) => {
    btn.classList.remove('month-active');
  });
}

monthButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    clearCurrentMonth();

    btn.classList.add('month-active');
    calendarDateContainer.innerHTML = '';
    const monthClicked = month.findIndex((month) => month == btn.textContent);
    currentMonth = monthClicked;

    renderCalendar();
  });
});
