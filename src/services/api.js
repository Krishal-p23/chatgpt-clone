const API_URL = "https://api.openai.com/v1/chat/completions";

export async function getAIResponse(messages) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages.map((m) => ({
                    role: m.role,
                    content: m.content,
                })),
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch AI response");
        }
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error(error);
        throw error;
    }
}