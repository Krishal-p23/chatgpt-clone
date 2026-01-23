import { useState } from 'react';

export default function InputBox({ onSend, loading }) {
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

  const autoGrow = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <>
      <div className='input-mmask'>
        <div className="input-box">
          <textarea
            value={input}
            rows={1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            diasabled={loading}
            placeholder={loading ? "AI is responding..." : "Send a message..."}
            onInput={autoGrow} />
          <button className="send-btn" disabled={loading || !input.trim()} aria-label='Send message'>
            ➤
          </button>
        </div>
      </div>
      {/* <div>&copy ChatGPT Clone by Krishal</div> */}
    </>
  );
}