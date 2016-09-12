import './style.scss';
import $ from 'jquery';
import './flipclock.min.js';

let timeInterval;
let mode = 'session';

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

// THIS IS THE FUNC I CAN REPLACE BY FLIPCLOCK
// NO NEED TO UPDATE EVERY SECOND ANYMORE
function updateTimer(duration) {
  //const string = makeTimeString(duration);
  //$('#timer').text(string);

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

function renderForMode(mode, duration) {

  // FLIPCLOCK INSTANCE
  // issue: putting duration here weirdly brakes `clock.reset()` - get use `setTime`
  // issue: putting duration here makes clock lag behind by one second
  //var clock = $('#clock').FlipClock(duration, {
  var clock = $('#clock').FlipClock({
    autoStart: false,
    //clockFace: 'HourlyCounter',
    clockFace: 'MinuteCounter',
    countdown: true,
    callbacks: {
      stop: () => console.debug(mode, 'has stopped'),
      start: () => console.debug(mode, 'has started'),
      //interval: () => console.debug('clock interval'),
      //reset: () => console.debug('clock has reset')
    }
  });

  const session = $('#session');
  if (mode === 'break') {
    session.text('Break Time :)');
    $('.break-button').show();
  } else {
    session.text('');
    $('.break-button').hide();
  }

  //clock.setCountdown(true);
  //clock.reset();
  clock.setTime(duration);
  clock.start();
}

function startTimer(duration) {
  // put the headline in the DOM for Break Time
  renderForMode(mode, duration);

  if (duration) {
    $('#sessionContainer').show();
    $('#menuContainer').hide();

    // the first time we don't want to wait
    updateTimer(duration--);

    // DON'T NEED AN INTERVAL ANYMORE!
    // FLIPCLOCK COUNTS DOWN DURATION AND FIRES AN EVENT WHEN DONE
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

