/* eslint-disable no-console */

const cancel = require('./cancel');
const projects = require('./projects');
const report = require('./report');
const restart = require('./restart');
const start = require('./start');
const status = require('./status');
const stop = require('./stop');
const tasks = require('./tasks');

module.exports = {
  cancel,
  projects,
  report,
  restart,
  start,
  status,
  stop,
  tasks
};
