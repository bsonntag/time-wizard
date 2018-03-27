const moment = require('moment');
const util = require('util');

function formatDateTime(date) {
  return moment(date).format('L LTS');
}

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
  return moment(date).format('LTS');
}

function isBetween(date, start, end) {
  const dateMoment = moment(date);

  return dateMoment.isSameOrAfter(start) && dateMoment.isBefore(end);
}

function startOfDay(date) {
  return moment(date).startOf('day');
}

function startOfNextDay(date) {
  return moment(date).add(1, 'days').startOf('day');
}

module.exports = {
  formatDateTime,
  formatDuration,
  formatFromNow,
  formatTime,
  isBetween,
  startOfDay,
  startOfNextDay
};
