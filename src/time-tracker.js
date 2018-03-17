const Track = require('./track');

class TimeTracker {

  constructor() {
    this.current = null;
    this.tracks = [];
  }

  start(project, tasks) {
    if (!project || !tasks) {
      throw new Error('Project and tasks are required');
    }

    this.current = new Track(project, [].concat(tasks));
  }

  stop() {
    if (!this.current) {
      throw new Error('No active track');
    }

    this.current.end();
    this.tracks = [].concat(this.current, this.tracks);
    this.current = null;
  }

}

module.exports = TimeTracker;
