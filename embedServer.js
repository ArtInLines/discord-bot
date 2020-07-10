new Discord.RichEmbed()
            .setTitle('Server Information', message.guild.name, message.guild.iconURL)
            .addField('Members', message.guild.memberCount)
            .addField('Server Owner', message.guild.owner, true)
            .addField('Owner ID', message.guild.ownerID)
            .addField('Server Location', message.guild.region)
            .addField('Roles', message.guild.roles)
            .setThumbnail(message.guild.iconURL)
            .setColor(0xD32105);