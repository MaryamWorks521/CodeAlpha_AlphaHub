import React, { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import Swal from 'sweetalert2'; // Swal import kiya

function Home({ isAuth }) {
  const [postsList, setPostsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getPosts = async () => {
    try {
      const data = await getDocs(collection(db, "posts"));
      setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  // Delete function with Alerts
  const deletePost = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0047AB',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
        getPosts(); // List refresh
        
        Swal.fire({
          title: 'Deleted!',
          text: 'Your post has been removed.',
          icon: 'success',
          confirmButtonColor: '#0047AB'
        });
      } catch (error) {
        Swal.fire('Error', 'Something went wrong!', 'error');
      }
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const filteredPosts = postsList.filter((post) =>
    post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="homePage" style={{ padding: '20px' }}>
      <input 
        type="text" 
        placeholder="Search articles..." 
        className="search-input"
        style={{ marginBottom: '20px', padding: '12px', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredPosts.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>No posts available or loading...</p>
      ) : (
        filteredPosts.map((post) => {
          const isOwner = isAuth && auth.currentUser && post.author?.id === auth.currentUser.uid;

          return (
            <div className="article-card" key={post.id} style={{ position: 'relative', border: '1px solid #eee', padding: '20px', marginBottom: '15px', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <div className="postHeader" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="title" style={{ flex: '1' }}>
                  <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>{post.title}</h2>
                </div>
                
                <div className="deletePost">
                  {isOwner && (
                    <button 
                      onClick={() => { deletePost(post.id); }}
                      style={{ 
                        cursor: 'pointer', 
                        background: '#ff4444', 
                        color: 'white', 
                        border: 'none', 
                        padding: '5px 10px', 
                        borderRadius: '5px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    > 
                      DELETE 🗑️
                    </button>
                  )}
                </div>
              </div>
              
              <div className="postTextContainer" style={{ margin: '15px 0', color: '#555', lineHeight: '1.6' }}>
                {post.postText}
              </div>
              
              <h3 style={{ color: '#0047AB', fontSize: '0.9rem', margin: '0' }}>@{post.author?.name || "Anonymous"}</h3>
              <hr style={{ border: '0', borderTop: '1px solid #eee', marginTop: '15px' }} />
            </div>
          );
        })
      )}
    </div>
  );
}

export default Home;