import { useState } from 'react';

export default function InputBox({ onSend }) {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        onSend(input);
        setInput('');
    };
    
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    }

    return (
    <textarea 
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={handleKeyDown}
    placeholder='Send a message...'
    className="input-box"/>
  );
}