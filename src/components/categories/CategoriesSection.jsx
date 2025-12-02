import React from 'react';
import styles from './CategoriesSection.module.css';
import { 
  FaTruck, 
  FaTools, 
  FaIndustry, 
  FaLaptop, 
  FaCog,
  FaBolt,
  FaBoxes,
  FaCircle
} from 'react-icons/fa';
import { 
  GiMechanicalArm, 
  GiCarWheel 
} from 'react-icons/gi';
import { 
  MdConstruction 
} from 'react-icons/md';
import { HiArrowRight } from 'react-icons/hi';

const CategoriesSection = () => {
  // Datos de las categorías con iconos profesionales e imágenes
  const categories = [
    {
      id: 1,
      title: 'Maquinarias',
      description: 'Equipos industriales y de construcción de última generación',
      icon: GiMechanicalArm,
      color: '#FF6B35',
      gradient: 'linear-gradient(135deg, #FF6B35, #F7931E)',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&auto=format&q=80'
    },
    {
      id: 2,
      title: 'Rodados',
      description: 'Vehículos comerciales y particulares para todo tipo de negocio',
      icon: FaTruck,
      color: '#4ECDC4',
      gradient: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop&auto=format&q=80'
    },
    {
      id: 3,
      title: 'Herramientas',
      description: 'Equipamiento profesional y especializado de alta calidad',
      icon: FaTools,
      color: '#95E1D3',
      gradient: 'linear-gradient(135deg, #95E1D3, #38B2AC)',
      image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop&auto=format&q=80'
    },
    {
      id: 4,
      title: 'Neumáticos',
      description: 'Cubiertas y sistemas de rodamiento para todo tipo de vehículos',
      icon: GiCarWheel,
      color: '#5D5C61',
      gradient: 'linear-gradient(135deg, #5D5C61, #2C3E50)',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format&q=80'
    },
    {
      id: 5,
      title: 'Materiales de construcción',
      description: 'Insumos premium para obras y construcciones de todo tipo',
      icon: MdConstruction,
      color: '#E63946',
      gradient: 'linear-gradient(135deg, #E63946, #C23B3B)',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop&auto=format&q=80'
    },
    {
      id: 6,
      title: 'Instalaciones',
      description: 'Sistemas y equipos de instalación eléctrica e industrial',
      icon: FaBolt,
      color: '#F4A261',
      gradient: 'linear-gradient(135deg, #F4A261, #E76F51)',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop&auto=format&q=80'
    },
    {
      id: 7,
      title: 'Tecnología',
      description: 'Equipos informáticos y soluciones tecnológicas empresariales',
      icon: FaLaptop,
      color: '#6C63FF',
      gradient: 'linear-gradient(135deg, #6C63FF, #5A52E0)',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&auto=format&q=80'
    },
    {
      id: 8,
      title: 'Equipamiento',
      description: 'Mobiliario y equipos especializados para tu empresa',
      icon: FaBoxes,
      color: '#2A9D8F',
      gradient: 'linear-gradient(135deg, #2A9D8F, #264653)',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format&q=80'
    }
  ];

  // Función para hacer scroll al formulario
  const scrollToForm = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const formElement = document.getElementById('consultation-form');
    if (formElement) {
      const navbarHeight = 80; // Altura aproximada del navbar
      const elementPosition = formElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="categories-section" className={styles.categoriesSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Nuestras Categorías</h2>
          <p className={styles.subtitle}>
            Trabajamos con una amplia gama de productos y servicios para encontrar 
            la mejor opción para tu inversión o compra
          </p>
        </div>

        {/* Grid de categorías */}
        <div className={styles.categoriesGrid}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.id} 
                className={styles.categoryCard}
                onClick={(e) => scrollToForm(e)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollToForm(e);
                  }
                }}
              >
                {/* Background Image */}
                <div className={styles.cardBackground}>
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className={styles.backgroundImage}
                    loading="lazy"
                  />
                  <div className={styles.imageOverlay}></div>
                </div>

                {/* Icon Container */}
                <div 
                  className={styles.iconContainer}
                  style={{ background: category.gradient }}
                >
                  <IconComponent className={styles.categoryIcon} />
                  <div className={styles.iconBg}></div>
                </div>

                {/* Contenido */}
                <div className={styles.cardContent}>
                  <h3 className={styles.categoryTitle}>{category.title}</h3>
                  <p className={styles.categoryDescription}>{category.description}</p>
                  
                  <button 
                    className={styles.consultButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToForm(e);
                    }}
                    type="button"
                  >
                    <span>Consultar ahora</span>
                    <HiArrowRight className={styles.arrowIcon} />
                  </button>
                </div>

                {/* Decorative elements */}
                <div className={styles.decorativeDot1}></div>
                <div className={styles.decorativeDot2}></div>
                <div className={styles.decorativeDot3}></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action adicional */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaLeft}>
              <div className={styles.ctaIconWrapper}>
                <svg className={styles.ctaIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.ctaBadge}>
                <span>✨ Atención Personalizada</span>
              </div>
            </div>
            
            <div className={styles.ctaRight}>
              <h3 className={styles.ctaTitle}>¿No encontrás lo que buscás?</h3>
              <p className={styles.ctaText}>
                Trabajamos con una red amplia de proveedores en todo el país. 
                Consultanos por <strong>cualquier producto o servicio</strong> que necesites para tu negocio.
              </p>
              
              <div className={styles.ctaFeatures}>
                <div className={styles.ctaFeature}>
                  <svg className={styles.ctaFeatureIcon} viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#E9F0C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Respuesta en 24hs</span>
                </div>
                <div className={styles.ctaFeature}>
                  <svg className={styles.ctaFeatureIcon} viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#E9F0C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Sin compromiso</span>
                </div>
                <div className={styles.ctaFeature}>
                  <svg className={styles.ctaFeatureIcon} viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#E9F0C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Mejores precios</span>
                </div>
              </div>
              
              <button 
                className={styles.ctaButton}
                onClick={(e) => scrollToForm(e)}
                type="button"
              >
                <span>Hacer consulta personalizada</span>
                <HiArrowRight className={styles.ctaButtonIcon} />
              </button>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className={styles.ctaCircle1}></div>
          <div className={styles.ctaCircle2}></div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;