import "./About.css";
import aboutImg from '../../assets/About.png'
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function CollapsibleSection({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible-section">
      <h2 onClick={() => setIsOpen(!isOpen)} className="collapsible-title">
        {title}
      </h2>
      {isOpen && <p className="collapsible-content">{content}</p>}
    </div>
  );
}

function About() {
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimateText(true);
    }, 200);
    
    AOS.init({ duration: 1000 });

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="AboutContainer">
      <div className="AboutImg">
        <img src={aboutImg} alt='About' className="img" />
        <h1 className={`text-center heading text-white pt-5 ${animateText ? 'animateText' : ''}`}>
          About Us
        </h1>
      </div>
      <div className="AboutInfo" data-aos="fade-up">
        <CollapsibleSection 
          title="Introduction to WriteWave"
          content="Our blog app, 'WriteWave' is a user-friendly platform designed to facilitate communication and knowledge sharing through articles and discussions. It aims to empower both authors and readers by providing a dynamic environment where they can create, explore, and engage with diverse content."
          backgroundImage="https://static.vecteezy.com/system/resources/thumbnails/003/127/955/small_2x/abstract-white-and-grey-background-with-dynamic-waves-shape-free-vector.jpg"
        />
        <CollapsibleSection 
          title="Features for Authors"
          content="WriteWave offers authors a creative space to share their ideas, expertise, and experiences with a global audience. Whether you're a seasoned writer or a novice blogger, this platform provides intuitive tools for crafting articles and managing your content."
        />
        <CollapsibleSection 
          title="Engage as a Reader"
          content="For readers, WriteWave is a great source of interesting and useful content on a variety of topics. Whether you're looking for practical tips, thoughtful analysis, or just a good story, WriteWave's collection of articles has something for everyone."
        />
        <CollapsibleSection 
          title="Community and Collaboration"
          content="Through features such as commenting and sharing, users can actively participate in discussions, provide feedback, and connect with authors and fellow readers. WriteWave fosters a sense of community among authors and readers, encouraging collaboration, knowledge sharing, and mutual support within the platform."
        />
        <div className="interactive-image-container">
          <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2021/09/101113063.jpg?auto=format&q=60&fit=max&w=930" alt="Interactive" className="interactive-image" />
          <div className="image-overlay">
            <div className="image-overlay-text">
              <h3>Explore More</h3>
              <a href="https://en.wikipedia.org/wiki/Blog" className="image-overlay-text text-white">Click to learn more about blogging.</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
