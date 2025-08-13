import userImage from "../assets/images/UserImage.png";
interface ChatListItemProps {
  fullName: string;
  message: string;
  time: string;
  userImage: string;
}
const ChatListItem: React.FC<ChatListItemProps> = ({
  fullName,
  message,
  time,
  userImage,
}) => {
  return (
    <li className="chat-list-item">
      <div className="list-item-img">
        <img src={userImage} alt="" />
        <div className="isOnline"></div>
      </div>

      <div className="item-info">
        <header>
          <h4>{fullName}</h4> <time dateTime="2025-07-09T20:30">{time}</time>
        </header>
        <div className="item-info-message">
          {`${message.slice(0, 30)} ${message.length > 30 ? "..." : ""}`}
        </div>
      </div>
    </li>
  );
};

export default ChatListItem;
