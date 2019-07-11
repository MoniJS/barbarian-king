const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
class ClanMembersCommand extends Command {
    constructor() {
        super('clanmembers', {
            aliases: ['clanm', 'members', 'clan members'],
            category: 'util',
            description: {
                content: 'Get Clan Members',
            },
            args: [
                {
                    id: 'tag',
                    match: 'content',
                    type: 'string',
                    prompt: {
                        start: 'What clan would you like to search for ?',
                        retry: "That's not a valid clan tag! Try again."
                    }
                }
            ],
            clientPermissions: ['READ_MESSAGES', 'SEND_MESSAGES'],
            userPermissions: ['READ_MESSAGES', 'SEND_MESSAGES'],
            channel: 'guild'
        });
    }

    async exec(message, { tag }) {
        
        const uri = `https://api.clashofclans.com/v1/clans/${encodeURIComponent(tag)}/members`;
        const res = await fetch(uri, { method: 'GET', headers: { Accept: 'application/json', authorization: `Bearer ${process.env.COC_API}` } });
        const data = await res.json();
        // console.log(data);


        if (res.status === 404) {
            return message.channel.send(`No results found for clan tag **${name}**.`);
        }
        if (res.status === 400) {
            return message.channel.send(`You provided incorrect parameters for **${name}**.`);
        }
        if (res.status === 500) {
            return message.channel.send(`A unknown error happend, try again`);
        }
        if (res.status === 503) {
            return message.channel.send(`Clash Of Clans servers are down, try again later.`);
        }

       let member = ' ';
        data.items.forEach(items => {
            member += items.name + ' ' + items.tag + '\n';
        });
        const embed = this.client.util.embed()
        embed.setDescription(`member`);

        return message.util.send({ embed }); 

    }
}

module.exports = ClanMembersCommand;