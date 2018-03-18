const { isBetween } = require('./utils/time');

class Track {

  constructor(project, tasks, start = Date.now(), stop) {
    this.project = project;
    this.tasks = tasks;
    this.start = start;
    this.stop = stop;
  }

  duration() {
    return this.stop - this.start;
  }

  end(stop = Date.now()) {
    this.stop = stop;
  }

  isBetween(start, end) {
    return isBetween(this.start, start, end) && isBetween(this.stop, start, end);
  }

}

module.exports = Track;
