const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
    pattern: "Nethindu",
    desc: "Download YouTube video or information.",
    category: "downloader",
    react: "✅",
    filename: __filename,
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
    botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {

    try {
        // Fetching data from the GitHub repository
        const response = await axios.get('https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/publicconfig.js');
        
        // Access the NT value from the response data
        const ntValue = response.data.NT;  // Ensure this is correct based on the response structure
        
        // Send the NT value in the reply
        await reply(`NT Value: ${ntValue}\n\n> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘇𝗮 ‐𝝡𝗗༺`);
        
        // React to the message
        await conn.sendMessage(from, {
            react: { text: '🖥️', key: mek.key }
        });

    } catch (error) {
        console.error("Error fetching data:", error.message);  // Log the error for debugging
        await reply("An error occurred while processing the request.");
    }
});
