
import { useSelector } from "react-redux";
import PostItem from "./PostItem";
import './posts.css';

const PostList = ({posts}) => {

  // const {posts} = useSelector(state => state.post)
  console.log(posts)
  if(!posts) {
    return <div>There is no post available</div>
  }

  return (
    <div className="post-list">
        {
            posts.length > 0 && posts.map(post => <PostItem post={post} key={post._id} />)
        }
    </div>
  );
};

export default PostList;
