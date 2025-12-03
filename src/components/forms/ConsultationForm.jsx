import React from 'react';
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
import { useConsultationForm } from '../../hooks/useConsultationForm';
import { useConsultationSubmit } from '../../hooks/useConsultationSubmit';

const ConsultationForm = () => {
  // Hook para gestión del formulario
  const {
    formData,
    errors,
    showAdditionalFields,
    handleInputChange,
    validateForm,
    resetForm,
    toggleAdditionalFields
  } = useConsultationForm();

  // Hook para envío de consultas
  const {
    isSubmitting,
    submitStatus,
    submitConsultation
  } = useConsultationSubmit();

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await submitConsultation(formData, showAdditionalFields);
    
    if (result.success) {
      resetForm();
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
                onClick={toggleAdditionalFields}
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
                  <label className={styles.label}>Documento (PDF, imagen o Word)</label>
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