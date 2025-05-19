const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = (client) => {
  client.on('interactionCreate', async (interaction) => {
    if (interaction.isStringSelectMenu() && interaction.customId === 'ticket_category') {
      const category = interaction.values[0];
      const categoryNames = {
        admin_complaint: 'Administrator Complaint',
        staff_app: 'Staff Application',
        donation: 'Donation Inquiry',
        player_report: 'Player Report',
        bug_report: 'Bug Report',
        booster_perks: 'Server Booster Perks'
      };

      try {
        const channel = await interaction.guild.channels.create({
          name: `ticket-${interaction.user.username}`,
          type: 0,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [PermissionFlagsBits.ViewChannel]
            },
            {
              id: interaction.user.id,
              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
            },
            {
              id: client.user.id,
              allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels]
            }
          ]
        });

        const embed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle(`${categoryNames[category]} Ticket`)
          .setDescription(`Welcome ${interaction.user}!\nSupport will be with you shortly.\n\nTicket Category: ${categoryNames[category]}`)
          .setTimestamp();

        const buttons = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('ticket_close')
            .setLabel('Close Ticket')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('🔒'),
          new ButtonBuilder()
            .setCustomId('ticket_claim')
            .setLabel('Claim Ticket')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('✋')
        );

        await channel.send({ embeds: [embed], components: [buttons] });
        await interaction.reply({ content: `Ticket created! ${channel}`, ephemeral: true });
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Failed to create ticket channel!', ephemeral: true });
      }
    }

    if (interaction.isButton()) {
      if (interaction.customId === 'ticket_close') {
        await interaction.channel.delete();
        await interaction.reply({ content: 'Ticket closed!', ephemeral: true });
      }
      else if (interaction.customId === 'ticket_claim') {
        const embed = new EmbedBuilder()
          .setColor('#00ff00')
          .setDescription(`Ticket claimed by ${interaction.user}`);
        await interaction.reply({ embeds: [embed] });
      }
    }
  });
};