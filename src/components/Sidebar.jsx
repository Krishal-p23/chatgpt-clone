export default function Sidebar({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  onDelete,
}) {
  return (
    <div className="sidebar">
      <button className="new-chat-btn" onClick={onNewChat}>
        <span className="new-chat-icon">+</span>
        <span>New Chat</span >
      </button>

      {conversations.length === 0 && (
        <div className="empty-sidebar">No chats yet</div>
      )}

      {conversations.map((chat) => (
        <div
          key={chat.id}
          className={`chat-item ${chat.id === activeId ? "active" : ""}`}
          onClick={() => onSelect(chat.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onSelect(chat.id)}
        >
          <span className="chat-title">
            {chat.title.length > 30
              ? `${chat.title.slice(0, 30)}…`
              : chat.title}
          </span>

          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(chat.id);
            }}
            aria-label="Delete chat"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
