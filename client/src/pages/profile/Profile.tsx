import useStore from "../../store/zustand";

const Profile = () => {
  const user = useStore((state) => state.user);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-center text-xl">Update Profile</h1>
      <form className="flex flex-col gap-9">
        <label className="input input-bordered flex items-center gap-2 p-6">
          Image Url
          <input
            type="text"
            className="grow"
            placeholder="https://some.com/chicken.png"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input type="text" className="grow" placeholder={user?.name} />
              </label>
              <input type="submit" className="btn btn-ghost" value="Update"/>
      </form>
    </div>
  );
};

export default Profile;
