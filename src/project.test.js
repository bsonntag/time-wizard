const Project = require('./project');
const Track = require('./track');

describe('Project', () => {
  describe('constructor', () => {
    it('creates a project with the given name', () => {
      const project = new Project('foo');

      expect(project.name).toEqual('foo');
    });
  });

  describe('addTrack', () => {
    let project;
    let track;

    beforeEach(() => {
      project = new Project('foo');
      track = new Track('foo', ['bar'], 1000, 2000);
    });

    it('adds a track to the project', () => {
      project.addTrack(track);

      expect(project.tracks).toContainEqual(track);
    });

    it('adds the track duration to the total time', () => {
      const trackDuration = track.duration();

      project.addTrack(track);

      expect(project.totalTime).toEqual(trackDuration);
    });

    it('adds the track tasks to the project tasks', () => {
      const trackDuration = track.duration();

      project.addTrack(track);

      expect(project.tasks.has('bar')).toBe(true);
      expect(project.tasks.get('bar')).toEqual(trackDuration);
    });
  });
});
