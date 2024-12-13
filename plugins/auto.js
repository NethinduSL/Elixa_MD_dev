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



// Load bad words from a JSON file or define them directly
const badWords = ["bad", "badword2", "badword3"]; // Replace with actual bad words

// Function to check if the message contains bad words
function containsBadWord(body) {
  return badWords.some(word => body.toLowerCase().includes(word));
}

// Bad Word Detector
cmd({
  on: 'body'
}, async (conn, mek, m, { from, body }) => {
  try {
    // Check if the message contains any bad words
    if (containsBadWord(body)) {
      // Delete the message
      await conn.deleteMessage(from, mek.key);

      // Send "badvguy" message
      await conn.sendMessage(from, { text: "Bad word detected! 🚫 You're a badvguy!" }, { quoted: mek });
    }
  } catch (error) {
    console.error(`Error in Bad Word Detector: ${error.message}`);
  }
});
