/**
 * Servicio para el manejo de consultas
 * Gestiona la comunicación con la API para envío de consultas
 */

/**
 * Envía una consulta al servidor
 * @param {Object} formData - Datos del formulario
 * @param {boolean} hasAdditionalFields - Indica si tiene campos adicionales
 * @returns {Promise<Object>} Respuesta del servidor
 */
export const sendConsultation = async (formData, hasAdditionalFields = false) => {
  try {
    // Crear FormData para enviar archivos
    const formDataToSend = new FormData();
    
    // Agregar todos los campos del formulario
    Object.keys(formData).forEach(key => {
      if (key === 'document' && formData[key]) {
        formDataToSend.append('document', formData[key]);
      } else if (key !== 'document' && formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    formDataToSend.append('hasAdditionalFields', hasAdditionalFields ? 'true' : 'false');

    // Enviar al endpoint de la API
    const response = await fetch('/api/send-consultation-simple', {
      method: 'POST',
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error en el envío');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al enviar consulta:', error);
    throw error;
  }
};

/**
 * Valida el formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Valida el formato de teléfono
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} True si es válido
 */
export const isValidPhone = (phone) => {
  return /^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone);
};
