#!/usr/bin/env node

// var path = require('path')
// var interactive = require(path.join(__dirname, 'dist', 'index.js')).default

const commander = require('commander');
const program = new commander.Command();

const init = require('./commands/init');

program
    .version('0.0.1')
    .description('Application simple description')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook');
  

program
  .command('pizza')
  .description('Interactive pizza ordering')
  .action(async () => { await init(); });

program
  .command('create')
  .description('Interactive pizza ordering')
  .action(require('./commands/create'));


program
  .command('latest')
  .alias('last')
  .description('Get the latest changes')
  .option('-f --format <json>', 'Output format (plain|json|props)', 'plain')
  .option('-o --output <filename>', 'Write to a file instead', null)
  .action(require('./commands/latest'));

program
  .command('parse')
  .description('Show the current working directory')
  .action(require('./commands/parse'));

program
    .command('serve', { isDefault: false })
    .description('launch web server')
    .arguments('-p','--port <port_number>', 'web port')
  .action((opts) => {
      console.log(`server on port ${opts.port}`);
      console.log(opts);
  });

  program
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option('-e, --exec_mode <mode>', 'Which exec mode to use')
  .action(function(cmd, options) {
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ deploy exec sequential');
    console.log('    $ deploy exec async');
    console.log();
  });

program.parse(process.argv);