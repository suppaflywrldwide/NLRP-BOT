
module.exports = (client) => {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;
    
    if (interaction.customId === 'verify') {
      try {
        await interaction.member.roles.add('1375426626933882930');
        await interaction.reply({ content: 'You have been verified!', ephemeral: true });
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while verifying you!', ephemeral: true });
      }
    }
  });
};
