import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Hydra from './pages/Hydra';
import SyncSeries from './pages/SyncSeries';
import SyncBoot from './pages/SyncBoot';
import SyncCMS from './pages/SyncCMS';
import SyncAPIM from './pages/SyncAPIM';
import SyncEta from './pages/SyncEta';
import UseCases from './pages/UseCases';
import Company from './pages/Company';
import Contact from './pages/Contact';
import Layout from './layout/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { detectLanguage } from './utils/languageDetector';
import './styles/global.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const LanguageRedirect = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleRedirect = async () => {
      const path = location.pathname;
      const langPaths = ['/ko', '/en', '/jp'];
      const hasLang = langPaths.some(lp => path.startsWith(lp));

      if (hasLang) {
        setIsReady(true);
        return;
      }

      // Check if we have a detected language in this session
      let targetLang = sessionStorage.getItem('detectedLang');
      
      if (!targetLang) {
        targetLang = await detectLanguage();
        sessionStorage.setItem('detectedLang', targetLang);
      }

      // If the path is just '/', redirect to /targetLang
      // If it's something like /hydra, redirect to /targetLang/hydra
      const newPath = `/${targetLang}${path === '/' ? '' : path}`;
      
      if (location.pathname !== newPath) {
        navigate(newPath, { replace: true });
      }
      setIsReady(true);
    };

    handleRedirect();
  }, [location.pathname, navigate]);

  if (!isReady) return null;
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <LanguageRedirect>
          <Routes>
            <Route path="/:lang" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="hydra" element={<Hydra />} />
              <Route path="sync-series" element={<SyncSeries />} />
              <Route path="syncboot" element={<SyncBoot />} />
              <Route path="synccms" element={<SyncCMS />} />
              <Route path="syncapim" element={<SyncAPIM />} />
              <Route path="synceta" element={<SyncEta />} />
              <Route path="use-cases" element={<UseCases />} />
              <Route path="company" element={<Company />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/ko" replace />} />
          </Routes>
        </LanguageRedirect>
      </Router>
    </ThemeProvider>
  );
}

export default App;