import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/SignUp.css'
import image from '../assets/6.jpg'

const SignUp = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields!");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log({ name, email, password });

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log('Response from server:', data);
  
      if (res.ok) {
        navigate('/SignIn');
      } else {
        alert(data.message || 'Something went wrong.');
      }
  
    } catch (err) {
      console.error('Error:', err);
      alert('Error connecting to server');
    }
  }

  return (
    <div className="SignUp-container">
      <div className='SignUp-image'>
        <img src={image} alt="Sign Up" />
      </div>
      <form className='SignUp-Form' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className='SignUp-group'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            placeholder='Enter your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your Email'
            required
          />

          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPass(e.target.value)}
            placeholder='Enter your Password'
            required
          />

          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm your Password'
            required
          />
        </div>

        <button type='submit' className='login-button'>Sign Up</button><br />
        <button type='button' className='login-button' onClick={() => navigate('/SignIn')}>Sign In</button>
      </form>
    </div>
  )
}

export default SignUp;
