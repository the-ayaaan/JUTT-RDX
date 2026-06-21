/**
 * User Leave Event
 * Handles when users leave a group
 */

// Thread model is accessed via global.Thread

module.exports = {
  config: {
    name: 'userLeave',
    description: 'Handles when users leave a group',
    version: '1.0.0',
    credit: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭"
  },
  
  /**
   * Event execution
   * @param {Object} options - Options object
   * @param {Object} options.api - Facebook API instance
   * @param {Object} options.message - Message object
   * @param {Object} options.logMessageData - Event data
   */
  run: async function({ api, message, logMessageData }) {
    const { threadID, senderID } = message;

    try {
      // Get thread settings
      const thread = await global.Thread.findOne({ threadID });
      
      // Skip if goodbye is disabled for this thread
      if (thread && thread.settings && thread.settings.goodbye === false) {
        return global.logger.debug(`Goodbye message disabled for thread ${threadID}`);
      }
      
      // Get user who left
      const leftParticipantFbId = logMessageData.leftParticipantFbId;
      
      // Skip if no participant left (shouldn't happen)
      if (!leftParticipantFbId) {
        return;
      }
      
      // Check if the bot was removed
      if (leftParticipantFbId === global.client.botID) {
        global.logger.system(`Bot was removed from thread ${threadID}`);
        
        // Delete thread from database when bot is removed using thread controller
        try {
          await global.controllers.thread.deleteThread(threadID);
          global.logger.database(`Thread ${threadID} deleted from database because bot was removed`);
        } catch (dbError) {
          global.logger.error(`Error deleting thread ${threadID} from database:`, dbError.message);
        }
        
        return;
      }
      
      // Get user info
      let userName = 'Someone';
      
      // Try to get name from thread users list
      if (thread && thread.users) {
        const user = thread.users.find(user => user.id === leftParticipantFbId);
        if (user) {
          userName = user.name;
        }
      }
      
      // If name not found in thread users, try to get from Facebook
      if (userName === 'Someone') {
        try {
          const userInfo = await new Promise((resolve, reject) => {
            api.getUserInfo(leftParticipantFbId, (err, info) => {
              if (err) return reject(err);
              resolve(info[leftParticipantFbId]);
            });
          });
          
          if (userInfo && userInfo.name) {
            userName = userInfo.name;
          }
        } catch (error) {
          global.logger.error('Error getting user info:', error.message);
        }
      }
      
      // Check if this was an admin removal or user left voluntarily
      // For admin removal: message.author != leftParticipantFbId
      // For voluntary leave: message.author == leftParticipantFbId
      const adminId = message.author;
      const isAdminRemoval = adminId && adminId !== leftParticipantFbId;

      let adminName = null;
      if (isAdminRemoval) {
        // Get admin info for the removal message
        try {
          const adminInfo = await new Promise((resolve, reject) => {
            api.getUserInfo(adminId, (err, info) => {
              if (err) return reject(err);
              resolve(info[adminId]);
            });
          });

          if (adminInfo && adminInfo.name) {
            adminName = adminInfo.name;
          }
        } catch (adminError) {
          global.logger.error('Error getting admin info:', adminError.message);
          adminName = 'An admin';
        }
      }

      // Check if anti-out is enabled for this thread
      if (thread && thread.settings && thread.settings.antiOut === true && !isAdminRemoval) {
        try {
          // Only apply anti-out for voluntary leaves, not admin removals
          // User left voluntarily, add them back
          await new Promise((resolve, reject) => {
            api.addUserToGroup(leftParticipantFbId, threadID, (err) => {
              if (err) return reject(err);
              resolve();
            });
          });

          // Send anti-out message
          await global.api.sendMessage(
            `⚠️ 𝗢𝘄𝗻𝗲𝗿 𝗸𝗮 𝗵𝘂𝗸𝗮𝗺 𝗵𝗮𝗶 𝗸𝗼𝗶𝗲𝗲 𝗹𝗲𝗳𝘁 𝗻𝗮 𝗵𝗼 😛.\n` +
            `${userName} 𝗗𝗲𝗸𝗵𝗼 𝗻𝗮 𝗯𝗮𝗯𝘂 𝗮𝗽𝗸𝗼 𝗮𝗴𝗮𝗶𝗻 𝗮𝗱𝗱 𝗸𝗮𝗿 𝗱𝗶𝘆𝗮 😙.`,
            threadID
          );

          return;
        } catch (error) {
          global.logger.error('Error in anti-out processing:', error.message);
          // Continue with normal goodbye message if adding back fails
        }
      }

      // Send appropriate message based on whether it was admin removal or voluntary leave
      if (isAdminRemoval && adminName) {
        // Admin removed the user
        await global.api.sendMessage(
          `👮‍♂️ ${adminName} 𝗰𝗵𝗮𝗹 𝗽𝗮𝘁𝗹𝗶 𝗴𝗮𝗹𝗶 𝘀𝗲 𝗻𝗲𝗸𝗮𝗹 ${userName} 🙊.`,
          threadID
        );
      } else {
        // User left voluntarily
        const goodbyeMessage = `👋 ${userName} 𝗯𝗮𝗯𝘂 𝘁𝘂𝗺 𝗾 𝗹𝗲𝗳𝘁 𝗵𝘂𝘄𝗲.\n𝗕𝗼𝗵𝘁 𝘆𝗮𝗱 𝗮𝘆𝗲 𝗴𝗶 𝗮𝗽𝗸𝗶 😃`;
        await global.api.sendMessage(goodbyeMessage, threadID);
      }
      
      // Update thread in database using thread controller
      try {
        // Remove user from thread using thread controller
        await global.controllers.thread.removeUserFromThread(threadID, leftParticipantFbId);
      } catch (dbError) {
        global.logger.error(`Error updating thread database for userLeave event:`, dbError.message);
      }
      
    } catch (error) {
      global.logger.error('Error in userLeave event:', error.message);
    }
  }
};
