class Track {

  constructor(project, tasks, start = Date.now()) {
    this.project = project;
    this.tasks = tasks;
    this.start = start;
  }

  end() {
    this.stop = Date.now();
  }

}

module.exports = Track;
