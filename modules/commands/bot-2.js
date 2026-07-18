module.exports = {
  config: {
    name: "bot",
    description: "Quick reply when someone says bot",
    usage: "",
    credit: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    hasPrefix: false,
    permission: "PUBLIC",
    cooldown: 1,
    category: "SYSTEM"
  },

  onChat: async function({ api, event, Users }) {
    const { threadID, messageID, body, senderID } = event;
    if (!body) return;
    
    const msg = body.toLowerCase();
    const name = await Users.getNameUser(senderID);

    // --- REPLY LIST ---
    if (msg == "batool" || msg == "noor" || msg == "heer" || msg == "laiba") {
      return api.sendMessage("𝗤𝘂𝗲𝗲𝗻 𝗹𝗮𝗴𝘁𝗶 𝗵𝗮𝗶 𝗺𝘂𝗷𝗵𝗲 𝘆𝗮 𝗹𝗮𝗱𝗸𝗶 😝", threadID, messageID);
    }
    
    if (msg == "👍" || msg == "👍🏻") {
      return api.sendMessage("🌊⚡••Aɽɛɧ Aɗɪ Ɱɑƞɑⱱ ʑɵɵ ꌗɛ Ɓɒɧɒɽ Ƙɑɪʂɛ ••😹💨", threadID, messageID);
    }

    if (msg == "🤮") {
      return api.sendMessage("Konsa mahina chal raha hai 😝", threadID, messageID);
    }

    if (msg == "🤗") {
      return api.sendMessage("Hug me baby ☺️", threadID, messageID);
    }

    if (msg == "sim" || msg == "simsimi") {
      return api.sendMessage("Prefix Kon Lagayega? Pehle Prefix Lagao Fir Likho Sim", threadID, messageID);
    }

    if (msg == "hi" || msg == "hello" || msg == "hlw" || msg == "helo") {
      return api.sendMessage("Hello, Hi, Bye bye. Ye sab ke alawa kuch bolna nhi ata Kya tujhe", threadID, messageID);
    }

    if (msg == "bc") {
      return api.sendMessage("Ye Bc Kya HoTa Hai 🤔", threadID, messageID);
    }

    if (msg == "lol" || msg == "lol bot") {
      return api.sendMessage("Khud ko Kya LeGend Samjhte Ho 😂", threadID, messageID);
    }

    if (msg == "morning" || msg == "good morning") {
      return api.sendMessage("Ꮆɵɵɗ Ɱ❍ɽƞɪɪƞɠ Ɛⱱɛɽɣ❍ƞɛ🌅, Ƭɽɣ ꌗɵɱɛ Cɵffɛɛ ☕✨", threadID, messageID);
    }

    if (msg == "ayan" || msg == "ayan jutt") {
      return api.sendMessage("Busy HoGa Work Me Main t0o Hun Naw 😘", threadID, messageID);
    }

    if (msg == "owner") {
      return api.sendMessage("『𝗠𝗘𝗥𝗔 𝗢𝗪𝗡𝗘𝗥 𝗔𝗬𝗔𝗡 𝗛𝗔𝗜 𝗣𝗜𝗖 𝗗𝗘𝗞𝗛𝗡𝗜 𝗧𝗢 𝗕𝗔𝗕𝗨 𝗧𝗬𝗣𝗘 𝗞𝗔𝗥𝗢 😘』", threadID, messageID);
    }

    if (msg == "tumhe banaya kon hai" || msg == "tumko banaya kisne") {
      return api.sendMessage("Ayan jutt ♥️ My Creator. He loves me & Edit Me Daily.", threadID, messageID);
    }

    if (msg == "shadi karoge" || msg == "mujhse shadi karoge?") {
      return api.sendMessage("hanji, karunga lekin baccha. apke pet m hoga. manjur h?", threadID, messageID);
    }

    if (msg == "chup" || msg == "stop" || msg == "chup ho ja") {
      return api.sendMessage("Nhi rahunga. 😼 Mujhe Bolna H. Tumhe Koi Haq nhi Mujhe Chup Karane ka.", threadID, messageID);
    }

    if (msg == "kese ho" || msg == "kaise ho" || msg == "how are you") {
      return api.sendMessage("M Tabhi Accha hota hu, Jab Apko Hasta Huye Dekhta hu☺️", threadID, messageID);
    }

    if (msg == "😂" || msg == "🤣") {
      return api.sendMessage("Enni hasi kyu aa rahi hai🤣, Es hasi ke piche ka raaz kya hai batao", threadID, messageID);
    }

    if (msg == "🥰" || msg == "😍" || msg == "❤️") {
      return api.sendMessage("🦋🌿Aƞƙɧ❍ Ɱɛ Ƥɣɑɽ͢ Ɗɪɭɱɛ Ƙɧuɱɑɽ••🕊️🍎😍", threadID, messageID);
    }

    // --- "bot" word pe random reply ---
    if (msg.includes("bot") || msg.includes("babu") || msg.includes("oye")) {
      const replies = [
        "Haan ji bulaaya?",
        "Kya hua malik?",
        "Main yahin hun 😌",
        "Bot hazir hai sir"
      ];
      const rand = replies[Math.floor(Math.random() * replies.length)];
      return api.sendMessage(rand, threadID, messageID);
    }
  }
}
