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

//
app.action('weather_unit_selection', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();

  // Extract the selected value from the action payload
  const selectedValue = body.actions[0].value;

  // Respond based on the selected value
  if (selectedValue === 'celsius') {
    await say('You selected Celsius.');
  } else if (selectedValue === 'fahrenheit') {
    await say('You selected Fahrenheit.');
  } else {
    await say('Invalid selection.');
  }
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
app.message('hey', async ({ message, say }) => {
    console.log("Received 'hey' message from:", message.user);
    try {
      await say('hello!');
    } catch (error) {
      console.error('Error sending response:', error);
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
