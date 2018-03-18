/* eslint-disable no-console */

const { formatFromNow } = require('../utils/time');
const { readCurrentTrack } = require('../utils/io');

function status() {
  return readCurrentTrack()
    .then(current => {
      if (!current) {
        console.log('No project started.');

        return;
      }

      console.log(
        'Project %s [%s] started %s.',
        current.project,
        current.tasks.join(', '),
        formatFromNow(current.start)
      );
    });
}

module.exports = status;
