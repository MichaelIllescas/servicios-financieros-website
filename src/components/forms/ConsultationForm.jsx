import React, { useState } from 'react';
import styles from './ConsultationForm.module.css';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCommentDots,
  FaPaperPlane,
  FaCheckCircle,
  FaTimesCircle,
  FaFileUpload,
  FaInfoCircle
} from 'react-icons/fa';
import { HiLightBulb } from 'react-icons/hi';
import { MdSecurity } from 'react-icons/md';
import { Loader2, CheckCircle2 } from 'lucide-react';

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    document: null,
    additionalData: ''
  });

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.phone.trim() && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Teléfono inválido';
    }

    if (!formData.message.trim()) newErrors.message = 'El mensaje es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (key === 'document' && formData[key]) {
          formDataToSend.append('document', formData[key]);
        } else if (key !== 'document') {
          formDataToSend.append(key, formData[key]);
        }
      });

      formDataToSend.append('hasAdditionalFields', showAdditionalFields ? 'true' : 'false');

      const response = await fetch('/_send-email.php',  {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          document: null,
          additionalData: ''
        });
        setShowAdditionalFields(false);
        
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error(result.error || 'Error en el envío');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingModal}>
            <div className={styles.spinnerWrapper}>
              <Loader2 className={styles.spinner} />
              <div className={styles.spinnerRing}></div>
            </div>
            <h3 className={styles.loadingTitle}>Enviando tu consulta</h3>
            <p className={styles.loadingText}>Por favor espera un momento...</p>
            <div className={styles.loadingDots}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          </div>
        </div>
      )}

      {/* Success Overlay */}
      {submitStatus === 'success' && (
        <div className={styles.successOverlay}>
          <div className={styles.successModal}>
            <div className={styles.successIconWrapper}>
              <div className={styles.successIcon}>
                <CheckCircle2 />
              </div>
              <div className={styles.successRing}></div>
            </div>
            <h3 className={styles.successTitle}>¡Consulta enviada con éxito!</h3>
            <p className={styles.successText}>
              Hemos recibido tu mensaje correctamente. Te contactaremos a la brevedad.
            </p>
            <div className={styles.successInfo}>
              <p>📧 Revisa tu email para ver la confirmación</p>
            </div>
            <button onClick={() => setSubmitStatus(null)} className={styles.closeButton}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <section className={styles.formSection} id="consultation-form">
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            <div className={styles.infoSection}>
              <span className={styles.badge}>
                <HiLightBulb /> Contacto
              </span>
              <h2 className={styles.title}>¿Tenés una cotización?</h2>
              <p className={styles.subtitle}>
                Envianos tu propuesta actual y te ayudamos a mejorarla. Analizamos precio, condiciones y calidad.
              </p>

              <div className={styles.benefits}>
                <div className={styles.benefit}>
                  <div className={styles.benefitIcon}>
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h4>Respuesta rápida</h4>
                    <p>Te contactamos en menos de 24 horas</p>
                  </div>
                </div>

                <div className={styles.benefit}>
                  <div className={styles.benefitIcon}>
                    <MdSecurity />
                  </div>
                  <div>
                    <h4>100% confidencial</h4>
                    <p>Tus datos están protegidos</p>
                  </div>
                </div>

                <div className={styles.benefit}>
                  <div className={styles.benefitIcon}>
                    <HiLightBulb />
                  </div>
                  <div>
                    <h4>Sin compromiso</h4>
                    <p>Asesoramiento gratuito y sin obligación</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formWrapper}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Nombre *</label>
                    <div className={styles.inputWrapper}>
                      <FaUser className={styles.inputIcon} />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.firstName ? styles.error : ''}`}
                        placeholder="Tu nombre"
                      />
                    </div>
                    {errors.firstName && (
                      <span className={styles.errorMessage}>
                        <FaTimesCircle /> {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Apellido *</label>
                    <div className={styles.inputWrapper}>
                      <FaUser className={styles.inputIcon} />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.lastName ? styles.error : ''}`}
                        placeholder="Tu apellido"
                      />
                    </div>
                    {errors.lastName && (
                      <span className={styles.errorMessage}>
                        <FaTimesCircle /> {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Email *</label>
                    <div className={styles.inputWrapper}>
                      <FaEnvelope className={styles.inputIcon} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.email ? styles.error : ''}`}
                        placeholder="tu@email.com"
                      />
                    </div>
                    {errors.email && (
                      <span className={styles.errorMessage}>
                        <FaTimesCircle /> {errors.email}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Teléfono (opcional)</label>
                    <div className={styles.inputWrapper}>
                      <FaPhone className={styles.inputIcon} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                        placeholder="+54 9 11 1234-5678"
                      />
                    </div>
                    {errors.phone && (
                      <span className={styles.errorMessage}>
                        <FaTimesCircle /> {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Mensaje / Consulta *</label>
                  <div className={styles.inputWrapper}>
                    <FaCommentDots className={styles.inputIcon} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                      placeholder="Describí tu consulta, producto de interés o necesidad específica..."
                      rows={4}
                    />
                  </div>
                  {errors.message && (
                    <span className={styles.errorMessage}>
                      <FaTimesCircle /> {errors.message}
                    </span>
                  )}
                </div>

                <div className={styles.toggleSection}>
                  <button
                    type="button"
                    onClick={() => setShowAdditionalFields(!showAdditionalFields)}
                    className={styles.toggleButton}
                  >
                    <FaInfoCircle />
                    {showAdditionalFields ? 'Ocultar datos adicionales' : 'Agregar datos adicionales'}
                  </button>
                </div>

                {showAdditionalFields && (
                  <div className={styles.additionalFields}>
                    <div className={styles.field}>
                      <label className={styles.label}>Información adicional (opcional)</label>
                      <div className={styles.inputWrapper}>
                        <FaInfoCircle className={styles.inputIcon} />
                        <textarea
                          name="additionalData"
                          value={formData.additionalData}
                          onChange={handleInputChange}
                          className={styles.textarea}
                          placeholder="Información adicional que consideres relevante..."
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label}>Documento (PDF, Word o imagen)</label>
                      <div className={styles.fileInputWrapper}>
                        <FaFileUpload className={styles.fileIcon} />
                        <input
                          type="file"
                          name="document"
                          onChange={handleInputChange}
                          className={styles.fileInput}
                          accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
                          id="fileInput"
                        />
                        <label htmlFor="fileInput" className={styles.fileLabel}>
                          {formData.document ? formData.document.name : 'Seleccionar archivo'}
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className={styles.errorMessageBox}>
                    <FaTimesCircle /> Hubo un error al enviar tu consulta. Por favor, intentá nuevamente.
                  </div>
                )}

                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? <>Enviando...</> : <><FaPaperPlane /> Enviar Consulta</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConsultationForm;