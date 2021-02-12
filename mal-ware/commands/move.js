
module.exports = {
    name: 'move',
    description: 'move user',
    execute(message, args) {
        args[0].edit({channel: message.guild.channels.cache.find(channel => channel.id === args[1])});
    }
}