import './style.scss';
import $ from 'jquery';
import './flipclock.min.js';

const clock = $('#clock').FlipClock({
  autoStart: false,
  //clockFace: 'HourlyCounter',
  clockFace: 'MinuteCounter',
  countdown: true,
  callbacks: {
    start,
    stop,
    interval() {
      console.log('interval', this.factory.getTime().time);
    }
  }
});

let mode = 'sesssion';

function reset() {
  $('#sessionContainer').hide();
  $('#menuContainer').show();
}

function start() {
}

function stop() {
  // TODO hack bc `stop` event is fired with 1 sec left on clock??
  window.setTimeout(() => startTimer(mode), 1000);
}

function startTimer() {
  const sessionLength = parseInt(document.querySelector('#sessionInput').value);
  const breakLength = parseInt(document.querySelector('#breakInput').value);

  //if (sessionLength && breakLength) {
  if ($('#startForm')[0].checkValidity()) {
    $('#validationMessage').hide();

    $('#sessionContainer').show();
    $('#menuContainer').hide();

    if (mode === 'break') {
      $('#session').text('Break Time :)');
      $('.break-button').show();

      clock.setTime(breakLength);
      clock.start();

      mode = 'session';
    } else {
      $('#session').empty();
      $('.break-button').hide();

      clock.setTime(sessionLength);
      clock.start();

      mode = 'break';
    }
  } else {
    $('#validationMessage').show();
  }
}

$('#restart').click(() => {mode = 'session'; startTimer()});
$('#reset').click(reset);

$('#start').click(() => {mode = 'session'; startTimer()});

