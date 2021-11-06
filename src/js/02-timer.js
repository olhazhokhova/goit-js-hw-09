import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  buttonStart: document.querySelector('[data-start]'),
  inputDate: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      refs.buttonStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.buttonStart.disabled = false;
      selectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

window.addEventListener('DOMContentLoaded', () => {
  refs.buttonStart.disabled = true;
});

refs.buttonStart.addEventListener('click', () => {
  refs.buttonStart.disabled = true;
  refs.inputDate.disabled = true;
  onStartTimer();
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onStartTimer() {
  const timer = setInterval(() => {
    const currentDate = Date.now();
    const deltaDate = selectedDate - currentDate;
    const time = convertMs(deltaDate);
    if (deltaDate < 1000) {
      clearInterval(timer);
      refs.inputDate.disabled = false;
    }
    updateTime(time);
  }, 1000);
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
