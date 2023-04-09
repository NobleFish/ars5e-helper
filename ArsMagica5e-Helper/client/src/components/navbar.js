import React, { useEffect, useState } from "react";
import '../styling/navbar.css'
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
function Navbar() 
{
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  
  const showButton = () => {
    if(window.innerWidth <= 960){
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
    <>
      <nav className='navbar'>
          <NavLink to='/' onClick={closeMobileMenu}>
            <img className='img' src='/arm5-logo.png'></img>
          </NavLink>
        <div className='navbar-container'>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? "fa-regular fa-x" : "fa-solid fa-bars"} />
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
            
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar