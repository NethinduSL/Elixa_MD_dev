const config = require('../config');
const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const axios = require('axios');
const { fetchJson } = require('../lib/functions');



cmd({
    pattern: "song",
    desc: "Download Songs By Elixa.",
    category: "download",
    react : "🎵",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid URL 🙃");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗗 𝗦𝗼𝗻𝗴 🎵 ❱❱
│
╰📌𝗧𝗶𝘁𝗹𝗲: ${data.title}
╰🔗𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${data.description}
╰🕦𝗧𝗶𝗺𝗲: ${data.timestamp}
╰📤𝗔𝗴𝗼: ${data.ago}
╰👁️𝗩𝗶𝗲𝘄𝘀: ${data.views}
╰═══════════════

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // download audio
        let down = await fg.yta(url); // Use the video's URL for downloading
        let downloadUrl = down.dl_url;

        // send audio
        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mp3", fileName: data.title + ".mp3", caption: "®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});

//---------------------------video--------------------------

cmd({
    pattern: "video",
    desc: "Download videos By Elixa.",
    category: "download",
    react :"🎬",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid URL 🙃");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `        
╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗗 𝗩𝗶𝗱𝗲𝗼 🎬❱❱
┃
╰📌𝗧𝗶𝘁𝗹𝗲: ${data.title}
╰🔗𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${data.description}
╰🕦𝗧𝗶𝗺𝗲: ${data.timestamp}
╰📤𝗔𝗴𝗼: ${data.ago}
╰👁️𝗩𝗶𝗲𝘄𝘀: ${data.views}
╰═══════════════

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // download video
        let down = await fg.ytv(url); // Use the video's URL for downloading
        let downloadUrl = down.dl_url;

        // send video
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: data.title + ".mp4", caption: "®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});





const googleTTS = require("google-tts-api");
cmd({
    pattern: "tts",
    desc: "Convert text to speech.",
    category: "download",
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
    pattern: "apk",
    desc: "Convert text to speech.",
    category: "download",
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

        // Fetch the APK details
        const data = await axios.get(`https://bk9.fun/download/apk?id=${q}`);

        // Construct the message using the fetched data
        const message = `
╭❰𝗘ꟾ𝖎✘𝗮 𝗔𝗣𝗞❱❱
┃
╰📌 App: ${data.data.BK9.name}
╰📅 Last Updated: ${data.data.BK9.lastup}
╰🛠️ Package: ${data.data.BK9.package}
╰═══════════════
> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

        // Send the download link first
        
        // Sending the image and message
        await conn.sendMessage(from, {
            image: { url: data.data.BK9.icon },
            caption: message
        }, { quoted: mek });


const downloadMessage = `ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴘᴇᴇᴅ ɪꜱ ᴅᴇᴘᴇɴᴅ ᴏɴ ꜱᴇʀᴠᴇʀ ʀᴀᴍ ꜱᴏᴍᴇᴛɪᴍᴇꜱ ɪᴛ ᴍᴀʏ ʙᴇ ɴᴏᴛ ᴅᴏᴡɴʟᴏᴀᴅᴅᴇᴅ ᴛʜᴇɴ ᴜꜱᴇ ʟɪɴᴋ\ɴ\ɴ📥 Click the link to download the APK: ${data.data.BK9.dllink}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`;
        await conn.sendMessage(from, {
            text: downloadMessage
        }, { quoted: mek });



        
        // Sending the APK file
        await conn.sendMessage(
            from,
            {
                audio: { url: data.data.BK9.dllink },
                mimetype: "application/vnd.android.package-archive",
                fileName: `${q}.apk`,
            }
        );

    } catch (error) {
        console.error("TTS Error:", error);
        return conn.reply(`An error occurred while generating the TTS audio: ${error.message}`);
    }
});


