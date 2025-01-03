// eslint-disable-next-line react/prop-types
const ChatProfile = ({ img }) => {
  const handleError = () => {
    console.error("Image failed to load:", img);
  };

  return (
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img alt="Chat avatar" src={img} onError={handleError} />
      </div>
    </div>
  );
};

export default ChatProfile;
