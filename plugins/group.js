const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const os = require('os');


cmd({
    pattern: "remove",
    desc: "Remove a member from the group by mentioning.",
    category: "group",
    react: "❌",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, args, quoted, reply }) => {
    if (!isGroup) return reply("This command can only be used in groups!\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺");
    if (!isBotAdmins) return reply("I need admin privileges to remove members.\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺");
    if (!isAdmins) return reply("Only group admins can use this command.\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺");
    
    const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned || mentioned.length === 0) return reply("Please mention a valid user to remove!\n");

    try {
        const user = mentioned[0]; // Take the first mentioned user
        await conn.groupParticipantsUpdate(from, [user], "remove");
        reply(`Removed @${user.split("@")[0]} from the group.`);
    } catch (e) {
        console.error(e);
        reply("Failed to remove the user. Make sure I have admin privileges.\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺");
    }
});
