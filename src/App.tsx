
import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import TopSite from './components/TopSite';
import Specialties from './components/Specialties';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const sections = [
      { id: 'home', title: 'virosms - Home' },
      { id: 'specialties', title: 'virosms - Specialties' },
      { id: 'about', title: 'virosms - About' },
      { id: 'portfolio', title: 'virosms - Portfolio' },
      { id: 'contact', title: 'virosms - Contact' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.id === entry.target.id);
            if (section) {
              document.title = section.title;
            }
          }
        });
      },
      { threshold: 0.5 } // Update title when 50% of the section is visible
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup observer on component unmount
    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <div>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <div id="home"><TopSite /></div>
        <div id="specialties"><Specialties /></div>
        <div id="about"><About /></div>
        <div id="portfolio"><Portfolio /></div>
        <div id="contact"><Contact /></div>
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;
