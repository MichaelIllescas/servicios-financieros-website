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

const ConsultationForm = () => {
  // Estados del formulario
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

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validaciones del formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.phone.trim() && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Teléfono inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Crear FormData para enviar archivos
      const formDataToSend = new FormData();
      
      // Agregar todos los campos del formulario
      Object.keys(formData).forEach(key => {
        if (key === 'document' && formData[key]) {
          formDataToSend.append('document', formData[key]);
        } else if (key !== 'document') {
          formDataToSend.append(key, formData[key]);
        }
      });

      formDataToSend.append('hasAdditionalFields', showAdditionalFields ? 'true' : 'false');

      // Enviar al endpoint de la API
      const response = await fetch('/api/send-consultation-simple', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitStatus('success');
        
        // Mostrar mensaje específico si hay nota sobre simulación
        if (result.note) {
          console.log('ℹ️ ', result.note);
        }
        
        // Resetear formulario
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
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.formSection} id="consultation-form">
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* Info Section */}
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

          {/* Form Section */}
          <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
            {/* Campos básicos */}
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

            {/* Toggle para campos adicionales */}
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

            {/* Campos adicionales */}
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
                  <label className={styles.label}>Documento (PDF o imagen)</label>
                  <div className={styles.fileInputWrapper}>
                    <FaFileUpload className={styles.fileIcon} />
                    <input
                      type="file"
                      name="document"
                      onChange={handleInputChange}
                      className={styles.fileInput}
                      accept=".pdf,.jpg,.jpeg,.png,.gif"
                      id="fileInput"
                    />
                    <label htmlFor="fileInput" className={styles.fileLabel}>
                      {formData.document ? formData.document.name : 'Seleccionar archivo'}
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Estado del envío */}
            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                <FaCheckCircle /> Tu consulta fue enviada exitosamente. Te contactaremos pronto.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={styles.errorMessageBox}>
                <FaTimesCircle /> Hubo un error al enviar tu consulta. Por favor, intentá nuevamente.
              </div>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Enviando...</>
              ) : (
                <>
                  <FaPaperPlane /> Enviar Consulta
                </>
              )}
            </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;