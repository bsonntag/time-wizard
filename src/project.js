class Project {

  constructor(name) {
    this.name = name;
    this.tracks = [];
    this.tasks = new Map();
    this.totalTime = 0;
  }

  addTrack(track) {
    const trackDuration = track.duration();

    this.tracks = this.tracks.concat(track);
    this.totalTime += trackDuration;

    track.tasks.forEach(task => {
      const duration = this.tasks.get(task) || 0;

      this.tasks.set(task, duration + trackDuration);
    });
  }

}

module.exports = Project;
