import './style.scss';
import $ from 'jquery';
import './flipclock.min.js';

// FLIPCLOCK INSTANCE
// issue: putting duration here weirdly brakes `clock.reset()` - get use `setTime`
// issue: putting duration here makes clock lag behind by one second
//var clock = $('#clock').FlipClock(duration, {
const clock = $('#clock').FlipClock({
  autoStart: false,
  //clockFace: 'HourlyCounter',
  clockFace: 'MinuteCounter',
  countdown: true,
  callbacks: {
    start,
    stop,
    interval() {
    // HOW TO USE FLIPCLOCK METHODS
      var time = this.factory.getTime().time;
      if(time) {
        console.log('interval', time);
      }
    }
  }
});

function makeTimeString (time) {
  let minutes = parseInt(time / 60, 10);
  let seconds = parseInt(time % 60, 10);
  return minutes + " Minutes " + seconds + " Seconds";
}

function reset() {
  $('#sessionContainer').hide();
  $('#menuContainer').show();
}

function start() {
}

let mode = 'sesssion';

function stop() {
  console.log(mode);
  // TODO hack bc `stop` event is fired with 1 sec left on clock??
  window.setTimeout(() => startTimer(mode), 1000);
}

function startTimer() {
  const duration = mode === 'session' ? document.querySelector('#sessionInput').value : document.querySelector('#breakInput').value;
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

  // change mode
  mode = mode === 'session' ? 'break' : 'session';
}

$('#restart').click(() => {mode = 'session'; startTimer()});
$('#reset').click(reset);

$('#start').click(() => {mode = 'session'; startTimer()});

