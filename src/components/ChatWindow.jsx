import { useEffect, useRef } from 'react';
import Message from './Message';

export default function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      {loading && (
        <div className="message assistant">
          <em>AI is typing...</em>
        </div>
      )}
      
      <div ref={bottomRef} />
    </div>
  );
}
