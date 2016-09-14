# Pomodoro Timer

Uses [noUiSlider](http://refreshless.com/nouislider) and [FlipclockJs](http://flipclockjs.com/).

## Todo

- menu layout is just a dummy - needs proper flexbox layout and be responsive
- # of minutes should be text and only turn into input when clicked. box around the number the shape of the input indicates it's clickable
- background color is just placeholder. should be a greyscale pattern, changing to color from bottom to top relative to timer.
- after breaktime is over clock should start counting up and wait for user to start next session

## Issues

- needs a complete rewrite, basically
- manually added some libs bc not sure how to properly import npm modules
- flipclock stops one second short - `setInterval` hack now, needs proper solution
- clock needs to reset when user leaves the timer. Weird issues with `clock.reset()`
- linking the input and slider not working as it should
- form validation - after a wrong submit the form won't accept any values anymore

