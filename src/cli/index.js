/* eslint-disable no-console */

const projects = require('./projects');
const report = require('./report');
const restart = require('./restart');
const start = require('./start');
const status = require('./status');
const stop = require('./stop');

module.exports = {
  projects,
  report,
  restart,
  start,
  status,
  stop
};
