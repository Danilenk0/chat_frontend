import "../assets/styles/Home.scss";
import ChatList from "../components/ChatList";
import Chat from "../components/Chat";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseAuthStore from "../store/AuthStore";

const Home = () => {
  const navigate = useNavigate();
  const { checkAuth, isLoggedIn, isLoading } = UseAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      await checkAuth();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      navigate("/signin");
    }
  }, [isLoggedIn, isLoading, navigate]);

  return (
    <div className="wrapper">
      <ChatList />
      <Chat />
    </div>
  );
};

export default Home;
