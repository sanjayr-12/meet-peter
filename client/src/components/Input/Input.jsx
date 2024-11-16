import "./input.css"

export const Input = () => {
  return (
    <div className="input-main-container">
      <form className="form-container">
        <input type="text" name="input" />
        <input type="submit" value="send"/>
      </form>
    </div>
  );
};
