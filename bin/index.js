const cli = require('../src/cli');
const program = require('commander');

program
  .command('start <project> [tasks...]')
  .action((project, tasks) => {
    cli.start(project, tasks);
  });

program
  .command('stop')
  .action(() => {
    cli.stop();
  });

program
  .command('status')
  .action(() => {
    cli.status();
  });

program
  .command('report')
  .action(() => {
    cli.report();
  });

program
  .command('projects')
  .action(() => {
    cli.projects();
  });

program.parse(process.argv);
