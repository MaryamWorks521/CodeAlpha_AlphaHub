import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [authorName, setAuthorName] = useState(auth.currentUser?.displayName || "Maryam"); 

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const createPost = async () => {
    if (title.trim() === "" || postText.trim() === "" || authorName.trim() === "") {
      Swal.fire({
        icon: 'error',
        title: 'Empty Fields!',
        text: 'Please fill all fields to publish your insights.',
        confirmButtonColor: '#0047AB'
      });
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        postText: postText,
        author: { name: authorName, id: auth.currentUser.uid }, 
        createdAt: new Date()
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Published Successfully!',
        text: 'Your post is now visible on the Home page.',
        timer: 2500,
        showConfirmButton: false
      });
      
      navigate("/");
    } catch (err) {
      Swal.fire('Error', 'Failed to publish post.', 'error');
    }
  };

  return (
    <div className="createPostWrapper" style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
      <div className="cpContainer" style={{ 
        width: '100%', 
        maxWidth: '700px', 
        backgroundColor: '#ffffff', 
        padding: '40px', 
        borderRadius: '20px', 
        boxShadow: '0 15px 35px rgba(0, 71, 171, 0.1)', // Light Cobalt Shadow
        border: '1px solid #f0f0f0'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <h1 style={{ color: '#0047AB', fontSize: '2.2rem', fontWeight: '800', marginBottom: '10px' }}>
             Create New Article
          </h1>
          <p style={{ color: '#666', fontSize: '0.95rem' }}>Share your professional insights with the community</p>
        </div>

        <div className="inputGp" style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}> ✍️ Author Name </label>
          <input 
            style={{ 
              width: '100%', padding: '15px', borderRadius: '12px', border: '2px solid #eee', 
              fontSize: '1rem', outline: 'none', transition: 'all 0.3s ease'
            }}
            value={authorName}
            placeholder="Your name..." 
            onChange={(e) => setAuthorName(e.target.value)} 
            onFocus={(e) => e.target.style.borderColor = '#0047AB'}
            onBlur={(e) => e.target.style.borderColor = '#eee'}
          />
        </div>

        <div className="inputGp" style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}> 📌 Post Title </label>
          <input 
            style={{ 
              width: '100%', padding: '15px', borderRadius: '12px', border: '2px solid #eee', 
              fontSize: '1rem', outline: 'none', transition: 'all 0.3s ease'
            }}
            placeholder="Give your post a catchy title..." 
            onChange={(e) => setTitle(e.target.value)} 
            onFocus={(e) => e.target.style.borderColor = '#0047AB'}
            onBlur={(e) => e.target.style.borderColor = '#eee'}
          />
        </div>

        <div className="inputGp" style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}> 📖 Content </label>
          <textarea 
            style={{ 
              width: '100%', padding: '15px', borderRadius: '12px', border: '2px solid #eee', 
              fontSize: '1rem', outline: 'none', minHeight: '180px', transition: 'all 0.3s ease',
              fontFamily: 'inherit'
            }}
            placeholder="Write your detailed article here..." 
            onChange={(e) => setPostText(e.target.value)} 
            onFocus={(e) => e.target.style.borderColor = '#0047AB'}
            onBlur={(e) => e.target.style.borderColor = '#eee'}
          />
        </div>

        <button 
          className="publishBtn"
          style={{ 
            width: '100%', padding: '16px', backgroundColor: '#0047AB', color: 'white', 
            border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', 
            cursor: 'pointer', transition: 'transform 0.2s, background 0.3s',
            boxShadow: '0 4px 15px rgba(0, 71, 171, 0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#003380';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#0047AB';
            e.target.style.transform = 'translateY(0)';
          }}
          onClick={createPost}
        >
          Publish Now 🚀
        </button>
      </div>
    </div>
  );
}

export default CreatePost;