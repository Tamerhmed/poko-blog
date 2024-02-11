import { createSlice } from "@reduxjs/toolkit";


const getUser = ()=> {
    const user = localStorage.getItem('userInfo');
    const newUser = JSON.parse(user);

    return newUser;
}

const initialState = {
    user: getUser() || null,
    registerMessage: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action)=> {
            state.user = action.payload;
            state.registerMessage = null;
        },
        logout: (state, action)=> {
            state.user = null;
        },
        register: (state, action)=> {
            state.registerMessage = action.payload;
        },
        setUserPhoto: (state, action) => {
            state.user.profilePhoto = action.payload;
        },
        setUsername: (state, action)=> {
            state.user.username = action.payload;
        }

    }
});


const authReducer = authSlice.reducer;

const authActions = authSlice.actions;


export { authActions, authReducer};

