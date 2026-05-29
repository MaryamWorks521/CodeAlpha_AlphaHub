import React, { useState } from 'react';
import axios from 'axios';

function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "AAPKI_API_KEY_YAHAN_LIKHEIN"; // Apni key yahan dalein

  const searchInternet = async () => {
    if (!query) return;
    setLoading(true);
    try {
      // Ye sirf Web Development se related news nikalega
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}+web+development&sortBy=relevancy&apiKey=${API_KEY}`
      );
      setResults(response.data.articles);
    } catch (error) {
      console.error("API Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="homePage">
      <div className="search-container">
        <h1>Global Tech Search</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Search web dev topics (e.g. React, CSS)..." 
            className="search-input"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={searchInternet}
            style={{ padding: '10px 20px', background: '#0047AB', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="results-container" style={{ marginTop: '30px' }}>
        {loading && <p>Searching the internet...</p>}
        
        {results.map((article, index) => (
          <div className="article-card" key={index} style={{ marginBottom: '20px' }}>
             {article.urlToImage && (
               <img src={article.urlToImage} alt="news" style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }} />
             )}
             <span className="category-tag">Web Resource</span>
             <h2>{article.title}</h2>
             <p>{article.description}</p>
             <a href={article.url} target="_blank" rel="noreferrer" style={{ color: '#0047AB', fontWeight: 'bold', textDecoration: 'none' }}>
               Read Full Article →
             </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GlobalSearch;