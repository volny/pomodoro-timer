import './style.scss';
import $ from 'jquery';
//import 'flipclockjs';
import './flipclock.min.js';
import noUiSlider from 'no-ui-slider';
//import 'no-ui-slider/css/nouislider.css';

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

// same problem: can't use jQuery selectors bc weird error
const sessionSlider = document.querySelector('#sessionSlider');
const sessionInput = document.querySelector('#sessionInput');
noUiSlider.create(sessionSlider, {
  start: 3,
  step: 1,
  connect: 'lower',
  animate: true,
  animationDuration: 300,
  range: {
    'min': 1,
    'max': 120
  }
});

sessionSlider.noUiSlider.on('update', function(values, handle) {
  sessionInput.value = parseInt(values[handle]);
});

// broken
//sessionInput.addEventListener('change', function(){
//  sessionSlider.noUiSlider.set([null, this.value]);
//});

const breakSlider = document.querySelector('#breakSlider');
const breakInput = document.querySelector('#breakInput');
noUiSlider.create(breakSlider, {
  start: 5,
  step: 1,
  connect: 'lower',
  animate: true,
  animationDuration: 300,
  range: {
    'min': 1,
    'max': 120
  }
});

breakSlider.noUiSlider.on('update', function(values, handle) {
  breakInput.value = parseInt(values[handle]);
});

let mode = 'sesssion';

function reset() {
  //$('#sessionContainer').hide();
  $('#sessionContainer').css('display', 'none');
  //$('#menuContainer').show();
  $('#menuContainer').css('display', 'flex');
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

  if ($('#startForm')[0].checkValidity()) {
    //$('#validationMessage').hide();
    $('#validationMessage').css('display', 'flex');

    //$('#sessionContainer').show();
    $('#sessionContainer').css('display', 'flex');
    //$('#menuContainer').hide();
    $('#menuContainer').css('display', 'none');

    if (mode === 'break') {
      $('#session').text('Break Time :)');
      //$('.break-button').show();
      $('.break-button').css('display', 'flex');

      clock.setTime(breakLength);
      clock.start();

      mode = 'session';
    } else {
      $('#session').text('Session')
      //$('.break-button').hide();
      $('.break-button').css('display', 'none');

      clock.setTime(sessionLength);
      clock.start();

      mode = 'break';
    }
  } else {
    // fake submit the form to get HTML5 form validation
    $('#startForm').find(':submit').click();
    $('#validationMessage').show();
  }
}

$('#restart').click(() => {mode = 'session'; startTimer()});
$('#reset').click(reset);

$('#start').click(() => {mode = 'session'; startTimer()});

