const axios = require('axios');
const { cmd } = require('../command');

// Global premium feature flag
let premiumActive = false;
const imageUrl = "https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/movie.png";
// Activate premium feature
cmd({
    pattern: "activepro",
    category: "premium",
    desc: "Activates premium feature for all users.",
    send: "✅ Premium activated successfully!",
    filename: __filename,
}, async (conn, mek, m, { senderNumber, reply }) => {
    const authorizedNumbers = [
        "94766428832",
        "94763936166",
        "94770463141",
        "94786874741",
        "94774534093"
    ];

    if (!authorizedNumbers.includes(senderNumber)) {
        return reply(`*This command is restricted to authorized numbers* ❗`);
    }

    premiumActive = true;
    console.log("Premium feature activated:", premiumActive);
    return reply(`*Premium feature activated for all users* ✅ By creator.`);
});

// Deactivate premium feature
cmd({
    pattern: "inactivepro",
    category: "premium",
    desc: "Deactivates premium feature for all users.",
    send: "✅ Premium deactivated successfully!",
    filename: __filename,
}, async (conn, mek, m, { senderNumber, reply }) => {
    const authorizedNumbers = [
        "94766428832",
        "94763936166",
        "94770463141",
        "94786874741",
        "94774534093"
    ];

    if (!authorizedNumbers.includes(senderNumber)) {
        return reply(`*This command is restricted to authorized numbers* ❗`);
    }

    premiumActive = false;
    console.log("Premium feature deactivated:", premiumActive);
    return reply(`*Premium feature deactivated for all users* ✅ By creator.`);
});

// Fetch movie details
cmd({
    pattern: "movie",
    category: "search",
    desc: "Sends image of asked Movie/Series.",
    use: '<movie_name>',
    send: "🎥 Fetching movie details...",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    if (!premiumActive) {
        return reply(`*This is a premium feature* ❗`);
    }

    const query = args.join(" ").trim();
    if (!query) {
        return reply(`*Please provide a movie name* ❗`);
    }

    try {
        const response = await axios.get(`https://bit-x-apis.vercel.app/movie?query=${encodeURIComponent(query)}`);
        const { data } = response;

        if (data.status !== "success" || !data.data.length) {
            return reply(`*Movie not found* ❗`);
        }

        let movieDetails = "╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗼𝘃𝗶𝗲 𝗶𝗻𝗳𝗼❱❱\n┃\n";
        data.data.forEach(movie => {
            movieDetails += `🎬 Title: ${movie.movieName}\n`;
            movieDetails += `📅 Year: ${movie.year}\n`;
            movieDetails += `⭐ IMDB Rating: ${movie.imdbRating}\n`;
            movieDetails += `🔗 Link: ${movie.link}\n╰═══════════════\n`;
        });

        return reply(movieDetails);
    } catch (error) {
        console.error("An error occurred while fetching movie data:", error);
        return reply(`*An error occurred while fetching movie data* ❗`);
    }
});


//https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/movie.png

cmd({
    pattern: "dl",
    category: "search",
    desc: "Fetches movie download links.",
    use: "<movie_name>",
    send: "🎥 Fetching download links...",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    if (!premiumActive) {
        return reply(`*This is a premium feature* ❗`);
    }

    const query = args.join(" ").trim();
    if (!query) {
        return reply(`*Please provide a movie name* ❗`);
    }

    try {
        const response = await axios.get(`https://bit-x-apis.vercel.app/moviedl?q=${encodeURIComponent(query)}`);
        const { data } = response;

        if (!data.downloadLinks || !data.downloadLinks.length) {
            return reply(`*No download links found for the movie* ❗`);
        }

        let downloadDetails = "╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗼𝘃𝗶𝗲 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗟𝗶𝗻𝗸𝘀❱❱\n┃\n";
        data.downloadLinks.forEach(link => {
            downloadDetails += `📽️ Quality: ${link.quality}\n`;
            downloadDetails += `📦 Size: ${link.size}\n`;
            downloadDetails += `🔗 Link: ${link.link}\n╰═══════════════\n`;
        });

        return reply(downloadDetails);
    } catch (error) {
        console.error("An error occurred while fetching download links:", error);
        return reply(`*An error occurred while fetching download links* ❗`);
    }
});

cmd({
    pattern: "dll",
    category: "search",
    desc: "Fetches movie download links.",
    use: "<movie_name>",
    send: "🎥 Fetching download links...",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    if (!premiumActive) {
        return reply(`*This is a premium feature* ❗`);
    }

    const query = args.join(" ").trim();
    if (!query) {
        return reply(`*Please provide a movie name* ❗`);
    }

    try {
        const response = await axios.get(`https://bit-x-apis.vercel.app/moviedll?q=${encodeURIComponent(query)}`);
        const { data } = response;

        if (!data.originalLink || !data.apiLink) {
            return reply(`*No download links found for the movie* ❗`);
        }

        // Prepare the download details message
        const downloadDetails = `╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗼𝘃𝗶𝗲 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱❱❱\n┃\n` +
            `🔗 *Original Link:* ${data.originalLink}\n` +
            `🔗 *API Link:* ${data.apiLink}\n╰═══════════════`;

        // Send the download details as a reply
        reply(downloadDetails);

        // Send the API link as a document
        await conn.sendMessage(m.chat, {
            document: { url: data.apiLink },
            mimetype: "text/plain",
            fileName: `${query} - Elixa API.txt`,
            caption: `🎥 *Movie:* ${query}`
        });

    } catch (error) {
        console.error("An error occurred while fetching download links:", error);
        return reply(`*An error occurred while fetching download links* ❗`);
    }
});
