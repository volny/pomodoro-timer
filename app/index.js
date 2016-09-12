import './style.scss';
import $ from 'jquery';
import './flipclock.min.js';

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
    start: sessionStarted,
    stop: sessionEnded,
    interval: function() {
    // HOW TO USE FLIPCLOCK METHODS
      var time = this.factory.getTime().time;
      if(time) {
        console.log('interval', time);
      }
    }
  }
});

let mode = 'session';

function toggleMode(mode) {
  return mode === 'session' ? 'break' : 'session';
}

function makeTimeString (time) {
  let minutes = parseInt(time / 60, 10);
  let seconds = parseInt(time % 60, 10);
  return minutes + " Minutes " + seconds + " Seconds";
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

function startNextSession() {
  mode = toggleMode(mode);
  startTimer(getDuration(mode));
}

function stopSession() {
  $('#sessionContainer').hide();
  $('#menuContainer').show();
  mode = 'session';
}


function sessionStarted() {
}

function sessionEnded() {
  // TODO hack bc `stop` event is fired with 1 sec left on clock??
  window.setTimeout(startNextSession, 1000);
}

function startTimer(duration) {
  // if we got values change from menu to timer screen
  // TODO should everything in this func be only if (duration)?
  if (duration) {
    $('#sessionContainer').show();
    $('#menuContainer').hide();
  } else {
    console.debug('no value given');
  }

  // put the session name subheadline in the DOM
  const session = $('#session');
  if (mode === 'break') {
    session.text('Break Time :)');
    $('.break-button').show();
  } else {
    session.text('');
    $('.break-button').hide();
  }

  // start the timer
  clock.setTime(duration);
  clock.start();
}

$('#restart').click(startNextSession);
$('#reset').click(stopSession);

$('#start').click(() => startTimer(getDuration('session')));

