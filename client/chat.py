import ollama

def chat_with_llama3():
    print("************************")
    print("Welcome to llama3 chatbot")
    print("Enter 'exit' to leave the chat")
    print("************************",end="")
    while True:
        user_input = input("\nYou: ")
        if user_input.lower() == 'exit':
            print("Ending chat. Goodbye!")
            break
        
        llama_response = send_to_llama3(create_input_text(user_input))
        print("Llama-3: " + llama_response)

def send_to_llama3(user_input):
    llama_response = ollama.chat(
    model="llama3",
    messages=[
        {
            "role": "user",
            "content": user_input,
        },
    ],
    )
  
    return llama_response["message"]["content"]

def create_input_text(user_text: str) -> str:
    template = (
        "user input"
    )
    return template.format(user_text)

# Start the chat
chat_with_llama3()

 