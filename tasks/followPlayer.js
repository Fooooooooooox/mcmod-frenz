const { Entity } = require('prismarine-entity')
const { pathfinder, Movements, goals }= require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow

module.exports = {
    lookAtNearestPlayer: lookAtNearestPlayer,
    moveWithNearestPlayer: moveWithNearestPlayer,
}

function lookAtNearestPlayer (bot) {
    const playerFilter = (entity) => entity.type === 'player'
    const playerEntity = bot.nearestEntity(playerFilter) 

    if (!playerEntity) return

    const pos = playerEntity.position.offset(0, playerEntity.height, 0)
    bot.lookAt(pos)
}

function moveWithNearestPlayer (bot) {
    bot.loadPlugin(pathfinder)
    const player = bot.players['clayboiparti_']
    if (!player) {
        bot.chat("No player found")
        return
    }
    bot.chat("following player...")

    const mcData = require('minecraft-data')(bot.version)
    const movements = new Movements(bot, mcData)
    bot.pathfinder.setMovements(movements)

    const goal = new GoalFollow(player.entity)
    bot.pathfinder.setGoal(goal, true)
}