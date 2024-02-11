import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PostList from "../../components/posts/PostList";
// import { posts } from "../../dummyData";
import {useDispatch, useSelector} from 'react-redux';
import "./category.css";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";

const Category = () => {
    
    const { category } = useParams();
    const dispatch = useDispatch();
    const {postsCate} = useSelector(state => state.post);

console.log(postsCate)
    useEffect(() => {
      dispatch(fetchPostsBasedOnCategory(category));
      window.scrollTo(0,0);
    }, [category]);

    return ( 
    <div className="category">
      {
        postsCate.length === 0 ?
         (
          <>
            <h1 className="category-not-found">
              Posts with <span>{category}</span> category not found
            </h1>
            <Link className="category-not-found-link"
              to='/posts'
            >
              Go to posts page
            </Link>
          </>
        ):(
          <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={postsCate} />
          </>
        )
      }
    </div> );
}
 
export default Category;