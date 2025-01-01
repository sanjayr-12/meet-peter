export const selfRequest = async () => {
  return res.status(200).json({ message: "Server restarted" });
};
