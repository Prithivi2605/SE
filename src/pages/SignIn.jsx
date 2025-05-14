import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css'
import image from '../assets/6.jpg'

const SignIn = () => {
    const [login,setLogin] = useState(false)
    const [email,setEmail] = useState('')
    const [password,setPass] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Email', email);
        console.log('Password', password);
        

        if(!email||!password) {
            alert("Please fill in all fields!");
            return;
        }

        try{
            const res = await fetch('http://localhost:5000/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            }); 
            
            const data = await res.json();
            console.log('Response from server:', data);
            sessionStorage.setItem(login,true);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('password', password);

            if (res.ok) {
                sessionStorage.setItem('isLoggedIn', 'true');
                
                navigate('/home', { replace: true });
                window.location.reload();

            } else {
                alert(data.message || 'Something went wrong.');
            }
        }catch(err){
            console.log("error:",err);
            alert("Error connecting to server");
        }
        
    }
    
    
  return (
    <div className="SignIn-container">
        <div className='SignIn-image'>
            <img src={image} alt="Sign In" />
        </div> 
        <form className='SignIn-Form' onSubmit={handleSubmit}>
            <h2>Sign In</h2> 
            <div className='SignIn-group'>
            <label htmlFor='email'>Email:</label>
                <input type='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email' required/>

            <label htmlFor='password'>Password:</label>
                <input type='password' id='password' value={password} onChange={(e)=>setPass(e.target.value)} placeholder='Enter your Password' required/>
            </div>

            <button type='submit' className='login-buttons'>Login</button><br />

            <button type='button' className='login-buttons' onClick={() => navigate('/Signup')}>Sign Up</button>
        </form>
    </div>
  )
}

export default SignIn