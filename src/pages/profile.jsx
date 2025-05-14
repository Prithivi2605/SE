import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css'; // Make sure you have this CSS file

const Profile = () => {
  const navigate = useNavigate();
  const email = sessionStorage.getItem('email');

  // Redirect to sign-in page if no email is found
  if (!email) {
    navigate('/SignIn');
    return null; // return null to prevent rendering of the profile component
  }

  const handleLogout = () => {
    sessionStorage.clear();
    
    navigate('/SignIn');
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <p><strong>Email:</strong> {email}</p>

      <div className="logout-button">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
