/* eslint-disable no-console */

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
  console.log('%s - %s', project.name, project.totalTime);

  project.tasks.forEach((duration, task) => {
    console.log('\t[%s - %s]', task, duration);
  });

  console.log();
}

function report() {
  return readTracks()
    .then(tracks => {
      projectsFromTracks(tracks).forEach(logProject);

      const totalTime = tracks.reduce((total, track) => total + track.duration(), 0);

      console.log('Total time: %s', totalTime);
    });
}

module.exports = report;
