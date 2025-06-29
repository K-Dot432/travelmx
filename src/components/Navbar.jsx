import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaTimes, FaSignInAlt } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { VscChromeClose } from 'react-icons/vsc';

const NavbarWithAuth = () => {
  const [navbarState, setNavbarState] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Verificar si hay usuario logueado al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const handleSuccessfulLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setIsLoginOpen(false);
  };

  const handleSuccessfulSignUp = (userData) => {
    console.log('Usuario registrado:', userData);
    setIsSignUpOpen(false);
    // Auto-login después del registro
    handleSuccessfulLogin(userData);
  };

  return (
    <>
      <Nav>
        <div className="brand">
          <div className="container">
            <span>RutasMX</span>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavbarState(true)} />
            )}
          </div>
        </div>

        <ul>
          <li>
            <a href="#home">Principal</a>
          </li>
          <li>
            <a href="#services">Nosotros</a>
          </li>
          <li>
            <a href="#recommend">Lugares</a>
          </li>
          <li>
            <a href="#testimonials">Testimonios</a>
          </li>
        </ul>
        
        <AuthButtons>
          {currentUser ? (
            <>
              <UserWelcome>Hola, {currentUser.nombre.split(' ')[0]}!</UserWelcome>
              <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
            </>
          ) : (
            <>
              <LoginButton onClick={() => setIsLoginOpen(true)}>
                <FaSignInAlt /> Iniciar sesión
              </LoginButton>
              <SignUpButton onClick={() => setIsSignUpOpen(true)}>Regístrate!</SignUpButton>
            </>
          )}
        </AuthButtons>
      </Nav>
      
      <SignUpModal 
        isOpen={isSignUpOpen} 
        onClose={() => setIsSignUpOpen(false)}
        onSuccess={handleSuccessfulSignUp}
        switchToLogin={() => {
          setIsSignUpOpen(false);
          setIsLoginOpen(true);
        }}
      />
      
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleSuccessfulLogin}
        switchToSignUp={() => {
          setIsLoginOpen(false);
          setIsSignUpOpen(true);
        }}
      />
      
      <ResponsiveNav state={navbarState}>
        <ul>
          <li>
            <a href="#home" onClick={() => setNavbarState(false)}>Principal</a>
          </li>
          <li>
            <a href="#services" onClick={() => setNavbarState(false)}>Nosotros</a>
          </li>
          <li>
            <a href="#recommend" onClick={() => setNavbarState(false)}>Lugares</a>
          </li>
          <li>
            <a href="#testimonials" onClick={() => setNavbarState(false)}>Testimonios</a>
          </li>
          <li className="mobile-actions">
            {currentUser ? (
              <>
                <UserWelcomeMobile>Hola, {currentUser.nombre.split(' ')[0]}!</UserWelcomeMobile>
                <LogoutButton onClick={() => {
                  handleLogout();
                  setNavbarState(false);
                }}>
                  Cerrar sesión
                </LogoutButton>
              </>
            ) : (
              <>
                <LoginButton onClick={() => {
                  setNavbarState(false);
                  setIsLoginOpen(true);
                }}>
                  <FaSignInAlt /> Iniciar sesión
                </LoginButton>
                <SignUpButton onClick={() => {
                  setNavbarState(false);
                  setIsSignUpOpen(true);
                }}>
                  Registrarse
                </SignUpButton>
              </>
            )}
          </li>
        </ul>
      </ResponsiveNav>
    </>
  );
};

// Componente Modal de Login
const LoginModal = ({ isOpen, onClose, onSuccess, switchToSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email no válido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (validateForm()) {
      const users = JSON.parse(localStorage.getItem('travelmx_users')) || [];
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        onSuccess(user);
      } else {
        setLoginError('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
      }
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
          <Title>Iniciar Sesión</Title>
          <Subtitle>Ingresa a tu cuenta de RutasMX</Subtitle>
          
          {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
          
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <InputIcon><FaEnvelope /></InputIcon>
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
              <InputIcon><FaLock /></InputIcon>
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
            
            <SubmitButton type="submit">
              Iniciar Sesión
            </SubmitButton>
            
            <LoginFooter>
              ¿No tienes cuenta? <SignUpLink onClick={switchToSignUp}>Regístrate</SignUpLink>
            </LoginFooter>
          </Form>
        </FormContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Componente Modal de Registro
const SignUpModal = ({ isOpen, onClose, onSuccess, switchToLogin }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email no válido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    else if (formData.password.length < 8) newErrors.password = 'Mínimo 8 caracteres';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const userData = {
        ...formData,
        id: Date.now().toString(),
        registeredAt: new Date().toISOString(),
        // Agregar campos adicionales con valores por defecto
        telefono: '',
        fechaNacimiento: '',
        ciudad: '',
        tipoViajero: '',
        intereses: []
      };
      
      // Guardar en localStorage
      const users = JSON.parse(localStorage.getItem('travelmx_users')) || [];
      
      // Verificar si el email ya está registrado
      if (users.some(user => user.email === formData.email)) {
        setErrors({...errors, email: 'Este email ya está registrado'});
        return;
      }
      
      users.push(userData);
      localStorage.setItem('travelmx_users', JSON.stringify(users));
      
      setIsSubmitted(true);
      onSuccess(userData);
      
      setTimeout(() => {
        setFormData({
          nombre: '',
          email: '',
          password: '',
          confirmPassword: ''
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
              <SuccessIcon>🎉</SuccessIcon>
            </SuccessMessage>
          ) : (
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <InputIcon><FaUser /></InputIcon>
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
                <InputIcon><FaEnvelope /></InputIcon>
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
                <InputIcon><FaLock /></InputIcon>
                <Input
                  type="password"
                  name="password"
                  placeholder="Contraseña (mínimo 8 caracteres)"
                  value={formData.password}
                  onChange={handleChange}
                  hasError={!!errors.password}
                />
                {errors.password && <ErrorText>{errors.password}</ErrorText>}
              </InputGroup>
              
              <InputGroup>
                <InputIcon><FaLock /></InputIcon>
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
              
              <SubmitButton type="submit">
                Registrarse
              </SubmitButton>
              
              <SignUpFooter>
                ¿Ya tienes cuenta? <LoginLink onClick={switchToLogin}>Inicia sesión</LoginLink>
              </SignUpFooter>
            </Form>
          )}
        </FormContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Estilos del Navbar
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  .brand {
    .container {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
      font-size: 1.2rem;
      font-weight: 900;
      text-transform: uppercase;
    }
    .toggle {
      display: none;
    }
  }
  
  ul {
    display: flex;
    gap: 1rem;
    list-style-type: none;
    li {
      a {
        text-decoration: none;
        color: #0077b6;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
      &:first-of-type {
        a {
          color: #023e8a;
          font-weight: 900;
        }
      }
    }
  }
  
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    padding: 1rem 2rem;
    .brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .toggle {
        display: block;
      }
    }
    ul {
      display: none;
    }
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    display: none;
  }
`;

const LoginButton = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 1rem;
  border: none;
  color: white;
  background-color: #4cc9f0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: 0.3s ease-in-out;
  
  &:hover {
    background-color: #4361ee;
  }
`;

const SignUpButton = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 1rem;
  border: none;
  color: white;
  background-color: #3a0ca3;
  font-size: 1rem;
  transition: 0.3s ease-in-out;
  
  &:hover {
    background-color: #480ca8;
  }
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 1rem;
  border: none;
  color: white;
  background-color: #f72585;
  font-size: 1rem;
  transition: 0.3s ease-in-out;
  
  &:hover {
    background-color: #b5179e;
  }
`;

const UserWelcome = styled.span`
  color: #3a0ca3;
  font-weight: 500;
  margin-right: 1rem;
`;

const UserWelcomeMobile = styled.span`
  color: #3a0ca3;
  font-weight: 500;
  display: block;
  margin-bottom: 1rem;
`;

const ResponsiveNav = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  top: ${({ state }) => (state ? "50px" : "-400px")};
  background-color: white;
  height: auto;
  width: 100%;
  align-items: center;
  transition: 0.3s ease-in-out;
  padding: 2rem 0;
  ul {
    list-style-type: none;
    width: 100%;
    li {
      width: 100%;
      margin: 1rem 0;
      margin-left: 2rem;
      a {
        text-decoration: none;
        color: #0077b6;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
      &:first-of-type {
        a {
          color: #023e8a;
          font-weight: 900;
        }
      }
      &.mobile-actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2rem;
        button {
          padding: 0.7rem 1.5rem;
          border: none;
          border-radius: 1rem;
          font-size: 1rem;
          cursor: pointer;
          width: 80%;
        }
      }
    }
  }
`;

// Estilos del Modal
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

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
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

const Select = styled.select`
  padding: 1rem;
  border: 1px solid ${props => props.hasError ? '#ff3860' : '#ddd'};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
`;

const CheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  
  input {
    margin: 0;
  }
`;

const ErrorText = styled.span`
  color: #ff3860;
  font-size: 0.8rem;
  margin-top: 0.3rem;
`;

const ErrorMessage = styled.div`
  background: #ff3860;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
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
  margin-top: 1rem;
  
  &:hover {
    background: linear-gradient(135deg, #3a0ca3, #4361ee);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(58, 12, 163, 0.3);
  }
  
  &:active {
    transform: translateY(0);
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

const SuccessIcon = styled.span`
  display: block;
  font-size: 2rem;
  margin-top: 1rem;
`;

const LoginFooter = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #666;
`;

const SignUpFooter = styled.div`
  text-align: center;
  margin: 1rem 0;
  color: #666;
`;

const SignUpLink = styled.span`
  color: #3a0ca3;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginLink = styled.span`
  color: #3a0ca3;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default NavbarWithAuth;