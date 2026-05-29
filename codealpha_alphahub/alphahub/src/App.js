import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { db, auth } from './firebase'; 
import { collection, addDoc } from 'firebase/firestore'; 
import { signOut, onAuthStateChanged } from 'firebase/auth'; 
import Swal from 'sweetalert2'; 
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import About from './pages/About';
import Login from './pages/Login'; 
import './App.css';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");
  const [email, setEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        localStorage.setItem("isAuth", "true");
      }
    });
    return () => unsubscribe();
  }, []);

  // --- Updated Logout Logic with Alerts ---
  const signUserOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of AlphaHub Insights!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0047AB',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log Out'
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth).then(() => {
          localStorage.clear();
          setIsAuth(false);
          
          Swal.fire({
            title: 'Logged Out!',
            text: 'You have been successfully logged out.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            window.location.pathname = "/login";
          });
        });
      }
    });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || !email.includes("@")) {
      Swal.fire({ title: 'Invalid Email', text: 'Please enter a valid email address.', icon: 'warning', confirmButtonColor: '#0047AB' });
      return;
    }
    try {
      await addDoc(collection(db, "subscribers"), { email: email, subscribedAt: new Date() });
      Swal.fire({ title: 'Subscribed!', text: 'Welcome to AlphaHub Insights.', icon: 'success', confirmButtonColor: '#0047AB' });
      setEmail(''); 
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Try again later.' });
    }
  };

  const navBtnStyle = {
    cursor: 'pointer',
    background: 'white',
    color: '#0047AB',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    marginLeft: '10px',
    fontWeight: '600',
    fontSize: '0.9rem',
    textDecoration: 'none',
    display: 'inline-block'
  };

  return (
    <Router>
      <div className="app-container">
        <header className="navbar" style={{ backgroundColor: '#0047AB', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
            ALPHAHUB <span style={{ fontWeight: '300', opacity: '0.8' }}>INSIGHTS</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', margin: '0 10px', fontWeight: '500' }}> Home </Link>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none', margin: '0 10px', fontWeight: '500' }}> About </Link>

            {!isAuth ? (
              <Link to="/login" style={navBtnStyle}> Login </Link>
            ) : (
              <>
                <Link to="/create" style={{ color: 'white', textDecoration: 'none', margin: '0 10px', fontWeight: '500' }}> Create Post </Link>
                <button onClick={signUserOut} style={navBtnStyle}> Log Out </button>
              </>
            )}
          </nav>
        </header>

        <div className="container" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
          <main className="main-content" style={{ flex: '3' }}>
            <Routes>
              <Route path="/" element={<Home isAuth={isAuth} />} />
              <Route path="/create" element={<CreatePost isAuth={isAuth} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            </Routes>
          </main>

          <aside className="sidebar" style={{ flex: '1' }}>
            <div className="info-card" style={{ borderLeft: '5px solid #0047AB', background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
               <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>Quick Access</h3>
               <Link to="/about" style={{ textDecoration: 'none' }}>
                 <button style={{ width: '100%', padding: '10px', backgroundColor: '#0047AB', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                   📁 My Portfolio & Projects
                 </button>
               </Link>
            </div>

            <div className="info-card" style={{ background: '#0047AB', color: 'white', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
              <h3 style={{ color: 'white', marginTop: '5px', fontSize: '1rem' }}>Stay Informed</h3>
              <input type="email" placeholder="Email address..." value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', marginBottom: '10px', marginTop: '10px' }} />
              <button onClick={handleSubscribe} style={{ cursor: 'pointer', width: '100%', padding: '10px', background: 'white', color: '#0047AB', border: 'none', borderRadius: '6px', fontWeight: '700' }}> Subscribe Now </button>
            </div>

            <div className="info-card" style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1rem', borderBottom: '2px solid #0047AB', paddingBottom: '5px' }}>Project Shortcuts</h3>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
                <li style={{ padding: '8px 0' }}><a href="https://maryamworks521.github.io/luxelips-website/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0047AB', fontWeight: '600' }}>💄 LuxeLips Store</a></li>
                <li style={{ padding: '8px 0' }}><a href="https://maryamworks521.github.io/national-parks/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0047AB', fontWeight: '600' }}>🌲 National Parks</a></li>
                <li style={{ padding: '8px 0' }}><a href="mailto:haktechofficial@gmail.com" style={{ textDecoration: 'none', color: '#0047AB', fontWeight: '600' }}>📧 Contact Haktech</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </Router>
  );
}

export default App;