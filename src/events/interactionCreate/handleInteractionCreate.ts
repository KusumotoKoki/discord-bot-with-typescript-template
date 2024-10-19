import { Client, CommandInteraction } from "discord.js";
import { loadSlashCommands } from "../../slashCommands/loadSlashCommands";
import { sendLogMessage } from "../../log";

export const handleInteractionCreate = async (
  client: Client,
  interaction: CommandInteraction,
) => {
  const slashCommands = await loadSlashCommands();
  const command = slashCommands.get(interaction.commandName);

  if (!command) {
    sendLogMessage(
      client,
      `No command matching ${interaction.commandName} was found.`,
    );
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    sendLogMessage(client, `${error}`);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
};
