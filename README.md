Slack Bot App

Description:
This is a simple Slack bot app that can respond to commands and provide information based on user input. The bot is built using the @slack/bolt library and is capable of responding to the following commands:

- /hello: The bot replies with a greeting message like "Hello there!"
- /help: The bot displays a list of available commands and their usage instructions.
- /time: The bot provides the current date and time.
- /weather: The bot provides the weather of given city
- /joke:  The bot provides random joke
- /greet: The bot provides greeting message with the given user name
- /quote:  The bot provides random quote

Additionally, the bot has a message-based functionality that responds with "hello!" when a message containing "hey" is received.

Requirements:
- Node.js (version 12 or higher)
- NPM (Node Package Manager) or Yarn
- Slack workspace with admin access to install the bot

Installation:

1. Clone the repository to your local machine:
   git clone https://github.com/Avinash416/slack-bot-app.git
   cd slack-bot-app

2. Install the required dependencies:
   npm install
   # or
   yarn install

Configuration:

1. Create a new Slack app:
   - Go to the Slack API website: https://api.slack.com/apps
   - Click on the "Create New App" button and follow the prompts to create a new Slack app.

2. Configure App Settings:
   - Once the app is created, navigate to the app settings page.

3. Add Scopes (Permissions):
   - In the app settings, go to "OAuth & Permissions" in the left-hand sidebar.
   - Under the "Scopes" section, add the following scopes:
     - chat:write
     - commands
     - app_mentions:read
     - incoming-webhook
     - chat:write.public
     - im:write

4. Install the App in Your Workspace:
   - After adding the scopes, scroll up to the top of the "OAuth & Permissions" page.
   - Under the "Install to Workspace" section, click on the "Install App to Workspace" button.
   - You will be redirected to Slack's authorization page where you can authorize the app to access your workspace.
   - Review the requested permissions and click "Allow" to install the app in your workspace.

5. Set Environment Variables:
   - Create a .env file in the root directory of the project.
   - In the .env file, add the following environment variables with the values from your Slack app:
     SLACK_BOT_TOKEN=your_slack_bot_token
     SLACK_SIGNIN_SECRET=your_slack_signing_secret
     SOCKET_TOKEN=your_socket_token
     YOUR_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key

6. Start the Bot:
   - Run the bot using the following command:
     npm run start
     # or
     yarn run start

7. Test the Bot:
   - Invite the bot to a channel or direct message and try the following commands:
     - /hello
     - /help
     - /time
     - /greet
     - /weather
     - /quote
     - Type "hey" to trigger the message-based response.
     - 
Deployment:

- You can deploy the bot to a hosting service or cloud platform of your choice (e.g., Heroku, AWS, etc.).
- Make sure to set the environment variables in your hosting environment for the bot to work correctly.

Using ngrok for Local Development and Testing:

- Ngrok allows you to create a secure tunnel to your local development environment, making it accessible from the internet.
- Download and install Ngrok on your machine.
- After starting your bot locally using npm start or yarn start, open a new terminal window and run the following command to create a tunnel:
ngrok http 3000
- Ngrok will provide a public URL (e.g., https://abcdefg.ngrok.io). Use this URL as the request URL when configuring your Slack app's "Interactivity & Shortcuts" settings.
- Now, your locally running bot will be accessible via the Ngrok URL, and you can test your bot in your Slack workspace.

Troubleshooting:
If you encounter any issues or errors while setting up or using the bot, refer to the Troubleshooting Guide for common solutions.

