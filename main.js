bot.on(Event.MESSAGE, (msg) => {
    if (msg.content == "Hello") {
        msg.reply("Hello, World!");
    }
});
