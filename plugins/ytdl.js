const config = require('../config');
const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const axios = require('axios');

cmd({
    pattern: "song",
    desc: "Download Songs By Elixa.",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, q, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid song name or URL 🙃");

        // First Attempt: Search and download using yt-search
        try {
            const search = await yts(q);
            if (!search.videos.length) throw new Error("No results found");

            const data = search.videos[0];
            const url = data.url;

            const desc = `
╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗗 𝗦𝗼𝗻𝗴 🎵 ❱❱
│
╰📌𝗧𝗶𝘁𝗹𝗲: ${data.title}
╰🔗𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${data.description}
╰🕦𝗧𝗶𝗺𝗲: ${data.timestamp}
╰📤𝗔𝗴𝗼: ${data.ago}
╰👁️𝗩𝗶𝗲𝘄𝘀: ${data.views}
┃ ɪꜰ ɴᴏᴛ ᴡᴏʀᴋꜱ ᴜꜱᴇ ꜱᴏɴɢ2
╰═══════════════

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

            await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

            const down = await fg.yta(url);
            const downloadUrl = down.dl_url;

            // Send audio
            await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
            return conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mp3", fileName: `${data.title}.mp3` }, { quoted: mek });
        } catch (err) {
            console.warn("Primary method failed:", err.message);
            throw new Error("Primary method failed, trying alternative API...");
        }

    } catch (primaryError) {
        // Fallback: Alternative API only if the first fails
        try {
            const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp3?apikey=gifted&url=${q}`;
            const response = await axios.get(apiUrl);
            const { result } = response.data;

            if (!result || !result.download_url) throw new Error("No results from API");

            const { download_url, title } = result;

            // Send audio as a playable file
            await conn.sendMessage(from, {
                audio: { url: download_url },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`
            }, { quoted: mek });

            // Send audio as a downloadable document
            return conn.sendMessage(from, {
                document: { url: download_url },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`,
                caption: "®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
            }, { quoted: mek });

        } catch (fallbackError) {
            console.error("Fallback method failed:", fallbackError.message);
            return reply(`Error: Both methods failed. Please try again later 🙃`);
        }
    }
});


// Video download command
cmd({
    pattern: "video2",
    desc: "Download video By Elixa.",
    category: "download",
    react:"🎬",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("Please provide a valid video name or URL 🙃");

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        const desc = `
╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗗 𝗩𝗶𝗱𝗲𝗼 🎬 ❱
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

        // Fetching the video download URL from API
        const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp4?apikey=gifted&url=${url}`;
        const response = await axios.get(apiUrl);
        const data2 = response.data;

        if (!data2.success || !data2.result) {
            return reply("Failed to download the video 🙃");
        }

        const { download_url, title } = data2.result;

        // Send video as a playable file
        await conn.sendMessage(from, {
            video: { url: download_url },
            mimetype: "video/mp4",
            fileName: `${title}.mp4`
        }, { quoted: mek });

        // Send video as a downloadable document
        await conn.sendMessage(from, {
            document: { url: download_url },
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
            caption: "®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || "Something went wrong 🙃"}`);
    }
});
