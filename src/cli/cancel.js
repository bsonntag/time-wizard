/* eslint-disable no-console */

const { formatFromNow } = require('../utils/time');
const { readCurrentTrack, removeCurrectTrack } = require('../utils/io');
const TrackError = require('../track-error');

function cancel() {
  return readCurrentTrack()
    .then(current => {
      if (!current) {
        throw new TrackError('No track is running', TrackError.NO_CURRENT_TRACK);
      }

      console.log(
        'Canceling track for project %s [%s], started %s.',
        current.project,
        current.tasks.join(', '),
        formatFromNow(current.start)
      );

      return removeCurrectTrack();
    })
    .catch(error => {
      if (error instanceof TrackError && error.code === TrackError.NO_CURRENT_TRACK) {
        console.error(error.message);
      } else {
        console.error('There was an error', error);
      }

      process.exitCode = 1;
    });
}

module.exports = cancel;
