import { create } from "zustand"

const useStore = create((set) => ({
    render: 0,
    user: null,
    setUser: (newUser) => set({ user: newUser })
}))

export default useStore