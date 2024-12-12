const axios = require('axios');
const { cmd, commands } = require('../command');

//╭──────────────────────fact──────────────────────╮//

cmd({
        pattern: "fact",
        desc: "Sends a fact in chat.",
        category: "fun",
        react :"🔮",
        filename: __filename,
    },
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        const { data } = await axios.get(`https://nekos.life/api/v2/fact`);
        return reply(`*Fact:* ${data.fact}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`);
    }
);

//╭──────────────────────$──────────────────────╮//



cmd({
    pattern: "define",
    desc: "Fetch definitions from Urban Dictionary.",
    category: "fun",
    react: "💖",
    filename: __filename,
}, async (Void, citel, q) => {
    try {
        if (!q) {
            return citel.reply("Please provide a word to define.");
        }

        const response = await axios.get(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(q)}`);
        const data = response.data;

        if (data.list && data.list.length > 0) {
            const entry = data.list[0]; // Use the first definition from the list
            const text = `
Word: ${entry.word}
Definition: ${entry.definition.replace(/\[/g, "").replace(/\]/g, "")}
Example: ${entry.example.replace(/\[/g, "").replace(/\]/g, "")}

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
            `;
            return citel.reply(text.trim());
        } else {
            return citel.reply(`No definition found for "${q}".`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return citel.reply("An error occurred while fetching the definition. Please try again later.");
    }
});


cmd({
    pattern: "quotes",
    desc: "Sends quotes in chat.",
    category: "fun",
        react: "🫡",
    filename: __filename,
}, async (Void, citel) => {
    try {
        const quoo = await axios.get(`https://favqs.com/api/qotd`);
        const replyf = `
╭═════════════════
┃ *🗂Content:* ${quoo.data.quote.body}
┃ *👤Author:* ${quoo.data.quote.author}
╰═════════════════

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`
        return citel.reply(replyf);
    } catch (error) {
        console.error("An error occurred while fetching the quote:", error);
        return citel.reply("An error occurred while fetching the quote. Please try again later.");
    }
});

