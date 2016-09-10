import './style.scss';

const startButton = document.querySelector('#start');
const sessionMinutes = document.querySelector('#sessionMinutes');
const sessionSeconds = document.querySelector('#sessionSeconds');
const breakMinutes = document.querySelector('#breakMinutes');
const breakSeconds = document.querySelector('#breakSeconds');

let timeInterval;
let mode = 'session';


function renderTime(string) {
  const timer = document.querySelector('#timer');
  timer.textContent = string;
}

function renderMode(string) {
  const session = document.querySelector('#session');
  session.textContent = string;
}

function toggleMode(mode) {
  return mode === 'session' ? 'break' : 'session';
}

function makeTimeString (time) {
  let minutes = parseInt(time / 60, 10);
  let seconds = parseInt(time % 60, 10);
  return minutes + " Minutes " + seconds + " Seconds";
}

function updateTimer(duration) {
  var timeString = makeTimeString(duration);
  renderTime(timeString);

  if (duration === 0) {
    clearInterval(timeInterval);

    if (mode === 'session') {
      // session has ended
      const breakDuration = getDuration(breakMinutes, breakSeconds);
      mode = toggleMode(mode);
      startTimer(breakDuration);
    } else if (mode === 'break') {
      // break has ended
      const sessionDuration = getDuration(sessionMinutes, sessionSeconds);
      mode = toggleMode(mode);
      startTimer(sessionDuration);
    }
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

function startTimer(duration) {
  renderMode(mode);

  if (duration) {
    timeInterval = setInterval(function () {
      updateTimer(duration--);
    }, 1000);
  } else {
    console.debug('no value give');
  }
}

startButton.addEventListener('click',
  () => startTimer(getDuration(sessionMinutes, sessionSeconds)),
  false);

