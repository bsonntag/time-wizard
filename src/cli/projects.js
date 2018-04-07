/* eslint-disable no-console */

const { readCurrentTrack, readTracks } = require('../utils/io');

function projects() {
  return Promise
    .all([readCurrentTrack(), readTracks()])
    .then(([current, tracks]) => {
      tracks
        .concat(current)
        .filter(track => !!track)
        .reduce((set, { project }) => set.add(project), new Set())
        .forEach(project => console.log(project));
    });
}

module.exports = projects;
