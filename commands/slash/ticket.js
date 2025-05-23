const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'vticket',
  description: 'Sets up the ticket system',
  
  async execute(message, args) {
    const targetChannel = await message.client.channels.fetch('1375403360311836692');
    
    if (!targetChannel) {
      return message.reply({ content: 'Could not find the target channel!' });
    }

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Support Ticket System')
      .setDescription('Please select a category below to create a ticket')
      .setFooter({ text: 'Support Ticket System' });

    const select = new StringSelectMenuBuilder()
      .setCustomId('ticket_category')
      .setPlaceholder('Select ticket category')
      .addOptions([
        { label: 'Administrator Complaint', value: 'admin_complaint', description: 'Report an administrator', emoji: '👮' },
        { label: 'Staff Application', value: 'staff_app', description: 'Apply for staff position', emoji: '📝' },
        { label: 'Donation Inquiry', value: 'donation', description: 'Information about donations', emoji: '💰' },
        { label: 'Player Report', value: 'player_report', description: 'Report a player', emoji: '🚫' },
        { label: 'Bug Report', value: 'bug_report', description: 'Report a server bug', emoji: '🐛' },
        { label: 'Server Booster Perks', value: 'booster_perks', description: 'Claim booster benefits', emoji: '⭐' }
      ]);

    const row = new ActionRowBuilder().addComponents(select);

    await targetChannel.send({ embeds: [embed], components: [row] });
    await message.reply({ content: `Ticket system has been set up in <#1260925060932173848>!` });
  }
};
