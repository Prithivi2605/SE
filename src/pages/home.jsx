import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/SignIn', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="home-content">
      <h1>Welcome to the Home Page!</h1>
      <p>This is the dashboard/homepage visible after login.</p>
    </div>
  );
};

export default Home;
