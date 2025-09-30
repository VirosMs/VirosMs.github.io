
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

  return (
    <div>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <TopSite />
        <Specialties />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;
