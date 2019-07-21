const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
class PlayerCommand extends Command {
	constructor() {
		super('player', {
			aliases: ['player', 'user'],
			category: 'util',
			description: {
				content: 'Get Clan Data by Tag'
			},
			args: [
				{
					id: 'name',
					match: 'content',
					type: 'string',
					prompt: {
						start: 'What clan would you like to search for ?',
						retry: 'That\'s not a valid clan tag! Try again.'
					}
				}
			],
			clientPermissions: ['READ_MESSAGES', 'SEND_MESSAGES'],
			userPermissions: ['READ_MESSAGES', 'SEND_MESSAGES'],
			channel: 'guild'
		});
	}

	async exec(message, { name }) {
		const uri = `https://api.clashofclans.com/v1/players/${encodeURIComponent(name)}`;
		const res = await fetch(uri, { method: 'GET', headers: { Accept: 'application/json', authorization: `Bearer ${process.env.COC_API}` } });
		const data = await res.json();
		// console.log(data);

		if (res.status === 404) {
			return message.channel.send('No results found for query');
		}
		if (res.status === 400) {
			return message.channel.send('You provided incorrect parameters for query');
		}
		if (res.status === 500) {
			return message.channel.send('A unknown error happend, try again');
		}
		if (res.status === 503) {
			return message.channel.send('Clash Of Clans servers are down, try again later.');
		}
		const embed = this.client.util.embed()
			.setColor('RANDOM')
			.setTitle(`${data.name} - ${data.tag}`)
			.setThumbnail(`${data.badgeUrls.small}`)
			.setImage(`${data.league.small}`)
			.addField('❯ Level', data.expLevel, true)
			.addField('❯ Best Trophies', data.bestTrophies, true)
			.addField('❯ Trophies', data.trophies, true)
			.addField('❯ War Stars', data.warStars, true)
			.addField('❯ Attack\'s Won', data.attackWins, true)
			.addField('❯ Defense Wins', data.defenseWins, true)
			.addField('❯ BuilderHall TH', data.builderHallLevel, true)
			.addField('❯ Versus Trophies', data.versusTrophies, true)
			.addField('❯ Best Versus Trophies', data.bestVersusTrophies, true)
			.addField('❯ Versus Battle Wins', data.versusBattleWins, true)
			.addField('❯ Role', data.role, true)
			.addField('❯ Donations', data.donations, true)
			.addField('❯ Donations Received', data.donationsReceived, true)
			.setDescription(`Clan - ${data.name} - ${data.tag} - ${data.clanLevel}`);


		return message.channel.send(embed);
	}
}

module.exports = PlayerCommand;
