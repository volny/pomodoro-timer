import './style.scss';

const timer = document.querySelector('#timer');
const startButton = document.querySelector('#start');

const sessionMinutes = document.querySelector('#sessionMinutes');
const sessionSeconds = document.querySelector('#sessionSeconds');
const breakMinutes = document.querySelector('#breakMinutes');
const breakSeconds = document.querySelector('#breakSeconds');

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

function getDuration(minutes, seconds) {
  if (minutes.value && seconds.value) {
    return parseInt(minutes.value) * 60 + parseInt(seconds.value);
  } else if (minutes.value) {
    return parseInt(minutes.value) * 60;
  } else if (seconds.value) {
    return parseInt(seconds.value);
  } else {
    return '';
  }
}

function startTimer(duration, target) {
  timeInterval = setInterval(function () {
    updateTimer(duration--, target);
  }, 1000);

}

function timerCallback() {
  const duration = getDuration(sessionMinutes, sessionSeconds);
  duration ? startTimer(duration, timer) : console.log('no value given');
}

startButton.addEventListener('click', timerCallback, false)
//startButton.addEventListener('click', () => startTimer(duration, target), false);

