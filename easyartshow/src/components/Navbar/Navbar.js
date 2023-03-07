import React from 'react';
import { useNavigate } from "react-router-dom";
import './Navbar.css';
import { images } from '../../constants';
import { getAuth } from "@firebase/auth";

function Navbar() {
  const navigate = useNavigate();
  const user = getAuth().currentUser;

  return (
    <div className='navbar'>
      <img src={images.logo} alt='logo' className='logo'/>
      <nav>
        <ul className='navbar-links'>
          <li className='headtext__major'><a href="/">Home</a></li>
          <li className='headtext__major'><a href="/devnote">Dev Note</a></li>
          <li className='headtext__major'><a href="/">About</a></li>
          <li className='headtext__major'><a href="/">Contact</a></li>
        </ul>
      </nav>
      { user ? <img src={images.user} alt="user-icon" className='user-icon'/> :
        <button className='system-button' onClick={() => navigate('/login')}>Log in</button> }
    </div>
  );
}

export default Navbar;
