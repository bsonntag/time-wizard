const moment = require('moment');
const util = require('util');

function formatDuration(time) {
  const duration = moment.duration(time);

  return util.format(
    '%sh %sm %ss',
    Math.floor(duration.hours()),
    duration.minutes(),
    duration.seconds(),
  );
}

function formatFromNow(date) {
  return moment(date).fromNow();
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString('pt-PT');
}

function isBetween(date, start, end) {
  return moment(date).isBetween(start, end);
}

module.exports = {
  formatDuration,
  formatFromNow,
  formatTime,
  isBetween
};
