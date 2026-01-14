export default function Sidebar({ conversations, activeId, onSelect, onNewChat }) {
  return (
    <div className="sidebar">
      <button className="new-chat-btn" onClick={onNewChat}>
        + New Chat
      </button>

      {conversations.length === 0 && (
        <div className="empty-sidebar">No chats yet</div>
      )}

      {conversations.map(chat => (
        <div
          key={chat.id}
          className={`chat-item ${chat.id === activeId ? "active" : ""}`}
          onClick={() => onSelect(chat.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onSelect(chat.id)}
        >
          {chat.title.length > 30
            ? chat.title.slice(0, 30) + "…"
            : chat.title}
        </div>
      ))}
    </div>
  );
}
