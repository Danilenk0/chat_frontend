import "../assets/styles/Home.scss";
import ChatList from "../components/ChatList";
import Chat from "../components/Chat";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseAuthStore from "../store/AuthStore";

const Home = () => {
  const navigate = useNavigate();
  const { checkAuth, user } = UseAuthStore();
  useEffect(() => {
    const fetchData = async () => {
      await checkAuth();
      if (user === null) {
        navigate("/signin");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="wrapper">
      <ChatList />
      <Chat />
    </div>
  );
};

export default Home;
