export type User = {
  email: string;
  name: string;
  picture: string;
};

export type State = {
  render: number;
  token: string;
  currentMessage: string;
  api_url: string;
  loading: boolean;
  setUser(): void;
  setToken(): void;
  setRender(): void;
  setCurrentMessage(): void;
  setLoading(): void;
};
