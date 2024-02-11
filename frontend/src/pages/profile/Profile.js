import "./profile.css";
import { useEffect, useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import swal from "sweetalert";
import { toast } from "react-toastify";
import {useDispatch, useSelector} from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { deleteProfile, getUserProfile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCall";
import PostItem from "../../components/posts/PostItem";
import {Oval} from 'react-loader-spinner';
import { logoutUser } from "../../redux/apiCalls/authApiCalls";


const Profile = () => {

  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);

const dispatch = useDispatch();
const navigate = useNavigate();
const {id} = useParams();
const {profile, loading, isProfileDeleted} = useSelector(state => state.profile);
const {user} = useSelector(state => state.auth);

console.log(user?._id);

  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [dispatch,id]);

  useEffect(()=> {
    if(isProfileDeleted) {
          navigate('/')
    }
  }, [navigate, isProfileDeleted]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(!file) return toast.warning("there is no file!");

    const formData = new FormData();
    formData.append('image', file);

    dispatch(uploadProfilePhoto(formData));
  }

  // Delete Account Handler
  const deleteAccountHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(userId));
        dispatch(logoutUser());
      } 
    });
  }

  if(loading){

    return (
      <div className="profile-loader">
          <Oval
            height={120}
            width={120}
            color="#000"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="grey"
            strokeWidth={3}
            strokeWidthSecondary={3}
        />
      </div>
    )
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img src={file ? URL.createObjectURL(file) : profile?.profilePhoto?.url} alt="user profile" className="profile-image" />
          {
            user?._id === profile?._id && (
                <form onSubmit={formSubmitHandler}>
                <abbr title="choose profile photo">
                  <label
                    htmlFor="file"
                    className="bi bi-camera-fill upload-profile-photo-icon"
                  ></label>
                </abbr>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={e => setFile(e.target.files[0])}
                  />
                  <button type="submit" className="upload-profile-photo-btn">upload</button>
                </form>
            )
          }
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">
          {profile?.bio}
        </p>
        <div className="user-date-joined">
          <span className="span-1">Date Joined: </span>
          <span className="span-2">{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        {
          user?._id === profile?._id && (
          <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
            <i className="bi bi-file-person-fill"></i>
            Update Profile
          </button>

          )
        }
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
       {
        profile?.posts?.map( post => {
          return <PostItem
           key={post.id}
            post={post}
            username={profile?.username}
            userId={profile?._id}
            />
        })
       }
      </div>
      {
        user?._id === profile?._id &&
         (
          <button onClick={()=> deleteAccountHandler(user?._id)} className="delete-account-btn">
            Delete Your Account
          </button>
        )
      }
      {updateProfile && <UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile} />}
    </section>
  );
};

export default Profile;
