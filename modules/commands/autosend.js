const fs = require('fs');
const path = require('path');

// Helper function to save config
const saveConfig = () => {
  try {
    const configPath = path.join(__dirname, '..', '..', 'config.json');
    fs.writeFileSync(configPath, JSON.stringify(global.config, null, 2));
    global.logger.system('Config saved successfully');
  } catch (error) {
    global.logger.error('Error saving config:', error);
  }
};

const messages = [
    { time: '12:00 AM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 12:00 〘𝗔𝗠〙🕜💜🌸 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '1:00 AM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 1:00 〘𝗔𝗠〙🕜💜🌼 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '2:15 AM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 2:00 〘𝗔𝗠〙🕜💜🐼 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '3:00 AM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 3:00 〘𝗔𝗠〙🕜💜🥰 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '4:00 AM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 4:00 〘𝗔𝗠〙🕜💜🪄 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '5:00 AM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 5:00 〘𝗔𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '6:00 AM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 6:00 〘𝗔𝗠〙🕜💜😘  \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '7:00 AM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 7:00 〘𝗔𝗠〙🕜💜🌼 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '8:00 AM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 8:00 〘𝗔𝗠〙🕜💜😙\n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '9:00 AM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 9:00 〘𝗔𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '10:00 AM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 10:00 〘𝗔𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '11:00 AM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 11:00 〘𝗔𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '12:00 PM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 12:00 〘𝗣𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '1:00 PM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 1:00 〘𝗣𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '2:00 PM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 2:00〘𝗣𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '3:00 PM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 3:00〘𝗣𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '4:00 PM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 4:00〘𝗣𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '5:00 PM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 5:00〘𝗣𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '6:00 PM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 6:00〘𝗣𝗠〙🕜💜💜 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '7:00 PM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 7:00〘𝗣𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '8:00 PM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 8:00〘𝗣𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '9:00 PM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 9:00〘𝗣𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '10:00 PM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 10:00〘𝗣𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' },
    { time: '11:00 PM', message: '『𝗡𝗼𝘄 𝗶𝘁𝘀 𝘁𝗶𝗺𝗲』 🐼 11:00〘𝗣𝗠〙🕜💜😙 \n❮«𝗖𝗥𝗘𝗔𝗧𝗘 𝗕𝗬 𝗔𝗬𝗔𝗡»❯️️️️️️️️️️️️️️️️️️️️️️️️️️️️️️' }
];

module.exports = {
  config: {
    name: 'autosend',
    aliases: ['auto', 'autopost'],
    description: 'Toggle autosend feature on/off',
    usage: '{prefix}autosend [on/off]',
    credit: '𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭',
    hasPrefix: true,
    permission: 'ADMIN',
    cooldown: 5,
    category: 'UTILITY'
  },

  run: async function({ api, message, args }) {
    const { threadID, messageID, senderID } = message;
    
    if (args.length === 0) {
      // Show status for current thread
      const globalStatus = global.config.autosend?.enabled ? 'ON' : 'OFF';
      const interval = global.config.autosend?.checkIntervalMinutes || 1;
      const istTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Karachi"}));
      
      // Get thread-specific status
      let threadStatus = 'Following Global';
      try {
        const thread = await global.Thread.findOne({ threadID });
        if (thread && thread.settings && thread.settings.autosend !== null && thread.settings.autosend !== undefined) {
          threadStatus = thread.settings.autosend ? 'ON (Thread-specific)' : 'OFF (Thread-specific)';
        }
      } catch (error) {
        global.logger.error('Error checking thread autosend status:', error);
      }
      
      return api.sendMessage(
        `🤖 **AutoSend Status**\n\n` +
        `🌐 **Global Status:** ${globalStatus}\n` +
        `💬 **This Thread:** ${threadStatus}\n` +
        `⏰ **Check Interval:** ${interval} minute(s)\n\n` +
        `Current IST Time: ${istTime.toLocaleString()}\n\n` +
        `**Usage:**\n` +
        `• ${global.config.prefix}autosend global on - Enable autosend globally\n` +
        `• ${global.config.prefix}autosend global off - Disable autosend globally\n` +
        `• ${global.config.prefix}autosend on - Enable autosend for this thread\n` +
        `• ${global.config.prefix}autosend off - Disable autosend for this thread\n\n` +
        `📝 AutoSend sends scheduled messages to threads with random images from modules/commands/autosend/ folder.`,
        threadID,
        messageID
      );
    }

    const action = args[0].toLowerCase();
    const secondArg = args[1]?.toLowerCase();
    
    // Handle global commands: /autosend global on/off
    if (action === 'global') {
      if (!secondArg || (secondArg !== 'on' && secondArg !== 'off')) {
        return api.sendMessage(
          '❌ Invalid global command! Use:\n' +
          `• ${global.config.prefix}autosend global on - Enable autosend globally\n` +
          `• ${global.config.prefix}autosend global off - Disable autosend globally`,
          threadID,
          messageID
        );
      }
      
      if (secondArg === 'on') {
        if (global.config.autosend?.enabled) {
          return api.sendMessage('✅ AutoSend is already enabled globally!', threadID, messageID);
        }
        
        // Update config
        if (!global.config.autosend) {
          global.config.autosend = {};
        }
        global.config.autosend.enabled = true;
        saveConfig();
        
        this.startAutoSend(api);
        return api.sendMessage(
          '✅ **AutoSend Enabled Globally!**\n\n' +
          '🕐 Bot will now send scheduled messages to all threads (except those with thread-specific off setting).\n' +
          '📁 Make sure to add images to modules/commands/autosend/ folder.',
          threadID,
          messageID
        );
      } else if (secondArg === 'off') {
        if (!global.config.autosend?.enabled) {
          return api.sendMessage('❌ AutoSend is already disabled globally!', threadID, messageID);
        }
        
        // Update config
        global.config.autosend.enabled = false;
        saveConfig();
        
        this.stopAutoSend();
        return api.sendMessage('❌ **AutoSend Disabled Globally!**', threadID, messageID);
      }
    }
    
    // Handle thread-specific commands: /autosend on/off
    if (action === 'on') {
      try {
        // Get thread from database
        let thread = await global.Thread.findOne({ threadID });
        
        if (!thread) {
          return api.sendMessage('❌ Thread not found in database.', threadID, messageID);
        }
        
        // Check if already enabled for this thread
        if (thread.settings?.autosend === true) {
          return api.sendMessage('✅ AutoSend is already enabled for this thread!', threadID, messageID);
        }
        
        // Enable autosend for this thread
        if (!thread.settings) {
          thread.settings = {};
        }
        
        thread.settings.autosend = true;
        await thread.save();
        
        return api.sendMessage(
          '✅ **AutoSend Enabled for This Thread!**\n\n' +
          '🕐 This thread will receive scheduled messages even if global autosend is off.',
          threadID,
          messageID
        );
      } catch (error) {
        global.logger.error('Error enabling thread autosend:', error);
        return api.sendMessage('❌ An error occurred while enabling autosend for this thread.', threadID, messageID);
      }
      
    } else if (action === 'off') {
      try {
        // Get thread from database
        let thread = await global.Thread.findOne({ threadID });
        
        if (!thread) {
          return api.sendMessage('❌ Thread not found in database.', threadID, messageID);
        }
        
        // Check if already disabled for this thread
        if (thread.settings?.autosend === false) {
          return api.sendMessage('❌ AutoSend is already disabled for this thread!', threadID, messageID);
        }
        
        // Disable autosend for this thread
        if (!thread.settings) {
          thread.settings = {};
        }
        
        thread.settings.autosend = false;
        await thread.save();
        
        return api.sendMessage(
          '❌ **AutoSend Disabled for This Thread!**\n\n' +
          '🕐 This thread will not receive scheduled messages even if global autosend is on.',
          threadID,
          messageID
        );
      } catch (error) {
        global.logger.error('Error disabling thread autosend:', error);
        return api.sendMessage('❌ An error occurred while disabling autosend for this thread.', threadID, messageID);
      }
      
    } else {
      return api.sendMessage(
        '❌ Invalid option! Use:\n' +
        `• ${global.config.prefix}autosend global on/off - Control global autosend\n` +
        `• ${global.config.prefix}autosend on/off - Control autosend for this thread`,
        threadID,
        messageID
      );
    }
  },

  /**
   * Initialize autosend when bot starts
   */
  init: function(api) {
    // Initialize global autoSend object
    if (!global.autoSend) {
      global.autoSend = {
        enabled: false,
        interval: null,
        api: api
      };
    }
    
    // Initialize autosend config if not exists
    if (!global.config.autosend) {
      global.config.autosend = {
        enabled: true,
        checkIntervalMinutes: 1
      };
      saveConfig();
    }
    
    // Start autosend if enabled in config
    if (global.config.autosend.enabled) {
      this.startAutoSend(api);
      global.logger.system('AutoSend initialized and started');
    } else {
      global.logger.system('AutoSend initialized but disabled in config');
    }
  },

  /**
   * Start the autosend scheduler
   * Note: Scheduler always runs, but sendHourlyMessage checks both global and thread-specific settings
   */
  startAutoSend: function(api) {
    if (global.autoSend?.interval) {
      clearInterval(global.autoSend.interval);
    }

    // Get interval from config (default 1 minute)
    const intervalMinutes = global.config.autosend?.checkIntervalMinutes || 1;
    const intervalMs = intervalMinutes * 60 * 1000;

    global.autoSend = {
      enabled: true,
      api: api,
      interval: setInterval(() => {
        // Always check - sendHourlyMessage will handle global and thread-specific logic
        this.sendHourlyMessage(api);
      }, intervalMs)
    };

    // Send message immediately when started (after a delay)
    setTimeout(() => {
      this.sendHourlyMessage(api);
    }, 5000); // Wait 5 seconds after start
    
    global.logger.system(`AutoSend scheduler started with ${intervalMinutes} minute interval`);
  },

  /**
   * Stop the autosend scheduler
   */
  stopAutoSend: function() {
    if (global.autoSend?.interval) {
      clearInterval(global.autoSend.interval);
      global.autoSend.interval = null;
    }
    global.autoSend.enabled = false;
  },

  /**
   * Send hourly message to all threads
   */
  sendHourlyMessage: async function(api) {
    try {
      // Get current time in Asia/karachi timezone
      const now = new Date();
      const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/karachi"}));
      const currentHour = istTime.getHours();
      const currentMinute = istTime.getMinutes();
      
      global.logger.system(`AutoSend check - Current IST time: ${istTime.toLocaleString()} (Hour: ${currentHour}, Minute: ${currentMinute})`);
      
      // Format current time to match message time format (H:MM AM/PM)
      let currentTimeStr;
      if (currentHour === 0) {
        currentTimeStr = `12:${currentMinute.toString().padStart(2, '0')} AM`;
      } else if (currentHour < 12) {
        currentTimeStr = `${currentHour}:${currentMinute.toString().padStart(2, '0')} AM`;
      } else if (currentHour === 12) {
        currentTimeStr = `12:${currentMinute.toString().padStart(2, '0')} PM`;
      } else {
        currentTimeStr = `${currentHour - 12}:${currentMinute.toString().padStart(2, '0')} PM`;
      }
      
      // Find matching message for the exact current time
      const messageData = messages.find(msg => msg.time === currentTimeStr);
      if (!messageData) {
        // No message scheduled for this exact time - log and return silently
        return;
      }
      
      global.logger.system(`Found scheduled message for time: ${currentTimeStr}`);
      

      // Get random image from autosend folder
      const imagePath = this.getRandomImage();
      
      // Get all threads
      const threadList = await new Promise((resolve, reject) => {
        global.Thread.find({}, 'threadID', (err, threads) => {
          if (err) reject(err);
          else resolve(threads.map(thread => ({ threadID: thread.threadID })));
        });
      });

      let sentCount = 0;
      let errorCount = 0;

      // Send message to each thread (checking both global and thread-specific settings)
      for (const thread of threadList) {
        try {
          // Check if autosend should be sent to this thread
          let shouldSend = false;
          
          // Get thread settings from database
          const threadData = await new Promise((resolve, reject) => {
            global.Thread.findOne({ threadID: thread.threadID }, (err, threadDoc) => {
              if (err) reject(err);
              else resolve(threadDoc);
            });
          });
          
          // Determine if we should send to this thread
          if (threadData && threadData.settings && threadData.settings.autosend !== null && threadData.settings.autosend !== undefined) {
            // Thread has explicit setting - use it
            shouldSend = threadData.settings.autosend === true;
          } else {
            // Thread follows global setting
            shouldSend = global.config.autosend?.enabled === true;
          }
          
          // Skip if shouldn't send
          if (!shouldSend) {
            global.logger.debug(`Skipping autosend for thread ${thread.threadID} (autosend disabled)`);
            continue;
          }
          
          const messageOptions = {
            body: messageData.message
          };

          // Add image if available
          if (imagePath) {
            messageOptions.attachment = fs.createReadStream(imagePath);
          }

          await new Promise((resolve, reject) => {
            api.sendMessage(messageOptions, thread.threadID, (err, info) => {
              if (err) reject(err);
              else resolve(info);
            });
          });

          sentCount++;
          
          // Add delay between messages to avoid spam detection
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } catch (error) {
          errorCount++;
          global.logger.error(`Error sending autosend to thread ${thread.threadID}:`, error);
        }
      }

      global.logger.system(`AutoSend completed: ${sentCount} sent, ${errorCount} failed for time ${currentTimeStr}`);
      
    } catch (error) {
      global.logger.error('Error in sendHourlyMessage:', error);
    }
  },

  /**
   * Get random image from autosend folder
   */
  getRandomImage: function() {
    try {
      const imageFolderPath = path.join(__dirname, 'cache', 'autosend');
      
      if (!fs.existsSync(imageFolderPath)) {
        global.logger.warn('AutoSend image folder does not exist at: ' + imageFolderPath);
        return null;
      }

      const imageFiles = fs.readdirSync(imageFolderPath)
        .filter(file => /\.(jpg|jpeg|png|mp4|gif|webp)$/i.test(file));
      
      if (imageFiles.length === 0) {
        global.logger.warn('No images found in autosend folder: ' + imageFolderPath);
        return null;
      }

      const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
      const fullImagePath = path.join(imageFolderPath, randomImage);
      global.logger.system(`Selected random image: ${randomImage}`);
      return fullImagePath;
      
    } catch (error) {
      global.logger.error('Error getting random image:', error);
      return null;
    }
  }
};
