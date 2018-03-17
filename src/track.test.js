
const Track = require('./track');

describe('Track', () => {
  describe('constructor', () => {
    it('creates a track with the specified project and tasks', () => {
      const track = new Track('foo', ['bar']);

      expect(track.project).toEqual('foo');
      expect(track.tasks).toEqual(['bar']);
    });

    it('creates a track with the specified start property', () => {
      const track = new Track('foo', ['bar'], 123);

      expect(track.start).toEqual(123);
    });

    it('creates a track with the specified stop property', () => {
      const track = new Track('foo', ['bar'], 123, 321);

      expect(track.stop).toEqual(321);
    });

    it('creates a track with the current time as the start property', () => {
      const now = Date.now();
      const track = new Track('foo', ['bar']);

      expect(track.start).toEqual(now);
    });
  });

  describe('end', () => {
    it('sets the stop property to the current time', () => {
      const track = new Track('foo', ['bar']);
      const now = Date.now();

      track.end();

      expect(track.stop).toEqual(now);
    });
  });
});
