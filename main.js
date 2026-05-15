bot.on("message", (msg) => {
    if (msg.content == "Hello") {
        msg.reply("Hello, World!");
    }
});