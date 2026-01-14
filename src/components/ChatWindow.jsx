import { useEffect, useRef } from 'react';
import Message from './Message';

export default function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="chat-window">
      <div className="chat-container">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            message={msg} />
        ))}

        {loading && (
          <div className="message assistant">
            <div className='bubble'>
              <em>AI is typing...</em>
            </div>
          </div>
        )}
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
