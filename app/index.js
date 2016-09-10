import './style.scss';
import $ from 'jquery';

let timeInterval;
let mode = 'session';


function renderTime(string) {
  const timer = document.querySelector('#timer');
  timer.textContent = string;
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
      mode = toggleMode(mode);
      const breakDuration = getDuration(mode);
      startTimer(breakDuration);

    } else if (mode === 'break') {
      // break has ended
      mode = toggleMode(mode);
      const sessionDuration = getDuration(mode);
      startTimer(sessionDuration);
    }
  }
}

function getValues(mode) {
  if (mode === 'session') {
    return [document.querySelector('#sessionMinutes'), document.querySelector('#sessionSeconds')]
  } else if (mode === 'break') {
    return [document.querySelector('#breakMinutes'), document.querySelector('#breakSeconds')]
  }
}

function getDuration(mode) {
  const minutes = getValues(mode)[0];
  const seconds = getValues(mode)[1];

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

function renderForMode(mode) {
  const session = document.querySelector('#session')
  if (mode === 'break') {
    session.textContent = 'Break Time :)';

    const target = $('#sessionContainer');
    target.append('<button class="pure-button break-button" id="reset">Reset</button>');
    target.append('<button class="pure-button break-button" id="restart">Restart</button>');

  } else {
    session.textContent = '';
    $('.break-button').hide();
  }
}

function startTimer(duration) {
  // put the headline in the DOM for Break Time
  renderForMode(mode);

  if (duration) {
    // the first time we don't want to wait
    updateTimer(duration--);

    timeInterval = setInterval(function () {
      updateTimer(duration--);
    }, 1000);
  } else {
    console.debug('no value give');
  }
}

document.querySelector('#start').addEventListener('click',
  //() => startTimer(getDuration(sessionMinutes, sessionSeconds)),
  () => startTimer(getDuration('session')),
  false);

