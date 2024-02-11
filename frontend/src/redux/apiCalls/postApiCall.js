import request from "../../utils/request";
import { toast } from "react-toastify";
import { postActions } from "../slices/postSlice";

// get all posts
const fetchPosts = (pageNumber)=> {
    // const pagNum = 1;

    return async(dispatch)=> {

        try {
            const {data} = await request.get(`/api/posts?pageNumber=${pageNumber}`);
            console.log(data)
            dispatch(postActions.setPosts(data))
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// get posts count
const getPostsCount = ()=> {

    return async(dispatch)=> {

        try {
            const {data} = await request.get(`/api/posts/count`);
            dispatch(postActions.getPostsCount(data))
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// get posts category
const fetchPostsBasedOnCategory = (category)=> {

    return async(dispatch)=> {

        try {
            const {data} = await request.get(`/api/posts?category=${category}`);
            dispatch(postActions.setPostsCate(data))
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}


//create post
const createPost = (newPost)=> {
    return async (dispatch, getState)=> {

        try {
            dispatch(postActions.setLoading());

           await request.post('api/posts', newPost, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`,
                    "Content-Type" : "multipart/form-data"
                }
            })

            dispatch(postActions.setIsPostCreated());

            setTimeout(()=> {
                dispatch(postActions.clearIsPostCreated());
            }, 2000)

        } catch (error) {
            toast.error(error);
            dispatch(postActions.clearLoading());
        }
    }
}

// get single post
const fetchSinglePost = (postId)=> {

    return async(dispatch)=> {

        try {
            const {data} = await request.get(`/api/posts/${postId}`);
            dispatch(postActions.setPost(data))
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// toggle like post
const toggleLikePost = (postId)=> {

    return async(dispatch, getState)=> {

        try {
            const {data} = await request.put(`/api/posts/like/${postId}`, {}, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            });
            dispatch(postActions.setLike(data))
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// update post image
const updatePostImage = (newImage,postId)=> {

    return async(dispatch, getState)=> {

        try {
            const {data} = await request.put(`/api/posts/update-image/${postId}`, newImage, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            toast.success('New post image updated successfully')
            dispatch(postActions.setLike(data))
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

// update post
const updatePost = (newPost,postId)=> {

    return async(dispatch, getState)=> {

        try {
            const {data} = await request.put(`/api/posts/${postId}`, newPost, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`,
                }
            });

            toast.success('Post has been updated')
            dispatch(postActions.setPost(data))
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
// delete post
const deletePost = (postId)=> {

    return async(dispatch, getState)=> {

        try {
            const {data} = await request.delete(`/api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`,
                }
            });

            dispatch(postActions.deletePost(data.postId))
            toast.success(data.message);

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}



export {
    fetchPosts,
    getPostsCount,
    fetchPostsBasedOnCategory,
    createPost,
    fetchSinglePost,
    toggleLikePost,
    updatePostImage,
    updatePost,
    deletePost
}