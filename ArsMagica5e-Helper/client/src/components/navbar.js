import React, { useEffect, useState } from "react";
import '../styling/navbar.css'
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <header className='navbar'>
      <NavLink to='/' onClick={closeMobileMenu}>
        <img className='img' src='/arm5-logo.png' alt="Ars Magica Logo" />
      </NavLink>
      <div className='navbar-container'>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <NavLink to='/characters' className='nav-links' onClick={closeMobileMenu}>
              Characters
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/covenants' className='nav-links' onClick={closeMobileMenu}>
              Covenants
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/tools/solo' className='nav-links' onClick={closeMobileMenu}>
              Solo Play
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
