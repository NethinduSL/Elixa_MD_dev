const fs = require('fs');
const path = require('path');
const config = require('../config');
const { cmd } = require('../command');

// Auto Voice
cmd({
  on: 'body'
},
async (conn, mek, m, { from, body, isOwner }) => {
  try {
    const filePath = path.join(__dirname, '../Elixa/auto_voice.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase() && config.AUTO_VOICE === 'true') {
          await conn.sendPresenceUpdate('recording', from);
          await conn.sendMessage(from, { 
            audio: { url: data[text] }, 
            mimetype: 'audio/mpeg', 
            ptt: true 
          }, { quoted: mek });
        }
      }
    } else {
      console.error(`Auto Voice file not found: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error in Auto Voice: ${error.message}`);
  }
});

// Auto Sticker
cmd({
  on: 'body'
},
async (conn, mek, m, { from, body, isOwner }) => {
  try {
    const filePath = path.join(__dirname, '../Elixa/auto_sticker.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase() && config.AUTO_STICKER === 'true') {
          await conn.sendMessage(from, { 
            sticker: { url: data[text] }, 
            package: 'yourName' 
          }, { quoted: mek });
        }
      }
    } else {
      console.error(`Auto Sticker file not found: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error in Auto Sticker: ${error.message}`);
  }
});

// Auto Reply
cmd({
  on: 'body'
},
async (conn, mek, m, { from, body, isOwner }) => {
  try {
    const filePath = path.join(__dirname, '../Elixa/auto_reply.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase() && config.AUTO_REPLY === 'true') {
          await m.reply(data[text]);
        }
      }
    } else {
      console.error(`Auto Reply file not found: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error in Auto Reply: ${error.message}`);
  }
})



//





const badWordsFilePath = path.join(__dirname, '../Elixa/badword.json');

// Function to load bad words from the JSON file
function loadBadWords() {
  try {
    if (fs.existsSync(badWordsFilePath)) {
      const data = fs.readFileSync(badWordsFilePath, 'utf8');
      return JSON.parse(data);
    } else {
      console.error(`Bad words file not found: ${badWordsFilePath}`);
      return [];
    }
  } catch (error) {
    console.error(`Error loading bad words: ${error.message}`);
    return [];
  }
}

// Function to check if a message contains any bad words
function containsBadWord(body, badWords) {
  return badWords.some(word => new RegExp(`\\b${word}\\b`, 'i').test(body));
}

cmd({
  on: 'body'
},
async (conn, mek, m, { from, body, isOwner }) => {
  try {
    const badWords = loadBadWords();
    
    // Check if the message contains a bad word
    if (containsBadWord(body, badWords)) {
      // Delete the message
      await conn.deleteMessage(from, mek.key);
      await conn.sendMessage(from, { text: "Bad word detected! 🚫 You're a badvguy!" }, { quoted: mek });
      
    }
  } catch (error) {
    console.error(`Error in bad word filter: ${error.message}`);
  }
});
