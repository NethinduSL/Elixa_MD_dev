const axios = require('axios');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "movie",
    category: "search",
    desc: "Sends image of asked Movie/Series.",
    use: '<movie_name>',
    react :"🎞️",
    filename: __filename,
},
    async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
    botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    
    try {
        // Ensure q captures the movie name
        q = args.join(" ").trim();

        // Check if movie name is provided
        if (!q) {
            return reply(`*Please provide a movie name* ❗`);
        }

        // Fetch movie data from OMDB API
        let fids = await axios.get(`https://www.omdbapi.com/?apikey=742b2d09&t=${q}&plot=full`);

        // Handle if movie is not found
        if (fids.data.Response === "False") {
            return reply(`*Movie not found* ❗`);
        }

        // Formatting movie data
        let imdbt = "╭───────────────────╮\n│                𝗠𝗼𝘃𝗶𝗲 𝗶𝗻𝗳𝗼                  │\n╰───────────────────╯\n";
        imdbt += `🎬 Title      : ${fids.data.Title}\n\n`;
        imdbt += `📅 Year       : ${fids.data.Year}\n\n`;
        imdbt += `⭐ Rated      : ${fids.data.Rated}\n\n`;
        imdbt += `📆 Released   : ${fids.data.Released}\n\n`;
        imdbt += `⏳ Runtime    : ${fids.data.Runtime}\n\n`;
        imdbt += `🌀 Genre      : ${fids.data.Genre}\n\n`;
        imdbt += `👨🏻‍💻 Director   : ${fids.data.Director}\n\n`;
        imdbt += `✍ Writer     : ${fids.data.Writer}\n\n`;
        imdbt += `👨 Actors     : ${fids.data.Actors}\n\n`;
        imdbt += `📃 Plot       : ${fids.data.Plot}\n\n`;
        imdbt += `🌐 Language   : ${fids.data.Language}\n\n`;
        imdbt += `🌍 Country    : ${fids.data.Country}\n\n`;
        imdbt += `🎖️ Awards     : ${fids.data.Awards}\n\n`;
        imdbt += `📦 BoxOffice  : ${fids.data.BoxOffice}\n\n`;
        imdbt += `🏙️ Production : ${fids.data.Production}\n\n`;
        imdbt += `🌟 imdbRating : ${fids.data.imdbRating}\n\n`;
        imdbt += `❎ imdbVotes  : ${fids.data.imdbVotes}`;


        let cap="\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺"
        
        // Check if the poster exists
        const posterUrl = fids.data.Poster !== "N/A" ? fids.data.Poster : null;

        // Send movie info with or without poster
        if (posterUrl) {
            await conn.sendMessage(m.chat, {
                image: { url: posterUrl },
                caption: imdbt + cap,
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { text: imdbt }, { quoted: m });
        }

    } catch (error) {
        console.error(error);
        reply(`*An error occurred while fetching the movie info* ❗`);
    }
});


const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "weather",
    category: "search",
    desc: "Sends weather information for the requested city.",
    use: '<city_name>',
    react: "🌤️",
    filename: __filename,
},
    async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber,
    botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName,
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {

    try {
        // Ensure q captures the city name
        q = args.join(" ").trim();

        // Check if city name is provided
        if (!q) {
            return reply(`*Please provide a city name* ❗`);
        }

        // Fetch weather data from OpenWeatherMap API
        let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);

        // Extract data
        const data = response.data;

        // Format weather information
        let weatherInfo = "╭───────────────────╮\n│          🌤️ 𝗪𝗲𝗮𝘁𝗵𝗲𝗿 𝗜𝗻𝗳𝗼 🌤️          │\n╰───────────────────╯\n";
        weatherInfo += `📍 City       : ${data.name}, ${data.sys.country}\n\n`;
        weatherInfo += `🌡️ Temperature : ${data.main.temp}°C (Feels like: ${data.main.feels_like}°C)\n\n`;
        weatherInfo += `🔼 Max Temp   : ${data.main.temp_max}°C\n\n`;
        weatherInfo += `🔽 Min Temp   : ${data.main.temp_min}°C\n\n`;
        weatherInfo += `💨 Wind Speed : ${data.wind.speed} m/s\n\n`;
        weatherInfo += `🌫️ Humidity   : ${data.main.humidity}%\n\n`;
        weatherInfo += `🌥️ Conditions : ${data.weather[0].description}\n\n`;
        weatherInfo += `📊 Pressure   : ${data.main.pressure} hPa\n\n`;
        weatherInfo += `🌅 Sunrise    : ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}\n\n`;
        weatherInfo += `🌇 Sunset     : ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;

        let footer = "\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺";

        // Check if weather icon exists
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // Send weather info with or without icon
        await conn.sendMessage(m.chat, {
            image: { url: iconUrl },
            caption: weatherInfo + footer,
        }, { quoted: m });

    } catch (error) {
        console.error(error);

        if (error.response && error.response.data && error.response.data.message) {
            reply(`*Error:* ${error.response.data.message}`);
        } else {
            reply(`*An error occurred while fetching the weather info* ❗`);
        }
    }
});



