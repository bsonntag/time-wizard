/* eslint-disable no-console */

const { readCurrentTrack, readTracks } = require('../utils/io');

function tasks() {
  return Promise
    .all([readCurrentTrack(), readTracks()])
    .then(([current, tracks]) => {
      tracks
        .concat(current)
        .filter(track => !!track)
        .reduce((result, { tasks }) => result.concat(tasks), [])
        .reduce((set, task) => set.add(task), new Set())
        .forEach(task => console.log(task));
    });
}

module.exports = tasks;
