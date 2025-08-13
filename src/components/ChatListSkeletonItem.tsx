const ChatListSkeletonItem = () => {
  return (
    <li className="chat-list-item skeleton">
      <div className="list-item-img skeleton-circle"></div>
      <div className="item-info">
        <header>
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-time"></div>
        </header>
        <div className="item-info-message">
          <div className="skeleton-line skeleton-text"></div>
        </div>
      </div>
    </li>
  );
};

export default ChatListSkeletonItem;
