import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SignIn from './pages/SignIn.jsx'
import Signup from './pages/SignUp.jsx'
import Home from './pages/home.jsx'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
import Profile from './pages/profile.jsx'
import Index from './components/Index.jsx'
import Layout from './components/Layout.jsx' // <- new import

function App() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  return (
    <BrowserRouter>
    <Layout />
      <Routes>
      {isLoggedIn?(
      <>
        
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
      </>):(
      <>
        <Route default path="/" element={<SignIn />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<Signup />} />
      </>)}
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
