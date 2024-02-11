import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { logoutUser } from '../../redux/apiCalls/authApiCalls';


const HeaderRight = () => {
  const {user} = useSelector(state => state.auth);
  const [dropdown, setDropdown] = useState(false);

  console.log(user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  
  const handleLogout = ()=> {
    dispatch(logoutUser());
    navigate('/');
  }

  // console.log(user);
  return (
    <div className="header-right">
      {
        user ? (
          <>
             <div className="header-right-user-info">
                <span className='header-right-username'
                  onClick={()=>setDropdown(!dropdown)}
                >
                  {user?.username}
                </span>
                  {/* <span className='get-profile'>
                  <i class="bi bi-chevron-down"></i>
                  </span> */}
                <img src={user?.profilePhoto.url }
                 alt="user-profilephoto" 
                 className='header-right-user-photo'
                 onClick={()=>setDropdown(!dropdown)}
                 />
                 {
                  dropdown && (
                    <div className="header-right-dropdown">
                      <Link to={`/profile/${user?._id}`}
                          className='header-dropdown-item'
                        onClick={()=> setDropdown(false)}
                      >
                        <i className="bi bi-file-person"></i>
                        <span>Profile</span>
                      </Link>
                      <div className="header-dropdown-item" 
                      onClick={()=>handleLogout()}>
                          <i className="bi bi-box-arrow-in-left"></i>
                          <span onClick={()=> setDropdown(false)}>Logout</span>
                      </div>
                    </div>
                )}
            </div>
          </>
        ): (
          <>
            <Link to='/login' 
              className="header-right-link">
                <i className="bi bi-box-arrow-in-right"></i>
                <span>Login</span>
            </Link>
            <Link to='/register' 
              className="header-right-link">
                <i className="bi bi-person-plus"></i>
                <span>Register</span>
            </Link>
          </>
        )
      }
            
        </div>
  );
};

export default HeaderRight;
