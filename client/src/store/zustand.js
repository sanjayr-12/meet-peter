import { create } from "zustand";

const useStore = create((set) => ({
  render: 0,
  token: null,
  user: null,
  currentMessage: "",
  api_url:"https://meet-peter-backend.onrender.com",
  loading: false,
  setUser: (newUser) => set({ user: newUser }),
  setToken: (newToken) => set({ token: newToken }),
  setRender: () => set((state) => ({ render: state.render + 1 })),
  setCurrentMessage: (newMessage) => set({ currentMessage: newMessage }),
  setLoading: (bool) => set({ loading: bool }),
}));

export default useStore;
