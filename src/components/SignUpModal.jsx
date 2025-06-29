import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

const SignUpModal = ({ isOpen, onClose, onSuccess }) => {
  // Estados para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    fechaNacimiento: '',
    ciudad: ''
  });

  // Estado para errores de validación
  const [errors, setErrors] = useState({});
  // Estado para éxito del registro
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }
    
    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    }
    
    if (!formData.ciudad.trim()) {
      newErrors.ciudad = 'La ciudad es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Guardar usuario en localStorage
  const saveUserToLocalStorage = (userData) => {
    const users = JSON.parse(localStorage.getItem('travelmx_users')) || [];
    users.push(userData);
    localStorage.setItem('travelmx_users', JSON.stringify(users));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simular guardado en "base de datos" (localStorage)
      const userData = {
        ...formData,
        id: Date.now().toString(),
        registeredAt: new Date().toISOString()
      };
      
      saveUserToLocalStorage(userData);
      console.log('Usuario registrado:', userData);
      
      setIsSubmitted(true);
      onSuccess(userData);
      
      // Limpiar el formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          nombre: '',
          email: '',
          password: '',
          confirmPassword: '',
          telefono: '',
          fechaNacimiento: '',
          ciudad: ''
        });
        setIsSubmitted(false);
        onClose();
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        
        <FormContainer>
          <Title>Crear Cuenta</Title>
          <Subtitle>Únete a nuestra comunidad de viajeros</Subtitle>
          
          {isSubmitted ? (
            <SuccessMessage>
              ¡Registro exitoso! Bienvenido a RutasMX.
            </SuccessMessage>
          ) : (
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <InputIcon>
                  <FaUser />
                </InputIcon>
                <Input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  value={formData.nombre}
                  onChange={handleChange}
                  hasError={!!errors.nombre}
                />
                {errors.nombre && <ErrorText>{errors.nombre}</ErrorText>}
              </InputGroup>
              
              <InputGroup>
                <InputIcon>
                  <FaEnvelope />
                </InputIcon>
                <Input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  hasError={!!errors.email}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </InputGroup>
              
              <InputGroup>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <Input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  hasError={!!errors.password}
                />
                {errors.password && <ErrorText>{errors.password}</ErrorText>}
              </InputGroup>
              
              <InputGroup>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  hasError={!!errors.confirmPassword}
                />
                {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
              </InputGroup>
              
              <InputGroup>
                <InputIcon>
                  <FaPhone />
                </InputIcon>
                <Input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  hasError={!!errors.telefono}
                />
                {errors.telefono && <ErrorText>{errors.telefono}</ErrorText>}
              </InputGroup>
              
              <InputGroup>
                <InputIcon>
                  <MdDateRange />
                </InputIcon>
                <Input
                  type="date"
                  name="fechaNacimiento"
                  placeholder="Fecha de nacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  hasError={!!errors.fechaNacimiento}
                />
                {errors.fechaNacimiento && <ErrorText>{errors.fechaNacimiento}</ErrorText>}
              </InputGroup>
              
              <InputGroup>
                <InputIcon>
                  <FaMapMarkerAlt />
                </InputIcon>
                <Input
                  type="text"
                  name="ciudad"
                  placeholder="Ciudad de residencia"
                  value={formData.ciudad}
                  onChange={handleChange}
                  hasError={!!errors.ciudad}
                />
                {errors.ciudad && <ErrorText>{errors.ciudad}</ErrorText>}
              </InputGroup>
              
              <Terms>
                <input 
                  type="checkbox" 
                  id="terms" 
                  required 
                  style={{ marginRight: '0.5rem' }}
                />
                <label htmlFor="terms">
                  Acepto los <a href="/terminos">Términos y Condiciones</a> y la <a href="/privacidad">Política de Privacidad</a>
                </label>
              </Terms>
              
              <SubmitButton type="submit">
                Registrarse
              </SubmitButton>
              
              <LoginLink>
                ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
              </LoginLink>
            </Form>
          )}
        </FormContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Estilos con styled-components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    color: #333;
  }
`;

const FormContainer = styled.div`
  padding: 2.5rem;
`;

const Title = styled.h1`
  color: #3a0ca3;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: #666;
`;

const Input = styled.input`
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid ${props => props.hasError ? '#ff3860' : '#ddd'};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const ErrorText = styled.span`
  color: #ff3860;
  font-size: 0.8rem;
  margin-top: 0.3rem;
`;

const Terms = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: #666;
  
  a {
    color: #4361ee;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  
  &:hover {
    background: linear-gradient(135deg, #3a0ca3, #4361ee);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(58, 12, 163, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const LoginLink = styled.p`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  
  a {
    color: #4361ee;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SuccessMessage = styled.div`
  background: #48c774;
  color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 500;
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export default SignUpModal;