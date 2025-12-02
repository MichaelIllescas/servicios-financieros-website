import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para hacer scroll hacia el formulario
  const scrollToForm = () => {
    const formElement = document.getElementById('consultation-form');
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className={styles.hero}>
      {/* Navigation Bar */}
      <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ''}`}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <svg className={styles.logoIcon} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="23" stroke="#E9F0C9" strokeWidth="2" fill="#3B657A"/>
              <path d="M25 10 L35 20 L30 20 L30 30 L20 30 L20 20 L15 20 Z" fill="#E9F0C9"/>
              <rect x="15" y="32" width="20" height="6" rx="1" fill="#E9F0C9"/>
            </svg>
            <span className={styles.logoText}>Portal de Negocios</span>
          </div>
          
          <ul className={styles.navLinks}>
            <li><a href="#inicio" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Inicio</a></li>
            <li><a href="#nosotros" onClick={(e) => { e.preventDefault(); scrollToSection('about-section'); }}>Nosotros</a></li>
            <li><a href="#servicios" onClick={(e) => { e.preventDefault(); scrollToSection('categories-section'); }}>Servicios</a></li>
            <li><a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToForm(); }}>Contacto</a></li>
          </ul>
          
          <button 
            className={styles.navCta}
            onClick={scrollToForm}
            type="button"
          >
            Consultar ahora
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.badge}>
              <span className={styles.badgeText}>✓ Asesoría Profesional</span>
            </div>
            
            <h1 className={styles.title}>
              Tu socio estratégico en
              <span className={styles.titleHighlight}> soluciones financieras</span>
            </h1>
            
            <p className={styles.welcome}>
              Conectamos tus necesidades con las mejores oportunidades del mercado. 
              Te acompañamos en cada paso hacia el éxito de tu proyecto.
            </p>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4" stroke="#E9F0C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="9" stroke="#E9F0C9" strokeWidth="2"/>
                </svg>
                <span>Análisis Personalizado</span>
              </div>
              <div className={styles.feature}>
                <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4" stroke="#E9F0C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="9" stroke="#E9F0C9" strokeWidth="2"/>
                </svg>
                <span>Mejores Tasas</span>
              </div>
              <div className={styles.feature}>
                <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4" stroke="#E9F0C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="9" stroke="#E9F0C9" strokeWidth="2"/>
                </svg>
                <span>Respuesta Rápida</span>
              </div>
            </div>
            
            <div className={styles.ctaGroup}>
              <button 
                className={styles.ctaPrimary}
                onClick={scrollToForm}
                type="button"
              >
                Hacer consulta gratuita
              </button>
              <button 
                className={styles.ctaSecondary}
                onClick={() => scrollToSection('categories-section')}
                type="button"
              >
                Ver servicios
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className={styles.decorativeCircle1}></div>
        <div className={styles.decorativeCircle2}></div>
        <div className={styles.decorativeCircle3}></div>
      </div>
    </section>
  );
};

export default Hero;