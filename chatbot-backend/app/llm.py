from langchain_cerebras import ChatCerebras
from .config import settings

chat = ChatCerebras(
    model="llama3.1-8b",
    api_key=settings.cerebras_api_key,
)


def create_prompt(context: str, question: str) -> str:
    print("--- context  ---", context)
    return f"""You have to answer user question with given context.  
Here is users question: {question}.
{
    f"\nHere is context to answer user's question:\n{context}\n"
    if context and context.strip()
    else ""
}
Answer the user's question based on context given if context is empty still answer question based on your knowledge."""


async def call_llm(prompt: str) -> str:
    response = await chat.ainvoke(prompt)
    return response.content
