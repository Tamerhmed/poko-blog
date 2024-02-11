import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

//login user
const loginUser = (user)=> {
    return async (dispatch)=> {

        try {
            const {data} = await request.post('/api/auth/login', user);
            console.log(data);
            dispatch(authActions.login(data));
            localStorage.setItem('userInfo', JSON.stringify(data));

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }
    }
};

//logout user
const logoutUser = ()=> {
    return async(dispatch)=> {
        dispatch(authActions.logout());
        localStorage.removeItem('userInfo');
    }
}


//register user
const registerUser = (user)=> {
    return async (dispatch)=> {
        
        try {
            const {data} = await request.post('/api/auth/register', user);
            console.log(data);
            dispatch(authActions.register(data.message));
            localStorage.setItem('userInfo', JSON.stringify(data));

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
};

export {
    loginUser,
    logoutUser,
    registerUser
}
