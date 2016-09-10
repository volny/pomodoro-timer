import './style.scss';

const timer = document.querySelector('#timer');
const startButton = document.querySelector('#start');

let timeInterval;

function renderString(string, target) {
  target.textContent = string;
}

function makeTimeString (time) {
  let minutes = parseInt(time / 60, 10);
  let seconds = parseInt(time % 60, 10);
  return minutes + " Minutes " + seconds + " Seconds";
}

function timerHasEnded() {
  clearInterval(timeInterval);
  renderString('Finished', timer)
}

function updateTimer(duration, target) {
  var timeString = makeTimeString(duration);
  renderString(timeString, target);

  if (duration === 0) {
    timerHasEnded();
  }
}

function startTimer(duration, target) {
  timeInterval = setInterval(function () {
    updateTimer(duration--, target);
  }, 1000);

}

function timerCallback() {
  startTimer(2, timer);
}

startButton.addEventListener('click', timerCallback, false)

