const axios =require("axios")

// Command handlers
const commandHandlers = {
    hello: async ({ command, ack, say }) => {
        console.log("in hello", command)
        await ack();
        await say('Hello there!');
    },
    help: async ({ command, ack, say }) => {
        await ack();
        const helpMessage = `Available commands:\n` +
            `• /hello - Get a greeting message\n` +
            `• /time - Get the current date and time\n` +
            `• /weather - Get the weather of given city\n` +
            `• /joke - Gives a random joke\n` +
            `• /greet - Greeting with the given name\n` +
            `• /quote - Gives a random quote\n` +
            `• /help - Show this help message`;
        await say(helpMessage);
    },
    time: async ({ command, ack, say }) => {
        await ack();
        const currentDate = new Date().toLocaleString();
        await say(`The current date and time is: ${currentDate}`);
    },

    weather: async ({ command, ack, say }) => {
        await ack();
        // Extract the location from the command text (e.g., "/weather New York")
        const location = await command.text.trim();
        if (!location) {
            await say('Please provide a valid location. Example: `/weather Pune`.');
            return;
        }
        try {
            // Make a request to the weather API to get the weather information for the specified location
            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}`
            );

            // Extract relevant weather data from the API response
            const weatherData = weatherResponse.data;
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;

             // Create interactive buttons for unit selection
      const buttons = [
        {
          text: 'Celsius',
          type: 'button',
          value: 'celsius',
        },
        {
          text: 'Fahrenheit',
          type: 'button',
          value: 'fahrenheit',
        },
      ];

      // Send the weather information as the bot's response with the interactive buttons
      await say({
        text: `Weather in ${location}: ${description}, Temperature: ${temperature}°C`,
        attachments: [
          {
            text: 'Select the unit:',
            fallback: 'You are unable to choose a unit',
            callback_id: 'weather_unit_selection',
            color: '#3AA3E3',
            attachment_type: "default",
            actions: buttons,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
      await say('Sorry, something went wrong while fetching weather information.');
    }
  
    },

    joke: async ({ command, ack, say }) => {
        await ack();
        console.log("in joke", command)
        try {
            // Make a request to a joke API to get a random joke
            const jokeResponse = await axios.get('https://official-joke-api.appspot.com/random_joke');

            // Extract the joke from the API response
            const joke = jokeResponse.data;
            const setup = joke.setup;
            const punchline = joke.punchline;

            // Send the joke as the bot's response
            await say(`${setup}\n${punchline}`);
        } catch (error) {
            console.error('Error fetching joke:', error);
            await say('Oops! I couldn\'t fetch a joke right now.');
        }
    },
    greet: async ({ command, ack, say }) => {
        // Acknowledge the command request
        await ack();
    
        // Get the user's name from the command text (e.g., /greet John)
        const name = command.text.trim();
    
        // Check if the name is provided
        if (!name) {
          await say('Please provide a name. Example: `/greet John`.');
          return;
        }
    
        // Respond with a personalized greeting
        await say(`Hello, ${name}! Welcome to the Slack bot!`);
      },
      quote: async ({ command, ack, say }) => {
        // Acknowledge the command request
        await ack();
    
        try {
          // Make a request to the quote API to get a random quote
          const quoteResponse = await axios.get('https://zenquotes.io/api/random');
     
          // Extract the quote text from the API response
          const quoteText = await quoteResponse.data[0];
    
          // Respond with the quote
          await say(quoteText.q);
        } catch (error) {
          console.error('Error fetching quote:', error);
          await say('Oops! Something went wrong while fetching the quote.');
        }
      },
};
module.exports =commandHandlers;