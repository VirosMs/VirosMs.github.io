import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    // Aplicar tema al montar
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/panel-gestion" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
