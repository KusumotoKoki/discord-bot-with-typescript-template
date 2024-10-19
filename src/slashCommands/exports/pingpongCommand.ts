import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { SlashCommand } from "../../types/slashCommand";

const pingCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  execute: async (interaction: CommandInteraction) => {
    await interaction.reply("Pong!");
  },
};

export default pingCommand;
