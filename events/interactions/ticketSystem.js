
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

      const channel = await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}`,
        type: 0,
        parent: '1260925059535736942', // Replace with your ticket category ID
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionFlagsBits.ViewChannel]
          },
          {
            id: interaction.user.id,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
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
          .setEmoji('✋'),
        new ButtonBuilder()
          .setCustomId('ticket_add')
          .setLabel('Add User')
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('➕')
      );

      await channel.send({ embeds: [embed], components: [buttons] });
      await interaction.reply({ content: `Ticket created! ${channel}`, ephemeral: true });
    }

    if (interaction.isButton()) {
      if (interaction.customId === 'ticket_close') {
        await interaction.channel.delete();
      }
      else if (interaction.customId === 'ticket_claim') {
        const embed = new EmbedBuilder()
          .setColor('#00ff00')
          .setDescription(`Ticket claimed by ${interaction.user}`);
        await interaction.reply({ embeds: [embed] });
      }
      else if (interaction.customId === 'ticket_add') {
        const modal = new ModalBuilder()
          .setCustomId('ticket_add_user')
          .setTitle('Add User to Ticket');

        const userInput = new TextInputBuilder()
          .setCustomId('user_id')
          .setLabel('Enter the user ID')
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        const row = new ActionRowBuilder().addComponents(userInput);
        modal.addComponents(row);
        await interaction.showModal(modal);
      }
    }

    if (interaction.isModalSubmit() && interaction.customId === 'ticket_add_user') {
      const userId = interaction.fields.getTextInputValue('user_id');
      try {
        await interaction.channel.permissionOverwrites.edit(userId, {
          ViewChannel: true,
          SendMessages: true
        });
        await interaction.reply({ content: `Added <@${userId}> to the ticket!`, ephemeral: true });
      } catch (error) {
        await interaction.reply({ content: 'Failed to add user. Please check the ID.', ephemeral: true });
      }
    }
  });
};
