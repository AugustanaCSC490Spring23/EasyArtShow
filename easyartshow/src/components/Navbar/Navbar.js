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
    /** 
     * Sign out the user and redirect to the home page
     * 
     * @param {object} auth - Firebase auth object
     * 
     * @returns {void}
     */
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
      {/* <h1 className='headtext__custom'>quail.</h1> */}
      <nav>
        <ul className='navbar-links'>
          <li className='navbar-text'><a href="/">Home</a></li>
          <li className='navbar-text'><a  href="https://github.com/AugustanaCSC490Spring23/EasyArtShow/wiki/Development-History" target="_blank" rel="noreferrer">Dev Note</a></li>
          <li className='navbar-text'><a href="/about">About</a></li>
          <li className='navbar-text'><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      { user ? <div className='right-group'> <button className='system-button-secondary' onClick={() => logout()}> Log out</button> <a href='/dashboard'>  <img src={user.photoURL} style={{borderRadius: "50%"}} alt="user-icon" className='user-icon'/>  </a> </div> :
        <button className='system-button-secondary' onClick={() => navigate('/login')}>Log in</button> }
    </div>
  );
}

export default Navbar;
