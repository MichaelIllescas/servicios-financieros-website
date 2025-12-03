import { useState } from 'react';
import { isValidEmail, isValidPhone } from '../services/consultationService';

/**
 * Hook personalizado para la gestión del formulario de consultas
 * Maneja el estado del formulario, validaciones y cambios en los campos
 */
export const useConsultationForm = () => {
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    document: null,
    additionalData: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  /**
   * Maneja los cambios en los inputs del formulario
   */
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

  /**
   * Valida todos los campos del formulario
   * @returns {boolean} True si el formulario es válido
   */
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
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.phone.trim() && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Teléfono inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Resetea el formulario a su estado inicial
   */
  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setShowAdditionalFields(false);
  };

  /**
   * Toggle para mostrar/ocultar campos adicionales
   */
  const toggleAdditionalFields = () => {
    setShowAdditionalFields(prev => !prev);
  };

  return {
    formData,
    errors,
    showAdditionalFields,
    handleInputChange,
    validateForm,
    resetForm,
    toggleAdditionalFields
  };
};
