
const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
  // Welcome Message
  client.on('guildMemberAdd', async (member) => {
    const welcomeChannel = member.guild.channels.cache.get('1260925060047310928');
    if (!welcomeChannel) return;

    const embed = new EmbedBuilder()
      .setColor('#2f3136')
      .setTitle('👋 Welcome to the Server!')
      .setDescription(`
      ╭・❒ Welcome ${member} to **${member.guild.name}**!
      ├・❒ Member Count: **${member.guild.memberCount}**
      ╰・❒ Enjoy your stay!`)
      .setThumbnail(member.guild.iconURL({ dynamic: true }))
      .setImage('https://cdn.discordapp.com/attachments/1065722905315557387/1135971750882312332/standard_1.gif')
      .setFooter({ text: `ID: ${member.id}` })
      .setTimestamp();

    welcomeChannel.send({ content: `<@${member.id}>`, embeds: [embed] });
  });

  // Leave Message
  client.on('guildMemberRemove', async (member) => {
    const leaveChannel = member.guild.channels.cache.get('1369636228147974144');
    if (!leaveChannel) return;

    const embed = new EmbedBuilder()
      .setColor('#2f3136')
      .setTitle('👋 Goodbye!')
      .setDescription(`
      ╭・❒ ${member.user.tag} has left **${member.guild.name}**
      ├・❒ Member Count: **${member.guild.memberCount}**
      ╰・❒ We hope to see you again!`)
      .setThumbnail(member.guild.iconURL({ dynamic: true }))
      .setFooter({ text: `ID: ${member.id}` })
      .setTimestamp();

    leaveChannel.send({ content: `<@${member.id}>`, embeds: [embed] });
  });
};
