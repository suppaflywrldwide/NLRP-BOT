
module.exports = (client) => {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
    
    if (interaction.customId === 'verify') {
      try {
        await interaction.member.roles.add('1374035814903709746');
        await interaction.reply({ content: 'You have been verified!', ephemeral: true });
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while verifying you!', ephemeral: true });
      }
    }
  });
};
