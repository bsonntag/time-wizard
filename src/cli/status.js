/* eslint-disable no-console */

const { readCurrentTrack } = require('../utils/io');

function status() {
  return readCurrentTrack()
    .then(current => {
      if (!current) {
        console.log('No project started.');

        return;
      }

      console.log(
        'Project %s [%s], started at %s.',
        current.project,
        current.tasks.join(', '),
        new Date(current.start).toLocaleTimeString('pt-PT')
      );
    });
}

module.exports = status;
