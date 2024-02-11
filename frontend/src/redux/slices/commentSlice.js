import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    comments: []
}

const commentSlice = createSlice({
    name:'comment',
    initialState,
    reducers: {
        
    }
});


const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;


export {
    commentActions,
    commentReducer
}