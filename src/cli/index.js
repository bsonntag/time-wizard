/* eslint-disable no-console */

const projects = require('./projects');
const report = require('./report');
const start = require('./start');
const status = require('./status');
const stop = require('./stop');

module.exports = {
  projects,
  report,
  start,
  status,
  stop
};
