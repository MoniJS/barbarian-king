const env = require('dotenv');
env.config();
const Client = require('./app/client/client');
const Sentry = require('@sentry/node');
const { name: environment, version: release } = require('../package.json');

const client = new Client({ owner: process.env.OWNER });

if (process.env.SENTRY) {
	Sentry.init({ dsn: process.env.SENTRY, environment, release });
}

client.on('error', error => console.error(error, { level: 'CLIENT ERROR' }));
client.on('warn', warn => console.error(warn, { level: 'CLIENT WARN' }));

client.start(process.env.TOKEN);

process.on('unhandledRejection', error => console.error(error, { level: 'UNHANDLED REJECTION' }));
