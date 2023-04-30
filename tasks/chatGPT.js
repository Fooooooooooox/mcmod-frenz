require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");

module.exports = {
    chatWithGPT: chatWithGPT
}

const history = [];
const messages = [];

async function chatWithGPT(username, user_input, bot) {
    if (username === bot.username) return

    const configuration = new Configuration({
          apiKey: process.env.OPENAI_SECRET_KEY,
        });

    const openai = new OpenAIApi(configuration);


    for (const [input_text, completion_text] of history) {
        messages.push({ role: "user", content: input_text });
        messages.push({ role: "assistant", content: completion_text });
    }

    messages.push({ role: "user", content: user_input });

    try {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: messages,
        });
        const completion_text = completion.data.choices[0].message.content;
        console.log(completion_text);
        history.push([user_input, completion_text]);
        bot.chat(completion.data.choices[0].text);
    } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
}