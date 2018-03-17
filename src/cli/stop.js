/* eslint-disable no-console */

const {
  readCurrentTrack,
  readTracks,
  removeCurrectTrack,
  writeTracks
} = require('../utils/io');

const TrackError = require('../track-error');

function stop() {
  const timestamp = Date.now();

  return Promise
    .all([readCurrentTrack(), readTracks()])
    .then(([current, tracks]) => {
      if (!current) {
        throw new TrackError('No current track', TrackError.NO_CURRENT_TRACK);
      }

      current.end(timestamp);

      console.log(
        'Stopping project %s [%s], started at %s.',
        current.project,
        current.tasks.join(', '),
        new Date(current.start).toLocaleTimeString('pt-PT')
      );

      const newTracks = tracks.concat(current);

      return writeTracks(newTracks);
    })
    .then(() => removeCurrectTrack())
    .catch(error => {
      if (error instanceof TrackError && error.code === TrackError.NO_CURRENT_TRACK) {
        console.error('No track is running');
      } else {
        console.error('There was an error', error);
      }

      process.exitCode = 1;
    });
}

module.exports = stop;
