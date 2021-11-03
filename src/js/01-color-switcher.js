const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let interval = null;

window.addEventListener('DOMContentLoaded', () => {
  refs.stop.disabled = true;
});

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onStopClick);

function onStartClick(e) {
  interval = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  toggleDisabledButton(e.target, refs.stop);
}

function onStopClick(e) {
  clearInterval(interval);
  toggleDisabledButton(e.target, refs.start);
}

function toggleDisabledButton(el, sibling) {
  el.disabled = el.hasAttribute('disabled') ? false : true;
  sibling.disabled = sibling.hasAttribute('disabled') ? false : true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
