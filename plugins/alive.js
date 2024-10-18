const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const os = require('os');
const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys'); // Import necessary functions

cmd({
    pattern: "alive",
    desc: "Check if the bot is online.",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Define uptime message
        const uptimeMessage = `
${config.ALIVE_MSG}
╭
│𝗥𝘂𝗻𝘁𝗶𝗺𝗲: ${runtime(process.uptime())}
│𝗥𝗮𝗺: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem() / 1024 / 1024)} MB
│𝗛𝗼𝘀𝘁: ${os.hostname()}
│𝗖𝗿𝗲𝗮𝘁𝗼𝗿: Nethindu Thaminda
│𝗢𝘄𝗻𝗲𝗿: ${config.OWNER}
╰───────────────────

> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘅𝗮 𝗠𝗗`;

        // Define buttons
        const buttons = [
            {
                buttonId: `${config.prefix}menu`,
                buttonText: { displayText: "MENU" },
                type: 1
            },
            {
                buttonId: `${config.prefix}ping`,
                buttonText: { displayText: "PING" },
                type: 1
            }
        ];

        // Generate message with buttons (no image)
        const msg = generateWAMessageFromContent(from, proto.Message.fromObject({
            buttonsMessage: {
                contentText: uptimeMessage,
                footerText: "© ᴘᴏᴡᴇʀᴅ ʙʏ ᴇᴛʜɪx-ᴍᴅ",
                buttons: buttons,
                headerType: 1 // 1 = Text header
            }
        }), {});

        // Send the message
        await conn.sendMessage(from, msg.message, { messageId: msg.key.id });
    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});
