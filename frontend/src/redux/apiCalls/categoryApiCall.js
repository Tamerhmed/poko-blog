import { categoryActions } from "../slices/categorySlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

//fetch all categories
const fetchCategories = ()=> {
    return async (dispatch)=> {

        try {
            const {data} = await request.get('/api/categories');
            console.log(data);
            dispatch(categoryActions.setCategories(data));

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }
    }
};


export { fetchCategories}