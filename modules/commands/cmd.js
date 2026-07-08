/**
 * Command: cmd
 * Description: Manage commands - reload, disable, enable
 * Usage: {prefix}cmd <action> <command_name>
 * Permissions: ADMIN
 */

module.exports = {
  config: {
    name: 'ayan',
    aliases: ['command', 'commands'],
    version: '1.0.0',
    credit: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: 'Manage commands - reload, disable, enable',
    usage: '{prefix}cmd <action> <command_name>',
    hasPrefix: true,
    cooldown: 5,
    permission: 'ADMIN',
    category: 'ADMIN'
  },
  
  run: async function({ api, message, args }) {
    const { threadID, messageID, senderID } = message;
    
    // Check if user has permission
    const hasPermission = await global.permissions.checkPermission(senderID, this.config.permission);
    if (!hasPermission) {
      return api.sendMessage(
        '❌ You do not have permission to use this command.',
        threadID,
        messageID
      );
    }
    
    // Check if action is provided
    if (!args[0]) {
      return api.sendMessage(
        `Ayan mera owner hai guys 🌸`,
        threadID,
        messageID
      );
    }
    
    const action = args[0].toLowerCase();
    const commandName = args[1]?.toLowerCase();
    
    // Handle list action separately as it doesn't require a command name
    if (action === 'list') {
      return handleListAction(api, threadID, messageID);
    }
    
    // Check if command name is provided for other actions
    if (!commandName && action !== 'list') {
      return api.sendMessage(
        `❌ Missing command name\n\nUsage: ${global.config.prefix}cmd ${action} <command_name>\n\nTip: Use '${global.config.prefix}cmd ${action} all' to ${action} all commands`,
        threadID,
        messageID
      );
    }
    
    try {
      // Set reaction to indicate processing
      api.setMessageReaction("⏳", messageID, () => {}, true);
      
      let success = false;
      let message = '';
      
      switch (action) {
        case 'reload':
          success = global.loader.reloadCommand(commandName);
          message = success ? 
            `✅ Successfully reloaded command: ${commandName}` : 
            `❌ Failed to reload command: ${commandName}\nCommand may not exist or there was an error loading it.`;
          break;
          
        case 'disable':
          // Prevent disabling the cmd command
          if (commandName === 'cmd') {
            api.setMessageReaction("❌", messageID, () => {}, true);
            return api.sendMessage(
              `❌ Cannot disable the cmd command as it's protected.`,
              threadID,
              messageID
            );
          }
          
          success = global.loader.disableCommand(commandName);
          message = success ? 
            `✅ Successfully disabled command: ${commandName}` : 
            `❌ Failed to disable command: ${commandName}\nCommand may not exist, is already disabled, or there was an error.`;
          break;
          
        case 'enable':
          success = global.loader.enableCommand(commandName);
          message = success ? 
            `✅ Successfully enabled command: ${commandName}` : 
            `❌ Failed to enable command: ${commandName}\nCommand may not be disabled or there was an error.`;
          break;
          
        default:
          api.setMessageReaction("❌", messageID, () => {}, true);
          return api.sendMessage(
            `❌ Invalid action: ${action}\n\nAvailable actions:\n- reload: Reload a command\n- disable: Disable a command\n- enable: Enable a command\n- list: List all commands`,
            threadID,
            messageID
          );
      }
      
      api.setMessageReaction(success ? "✅" : "❌", messageID, () => {}, true);
      return api.sendMessage(message, threadID, messageID);
      
    } catch (error) {
      api.setMessageReaction("❌", messageID, () => {}, true);
      global.logger.error(`Error in cmd command: ${error.message}`);
      return api.sendMessage(
        `❌ Error executing command: ${error.message}`,
        threadID,
        messageID
      );
    }
  }
};

/**
 * Handle list action
 * @param {Object} api - Facebook API instance
 * @param {string} threadID - Thread ID
 * @param {string} messageID - Message ID
 */
async function handleListAction(api, threadID, messageID) {
  try {
    // Get all unique commands (excluding aliases)
    const uniqueCommands = new Map();
    for (const [key, cmd] of global.client.commands.entries()) {
      if (key === cmd.config.name) {
        uniqueCommands.set(key, cmd);
      }
    }
    
    // Get disabled commands
    const disabledCommands = global.config.disabledCommands || [];
    
    // Create message
    let message = '📋 Command List:\n\n';
    
    // Active commands
    message += '✅ Active Commands:\n';
    const activeCommands = Array.from(uniqueCommands.keys())
      .filter(cmd => !disabledCommands.includes(cmd))
      .sort();
    
    if (activeCommands.length > 0) {
      message += activeCommands.map(cmd => `- ${cmd}`).join('\n');
    } else {
      message += 'No active commands';
    }
    
    // Disabled commands
    message += '\n\n❌ Disabled Commands:\n';
    if (disabledCommands.length > 0) {
      message += disabledCommands.sort().map(cmd => `- ${cmd}`).join('\n');
    } else {
      message += 'No disabled commands';
    }
    
    // Command count
    message += `\n\nTotal: ${activeCommands.length} active, ${disabledCommands.length} disabled`;
    
    return api.sendMessage(message, threadID, messageID);
  } catch (error) {
    global.logger.error(`Error listing commands: ${error.message}`);
    return api.sendMessage(
      `❌ Error listing commands: ${error.message}`,
      threadID,
      messageID
    );
  }
}
