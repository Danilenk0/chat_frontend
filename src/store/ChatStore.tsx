import { create } from 'zustand'
type ActiveView = "chatList" | 'chat' | "userProfile"

interface chatState {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const UseChatStore = create<chatState>((set) => ({
  activeView: "chatList",
  chatListData:null,
    setActiveView: (view) => {
        set({
          activeView:view
      })
  },
}));

export default UseChatStore;