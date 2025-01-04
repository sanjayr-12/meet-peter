import { create } from "zustand";
import { User } from "./types";
import { State } from "./types";

const useStore = create((set) => ({
  render: 0,
  token: null,
  user: null,
  currentMessage: "",
  api_url: "https://meet-peter-backend.onrender.com",
  loading: false,
  setUser: (newUser: User) => set({ user: newUser }),
  setToken: (newToken: string) => set({ token: newToken }),
  setRender: () => set((state: State) => ({ render: state.render + 1 })),
  setCurrentMessage: (newMessage: string) =>
    set({ currentMessage: newMessage }),
  setLoading: (bool: boolean) => set({ loading: bool }),
}));

export default useStore;
