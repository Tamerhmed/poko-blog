import {Link} from 'react-router-dom';
import './posts.css';


const PostItem = ({post, username, userId}) => {

    const profileLink = userId ? `/profile/${userId}` : `/profile/${post?.user?._id}`;

  return(
    <div className="post-item">
        <div className="post-item-image-wrapper">
            <img src={post?.image.url} alt="imageName" className="post-item-image"/>
        </div>
        <div className="post-item-info-wrapper">
            <div className="post-item-info">
                <div className="post-item-author">
                    <span>Author : </span>
                    <Link className='post-item-username'
                     to={profileLink}>
                        
                        {
                            username ? username : post?.user.username
                        }
                    </Link>
                </div>
                <div className="post-item-date">
                    {new Date(post?.createdAt).toDateString()}
                </div>
            </div>
                <div className="post-item-details">
                    <h4 className="post-item-title">
                        {post?.title}
                    </h4>
                    <Link className='post-item-category'
                     to={`/posts/categories/${post?.category}`}>
                        {post?.category}
                    </Link>
                </div>
                <p className="post-item-description">
                    {post?.description}
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni vel repellat ut aliquam laudantium vitae veniam numquam suscipit nobis voluptatem atque error fugiat molestias culpa, qui deserunt quasi, eaque sapiente? Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sed reprehenderit, magnam est quae corrupti deserunt modi fugit ratione, recusandae ab nobis tempora, distinctio eveniet harum amet natus quas quos.
                </p>
                <Link className='post-item-link'
                 to={`/posts/details/${post?._id}`}>
                    Read More...
                </Link>
        </div>
    </div>
  ) 
};

export default PostItem;
