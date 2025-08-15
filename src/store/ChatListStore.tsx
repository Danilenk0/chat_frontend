import axios, { AxiosError } from "axios";
import { create } from "zustand";
import UseMessageStore from "./MessageStore";

type User = {
  fullName: string;
  email: string;
  profilePic: string;
};

interface ChatListState {
  chatUsers: User[];
  activeChatUsers: User[];
  filteredChatUsers: User[];
  isLoading: boolean;
  getAllChatLists: () => void;
  getActiveChatLists: () => void;
}

const UseChatListStore = create<ChatListState>((set) => ({
  chatUsers: [],
  activeChatUsers: [],
  isLoading: false,
  filteredChatUsers: [],
  getAllChatLists: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get("http://localhost:5001/api/user/users", {
        withCredentials: true,
      });
      set({
        chatUsers: response.data,
        isLoading: false,
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err?.response?.data?.message) {
        UseMessageStore.getState().setMessage(
          "error",
          err.response.data.message || "Unknown error"
        );
      } else {
        UseMessageStore.getState().setMessage(
          "error",
          err.message || "Unknown error"
        );
      }
    }
  },
  getActiveChatLists: async () => {
    try {
      set({
        isLoading: true,
      });
      const response = await axios.get(
        "http://localhost:5001/api/user/activeUsers",
        { withCredentials: true }
      );
      set({
        isLoading: false,
        activeChatUsers: response.data,
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err?.response?.data?.message) {
        UseMessageStore.getState().setMessage(
          "error",
          err.response.data.message
        );
      } else {
        UseMessageStore.getState().setMessage("error", err.message);
      }
    }
  },
}));

export default UseChatListStore;
