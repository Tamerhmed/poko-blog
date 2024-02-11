import {useState, useEffect} from 'react';
import './header.css';
import HeaderLeft from './HeaderLeft';
import Navbar from './Navbar';
import HeaderRight from './HeaderRight';

const Header = () => {
    const [toggle, setToggle] = useState(false);

  return (
      <div className='container'>
    <header className="header" style={{marginBottom: toggle && '3rem'}}>

        <HeaderLeft setToggle={setToggle} toggle={toggle}/>
        <Navbar toggle={toggle}/>
        <HeaderRight />
    </header>
      </div>
  );
};

export default Header;
