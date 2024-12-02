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



cmd({
    pattern: "weather",
    category: "search",
    desc: "Fetches and sends weather information for the specified location.",
    use: '<city_name>',
    react: "☀️",
    filename: __filename,
}, async (conn, mek, m, {
    from, quoted, args, reply
}) => {
    try {
        // Join the arguments to form the city name
        const cityName = args.join(" ").trim();

        // Check if a city name is provided
        if (!cityName) {
            return reply(`*Please provide a city name* ❗`);
        }

        // Fetch weather data from OpenWeather API
        const apiKey = ''; // Replace with your API key
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`;
        const { data } = await axios.get(weatherUrl);

        // Extract relevant weather data
        const location = data.name;
        const country = data.sys.country;
        const temperature = data.main.temp;
        const feelsLike = data.main.feels_like;
        const weatherDescription = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Prepare the weather message
        const weatherMessage = `🌍 *Weather Report for ${location}, ${country}* 🌍\n\n` +
            `🌡️ *Temperature:* ${temperature}°C (Feels like: ${feelsLike}°C)\n` +
            `☁️ *Condition:* ${weatherDescription}\n` +
            `💧 *Humidity:* ${humidity}%\n` +
            `💨 *Wind Speed:* ${windSpeed} m/s\n\n` +
            `_Powered by OpenWeather API_`;

        // Send the weather message
        await conn.sendMessage(from, { text: weatherMessage }, { quoted });

    } catch (error) {
        console.error("Error fetching weather data:", error);

        // Handle specific errors
        if (error.response && error.response.status === 404) {
            return reply(`*City not found.* Please check the name and try again.`);
        }
        reply(`*An error occurred while fetching the weather data.* Please try again later.`);
    }
});

