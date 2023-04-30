const mineflayer = require('mineflayer')
const { Entity } = require('prismarine-entity')
require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");

const bot = mineflayer.createBot({
  host: 'localhost', // minecraft server ip
  username: 'bc',
  port: 57594,                // only set if you need a port that isn't 25565
  // version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // password: '12345678'        // set if you want to use password-based auth (may be unreliable)
})

const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
  });


function lookAtNearestPlayer () {
    const playerFilter = (entity) => entity.type === 'player'
    const playerEntity = bot.nearestEntity(playerFilter ) 

    if (!playerEntity) return

    const pos = playerEntity.position.offset(0, playerEntity.height, 0)
    bot.lookAt(pos)
}
// 20s
bot.on('physicTick', lookAtNearestPlayer)

bot.on('chat', (username, message) => {
    if (username === bot.username) return

    (async () => {
        const configuration = new Configuration({
          apiKey: process.env.OPENAI_SECRET_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
          });
        console.log(completion.data.choices[0].text);

        bot.chat(completion.data.choices[0].text)
      })();
  })

