const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson, getBuffer } = require('../lib/functions');
const axios = require('axios');


const { runtime } = require('../lib/functions');  
const moment = require('moment-timezone');
const os = require('os');



cmd({
    pattern: "qr",
    category: "converter",
    react: "📎",
    filename: __filename,
    desc: "Sends QR code of text"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (args.length === 0) {
            return reply("Please provide the text to generate the QR code.");
        }

        const text = args.join(" ");
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;
        const buffer = await getBuffer(qrCodeUrl);

        await conn.sendMessage(from, { image: buffer, caption: `Here is your QR code for: ${text}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺` }, { quoted: mek });
    } catch (e) {
        console.error(e);
        mek.reply("An error occurred while generating the QR code. Please try again.");
    }
});




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

cmd({
    pattern: "time",
    desc: "To show current time, date, day of the week, time remaining to end of day, days remaining to end of year, and time zone",
    category: "main",
    filename: __filename,
}, 
async (Void, citel) => {
    var inital = new Date().getTime();
    const { key } = await Void.sendMessage(citel.chat, { text: '```𝗧𝗲𝘀𝘁𝗶𝗻𝗴 𝗧𝗶𝗺𝗲...```' });
    var final = new Date().getTime();
    
    await sleep(1000);

    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const currentTime = moment().format('HH:mm:ss');
    const dayOfWeek = moment().format('dddd');
    const daysToEndYear = moment().endOf('year').diff(moment(), 'days');
    const timeZone = moment().zoneName();

    const endOfDay = moment().endOf('day');
    const timeRemainingEndOfDay = moment.duration(endOfDay.diff(moment())).humanize();

    const responseMessage = `
📍 *Current Date and Time (Numbers):* ${currentDateTime}
🕰️ *Current Time:* ${currentTime}
📅 *Day of the Week:* ${dayOfWeek}
⏳ *Time Remaining to End of Day:* ${timeRemainingEndOfDay}
🗓️ *Days Remaining to End of Year:* ${daysToEndYear} days
🕰️ *Time Zone:* ${timeZone}

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺

`;

    const pg = await Void.sendMessage(citel.chat, { text: responseMessage, edit: key });
    return await Void.sendMessage(citel.chat, { react: { text: '✔️', key: pg.key } });
});



const googleTTS = require("google-tts-api");
cmd({
    pattern: "tts",
    desc: "Convert text to speech.",
    category: "converter",
    react : "🫡",
    filename: __filename,
    use: '<Enter your text here>',
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        const text = args.join(" ").trim();

        if (!text) {
            return reply("Please provide text to convert to speech.");
        }

        const ttsurl = googleTTS.getAudioUrl(text, {
            lang: "en",
            slow: false,
            host: "https://translate.google.com",
        });

        await conn.sendMessage(
            from,
            {
                audio: { url: ttsurl },
                mimetype: "audio/mpeg",
                fileName: `TTS.m4a`,
            }
        );

        const caption = `
╭❰𝗘ꟾ𝖎✘𝗮 𝗧𝗧𝗦 𝗔𝘂𝗱𝗶𝗼❱❱
┃
╰📌 Text: ${text}
╰🔊 Language: English (en)
┃
╰═══════════════
> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

        await conn.sendMessage(from, { text:caption }, { quoted: mek });
    } catch (error) {
        console.error("TTS Error:", error);
        return conn.reply(`An error occurred while generating the TTS audio: ${error.message}`);
    }
});






cmd({
    pattern: "define",
    desc: "Fetch definitions from Urban Dictionary.",
    category: "fun",
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

