/* eslint-disable no-console */

const { formatTime } = require('../utils/time');
const { readTracks, writeCurrentTrack } = require('../utils/io');
const Track = require('../track');
const TrackError = require('../track-error');

function restart() {
  return readTracks()
    .then(tracks => {
      if (!tracks || tracks.length === 0) {
        throw new TrackError('There are no projects', TrackError.NO_PROJECTS);
      }

      return tracks[tracks.length - 1];
    })
    .then(lastTrack => {
      const track = new Track(lastTrack.project, lastTrack.tasks);

      return writeCurrentTrack(track)
        .then(() => {
          console.log(
            'Restarting project %s [%s] at %s.',
            track.project,
            track.tasks.join(', '),
            formatTime(track.start)
          );
        });
    })
    .catch(error => {
      if (error instanceof TrackError && error.code === TrackError.NO_PROJECTS) {
        console.error('There are no projects to restart.');
      } else {
        console.error('There was an error', error);
      }

      process.exitCode = 1;
    });
}

module.exports = restart;
