const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function getAIResponse(messages) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

    const text = await response.text();
    console.log("STATUS:", response.status);
    console.log("RESPONSE:", text);

  if (!response.ok) {
    throw new Error("Groq API failed");
  }

  const data = JSON.parse(text);
  return data.choices[0].message.content;
}
