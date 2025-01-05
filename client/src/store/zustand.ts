import { create } from "zustand";
import { User, State } from "./types";

const useStore = create<State>((set) => ({
  render: 0,
  token: null,
  user: null,
  currentMessage: "",
  api_url: "https://meet-peter-backend.onrender.com",
  loading: false,
  setUser: (newUser: User | null) => set({ user: newUser }),
  setToken: (newToken: string | null) => set({ token: newToken }),
  setRender: () => set((state) => ({ render: state.render + 1 })),
  setCurrentMessage: (newMessage: string) =>
    set({ currentMessage: newMessage }),
  setLoading: (bool: boolean) => set({ loading: bool }),
}));

export default useStore;
