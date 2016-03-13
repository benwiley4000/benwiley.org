// source: http://goo.gl/kEvnKn
Number.prototype.toTime = function () {
  var mins = Math.floor(this / 60);
  var secs = (this % 60).toFixed();
  return (mins < 10 ? "0" : "" ) + mins + ":" + (secs < 10 ? "0" : "" ) + secs;
};

console.error = console.error || console.log;
console.warn = console.warn || console.log;
