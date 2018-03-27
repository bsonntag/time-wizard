/* eslint-disable no-console */

const {
  formatDateTime,
  formatDuration,
  startOfDay,
  startOfNextDay
} = require('../utils/time');

const { readTracks } = require('../utils/io');
const Project = require('../project');

function getStartAndEndDates(options) {
  if (options.today) {
    options.from = startOfDay();
    options.to = startOfNextDay();
  }

  const { from, to } = options;

  if (from && to) {
    console.log(
      'Reporting activity from %s until %s\n',
      formatDateTime(from),
      formatDateTime(to)
    );
  } else {
    console.log('Reporting all activity\n');
  }

  return {
    from: from || new Date(0),
    to: to || new Date()
  };
}

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
  const { from, to } = getStartAndEndDates(options);

  return readTracks()
    .then(tracks => tracks.filter(track => track.isBetween(from, to)))
    .then(tracks => {
      projectsFromTracks(tracks)
        .forEach(logProject);

      const totalTime = tracks.reduce((total, track) => total + track.duration(), 0);

      console.log('Total time: %s', formatDuration(totalTime));
    });
}

module.exports = report;
