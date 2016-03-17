'use strict';

const commander = require('commander');
const configure = require('./configure');
const verify = require('./verify');
const run = require('./gateway');

const setup = function setup() {
  commander
    .command('agent <action>', 'agent commands, see: "edgemicro agent -h"')
    .command('cert <action>', 'certificate commands, see: "edgemicro cert -h"')
    .command('token <action>', 'token commands, see: "edgemicro token -h"')
    .command('private <action>', 'private commands, see: "edgemicro private -h"');

  commander
    .command('configure')
    .description('automated, one-time setup for a new edgemicro instance')
    .option('-o, --org <org>', 'the organization')
    .option('-e, --env <env>', 'the environment')
    .option('-v, --virtualHosts <virtualHosts>', 'override virtualHosts (default: "default,secure")')
    .option('-u, --username <user>', 'username of the organization admin')
    .option('-p, --password <password>', 'password of the organization admin')
    .option('-r, --url <url>', 'organization\'s custom API URL (https://api.example.com)')
    .option('-w, --overwrite <overwrite>', 'overwrite the current config, yes|ok|true|y')
    .option('-d, --debug', 'execute with debug output')
    .action(configure);


  commander
    .command('verify')
    .description('verify Edge Micro configuration by testing config endpoints')
    .option('-o, --org <org>', 'the organization')
    .option('-e, --env <env>', 'the environment')
    .option('-k, --key <key>', 'key for authenticating with Edge')
    .option('-s, --secret <secret>', 'secret for authenticating with Edge')
    .action(verify);


  commander
    .command('start')
    .option('-k, --key <key>', 'key for authenticating with Edge')
    .option('-s, --secret <secret>', 'secret for authenticating with Edge')
    .option('-t, --target <target>', 'agent host (default 127.0.0.1)')
    .option('-p, --port <port>', 'agent port (default 9000)')
    .description('control agent processes')
    .action(run);

  commander.parse(process.argv);


  var running = false;
  commander.commands.forEach(function (command) {
    if (command._name == commander.rawArgs[2]) {
      running = true;
    }
  });
  if (!running) {
    commander.help();
  }
};

module.exports = setup;