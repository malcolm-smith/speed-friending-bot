module.exports = {
    name: 'dist',
    description: 'distribute',
    execute(message, args) {

        // small program that moves every person in one voice channel to another voice channel
        
        // get collection<Snowflake, GuildMember> of members connected to a voice channel
        let lobby = message.guild.channels.cache.find(channel => channel.id === "749781303041196092").members;

        lobby.members.forEach(element => {
            // edit which voice channel the member is connected to, parameter is the actual voice channel object
            member.edit({channel: guild.channels.cache.find(channel => channel.id === "753736278289285120")});
        });
    }
}
