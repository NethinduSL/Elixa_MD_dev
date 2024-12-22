const config = require('../config');
const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');

cmd({
    pattern: "song2",
    desc: "Download Songs By Elixa.",
    category: "download",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, q, reply
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
┃ɪꜰ ɴᴏᴛ ᴡᴏʀᴋ ᴜꜱᴇ ꜱᴏɴɢ
╰═══════════════

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Use your API to get the MP3 download URL
        const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp3?apikey=gifted&url=${url}`;
        const response = await axios.get(apiUrl);
        const data2 = response.data;

        if (!data2.success) {
            return reply("Failed to download the song 🙃");
        }

        const { download_url } = data2.result;

        // Send audio as a playable file
        await conn.sendMessage(from, {
            audio: { url: download_url },
            mimetype: "audio/mpeg",
            fileName: `${data2.result.title}.mp3`
        }, { quoted: mek });

        // Send audio as a downloadable document
        await conn.sendMessage(from, {
            document: { url: download_url },
            mimetype: "audio/mpeg",
            fileName: `${data2.result.title}.mp3`,
            caption: "®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || "Something went wrong 🙃"}`);
    }
});




cmd({
    pattern: "video2",
    desc: "Download video By Elixa.",
    category: "download",
    react: "🎬",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, q, reply
}) => {
    
        try {
        if (!q) return reply("Please provide a valid URL 🙃");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗗 𝗩𝗜𝗗𝗘𝗢🎬 ❱❱
│
╰📌𝗧𝗶𝘁𝗹𝗲: ${data.title}
╰🔗𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${data.description}
╰🕦𝗧𝗶𝗺𝗲: ${data.timestamp}
╰📤𝗔𝗴𝗼: ${data.ago}
╰👁️𝗩𝗶𝗲𝘄𝘀: ${data.views}
┃ɪꜰ ɴᴏᴛ ᴡᴏʀᴋ ᴜꜱᴇ ᴠɪᴅᴇᴏ
╰═══════════════

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Use your API to get the MP3 download URL
        const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp4?apikey=gifted&url=${url}`;
        const response = await axios.get(apiUrl);
        const data2 = response.data;

        if (!data2.success) {
            return reply("Failed to download the video 🙃");
        }

        const { download_url } = data2.result;

        // Send audio as a playable file
        await conn.sendMessage(from, {
            audio: { url: download_url },
            mimetype: "video/mp4",
            fileName: `${data2.result.title}.mp4`
        }, { quoted: mek });

        // Send audio as a downloadable document
        await conn.sendMessage(from, {
            document: { url: download_url },
            mimetype: "video/mp4",
            fileName: `${data2.result.title}.mp4`,
            caption: "®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || "Something went wrong 🙃"}`);
    }
});
