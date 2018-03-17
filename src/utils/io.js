const Track = require('../track');
const TrackError = require('../track-error');
const fs = require('./fs');
const os = require('os');
const path = require('path');

const dir = path.join(os.homedir(), '.time-tracker');
const currentTrackFile = () => path.join(dir, 'current.json');
const tracksFile = () => path.join(dir, 'tracks.json');

function writeCurrentTrack(track) {
  return fs.ensureDir(dir)
    .then(() => fs.writeFile(currentTrackFile(), JSON.stringify(track), { flag: 'wx' }))
    .catch(error => {
      if (error.code === 'EEXIST') {
        throw new TrackError('There is already one current track', TrackError.CURRENT_TRACK_EXISTS);
      }

      throw error;
    });
}

function writeTracks(tracks) {
  return fs.ensureDir(dir)
    .then(() => fs.writeFile(tracksFile(), JSON.stringify(tracks)));
}

function readCurrentTrack() {
  return fs.readFile(currentTrackFile())
    .then(
      data => {
        const values = JSON.parse(data);

        return new Track(values.project, values.tasks, values.start);
      },
      error => {
        if (error.code === 'ENOENT') {
          return null;
        }

        throw error;
      }
    );
}

function readTracks() {
  return fs.readFile(tracksFile())
    .then(
      data => {
        const values = JSON.parse(data);

        return values.map(({ project, start, stop, tasks }) => {
          return new Track(project, tasks, start, stop);
        });
      },
      error => {
        if (error.code === 'ENOENT') {
          return [];
        }

        throw error;
      }
    );
}

function removeCurrectTrack() {
  return fs.unlink(currentTrackFile());
}

module.exports = {
  readCurrentTrack,
  readTracks,
  removeCurrectTrack,
  writeCurrentTrack,
  writeTracks
};
