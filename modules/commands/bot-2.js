module.exports.config = {
  name: "bot",
  version: "2.0.0",
  author: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "Noprefix auto reply bot",
  commandCategory: "SYSTEM",
  hasPermssion: 0, // purane bot ke liye
  hasPrefix: false, // naye bot ke liye
  cooldowns: 1,
  usages: "noprefix"
};

function handleReply(api, event, text) {
  return api.sendMessage({body: text}, event.threadID, event.messageID);
}

async function checkMessage({ api, event, Users }) {
  const { body } = event;
  if (!body) return;
  
  const msg = body.toLowerCase().trim();

  // --- Sabhi replies yahan ---
  if (msg == "batool" || msg == "noor" || msg == "heer" || msg == "laiba") 
    return handleReply(api, event, "𝗤𝘂𝗲𝗻 𝗹𝗮𝗴𝘁𝗶 𝗵𝗮𝗶 𝗺𝘂𝗷𝗵𝗲 𝘆𝗮 𝗹𝗮𝗱𝗸𝗶 😝");
  
  if (msg == "hi" || msg == "hello" || msg == "hlw" || msg == "helo") 
