import React from 'react';
import styles from './AboutSection.module.css';
import { 
  FaSearchDollar, 
  FaHandshake, 
  FaChartLine, 
  FaUserCheck,
  FaMoneyBillWave,
  FaClock,
  FaShieldAlt,
  FaAward,
  FaCheckCircle
} from 'react-icons/fa';
import { 
  MdCompareArrows, 
  MdTrendingDown 
} from 'react-icons/md';
import { 
  HiLightBulb 
} from 'react-icons/hi';
import { 
  BiSupport 
} from 'react-icons/bi';

const AboutSection = () => {
  return (
    <section id="about-section" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <span className={styles.badge}>¿Qué hacemos?</span>
            <h2 className={styles.title}>
              Conectamos tu necesidad con la mejor oportunidad
            </h2>
            <p className={styles.subtitle}>
              Somos intermediarios especializados que te ayudan a encontrar los mejores precios y condiciones del mercado
            </p>
          </div>

          {/* Explicación visual del modelo */}
          <div className={styles.businessModel}>
            <div className={styles.modelCard}>
              <div className={styles.modelIcon} style={{ background: 'linear-gradient(135deg, #4ECDC4, #44A08D)' }}>
                <FaUserCheck />
              </div>
              <h3 className={styles.modelTitle}>Traés tu cotización</h3>
              <p className={styles.modelText}>
                Ya tenés un precio de un producto o servicio que necesitás
              </p>
              <div className={styles.modelArrow}>
                <MdCompareArrows />
              </div>
            </div>

            <div className={styles.modelCard}>
              <div className={styles.modelIcon} style={{ background: 'linear-gradient(135deg, #6C63FF, #5A52E0)' }}>
                <FaSearchDollar />
              </div>
              <h3 className={styles.modelTitle}>Mejoramos tu negocio</h3>
              <p className={styles.modelText}>
                Buscamos mejorar precio, condiciones o calidad de esa propuesta
              </p>
              <div className={styles.modelArrow}>
                <MdCompareArrows />
              </div>
            </div>

            <div className={styles.modelCard}>
              <div className={styles.modelIcon} style={{ background: 'linear-gradient(135deg, #FF6B35, #F7931E)' }}>
                <FaChartLine />
              </div>
              <h3 className={styles.modelTitle}>Vos ganás más</h3>
              <p className={styles.modelText}>
                Obtienés mejor precio, mejores condiciones o mayor calidad
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className={styles.mainGrid}>
            {/* Explicación principal */}
            <div className={styles.mainContent}>
              <div className={styles.explanation}>
                <div className={styles.explanationIcon}>
                  <HiLightBulb />
                </div>
                <h3 className={styles.explanationTitle}>
                  ¿Cómo funciona nuestro servicio?
                </h3>
                
                <p className={styles.explanationText}>
                  Actuamos como <strong>intermediarios especializados</strong> entre vos y los proveedores. 
                  Ya sea que necesites maquinarias, rodados, tecnología o cualquier producto para tu negocio, 
                  <strong> nosotros hacemos la búsqueda por vos</strong>.
                </p>
                
                <p className={styles.explanationText}>
                  Si ya tenés una cotización, <strong>buscamos mejorarla</strong>. Si no la tenés, 
                  <strong> conseguimos las mejores opciones del mercado</strong> para que tomes 
                  la decisión que más te convenga.
                </p>

                <div className={styles.highlight}>
                  <div className={styles.highlightIcon}>
                    <FaHandshake />
                  </div>
                  <div>
                    <h4 className={styles.highlightTitle}>
                      Nuestro compromiso
                    </h4>
                    <p className={styles.highlightText}>
                      Encontrar la <strong>mejor relación precio-calidad</strong> para que maximices 
                      el valor de tu inversión. No cobramos nada hasta que encuentres la opción perfecta.
                    </p>
                  </div>
                </div>
              </div>

              {/* Proceso paso a paso */}
              <div className={styles.processSection}>
                <h3 className={styles.processTitle}>Nuestro proceso simple</h3>
                
                <div className={styles.steps}>
                  <div className={styles.step}>
                    <div className={styles.stepNumber}>1</div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>Contanos tu necesidad</h4>
                      <p className={styles.stepText}>
                        Describí qué producto o servicio buscás. Si ya tenés precio, mejor aún.
                      </p>
                    </div>
                  </div>

                  <div className={styles.step}>
                    <div className={styles.stepNumber}>2</div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>Buscamos en el mercado</h4>
                      <p className={styles.stepText}>
                        Consultamos nuestra red de proveedores para encontrar las mejores opciones.
                      </p>
                    </div>
                  </div>

                  <div className={styles.step}>
                    <div className={styles.stepNumber}>3</div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>Te presentamos opciones</h4>
                      <p className={styles.stepText}>
                        Recibís cotizaciones comparadas con las mejores condiciones.
                      </p>
                    </div>
                  </div>

                  <div className={styles.step}>
                    <div className={styles.stepNumber}>4</div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>Vos elegís</h4>
                      <p className={styles.stepText}>
                        Decidís la opción que mejor se adapte a tu presupuesto y necesidad.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar con beneficios */}
            <div className={styles.sidebar}>
              <div className={styles.benefitsCard}>
                <h3 className={styles.benefitsTitle}>
                  <FaAward className={styles.benefitsTitleIcon} />
                  Beneficios para vos
                </h3>
                
                <ul className={styles.benefitsList}>
                  <li className={styles.benefit}>
                    <div className={styles.benefitIconWrapper}>
                      <FaMoneyBillWave />
                    </div>
                    <div>
                      <strong>Ahorro real</strong>
                      <span>Mejoramos cualquier cotización que tengas</span>
                    </div>
                  </li>
                  
                  <li className={styles.benefit}>
                    <div className={styles.benefitIconWrapper}>
                      <MdTrendingDown />
                    </div>
                    <div>
                      <strong>Precios mayoristas</strong>
                      <span>Acceso a proveedores con mejores condiciones</span>
                    </div>
                  </li>
                  
                  <li className={styles.benefit}>
                    <div className={styles.benefitIconWrapper}>
                      <FaClock />
                    </div>
                    <div>
                      <strong>Ahorro de tiempo</strong>
                      <span>No perdés tiempo buscando, lo hacemos por vos</span>
                    </div>
                  </li>
                  
                  <li className={styles.benefit}>
                    <div className={styles.benefitIconWrapper}>
                      <BiSupport />
                    </div>
                    <div>
                      <strong>Asesoramiento experto</strong>
                      <span>Te guiamos para tomar la mejor decisión</span>
                    </div>
                  </li>
                  
                  <li className={styles.benefit}>
                    <div className={styles.benefitIconWrapper}>
                      <FaShieldAlt />
                    </div>
                    <div>
                      <strong>Sin compromiso</strong>
                      <span>Consultá gratis, decidís vos si te conviene</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Stats */}
              <div className={styles.statsCard}>
                <h3 className={styles.statsTitle}>Nuestros números</h3>
                
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>15%</span>
                    <span className={styles.statLabel}>Ahorro promedio</span>
                  </div>
                  
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>48h</span>
                    <span className={styles.statLabel}>Tiempo de respuesta</span>
                  </div>
                  
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>+500</span>
                    <span className={styles.statLabel}>Clientes satisfechos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className={styles.finalCta}>
            <h3 className={styles.ctaTitle}>
              ¿Tenés un producto en mente?
            </h3>
            <p className={styles.ctaText}>
              Contanos qué necesitás y te ayudamos a encontrar la mejor opción del mercado
            </p>
            <button 
              className={styles.ctaButton}
              onClick={() => {
                const formElement = document.getElementById('consultation-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Empezar mi consulta gratis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;