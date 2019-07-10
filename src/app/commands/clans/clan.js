const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const request = require('request');
const qs = require('querystring');
class ClanCommand extends Command {
    constructor() {
        super('clan', {
            aliases: ['clan'],
            category: 'util',
            description: {
                content: 'Get Clan Data by name',
            },
                args: [
                    {
                        id: 'name',
                        match: 'content',
                        type: 'string'
                    }
                ]
        });
    }

    async exec(message, { name }) {
        
        if (!name) {
            return message.channel.send('You need to supply a clan tag');
        }
        const query = qs.stringify({ term: name });
        request(`https://api.clashofclans.com/v1/clans/%${query}`, { json: true }, (err, response, body) => {
            console.log('error:', err);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        });
        if (!body.list) {
            return message.channel.send(`No results found for **${name}**.`);
        }
        const data = body.list;
        console.log(data);
    }
}

module.exports = ClanCommand;