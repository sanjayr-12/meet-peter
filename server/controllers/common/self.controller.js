export const selfRequest = async (req,res) => {
  return res.status(200).json({ message: "Server restarted" });
};
