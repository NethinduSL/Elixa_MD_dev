const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "ai",
    desc: "Chat GPT 4.",
    category: "ai",
    react :"💫",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let data = await fetchJson(`https://bk9.fun/ai/gemini?q=${q}`);
        return reply(`${data.BK9}`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
