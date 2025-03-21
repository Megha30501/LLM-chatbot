# import requests
# import json
# import os
# from dotenv import load_dotenv

# load_dotenv()
# DEEPSEEK_API_KEY = os.getenv('DEEPSEEK_API_KEY')

# # Function to call the LLM API
# def call_llm_api(user_message):
#     url = "https://openrouter.ai/api/v1/chat/completions"
#     headers = {
#         "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
#         "Content-Type": "application/json"
#     }
#     payload = {
#         "model": "deepseek/deepseek-r1-zero:free",
#         "messages": [{"role": "user", "content": user_message}]
#     }

#     try:
#         response = requests.post(url, data=json.dumps(payload), headers=headers, timeout=30)
#         response.raise_for_status()  # Will raise an exception for 4xx or 5xx status codes

#         # If the request is successful, return the message content
#         return response.json()["choices"][0]["message"]["content"]
    
#     except requests.exceptions.Timeout:
#         raise Exception("Request to the API timed out.")
#     except requests.exceptions.RequestException as e:
#         raise Exception(f"Error calling the API: {str(e)}")
#     except KeyError as e:
#         raise Exception(f"Invalid response structure: missing expected keys.")
#     except Exception as e:
#         raise Exception(f"An error occurred: {str(e)}")


from openai import OpenAI

client = OpenAI(api_key="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", base_url="https://openrouter.ai/api/v1/")

chat = client.chat.completions.create(
    model="deepseek/deepseek-r1:free",
    messages=[
      {
        "role": "user",
        "content": "Hello"
      }
    ]
)

print(chat)