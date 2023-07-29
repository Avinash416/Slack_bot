const { App, LogLevel } = require('@slack/bolt');
const axios = require('axios');
const dotenv = require("dotenv")
const commandHandlers =require("./commandHandlers.js")


dotenv.config()

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNIN_SECRET,
    // socketMode: true, // enable the following to use socket mode
    // appToken: process.env.SOCKET_TOKEN,
    // logLevel: LogLevel.DEBUG // Set to LogLevel.INFO in production for fewer logs
});


// Handle incoming commands
app.command('/hello', commandHandlers.hello);
app.command('/help', commandHandlers.help);
app.command('/time', commandHandlers.time);
app.command('/weather', commandHandlers.weather);
app.command('/joke', commandHandlers.joke);
app.command('/greet', commandHandlers.greet); 
app.command('/quote', commandHandlers.quote);

//add a message
app.event('app_mention', async ({ event, say }) => {
    try {
      console.log(event);
      await say('hello!');
    } catch (error) {
      console.log('err');
      console.error(error);
    }
  });

// Handle errors
app.error((error) => {
    console.error('Slack bot error:', error);
});

(async () => {
    // Start the bot
    const port = process.env.PORT || 3000;
   await app.start(port);
   
    console.log('Slack bot is running!');
})();
