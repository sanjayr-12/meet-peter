import { create } from "zustand";

const useStore = create((set) => ({
  render: 0,
  token: null,
  user: null,
  setUser: (newUser) => set({ user: newUser }),
  setToken: (newToken) => set({ token: newToken }),
  setRender: () => set((state) => ({ render: state.render + 1 })),
}));

export default useStore;
