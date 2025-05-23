
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verification')
    .setDescription('Sets up the verification system'),
    
  async execute(interaction) {
    if (interaction.channelId !== '1375462653152989286') {
      return interaction.reply({ content: 'This command can only be used in the verification channel!', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Server Rules')
      .setDescription(`**Welcome to our Server!**\n
1. Be respectful to all members
2. No harassment or bullying
3. No inappropriate content
4. No spamming or flooding
5. No advertising without permission
6. Follow Discord's Terms of Service
7. Listen to staff members
8. Keep discussions in appropriate channels
9. Have fun!`)
      .setFooter({ text: 'Click the button below to verify' });

    const verifyButton = new ButtonBuilder()
      .setCustomId('verify')
      .setLabel('Verify')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('✅');

    const row = new ActionRowBuilder().addComponents(verifyButton);

    await interaction.channel.send({ embeds: [embed], components: [row] });
    await interaction.reply({ content: 'Verification system set up!', ephemeral: true });
  }
};
