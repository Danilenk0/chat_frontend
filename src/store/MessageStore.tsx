import { create } from "zustand";
type Message = {
  type: "success" | "warning" | "error";
  text: string;
};
interface MessageState {
  message: Message;
  setMessage: (type: "success" | "warning" | "error", text: string) => void;
  clearMessage: () => void;
}

const UseMessageStore = create<MessageState>((set) => ({
  message: {
    type: "success",
    text: "",
  },
  setMessage: (type, text) => {
    set({
      message: {
        type,
        text,
      },
    });
  },
  clearMessage: () => {
    set({
      message: {
        type: "success",
        text: "",
      },
    });
  },
}));

export default UseMessageStore;
