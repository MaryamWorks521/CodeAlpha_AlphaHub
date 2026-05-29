import React from 'react';

function About() {
  const projects = [
    {
      title: "LuxeLips E-commerce 💄",
      description: "A premium beauty product landing page with a minimalist and responsive design.",
      link: "https://maryamworks521.github.io/luxelips-website/",
      tech: "HTML, CSS, JavaScript"
    },
    {
      title: "National Parks Discovery 🎄",
      description: "An interactive landing page showcasing nature and wildlife with an immersive UI.",
      link: "https://maryamworks521.github.io/national-parks/",
      tech: "HTML, CSS, UI Design"
    },
    {
      title: "AlphaHub Tech Portal 💻",
      description: "A real-time tech insight portal built with React and Firebase for live data management.",
      link: "#", 
      tech: "React, Firebase, Firestore"
    },
    {
      title: "fur ever🐾",
      description: "A comprehensive pet services platform with specialised visuals, including a high-end glassmorphism design and clean styling.",
      link: "https://maryamworks521.github.io/project-3/",
      tech: "Full-Stack Services"
    }
  ];

  const skills = ['React.js', 'Node.js', 'Firebase', 'MongoDB', 'JavaScript', 'HTML5', 'CSS3', 'UI Design'];

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header Section */}
      <section style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ color: '#0047AB', fontSize: '2.8rem', fontWeight: '800', marginBottom: '10px' }}>
          About Me
        </h1>
        <div style={{ width: '60px', height: '4px', backgroundColor: '#0047AB', margin: '0 auto 20px' }}></div>
        <p style={{ color: '#4A4A4A', fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto' }}>
          I am a <b>Full-Stack Developer</b> and Student dedicated to building clean, 
          minimalist, and high-impact web applications. Through <b>Haktech Solution</b>, 
          I bridge the gap between complex code and elegant design.
        </p>
      </section>

      {/* Projects Grid */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ color: '#2D3436', fontSize: '1.8rem', marginBottom: '30px', borderLeft: '5px solid #0047AB', paddingLeft: '15px' }}>
          My Projects
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '25px' 
        }}>
          {projects.map((project, index) => (
            <div key={index} style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '12px', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              border: '1px solid #F0F0F0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ 
                  fontSize: '0.75rem', 
                  backgroundColor: '#EBF2FF', 
                  color: '#0047AB', 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontWeight: '700',
                  textTransform: 'uppercase'
                }}>
                  {project.tech}
                </span>
                <h3 style={{ color: '#2D3436', margin: '15px 0 10px' }}>{project.title}</h3>
                <p style={{ color: '#636E72', fontSize: '0.95rem', lineHeight: '1.5' }}>{project.description}</p>
              </div>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  marginTop: '20px', 
                  display: 'inline-block', 
                  color: '#0047AB', 
                  textDecoration: 'none', 
                  fontWeight: '700',
                  fontSize: '0.9rem'
                }}
              >
                View Live Project →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Tech Stack */}
      <section style={{ 
        backgroundColor: '#0047AB', 
        padding: '40px', 
        borderRadius: '15px', 
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Technical Stack</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
          {skills.map(skill => (
            <span key={skill} style={{ 
              backgroundColor: 'rgba(255,255,255,0.15)', 
              padding: '8px 20px', 
              borderRadius: '30px', 
              fontSize: '0.9rem',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Footer / Contact Hint */}
      <section style={{ textAlign: 'center', marginTop: '50px', color: '#636E72' }}>
        <p>Interested in working together? <b>maryamirzawork@gmail.com</b></p>
      </section>
    </div>
  );
}

export default About;