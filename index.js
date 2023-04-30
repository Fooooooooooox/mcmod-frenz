const mineflayer = require('mineflayer')
const { chatWithGPT } = require('./tasks/chatGPT.js')
const { lookAtNearestPlayer, moveWithNearestPlayer } = require('./tasks/followPlayer.js')

var bot = mineflayer.createBot({
  host: 'localhost', // minecraft server ip
  username: 'bc',
  port: 58425,                // only set if you need a port that isn't 25565
  // version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // password: '12345678'        // set if you want to use password-based auth (may be unreliable)
})

// 20s
bot.on('physicTick', ()=>{lookAtNearestPlayer(bot)} )

bot.on('chat', ()=>{moveWithNearestPlayer(bot)} )

bot.on('chat', (username, message)=>{chatWithGPT(username, user_input=message, bot)})

