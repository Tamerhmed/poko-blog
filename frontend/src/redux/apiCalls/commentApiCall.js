import request from "../../utils/request";
import { toast } from "react-toastify";
import { postActions } from "../slices/postSlice";
import { commentActions } from "../slices/commentSlice";


//create comments

export function createComment(newComment) {
    return async (dispatch, getState)=> {
        try {
            const {data} =  await request.post('/api/comments', newComment, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            })

            dispatch(postActions.addCommentToPost(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

//update comments

export function updateComment(commentId, comment) {
    return async (dispatch, getState)=> {
        try {
            const {data} =  await request.put(`/api/comments/${commentId}`, comment, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            })

            dispatch(postActions.updateCommentPost(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
//delete comments

export function deleteComment(commentId) {
    return async (dispatch, getState)=> {
        try {
             await request.delete(`/api/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            })

            dispatch(postActions.deleteCommentFromPost(commentId));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}