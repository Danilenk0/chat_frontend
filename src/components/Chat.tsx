import "../assets/styles/Chat.scss";
import UserImage from "../assets/images/UserImage.png";

const Chat = () => {
  return (
    <section className="chat-wrap">
      <header className="chat-header">
        <div className="user">
          <div className="image">
            <img src={UserImage} alt="user image" />
          </div>
          <div className="user-info">
            <h6>Mihail Danilenko</h6>
            <div className="user-status"><div className="status"></div><p>Offline</p></div>
          </div>
        </div>
        <div className="header-btn-control">
          <button>
            <i className="bxr  bx-video"></i>{" "}
          </button>
          <button>
            <i className="bxr  bx-phone-ring"></i>{" "}
          </button>
          <button>
            <i className="bxr  bx-dots-horizontal-rounded"></i>{" "}
          </button>
        </div>
      </header>
      <main className="chat-main"></main>
    </section>
  );
};

export default Chat;
