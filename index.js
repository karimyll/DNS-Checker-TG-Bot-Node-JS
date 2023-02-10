const {Telegraf,Markup,Input} = require("telegraf");

const Bot = new Telegraf(process.env.BOT_TOKEN, {
    handlerTimeout: 2000,
});


Bot.start((ctx) => {
    ctx.reply("DNS axtarış botuna xoş gəlmisiniz. \n Botu istifadə etmək üçün /dns yazın.");
});

Bot.command('dns', (ctx) => {
    ctx.reply("Axtarış etmək istədiyiniz domen adını daxil edin.");
    Bot.on('text', (ctx) => {
        const domain = ctx.message.text;
        ctx.reply("Göndərilir...")
        const apiUrl = "https://api.api-ninjas.com/v1/dnslookup?domain=" + domain;
        const headers = {
            "X-Api-Key": process.env.X_API_KEY
        };
        fetch(apiUrl, {
            method: 'GET',
            headers: headers
        }).then(response => response.json())
            .then(data => {
                ctx.reply(JSON.stringify(data));
            })
            .catch(err => {
                console.log(err);
            });
    });
    
});

Bot.hears(/salam/i, (ctx) =>{
    ctx.reply("Salam, necəsən?")
})

Bot.hears(/necəsən/i, (ctx) =>{
    ctx.reply("Məndə yaxşıyam!")
})


Bot.launch();