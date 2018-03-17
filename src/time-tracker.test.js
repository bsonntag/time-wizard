const TimeTracker = require('./time-tracker');

describe('TimeTracker', () => {
  describe('constructor', () => {
    it('initializes a time tracker', () => {
      const timeTracker = new TimeTracker();

      expect(timeTracker.current).toBe(null);
      expect(timeTracker.tracks).toEqual([]);
    });
  });

  describe('projects', () => {
    let timeTracker;

    beforeEach(() => {
      timeTracker = new TimeTracker();

      timeTracker.start('foo', 'bar');
      timeTracker.stop();
      timeTracker.start('baz', 'bez');
      timeTracker.stop();
      timeTracker.start('foo', 'bar');
      timeTracker.stop();
      timeTracker.start('biz', 'boz');
    });

    it('returns a list of project names', () => {
      const projects = timeTracker.projects();

      expect(projects).toEqual(expect.arrayContaining([
        'baz',
        'biz',
        'foo'
      ]));
    });
  });

  describe('start', () => {
    let timeTracker;

    beforeEach(() => {
      timeTracker = new TimeTracker();
    });

    it('starts a new track with the specified project and task', () => {
      timeTracker.start('foo', 'bar');

      expect(timeTracker.current).toEqual(expect.objectContaining({
        project: 'foo',
        start: expect.any(Number),
        tasks: ['bar']
      }));
    });

    it('starts a new track with the specified project and tasks', () => {
      timeTracker.start('foo', ['bar', 'biz']);

      expect(timeTracker.current).toEqual(expect.objectContaining({
        project: 'foo',
        start: expect.any(Number),
        tasks: ['bar', 'biz']
      }));
    });

    it('throws if the project is not specified', () => {
      expect(() => timeTracker.start(null, 'bar')).toThrow();
    });

    it('throws if the tasks are not specified', () => {
      expect(() => timeTracker.start('foo')).toThrow();
    });
  });

  describe('stop', () => {
    let timeTracker;

    beforeEach(() => {
      timeTracker = new TimeTracker();
    });

    it('ends the current track and adds it to the tracks', () => {
      timeTracker.start('foo', 'bar');

      timeTracker.stop();

      const expected = expect.objectContaining({
        project: 'foo',
        start: expect.any(Number),
        stop: expect.any(Number),
        tasks: ['bar']
      });

      expect(timeTracker.current).toBe(null);
      expect(timeTracker.tracks).toContainEqual(expected);
    });

    it('throws if there is no current track', () => {
      expect(() => timeTracker.stop()).toThrow();
    });
  });
});
