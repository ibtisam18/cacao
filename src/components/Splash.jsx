import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigation hook from React Router

const Splash = () => {
  const [fadeOut, setFadeOut] = useState(false); // State to trigger fade out
  const navigate = useNavigate(); // ✅ Hook to programmatically navigate to another route

  useEffect(() => {
    // Timer to start fading out after 9 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 9000);

    // Timer to redirect to the signup page after 10 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/signup');
    }, 10000);

    // Cleanup both timers on unmount
    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]); // ✅ Add navigate as a dependency

  // Style for the main splash screen container
  const splashContainerStyle = {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#000',
    flexDirection: 'column',
    opacity: fadeOut ? 0 : 1,
    transition: 'opacity 1s ease-out',
  };

  // Fullscreen video background styling
  const videoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
    opacity: 0.6,
  };

  // Style for the welcome text in the center of the screen
  const welcomeTextStyle = {
    position: 'absolute',
    color: '#FFEBCD', // Light cream color
    fontFamily: '"Brush Script MT", cursive', // Cursive font
    fontSize: '6rem',
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 2,
    animation: 'spinText 3s ease-in-out, textPop 2s ease-in-out forwards',
    textShadow: '2px 2px 8px rgba(139, 69, 19, 0.8)',
    opacity: fadeOut ? 0 : 1,
    transition: 'opacity 1s ease-out',
  };

  // Style for the circular loading spinner
  const loaderStyle = {
    position: 'absolute',
    bottom: '30px',
    zIndex: 2,
    width: '60px',
    height: '60px',
    border: '6px solid #C68E17',
    borderTop: '6px solid transparent',
    borderRadius: '50%',
    animation: 'spinLoader 1s linear infinite',
    opacity: fadeOut ? 0 : 1,
    transition: 'opacity 1s ease-out',
  };

  // Animation for text popping in
  const textPopKeyframes = `
    @keyframes textPop {
      0% { opacity: 0; transform: translateY(-30px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;

  // Animation for text rotating
  const spinTextKeyframes = `
    @keyframes spinText {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  // Animation for glowing text on hover
  const textHoverKeyframes = `
    @keyframes textGlow {
      0% { text-shadow: none; }
      50% { text-shadow: 0 0 10px #FFD54F, 0 0 20px #FFD54F, 0 0 30px #FFD54F; }
      100% { text-shadow: none; }
    }
  `;

  // Animation for the loading spinner
  const spinLoaderKeyframes = `
    @keyframes spinLoader {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  useEffect(() => {
    // Inject the animation styles dynamically into the <head>
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText =
      textPopKeyframes + spinTextKeyframes + textHoverKeyframes + spinLoaderKeyframes;
    document.head.appendChild(styleSheet);

    // Cleanup: remove the styles on component unmount
    return () => document.head.removeChild(styleSheet);
  },);

  return (
    <div style={splashContainerStyle}>
      {/* Background video */}
      <video autoPlay muted loop playsInline style={videoStyle}>
        <source src="/images/12546743-uhd_3840_2160_60fps (1).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Welcome text with emoji and hover glow effect */}
      <div
        style={welcomeTextStyle}
        onMouseEnter={(e) => e.target.style.animation = 'textGlow 1s infinite'}
        onMouseLeave={(e) => e.target.style.animation = ''}
      >
        <h1>
          <span role="img" aria-label="chocolate">🍫</span> Welcome to Cacao{' '}
        </h1>
      </div>

      {/* Spinning caramel loader */}
      <div style={loaderStyle}></div>
    </div>
  );
};

export default Splash; // Export the Splash component for use in routing
