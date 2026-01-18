import { useRef, useState, useEffect } from "react";

export default function Sidebar({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  onDelete,
  isCollapsed,
  onToggle,
}) {
  const sidebarContentRef = useRef(null);
  const [showHeaderBorder, setShowHeaderBorder] = useState(false);
  const [showFooterBorder, setShowFooterBorder] = useState(false);

  const handleScroll = () => {
    const el = sidebarContentRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;

    const isScrollable = scrollHeight > clientHeight;
    const isAtTop = scrollTop === 0;
    const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    setShowHeaderBorder(isScrollable && !isAtTop);
    setShowFooterBorder(isScrollable && !isAtBottom);
  };

  useEffect(() => {
    requestAnimationFrame(handleScroll);
  }, [conversations, isCollapsed]);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className={`sidebar-header-row ${showHeaderBorder ? "scrolled" : ""}`}>
        <span className="sidebar-header">GPT</span>
        <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          ☰
        </button>
      </div>
      <div className="sidebar-contents" ref={sidebarContentRef} onScroll={handleScroll}>
        <button className="new-chat-btn" onClick={onNewChat}>
          <span className="new-chat-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 5.5C4 4.12 5.12 3 6.5 3H17.5C18.88 3 20 4.12 20 5.5V14.5C20 15.88 18.88 17 17.5 17H9L5 21V17H6.5C5.12 17 4 15.88 4 14.5V5.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M12 7.5V12.5M9.5 10H14.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="new-chat-label">New Chat</span >
        </button>

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
              🗑
            </button>
          </div>
        ))}
      </div>
      <div className={`sidebar-footer ${showFooterBorder ? "scrolled" : ""}`}>
        <div className="user-chip">
          <div className="user-avatar">U</div>
          <div className="user-info">
            <span className="user-name">User</span>
            <span className="user-plan">Free</span>
          </div>

        </div>
        <div className="user-menu">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="user-menu-icon"
          >
            <circle cx="12" cy="5" r="2" fill="currentColor" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <circle cx="12" cy="19" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
}
