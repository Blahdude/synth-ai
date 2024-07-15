import asyncio
from ollama import AsyncClient

async def chat(user_input):
    """
    Streaming a chat from Llama using the AsyncClient.
    """
    message = {
        "role": "user",
        "content": user_input
    }
    async for part in await AsyncClient().chat(
        model="llama3", messages=[message], stream=True
    ):
        print(part["message"]["content"], end="", flush=True)


async def main():
    print("************************")
    print("Welcome to llama3 chatbot")
    print("Enter 'exit' to leave the chat")
    print("************************",end="")
    while True:
        print("\n")
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            print("Chat ended. Goodbye!")
            break
        await chat(user_input)
        await asyncio.sleep(0.1)  # Small sleep to prevent blocking

# Run the main function
asyncio.run(main())
