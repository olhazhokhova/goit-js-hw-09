import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const firstDelay = +e.currentTarget.elements.delay.value;
  let delay = firstDelay;

  for (let i = 1; i <= e.currentTarget.elements.amount.value; i += 1) {
    createPromise(i, delay)
      .then(result => {
        Notiflix.Notify.success(result);
      })
      .catch(error => {
        Notiflix.Notify.failure(error);
      });
    delay += +e.currentTarget.elements.step.value;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}
