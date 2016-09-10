import './style.scss';

const timer = document.querySelector('#timer');
const startButton = document.querySelector('#start');

function renderString(string, target) {
  target.textContent = string;
}

function makeTimeString (time) {
  let minutes = parseInt(time / 60, 10);
  let seconds = parseInt(time % 60, 10);
  return minutes + " Minutes " + seconds + " Seconds";
}

function startTimer(duration, target) {
  var time = duration;

  setInterval(function () {
    var timeString = makeTimeString(time);
    renderString(timeString, target);

    if (--time < 0) {
      time = duration;
    }
  }, 1000);
}

function timerCallback() {
  startTimer(5, timer);
}

startButton.addEventListener('click', timerCallback, false)

