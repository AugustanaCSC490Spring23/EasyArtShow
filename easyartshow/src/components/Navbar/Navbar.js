import React from 'react';
import { useNavigate } from "react-router-dom";
import './Navbar.css';
import { images } from '../../constants';
import { getAuth, signOut } from "@firebase/auth";

function Navbar() {
  const navigate = useNavigate();
  const user = getAuth().currentUser;
  const auth = getAuth();

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className='navbar'>
      <a href="/" className='logo-anchor'><img src={images.logo} alt='logo' className='logo'/></a>
      {/* <nav>
        <ul className='navbar-links'>
          <li className='headtext__major'><a href="/">Home</a></li>
          <li className='headtext__major'><a href="/devnote">Dev Note</a></li>
          <li className='headtext__major'><a href="/about">About</a></li>
          <li className='headtext__major'><a href="/contact">Contact</a></li>
        </ul>
      </nav> */}
      { user ? <div className='right-group'> <button className='system-button logout-button' onClick={() => logout()}> Log out</button> <a href='/dashboard'>  <img src={user.photoURL} style={{borderRadius: "50%"}} alt="user-icon" className='user-icon'/>  </a> </div> :
        <button className='system-button' onClick={() => navigate('/login')}>Log in</button> }
    </div>
  );
}

export default Navbar;
