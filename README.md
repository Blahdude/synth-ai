# AI Synth! Type sound requests into chat and it will automatically create your desired sounds!
### Created by Oliver Camp (Built on top of Max Haviv--React Synth)

<img width="1440" alt="Screenshot 2024-07-15 at 1 47 38 AM" src="https://github.com/user-attachments/assets/b176b028-c1d9-4cf8-8733-7e370c86118c">

This synth aims to ease the process of finding the optimal sound through AI. Describe your desired sound to the AI (ChatGPT), and it will automatically adjust the synth with parameters that match your description.

## Getting Started

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (which includes npm)
- [Git](https://git-scm.com/)

# Steps

```bash
# First, clone the repository to your local machine:

git clone git@github.com:Blahdude/synth-ai.git
cd my-project


# Navigate to the server directory and install the dependencies:
cd server
npm install

# Create a .env file in the server directory and add your environment variables (e.g., your OpenAI API key):
OPENAI_API_KEY=your_openai_api_key_here

cd ../client
npm install
```

Check out the original live synth with no AI support https://react-synth.vercel.app/home

Midi Support

USB Midi is supported! But it is a work in progress…

⚠️ Be wary using USB Midi as it can and will bug out and get VERY loud ⚠️
