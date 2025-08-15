import "../assets/styles/ChatList.scss";
import ChatListItem from "./ChatListItem";
import ChatListSkeletonItem from "./ChatListSkeletonItem";
import standartProfilePic from "../assets/images/standartProfilePic.png";
import { useState, useEffect } from "react";
import UseChatListStore from "../store/ChatListStore";

const ChatList = () => {
  const [chatFilter, setChatFilter] = useState("all");
  const [searchString, setSearchString] = useState("");
  const {
    getAllChatLists,
    getActiveChatLists,
    chatUsers,
    activeChatUsers,
    filteredChatUsers,
    isLoading,
  } = UseChatListStore();
  useEffect(() => {
    setTimeout(() => {
      getAllChatLists();
      getActiveChatLists();
    }, 500);
  }, []);
  useEffect(() => {
    UseChatListStore.setState({
      filteredChatUsers: chatUsers.filter((user) =>
        user.fullName.toLowerCase().includes(searchString.toLowerCase())
      ),
    });
  }, [searchString, chatUsers]);

  return (
    <section className="chat-list-section">
      <form action="#" method="post">
        <div className="form-group">
          <i className="bx  bx-search"></i>
          <input
            value={searchString}
            onChange={(event) => setSearchString(event.target.value)}
            type="text"
            placeholder="Search or start new chat"
          />
        </div>
      </form>
      <div className="chat-list">
        <div className="button-group">
          <button
            onClick={() => setChatFilter("all")}
            className={chatFilter === "all" ? "button-active" : ""}
            type="button"
          >
            All chats
          </button>

          <button
            onClick={() => setChatFilter("private")}
            className={chatFilter === "private" ? "button-active" : ""}
            type="button"
          >
            Private
          </button>
        </div>
        <ul>
          {isLoading ? (
            Array(12)
              .fill(0)
              .map((_, idx) => <ChatListSkeletonItem key={idx} />)
          ) : searchString.trim().length > 0 ? (
            filteredChatUsers.length === 0 ? (
              <div className="chat-empty">
                <h4>No users found</h4>
                <p>Try a different name.</p>
                <i className="bxr bx-message-x"></i>
              </div>
            ) : (
              filteredChatUsers.map((item, idx) => (
                <ChatListItem
                  key={item.email || idx}
                  fullName={item.fullName}
                  message="Send me some kind of message."
                  time=""
                  profilePic={
                    item.profilePic.length === 0
                      ? standartProfilePic
                      : item.profilePic
                  }
                />
              ))
            )
          ) : activeChatUsers.length === 0 ? (
            <div className="chat-empty">
              <h4>No active chats</h4>
              <p>You currently have no active chat rooms.</p>
              <i className="bxr bx-message-x"></i>
            </div>
          ) : (
            activeChatUsers.map((item, idx) => (
              <ChatListItem
                key={item.email || idx}
                fullName={item.fullName}
                message="Test message"
                time="8:21pm"
                profilePic={
                  item.profilePic.length === 0
                    ? standartProfilePic
                    : item.profilePic
                }
              />
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default ChatList;
