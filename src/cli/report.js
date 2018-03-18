/* eslint-disable no-console */

const { formatDuration } = require('../utils/time');
const { readTracks } = require('../utils/io');
const Project = require('../project');

function projectsFromTracks(tracks) {
  return tracks.reduce((projects, track) => {
    const projectName = track.project;
    let project = projects.get(projectName);

    if (!project) {
      project = new Project(projectName);
    }

    project.addTrack(track);

    return projects.set(projectName, project);
  }, new Map());
}

function logProject(project) {
  console.log('%s - %s', project.name, formatDuration(project.totalTime));

  project.tasks.forEach((duration, task) => {
    console.log('  [%s - %s]', task, formatDuration(duration));
  });

  console.log();
}

function report(options = {}) {
  const {
    from = 0,
    to = Date.now()
  } = options;

  const startDate = from;
  const endDate = to;

  return readTracks()
    .then(tracks => tracks.filter(track => track.isBetween(startDate, endDate)))
    .then(tracks => {
      projectsFromTracks(tracks)
        .forEach(logProject);

      const totalTime = tracks.reduce((total, track) => total + track.duration(), 0);

      console.log('Total time: %s', formatDuration(totalTime));
    });
}

module.exports = report;
