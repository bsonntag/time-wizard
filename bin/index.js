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
  .command('restart')
  .action(() => {
    cli.restart();
  });

program
  .command('status')
  .action(() => {
    cli.status();
  });

program
  .command('report')
  .option('--from <startDate>', 'Start date')
  .option('--to <endDate>', 'End date')
  .action(options => {
    cli.report(options);
  });

program
  .command('projects')
  .action(() => {
    cli.projects();
  });

program.parse(process.argv);
