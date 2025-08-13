import "../assets/styles/ChatList.scss";
import ChatListItem from "./ChatListItem";
import ChatListSkeletonItem from "./ChatListSkeletonItem";
import UserImage from "../assets/images/UserImage.png";
import UserImage1 from "../assets/images/UserImage1.png";
import UserImage2 from "../assets/images/UserImage2.png";
import UserImage3 from "../assets/images/UserImage3.png";
import UserImage4 from "../assets/images/UserImage4.png";
import UserImage5 from "../assets/images/UserImage5.png";
import { useState } from "react";

const chatListData = [
  {
    fullName: "Mihail",
    message: "Adipiscing libero.",
    time: "2:11am",
    userImage: UserImage,
  },
  {
    fullName: "Alexini Penisini",
    message: "Nisi justo mauris hac dictum. Et pulvinar ornare integer ",
    time: "5:53am",
    userImage: UserImage1,
  },
  {
    fullName: "Masturbini",
    message: "Arcu eleifend dapibus adipiscing dapibus. ",
    time: "8:21pm",
    userImage: UserImage2,
  },
  {
    fullName: "Pososini Podrochini",
    message: "Non.",
    time: "2:00am",
    userImage: UserImage3,
  },
  {
    fullName: "Chocolate",
    message: "Dapibus id.",
    time: "4:42am",
    userImage: UserImage4,
  },
  {
    fullName: "BlackWolf",
    message: "Tempus.",
    time: "1:19pm",
    userImage: UserImage5,
  },
];
const ChatList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chatFilter, setChatFilter] = useState("all");
  return (
    <section className="chat-list-section">
      <form action="#" method="post">
        <div className="form-group">
          <i className="bx  bx-search"></i>
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </form>
      <div className="chat-list">
        <div className="button-group">
          <button
          onClick={()=>setChatFilter("all")}
            className={chatFilter === "all" ? "button-active" : ""}
            type="button"
          >
            All chats
          </button>

          <button
          onClick={()=>setChatFilter("private")}
            className={chatFilter === "private" ? "button-active" : ""}
            type="button"
          >
            Private
          </button>
        </div>
        <ul>
          {isLoading
            ? Array(12)
                .fill(0)
                .map((_, idx) => <ChatListSkeletonItem key={idx} />)
            : chatListData.map((item, idx) => (
                <ChatListItem
                  key={idx}
                  fullName={item.fullName}
                  message={item.message}
                  time={item.time}
                  userImage={item.userImage}
                />
              ))}
        </ul>
      </div>
    </section>
  );
};

export default ChatList;
