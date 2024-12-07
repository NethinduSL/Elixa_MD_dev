const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const os = require('os');


cmd({
    pattern: "remove",
    desc: "❌ Remove a group member by mentioning them.",
    category: "group",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, args, reply }) => {
    if (!isGroup) return reply("🚫 *This command can only be used in groups!*");
    if (!isBotAdmins) return reply("⚠️ *I need admin privileges to remove members!*");
    if (!isAdmins) return reply("🚨 *Only group admins can use this command!*");
    
    const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned || mentioned.length === 0) return reply("📌 *Please mention a valid user to remove!*");

    try {
        const user = mentioned[0]; // Take the first mentioned user
        await conn.groupParticipantsUpdate(from, [user], "remove");
        const username = user.split("@")[0];

        await conn.sendMessage(from, {
            text: `🚮 *Removed @${username} from the group.*\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝗿𝗮𝘁𝗲𝗱 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`,
            mentions: [user]
        });
    } catch (e) {
        console.error(e);
        reply("❌ *Failed to remove the user. Make sure I have admin privileges.*");
    }
});



cmd({
    pattern: "promote",
    desc: "🔼 Promote a member to admin.",
    category: "group",
    react: "⬆️",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    if (!isGroup) return reply("⚠️ *This command can only be used in groups!*");
    if (!isBotAdmins) return reply("🚨 *I need admin privileges to promote members!*");
    if (!isAdmins) return reply("⚠️ *Only group admins can use this command!*");

    const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned || mentioned.length === 0) return reply("📌 *Please mention a valid user to promote!*");

    try {
        const user = mentioned[0];
        await conn.groupParticipantsUpdate(from, [user], "promote");
        const username = user.split("@")[0];

        await conn.sendMessage(from, {
            text: `🎉 *Promoted @${username} to admin!*\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝗿𝗮𝘁𝗲𝗱 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`,
            mentions: [user]
        });
    } catch (e) {
        console.error(e);
        reply("❌ *Failed to promote the user. Make sure I have admin privileges.*");
    }
});






cmd({
    pattern: "demote",
    desc: "🔽 Demote a member from admin.",
    category: "group",
    react: "⬇️",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    if (!isGroup) return reply("⚠️ *This command can only be used in groups!*");
    if (!isBotAdmins) return reply("🚨 *I need admin privileges to demote members!*");
    if (!isAdmins) return reply("⚠️ *Only group admins can use this command!*");

    const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned || mentioned.length === 0) return reply("📌 *Please mention a valid user to demote!*");

    try {
        const user = mentioned[0];
        await conn.groupParticipantsUpdate(from, [user], "demote");
        const username = user.split("@")[0];

        await conn.sendMessage(from, {
            text: `😞 *Demoted @${username} from admin!* \n\n> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘅𝗮 𝗠𝗗`,
            mentions: [user]
        });
    } catch (e) {
        console.error(e);
        reply("❌ *Failed to demote the user. Make sure I have admin privileges.*");
    }
});





cmd({
    pattern: "mute",
    desc: "🔇 Mute a member in the group.",
    category: "group",
    react: "🔇",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    if (!isGroup) return reply("⚠️ *This command can only be used in groups!*");
    if (!isBotAdmins) return reply("🚨 *I need admin privileges to mute members!*");
    if (!isAdmins) return reply("⚠️ *Only group admins can use this command!*");

    const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned || mentioned.length === 0) return reply("📌 *Please mention a valid user to mute!*");

    try {
        const user = mentioned[0];
        // Here, mute is implemented by making the user a non-admin
        await conn.groupParticipantsUpdate(from, [user], "demote");
        const username = user.split("@")[0];

        await conn.sendMessage(from, {
            text: `🔇 *Muted @${username} in the group!* \n\n> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘅𝗮 𝗠𝗗`,
            mentions: [user]
        });
    } catch (e) {
        console.error(e);
        reply("❌ *Failed to mute the user. Make sure I have admin privileges.*");
    }
});






cmd({
    pattern: "unmute",
    desc: "🔊 Unmute a member in the group.",
    category: "group",
    react: "🔊",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    if (!isGroup) return reply("⚠️ *This command can only be used in groups!*");
    if (!isBotAdmins) return reply("🚨 *I need admin privileges to unmute members!*");
    if (!isAdmins) return reply("⚠️ *Only group admins can use this command!*");

    const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned || mentioned.length === 0) return reply("📌 *Please mention a valid user to unmute!*");

    try {
        const user = mentioned[0];
        // Unmute is implemented by making the user an admin
        await conn.groupParticipantsUpdate(from, [user], "promote");
        const username = user.split("@")[0];

        await conn.sendMessage(from, {
            text: `🔊 *Unmuted @${username} in the group!* \n\n> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘇𝗮 𝗠𝗗`,
            mentions: [user]
        });
    } catch (e) {
        console.error(e);
        reply("❌ *Failed to unmute the user. Make sure I have admin privileges.*");
    }
});



cmd({
    pattern: "adminin",
    desc: "👑 Get a list of admins in the group.",
    category: "group",
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply, groupMetadata }) => {
    if (!isGroup) return reply("⚠️ *This command can only be used in groups!*");

    try {
        const group = await conn.groupMetadata(from);
        const admins = group.participants.filter(p => p.isAdmin);
        const adminList = admins.map(admin => `👑 @${admin.id.split('@')[0]}`).join("\n") || "No admins in this group.";

        await conn.sendMessage(from, {
            text: `*👑 Admins of ${group.subject}*\n\n${adminList}\n\n> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘇𝗮 𝗠𝗗`,
            mentions: admins.map(admin => admin.id)
        });
    } catch (e) {
        console.error(e);
        reply("❌ *Failed to fetch admin info.*");
    }
});
