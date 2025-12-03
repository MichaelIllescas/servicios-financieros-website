import { useState } from 'react';
import { sendConsultation } from '../services/consultationService';

/**
 * Hook personalizado para el envío de consultas
 * Maneja el estado del envío, errores y comunicación con la API
 */
export const useConsultationSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  /**
   * Envía la consulta al servidor
   * @param {Object} formData - Datos del formulario
   * @param {boolean} hasAdditionalFields - Si tiene campos adicionales
   * @returns {Promise<Object>} Resultado del envío
   */
  const submitConsultation = async (formData, hasAdditionalFields = false) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await sendConsultation(formData, hasAdditionalFields);
      
      setSubmitStatus('success');
      
      // Mostrar mensaje específico si hay nota sobre simulación
      if (result.note) {
        console.log('ℹ️ ', result.note);
      }
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Error al enviar consulta:', error);
      setSubmitStatus('error');
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Resetea el estado del envío
   */
  const resetSubmitStatus = () => {
    setSubmitStatus(null);
  };

  return {
    isSubmitting,
    submitStatus,
    submitConsultation,
    resetSubmitStatus
  };
};
