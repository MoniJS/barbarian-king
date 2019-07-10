const { Command } = require('discord-akairo');

class ClanCommand extends Command {
    constructor() {
        super('clan', {
            aliases: ['clan', 'clans'],
            category: 'util',
            description: {
                content: 'Get Clan Data'
            }
        });
    }

    async exec(message) {
        
    }
}

module.exports = ClanCommand;