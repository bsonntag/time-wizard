/* eslint-disable no-console */

const { writeCurrentTrack } = require('../utils/io');
const Track = require('../track');
const TrackError = require('../track-error');

function start(project, tasks) {
  const track = new Track(project, tasks);

  return writeCurrentTrack(track)
    .then(() => {
      console.log(
        'Starting project %s [%s] at %s.',
        track.project,
        track.tasks.join(', '),
        new Date(track.start).toLocaleTimeString('pt-PT')
      );
    })
    .catch(error => {
      if (error instanceof TrackError && error.code === TrackError.CURRENT_TRACK_EXISTS) {
        console.error('A current track already exists');
      } else {
        console.error('There was an error', error);
      }

      process.exitCode = 1;
    });
}

module.exports = start;
