import React from 'react';
import styles from './Footer.module.css';
import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhone, 
  FaClock,
  FaMapMarkerAlt,
  FaArrowUp,
  FaLinkedin,
  FaInstagram
} from 'react-icons/fa';
import { 
  HiLightBulb, 
  HiShieldCheck 
} from 'react-icons/hi';
import { 
  MdBusiness 
} from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Función para hacer scroll a secciones
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Función para scroll al inicio
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.footerMain}>
          {/* Company Info */}
          <div className={styles.companySection}>
            <div className={styles.logo}>
              {/* Logo SVG */}
              <svg className={styles.logoIcon} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E9F0C9" />
                    <stop offset="100%" stopColor="#3B657A" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#footerLogoGradient)" opacity="0.1"/>
                <path d="M50 20 L70 40 L70 70 L50 90 L30 70 L30 40 Z" 
                      fill="none" 
                      stroke="url(#footerLogoGradient)" 
                      strokeWidth="3"/>
                <circle cx="50" cy="50" r="10" fill="url(#footerLogoGradient)"/>
                <path d="M50 30 L50 42" stroke="url(#footerLogoGradient)" strokeWidth="2.5"/>
                <path d="M50 58 L50 70" stroke="url(#footerLogoGradient)" strokeWidth="2.5"/>
                <path d="M37 50 L42 50" stroke="url(#footerLogoGradient)" strokeWidth="2.5"/>
                <path d="M58 50 L63 50" stroke="url(#footerLogoGradient)" strokeWidth="2.5"/>
              </svg>
              <div>
                <h3 className={styles.companyName}>Portal de Negocios</h3>
                <p className={styles.tagline}>
                  Mejoramos tu cotización, vos ganás más
                </p>
              </div>
            </div>
            
            <p className={styles.description}>
              Intermediarios especializados que conectan tu necesidad con las mejores oportunidades del mercado. 
              Trabajamos para mejorar tus propuestas actuales.
            </p>

            {/* Social Links */}
            <div className={styles.socialLinks}>
              <a 
                href="https://wa.me/5492923530179" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              
              <a 
                href="mailto:info@imperial-net.com"
                className={styles.socialLink}
                aria-label="Email"
              >
                <FaEnvelope />
              </a>

              <a 
                href="#" 
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>

              <a 
                href="#" 
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className={styles.navigation}>
            <h4 className={styles.navTitle}>Navegación</h4>
            <ul className={styles.navList}>
              <li>
                <button 
                  onClick={scrollToTop}
                  className={styles.navLink}
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('consultation-form')}
                  className={styles.navLink}
                >
                  Consulta
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const aboutElement = document.querySelector('[class*="aboutSection"]');
                    if (aboutElement) {
                      aboutElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={styles.navLink}
                >
                  Nosotros
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const categoriesElement = document.querySelector('[class*="categoriesSection"]');
                    if (categoriesElement) {
                      categoriesElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={styles.navLink}
                >
                  Categorías
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <h4 className={styles.contactTitle}>Contacto</h4>
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <div className={styles.contactContent}>
                  <span className={styles.contactLabel}>Email</span>
                  <a href="mailto:info@imperial-net.com" className={styles.contactValue}>
                    info@imperial-net.com
                  </a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <div className={styles.contactContent}>
                  <span className={styles.contactLabel}>Teléfono</span>
                  <a href="tel:+5492923530179" className={styles.contactValue}>
                    +54 9 292 353-0179
                  </a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <FaClock className={styles.contactIcon} />
                <div className={styles.contactContent}>
                  <span className={styles.contactLabel}>Horario</span>
                  <span className={styles.contactValue}>Lun a Vie: 9:00 - 18:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className={styles.quickInfo}>
            <h4 className={styles.quickInfoTitle}>Por qué elegirnos</h4>
            <div className={styles.features}>
              <div className={styles.feature}>
                <HiLightBulb className={styles.featureIcon} />
                <span>Asesoramiento experto</span>
              </div>
              <div className={styles.feature}>
                <HiShieldCheck className={styles.featureIcon} />
                <span>100% confiable</span>
              </div>
              <div className={styles.feature}>
                <MdBusiness className={styles.featureIcon} />
                <span>Red empresarial amplia</span>
              </div>
            </div>
            <div className={styles.partnerInfo}>
              <p className={styles.partnerText}>
                En colaboración con <strong>Grupo Alpes</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className={styles.legalSection}>
          <div className={styles.legalLinks}>
            <a 
              href="/terminos-y-condiciones" 
              className={styles.legalLink}
            >
              Términos y Condiciones
            </a>
            <a 
              href="/politica-de-privacidad" 
              className={styles.legalLink}
            >
              Política de Privacidad
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <div className={styles.copyrightContent}>
            <p className={styles.copyrightText}>
              © {currentYear} <strong>Portal de Negocios</strong>. Todos los derechos reservados.
            </p>
            <p className={styles.copyrightSubtext}>
              Optimizando inversiones y conectando oportunidades
            </p>
          </div>
          
          {/* Back to Top Button */}
          <button 
            onClick={scrollToTop}
            className={styles.backToTop}
            aria-label="Volver al inicio"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>

      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
      </div>
    </footer>
  );
};

export default Footer;