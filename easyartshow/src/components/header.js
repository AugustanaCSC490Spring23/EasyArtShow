import React from 'react';

function Header() {
  return (
    <header>
      <h1>Easy Art Show</h1>
      <nav className='nav-bar'>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/devnote">Dev Note</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
