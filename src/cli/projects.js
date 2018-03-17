/* eslint-disable no-console */

const { readCurrentTrack, readTracks } = require('../utils/io');

function projects() {
  return Promise
    .all([readCurrentTrack(), readTracks()])
    .then(([current, tracks]) => {
      const projectsNames = tracks
        .concat(current)
        .filter(track => !!track)
        .reduce((result, { project }) => {
          if (result.includes(project)) {
            return result;
          }

          return result.concat(project);
        }, []);

      console.log(projectsNames.join('\n'));
    });
}

module.exports = projects;
