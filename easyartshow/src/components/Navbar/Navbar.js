import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <div className='navbar'>
      <div className='logo'>EAS<b>.</b></div>
      <nav>
        <ul className='navbar-links'>
          <li className='headtext__major'><a href="/">Home</a></li>
          <li className='headtext__major'><a href="/devnote">Dev Note</a></li>
          <li className='headtext__major'><a href="/">About</a></li>
          <li className='headtext__major'><a href="/">Contact</a></li>
        </ul>
      </nav>
      <div className='headtext__major'>placeholder</div>
    </div>
  );
}

export default Navbar;
