import { profileActions } from "../slices/profileSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";

//get user profile
const getUserProfile = (userId)=> {
    return async (dispatch)=> {
        try {
            const {data} = await request.get(`/api/users/profile/${userId}`);
            dispatch(profileActions.setProfile(data));

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// set user profile photo
const uploadProfilePhoto = (newPhoto)=> {
    return async (dispatch, getState)=> {
        try {
           
            const {data} = await request.post(`/api/users/profile/profile-photo-upload`,newPhoto,
             {
                headers:{
                    Authorization: 'Bearer ' +  getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
             });

            console.log(data);

            
            dispatch(profileActions.setProfilePhoto(data.profilePhoto));
            dispatch(authActions.setUserPhoto(data.profilePhoto));

            toast.success(data.message);

            // modify the user in local storage with new photo
            const user = JSON.parse(localStorage.getItem('userInfo'));
            user.profilePhoto = data?.profilePhoto;
            localStorage.setItem('userInfo', JSON.stringify(user));


        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// update user profile
const updateProfile = (userId, profile)=> {

    return async (dispatch, getState)=> {

        try {

            const {data} = await request.put(`/api/users/profile/${userId}`, profile, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            });
            dispatch(profileActions.updateProfile(data))
            dispatch(authActions.setUsername(data.username));

            toast.success('Profile has been updated');

            const user = JSON.parse(localStorage.getItem('userInfo'));
            user.username = data?.username;
            localStorage.setItem('userInfo', JSON.stringify(user));
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }

    }
}
// delete user profile
const deleteProfile = (userId)=> {

    return async (dispatch, getState)=> {

        try {
            dispatch(profileActions.setLoading());

            const {data} = await request.delete(`/api/users/profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            });
            dispatch(profileActions.setIsProfileDeleted())

            toast.success(data?.message);

            setTimeout(()=> {
                dispatch(profileActions.clearIsProfileDeleted());
            }, 3000);
            
        } catch (error) {
            dispatch(profileActions.clearLoading());
            console.log(error)
            toast.error(error.response.data.message);
        }

    }
}


export {
    getUserProfile,
    uploadProfilePhoto,
    updateProfile,
    deleteProfile
}

