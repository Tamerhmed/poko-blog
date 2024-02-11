import "./update-profile-modal.css";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall";

const UpdateProfileModal = ({ profile, setUpdateProfile }) => {

  const [username, setUsername] = useState(profile?.username);
  const [bio, setBio] = useState(profile?.bio);
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = { username, bio };
    if (password.trim() !== "") {
      updatedUser.password = password;
    }

    dispatch(updateProfile(profile?._id,updatedUser));
    setUpdateProfile(false);
  };

  return (
    <div className="update-profile">
      <ToastContainer theme="colored" />
      <form onSubmit={formSubmitHandler} className="update-profile-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateProfile(false)}
            className="bi bi-x-circle-fill update-profile-form-close"
          ></i>
        </abbr>
        <h1 className="update-profile-title">Update Your Profile</h1>
        <input
          value={username}
          type="text"
          className="update-profile-input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          value={bio}
          type="text"
          className="update-profile-input"
          placeholder="Bio"
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          value={password}
          type="password"
          className="update-profile-input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="update-profile-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
