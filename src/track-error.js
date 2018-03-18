class TrackError extends Error {

  constructor(message, code) {
    super(message);

    this.code = code;
  }

}

TrackError.NO_CURRENT_TRACK = 100;
TrackError.CURRENT_TRACK_EXISTS = 101;
TrackError.NO_PROJECTS = 102;

module.exports = TrackError;
