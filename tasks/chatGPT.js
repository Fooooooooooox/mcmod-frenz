require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");

module.exports = {
    chatWithGPT: chatWithGPT
}

async function chatWithGPT(username, message, bot) {
    if (username === bot.username) return

    const configuration = new Configuration({
          apiKey: process.env.OPENAI_SECRET_KEY,
        });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
          });

    bot.chat(completion.data.choices[0].text);
}