import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { lang } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const changeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    if (pathParts.length > 1 && ['ko', 'en', 'jp'].includes(pathParts[1])) {
      pathParts[1] = newLang;
      navigate(pathParts.join('/'));
    } else {
       navigate(`/${newLang}`);
    }
    setIsMobileMenuOpen(false);
  };

  const currentLang = lang || 'ko';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to={`/${currentLang}`} onClick={closeMobileMenu}>
            <img 
              src="/empasy-logo.svg"
              alt="EMPASY Logo" 
              className="logo-img"
            />
          </Link>
        </div>

        <button className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to={`/${currentLang}/hydra`} onClick={closeMobileMenu}>{t('nav.aiInfra')}</Link></li>
            <li><Link to={`/${currentLang}/synceta`} onClick={closeMobileMenu}>{t('nav.synceta')}</Link></li>
            <li 
              className="dropdown"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="dropdown-trigger">
                <Link to={`/${currentLang}/sync-series`} onClick={closeMobileMenu}>{t('nav.syncSeries')}</Link>
                <button className="dropdown-toggle-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>▼</button>
              </div>
              <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <li><Link to={`/${currentLang}/sync-series`} onClick={closeMobileMenu}>{t('nav.intro')}</Link></li>
                <li><Link to={`/${currentLang}/syncboot`} onClick={closeMobileMenu}>{t('nav.syncboot')}</Link></li>
                <li><Link to={`/${currentLang}/synccms`} onClick={closeMobileMenu}>{t('nav.synccms')}</Link></li>
                <li><Link to={`/${currentLang}/syncapim`} onClick={closeMobileMenu}>{t('nav.syncapim')}</Link></li>
                <li><Link to={`/${currentLang}/synceta`} onClick={closeMobileMenu}>{t('nav.synceta')}</Link></li>
              </ul>
            </li>
            <li><Link to={`/${currentLang}/use-cases`} onClick={closeMobileMenu}>{t('nav.useCases')}</Link></li>
            <li><Link to={`/${currentLang}/company`} onClick={closeMobileMenu}>{t('nav.company')}</Link></li>
            <li><Link to={`/${currentLang}/contact`} className="contact-nav-link" onClick={closeMobileMenu}>{t('nav.contact')}</Link></li>
          </ul>
          
          <div className="mobile-header-actions">
            <div className="lang-switcher">
              <span onClick={() => changeLanguage('ko')} style={{ fontWeight: currentLang === 'ko' ? 'bold' : 'normal', color: currentLang === 'ko' ? 'var(--primary-color)' : 'inherit' }}>KO</span> | 
              <span onClick={() => changeLanguage('en')} style={{ fontWeight: currentLang === 'en' ? 'bold' : 'normal', color: currentLang === 'en' ? 'var(--primary-color)' : 'inherit' }}> EN</span> | 
              <span onClick={() => changeLanguage('jp')} style={{ fontWeight: currentLang === 'jp' ? 'bold' : 'normal', color: currentLang === 'jp' ? 'var(--primary-color)' : 'inherit' }}> JP</span>
            </div>
          </div>
        </nav>

        <div className="header-actions">
          <div className="lang-switcher">
            <span onClick={() => changeLanguage('ko')} style={{ fontWeight: currentLang === 'ko' ? 'bold' : 'normal', color: currentLang === 'ko' ? 'var(--primary-color)' : 'inherit' }}>KO</span> | 
            <span onClick={() => changeLanguage('en')} style={{ fontWeight: currentLang === 'en' ? 'bold' : 'normal', color: currentLang === 'en' ? 'var(--primary-color)' : 'inherit' }}> EN</span> | 
            <span onClick={() => changeLanguage('jp')} style={{ fontWeight: currentLang === 'jp' ? 'bold' : 'normal', color: currentLang === 'jp' ? 'var(--primary-color)' : 'inherit' }}> JP</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;