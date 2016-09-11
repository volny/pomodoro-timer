import './style.scss';
import $ from 'jquery';

let timeInterval;
let mode = 'session';

function renderTime(string) {
  $('#timer').text(string);
}

function toggleMode(mode) {
  return mode === 'session' ? 'break' : 'session';
}

function makeTimeString (time) {
  let minutes = parseInt(time / 60, 10);
  let seconds = parseInt(time % 60, 10);
  return minutes + " Minutes " + seconds + " Seconds";
}

function stopSession() {
  clearInterval(timeInterval);
  $('#sessionContainer').hide();
  $('#menuContainer').show();
  mode = 'session';
}

function startNextSession() {
  clearInterval(timeInterval);
  mode = toggleMode(mode);
  startTimer(getDuration(mode));
}

function updateTimer(duration) {
  renderTime(makeTimeString(duration));

  if (duration === 0) {
    startNextSession();
  }
}

// TODO error when converting to jQuery selectors?
function getValues(mode) {
  if (mode === 'session') {
    return [document.querySelector('#sessionMinutes'), document.querySelector('#sessionSeconds')]
    //return [$('#sessionMinutes'), $('#sessionSeconds')];
  } else if (mode === 'break') {
    return [document.querySelector('#breakMinutes'), document.querySelector('#breakSeconds')]
    //return [$('#breakMinutes'), $('#breakSeconds')];
  }
}

function getDuration(mode) {
  const minutes = getValues(mode)[0];
  const seconds = getValues(mode)[1];
  let duration = 0;
  if (minutes.value) {
    duration += parseInt(minutes.value) *60;
  }
  if (seconds.value) {
    duration += parseInt(seconds.value);
  }
  return duration;
}

function renderForMode(mode) {
  const session = $('#session');
  if (mode === 'break') {
    session.text('Break Time :)');
    $('.break-button').show();
  } else {
    session.text('');
    $('.break-button').hide();
  }
}

function startTimer(duration) {
  // put the headline in the DOM for Break Time
  renderForMode(mode);

  if (duration) {
    // hide the menu and show the timer
    $('#sessionContainer').show();
    $('#menuContainer').hide();

    // the first time we don't want to wait
    updateTimer(duration--);

    timeInterval = setInterval(function () {
      updateTimer(duration--);
    }, 1000);
  } else {
    console.debug('no value given');
  }
}

$('#restart').click(startNextSession);
$('#reset').click(stopSession);

$('#start').click(() => startTimer(getDuration('session')));

