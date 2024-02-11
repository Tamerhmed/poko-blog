import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories: []
}

const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers: {
        setCategories: (state, action)=> {
            state.categories = action.payload;
        }
    }
});


const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;


export {
    categoryActions,
    categoryReducer
}