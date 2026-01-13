import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import InputBox from './components/InputBox'

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = (text) => {
    const newMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, newMessage]);
    
    setTimeout(() => {setMessages((prev) => [...prev, 
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Dummy response to: "${text}"`,
        timestamp: new Date()
      }]);
  }, 800)};

return (
  <div className="app-container">
    <Sidebar />
    <div className="main-content">
      <ChatWindow messages={messages}/>
      <InputBox onSend={sendMessage}/>
    </div>
  </div>
);
}

export default App
