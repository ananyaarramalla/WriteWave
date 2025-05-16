import "./Home.css";
import backgroundImage from '../../assets/Background.png'
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

function Home() {
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimateText(true);
    }, 200);
    
    AOS.init({ duration: 1000 });

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className='homeContainer'>
      <div
        className='articleHome'
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>
      <div className='contentContainer'>
        <div className='content'>
          <h1 className={`text-center head text-white pt-4 ${animateText ? 'animateText' : ''}`}> Welcome to WriteWave!</h1>
          <p className={`matter lead text-white text-center pt-2 ${animateText ? 'animateText' : ''}`}>
          Discover our vibrant community at WriteWave. Dive into a world of captivating stories, insightful discussions, and endless inspiration. Whether you're here to explore, learn, or share, we're thrilled to have you join us on this journey of discovery. Start exploring now and unleash your curiosity!
          </p>
          <Link to="/about" className="lm">Learn More</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;