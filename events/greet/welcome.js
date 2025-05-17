
const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
  // Welcome Message
  client.on('guildMemberAdd', async (member) => {
    const welcomeChannel = member.guild.channels.cache.get('1260925060047310928');
    if (!welcomeChannel) return;

    const embed = new EmbedBuilder()
      .setColor('#2f3136')
      .setAuthor({ 
        name: `Welcome to ${member.guild.name}!`, 
        iconURL: member.guild.iconURL({ dynamic: true }) 
      })
      .setDescription(`
      ╭・──────────────────・╮
         👋 Welcome ${member}!
      ╰・──────────────────・╯
      
      ┌─────── Information ───────┐
      ❒ You are member #${member.guild.memberCount}
      ❒ Account Created: <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>
      ❒ Join Date: <t:${Math.floor(Date.now() / 1000)}:R>
      └───────────────────────────┘
      
      ✧ Make sure to check our rules
      ✧ Enjoy your stay with us!`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
      .setImage('https://cdn.discordapp.com/attachments/1065722905315557387/1135971750882312332/standard_1.gif')
      .setFooter({ 
        text: `${member.guild.name} • Member Joined`, 
        iconURL: member.guild.iconURL({ dynamic: true }) 
      })
      .setTimestamp();

    welcomeChannel.send({ content: `<@${member.id}>`, embeds: [embed] });
  });

  // Leave Message
  client.on('guildMemberRemove', async (member) => {
    const leaveChannel = member.guild.channels.cache.get('1369636228147974144');
    if (!leaveChannel) return;

    const embed = new EmbedBuilder()
      .setColor('#2f3136')
      .setAuthor({ 
        name: `Member Left ${member.guild.name}`, 
        iconURL: member.guild.iconURL({ dynamic: true }) 
      })
      .setDescription(`
      ╭・──────────────────・╮
         👋 Goodbye ${member.user.tag}
      ╰・──────────────────・╯
      
      ┌─────── Details ───────┐
      ❒ Left Server: <t:${Math.floor(Date.now() / 1000)}:R>
      ❒ Remaining Members: ${member.guild.memberCount}
      └────────────────────────┘
      
      ✧ We hope to see you again!`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
      .setFooter({ 
        text: `${member.guild.name} • Member Left`, 
        iconURL: member.guild.iconURL({ dynamic: true }) 
      })
      .setTimestamp();

    leaveChannel.send({ content: `<@${member.id}>`, embeds: [embed] });
  });
};
