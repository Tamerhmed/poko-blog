import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: null,
    loading: false,
    isProfileDeleted: false,
};


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state,action)=> {
            state.profile = action.payload;
        },
        setProfilePhoto: (state,action)=> {
            state.profile.profilePhoto = action.payload;
        },
        updateProfile: (state, action)=> {
            state.profile = action.payload;
        },
        setLoading:(state)=> {
            state.loading = true;
        },
        clearLoading:(state)=> {
            state.loading = false;
        },
        setIsProfileDeleted: (state)=> {
            state.isProfileDeleted = true;
            state.loading = false;
        },
        clearIsProfileDeleted: (state)=> {
            state.isProfileDeleted = false;
        }
    }

});


const profileActions = profileSlice.actions;
const profileReducer = profileSlice.reducer;

export {profileActions, profileReducer};