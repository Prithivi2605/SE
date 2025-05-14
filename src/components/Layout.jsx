import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../styles/home.css'; // or a dedicated navbar css

const Layout = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  return (
    <>
      <nav className="navbar">
        <ul className="nav-links">
        {isLoggedIn?<><li><button onClick={() => navigate('/home')}>©</button>
        </li></>:""}
        </ul>
        <ul className="nav-links">
          <li><button onClick={() => navigate('/about')}>About</button></li>
          <li><button onClick={() => navigate('/contact')}>Contact</button></li>
{isLoggedIn?<><li><button onClick={() => navigate('/profile')}>Profile</button>
</li></>:""}
          
        </ul>
      </nav>

      <Outlet /> {/* renders the child route content */}
    </>
  );
};

export default Layout;
