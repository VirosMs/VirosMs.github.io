import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import TopSite from "./components/TopSite";
import Specialties from "./components/Specialties";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="bg-light-green dark:bg-dark-green bg-[size:10px_10px] bg-dotted-pattern">
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
  )
}

export default App
