import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";

const Home = () => {
  const dispatch = useDispatch();
  const {posts} = useSelector(state => state.post);

  useEffect(()=>{
    dispatch(fetchPosts(1));
  }, [dispatch]);
  

  return (
     <section className="home">
      <div className="home-hero-header">
        <div className="overlay"></div>
        <div className="container">

        <div className="home-hero-header-layout">
          <h1 className="home-title">Welcome to Poko blog</h1>
        </div>
      </div>
      </div>
      <div className="container">

      <div className="home-latest-post">
        Latest Posts
      </div>
      <div className="home-container">
        <PostList posts={posts} />
        <Sidebar />
      </div>
      <div className="home-see-posts-link">
        <Link className="home-link" to="/posts">
          See All Posts
        </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
