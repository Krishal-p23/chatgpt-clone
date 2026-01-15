import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import InputBox from './components/InputBox'
import { getAIResponse } from './services/api'

function App() {
  const [conversations, setConversations] = useState([]);
  const [activeID, setActiveID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNewChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
      createdAt: new Date()
    };
    setConversations((prev) => [newChat, ...prev]);
    setActiveID(newChat.id);
  }

  const deleteChat = (chatId) => {
    setConversations((prev) => {
      const filtered = prev.filter(c => c.id !== chatId);

      if (chatId === activeID) {
        if (filtered.length > 0) {
          setActiveID(filtered[0].id);
        } else {
          const defaultChat = {
            id: crypto.randomUUID(),
            title: "New Chat",
            messages: [],
            createdAt: new Date()
          };
          setActiveID(defaultChat.id);
          return [defaultChat];
        }
      }
      return filtered;
    });
  }

  useEffect(() => {
    const stored = localStorage.getItem("chat_conversations");

    if (stored) {
      const parsed = JSON.parse(stored);

      if (parsed.length > 0) {
        setConversations(parsed);
        setActiveID(parsed[0].id);
        return;
      }
    }

    const defaultChat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
      createdAt: new Date()
    };

    setConversations([defaultChat]);
    setActiveID(defaultChat.id);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "chat_conversations",
      JSON.stringify(conversations)
    );
  }, [conversations]);

  const activeConversation = conversations?.find(c => c.id === activeID);
  const messages = activeConversation?.messages || [];

  const sendMessage = async (text) => {
    if (!activeConversation) {
      console.warn("No active conversation. Creating one.");
      createNewChat();
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setConversations(prev =>
      prev.map(chat =>
        chat.id === activeID
          ? {
            ...chat,
            title:
              chat.messages.length === 0
                ? text.slice(0, 30)
                : chat.title,
            messages: [...chat.messages, userMessage],
          }
          : chat
      )
    );


    setLoading(true);
    setError(null);

    try {
      const response = await getAIResponse([...activeConversation.messages, userMessage]);

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setConversations(prev =>
        prev.map(chat =>
          chat.id === activeID
            ? {
              ...chat,
              messages: [...chat.messages, assistantMessage]
            }
            : chat
        ));
    } catch (err) {
      console.error("AI ERROR:", err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        conversations={conversations}
        activeId={activeID}
        onSelect={setActiveID}
        onNewChat={createNewChat}
        onDelete={deleteChat} />

      <div className="main-content">
        <ChatWindow messages={messages} loading={loading} />
        {error && <div className="error">{error}</div>}
        <InputBox onSend={sendMessage} loading={loading} />
      </div>
    </div>
  );
}

export default App
