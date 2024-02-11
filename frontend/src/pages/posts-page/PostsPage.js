import "./posts-page.css";
import { useEffect, useState } from "react";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import {useDispatch, useSelector} from 'react-redux';
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";

const POST_PER_PAGE = 3;

const PostsPage = () => {

  const [currentPage, setCurrentPage] = useState(1);

  
  const {posts, postsCount} = useSelector(state => state.post);
  const pages = Math.ceil( postsCount / POST_PER_PAGE);
  // const pages = 10;
  const dispatch = useDispatch();
// console.log(postsCount)

    useEffect(() => {
      dispatch(fetchPosts(currentPage));
      window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(()=> {
    dispatch(getPostsCount());
  }, [])
  
  return <>
   <div className="container">
      <section className="posts-page">
        <PostList posts={posts}/>
        <Sidebar />
      </section>
      <Pagination 
        pages={pages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  </>;
};

export default PostsPage;
