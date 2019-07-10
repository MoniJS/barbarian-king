const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
class ClanCommand extends Command {
    constructor() {
        super('clan', {
            aliases: ['clan', 'clans'],
            category: 'util',
            description: {
                content: 'Get Clan Data by Tag',
            },
                args: [
                    {
                        id: 'name',
                        match: 'content',
                        type: 'string',
                        prompt: {
                            start: `<@${message.author.id}> , what would you like to search for ?`,
                            retry: "That's not a valid clan tag! Try again."
                        }
                    }
                ],
            clientPermissions: ['READ_MESSAGES', 'SEND_MESSAGES'],
            userPermissions: ['READ_MESSAGES', 'SEND_MESSAGES'],
            channel: 'guild'
        });
    }

    async exec(message, { name }) {
        
        if(!name) {
            prompt: {
                start: message => {
                    const embed = new MessageEmbed().setDescription('Please input a member!');
                    const content = 'Please!';
                    return { embed, content };
                }
            }
        }
        
    
        const uri = `https://api.clashofclans.com/v1/clans/${encodeURIComponent(name)}`;
        const res = await fetch(uri, { method: 'GET', headers: { Accept: 'application/json', authorization: `Bearer ${process.env.COC_API}` } });
        const data = await res.json();
        //console.log(data);  
        
        if (res.status === 404) {
            return message.channel.send(`No results found for clan tag **${name}**.`);
        }
        const embed = this.client.util.embed()
            .setColor('RANDOM')
            .setTitle(`${data.name} - ${data.tag}`)
            .setThumbnail(`${data.badgeUrls.medium}`)
            .addField('❯ Level', data.clanLevel, true)
            .addField('❯ Members', data.members, true)
            .addField('❯ Required Trophies', `🏆 ${data.requiredTrophies}`, true)
            .addField('❯ Type', data.type, true)
            .addField('❯ Location', data.location.name, true)
            .addField('❯ Clan Points', data.clanPoints - data.clanVersusPoints, true)
            .addField('❯ War Frequency', data.warFrequency, true)
            .addField('❯ War Win Streak ', data.warWinStreak, true)
            .addField('❯ War Wins', data.warWins, true)
            .addField('Description', data.description)

        return message.channel.send(embed);


    }
}

module.exports = ClanCommand;