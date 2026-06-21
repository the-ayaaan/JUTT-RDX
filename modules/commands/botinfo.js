/**
 * Botinfo Command
 * Shows comprehensive information about the bot
 */

module.exports = {
  config: {
    name: "botinfo",
    aliases: ["info", "about"],
    description: "Displays comprehensive information about the bot, its features, and status",
    usages: `${global.config.prefix}botinfo`,
    credit: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    hasPrefix: true,
    permission: "PUBLIC",
    cooldowns: 5,
    category: 'GENERAL'
  },
  
  /**
   * Command execution
   * @param {Object} options - Options object
   * @param {Object} options.api - Facebook API instance
   * @param {Object} options.message - Message object
   * @param {Array<string>} options.args - Command arguments
   */
  run: async function({ api, message, args }) {
    const { threadID, messageID } = message;
    
    try {
      // Set processing reaction
      api.setMessageReaction("⏳", messageID, () => {}, true);
      
      // Get bot information - count unique commands only (no aliases)
      const uniqueCommands = new Set();
      for (const [commandName, commandModule] of global.client.commands) {
        // Only count if this is the main command name, not an alias
        if (commandModule.config && commandModule.config.name === commandName) {
          uniqueCommands.add(commandName);
        }
      }
      const commandCount = uniqueCommands.size;
      const eventCount = global.client.events.size;
      const prefix = global.config.prefix;
      
      // Get uptime with better formatting
      const uptimeSeconds = process.uptime();
      const days = Math.floor(uptimeSeconds / 86400);
      const hours = Math.floor((uptimeSeconds % 86400) / 3600);
      const minutes = Math.floor((uptimeSeconds % 3600) / 60);
      const seconds = Math.floor(uptimeSeconds % 60);
      
      let uptimeStr = "";
      if (days > 0) uptimeStr += `${days}d `;
      if (hours > 0) uptimeStr += `${hours}h `;
      if (minutes > 0) uptimeStr += `${minutes}m `;
      uptimeStr += `${seconds}s`;
      
      // Get admin information
      const ownerID = global.config.ownerID;
      const adminIDs = global.config.adminIDs || [];
      const supportIDs = global.config.supportIDs || [];
      
      // Fetch user info for owner, admins, supporters
      const allAdminIDs = [ownerID, ...adminIDs, ...supportIDs].filter((id, index, self) => {
        return self.indexOf(id) === index; // Remove duplicates
      });
      
      let adminInfo = {};
      try {
        for (const id of allAdminIDs) {
          try {
            const info = await api.getUserInfo([id]);
            if (info && info[id]) {
              adminInfo[id] = info[id];
            }
          } catch (userError) {
            global.logger.warn(`Could not fetch info for user ${id}`);
          }
        }
      } catch (error) {
        global.logger.warn(`Could not fetch admin info: ${error.message}`);
      }
      
      // Check hosting environment
      const isOnRender = !!process.env.RENDER_EXTERNAL_URL;
      const hostingInfo = isOnRender ? "🚀 Render.com" : "💻 Local/Dev";
      
      // Create beautiful formatted message
      let botInfoMessage = "";
      botInfoMessage += "╭─────────────────────────────╮\n";
      botInfoMessage += "│        🤖 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎        │\n";
      botInfoMessage += "╰─────────────────────────────╯\n\n";
      
      // Bot Statistics
      botInfoMessage += "📊 𝐁𝐨𝐭 𝐒𝐭𝐚𝐭𝐢𝐬𝐭𝐢𝐜𝐬\n";
      botInfoMessage += "┌─────────────────────────┐\n";
      botInfoMessage += `│ 📝 Commands: ${commandCount.toString().padEnd(11)} │\n`;
      botInfoMessage += `│ 🔔 Events: ${eventCount.toString().padEnd(13)} │\n`;
      botInfoMessage += `│ ⚙️ Prefix: ${prefix.padEnd(13)} │\n`;
      botInfoMessage += `│ ⏱️ Uptime: ${uptimeStr.padEnd(11)} │\n`;
      botInfoMessage += `│ 🌐 Host: ${hostingInfo.padEnd(13)} │\n`;
      botInfoMessage += "└─────────────────────────┘\n\n";
      
      // Owner Information
      const ownerName = (adminInfo[ownerID]?.name) || "AYAN JUTT";
      botInfoMessage += "👑 𝐎𝐰𝐧𝐞𝐫\n"𝗔𝗬𝗔𝗡ゝ🩷;
      botInfoMessage += `• ${ownerName}\n\n`;
      
      // Administrators
      if (adminIDs.length > 0) {
        const displayAdmins = adminIDs.filter(id => id !== ownerID);
        if (displayAdmins.length > 0) {
          botInfoMessage += "⭐ 𝐀𝐝𝐦𝐢𝐧𝐢𝐬𝐭𝐫𝐚𝐭𝐨𝐫𝐬\n";
          
          for (const id of displayAdmins) {
            const name = (adminInfo[id]?.name) || "unknown";
            botInfoMessage += `• ${name}\n`;
          }
          botInfoMessage += "\n";
        }
      }
      
      // Supporters
      if (supportIDs.length > 0) {
        const uniqueSupporters = supportIDs.filter(id => id !== ownerID && !adminIDs.includes(id));
        if (uniqueSupporters.length > 0) {
          botInfoMessage += "🔧 𝐒𝐮𝐩𝐩𝐨𝐫𝐭𝐞𝐫𝐬\n";
          
          for (const id of uniqueSupporters) {
            const name = (adminInfo[id]?.name) || "unknown";
            botInfoMessage += `• ${name}\n`;
          }
          botInfoMessage += "\n";
        }
      }
      
      // Key Features
      botInfoMessage += "✨ 𝐊𝐞𝐲 𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬\n";
      botInfoMessage += "• Command system with permissions\n";
      botInfoMessage += "• Economy & gaming system\n";
      botInfoMessage += "• MongoDB database integration\n";
      botInfoMessage += "• Auto moderation & utilities\n";
      botInfoMessage += "• Web interface dashboard\n\n";
      
      // Quick Commands
      botInfoMessage += "🚀 𝐐𝐮𝐢𝐜𝐤 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬\n";
      botInfoMessage += `• ${prefix}help - All commands\n`;
      botInfoMessage += `• ${prefix}daily - Daily rewards\n`;
      botInfoMessage += `• ${prefix}balance - Check coins\n`;
      botInfoMessage += `• ${prefix}work - Earn money\n`;
      botInfoMessage += `• ${prefix}tictactoe - Play games\n\n`;
      
      // Web Interface
      if (global.config.serverUrl) {
        botInfoMessage += "🌐 𝐖𝐞𝐛 𝐈𝐧𝐭𝐞𝐫𝐟𝐚𝐜𝐞\n";
        botInfoMessage += `🔗 ${global.config.serverUrl}\n\n`;
      }
      
      botInfoMessage += "━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
      botInfoMessage += "💡 Use /help for complete command list";
      
      // Prepare mentions array for all admins
      let mentions = [];
      
      // Add owner mention
      if (adminInfo[ownerID]) {
        mentions.push({
          tag: ownerName,
          id: ownerID
        });
      }
      
      // Add admin mentions (all admins, no limit)
      const displayAdmins = adminIDs.filter(id => id !== ownerID);
      for (const id of displayAdmins) {
        const name = (adminInfo[id]?.name) || "Unknown";
        if (adminInfo[id]) {
          mentions.push({
            tag: name,
            id: id
          });
        }
      }
      
      // Add supporter mentions (all supporters, no limit)
      const uniqueSupporters = supportIDs.filter(id => id !== ownerID && !adminIDs.includes(id));
      for (const id of uniqueSupporters) {
        const name = (adminInfo[id]?.name) || "Unknown";
        if (adminInfo[id]) {
          mentions.push({
            tag: name,
            id: id
          });
        }
      }
      
      // Set success reaction and send message with mentions
      api.setMessageReaction("✅", messageID, () => {}, true);
      return api.sendMessage({
        body: botInfoMessage,
        mentions: mentions
      }, threadID, messageID);
      
    } catch (error) {
      api.setMessageReaction("❌", messageID, () => {}, true);
      global.logger.error('Error in botinfo command:', error.message);
      return api.sendMessage('❌ An error occurred while getting bot information.', threadID, messageID);
    }
  }
};
