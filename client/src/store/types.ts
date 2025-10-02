export type User = {
  email: string;
  name: string;
  picture: string;
};

export type State = {
  render: number;
  token: string | null;
  user: User | null;
  currentMessage: string;
  api_url: string;
  loading: boolean;
  setUser: (newUser: User | null) => void;
  setToken: (newToken: string | null) => void;
  setRender: () => void;
  setCurrentMessage: (newMessage: string) => void;
  setLoading: (bool: boolean) => void;
};

export type Message = {
  user: string;
  ai: string;
};

export type Chat = {
  _id: string;
  userId: string;
  messages: Message;
};
