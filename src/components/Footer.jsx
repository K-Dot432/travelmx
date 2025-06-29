import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { BsLinkedin, BsFacebook, BsArrowUp } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {
  const [loaded, setLoaded] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    setLoaded(true);
    
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <FooterContainer className={loaded ? "visible" : ""}>
      <div className="footer-content">
        <div className="copyright">
          <span>Copyright &copy; {new Date().getFullYear()} RutasMX. Todos los derechos reservados.</span>
          <div className="legal-links">
            <a href="/politica-privacidad">Política de Privacidad</a>
            <a href="/terminos-servicio">Términos de Servicio</a>
          </div>
        </div>
        
        <nav className="footer-nav">
          <ul className="links">
            <li>
              <a href="#hero" aria-label="Ir a sección Principal">Principal</a>
            </li>
            <li>
              <a href="#services" aria-label="Acerca de nosotros">Acerca de nosotros</a>
            </li>
            <li>
              <a href="#recommend" aria-label="Explora nuestros lugares">Lugares</a>
            </li>
            <li>
              <a href="#testimonials" aria-label="Lee testimonios">Testimonios</a>
            </li>
          </ul>
        </nav>
        
        <div className="social-contact">
          <ul className="social__links">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <BsFacebook />
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <AiFillInstagram />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <BsLinkedin />
              </a>
            </li>
          </ul>
          <div className="contact-info">
            <p>contacto@rutasmx.com</p>
            <p>+52 55 1234 5678</p>
          </div>
        </div>
      </div>

      {showScroll && (
        <button 
          className="scroll-top" 
          onClick={scrollToTop}
          aria-label="Volver arriba"
        >
          <BsArrowUp />
        </button>
      )}
    </FooterContainer>
  );
}

// Animación para el botón de scroll
const pulse = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

// Estilos
const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  color: white;
  padding: 3rem 2rem;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .footer-content {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2.5rem;
    align-items: start;
  }

  .copyright {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    span {
      font-size: 0.95rem;
      opacity: 0.9;
    }

    .legal-links {
      display: flex;
      gap: 1.5rem;
      margin-top: 0.5rem;

      a {
        color: white;
        opacity: 0.8;
        font-size: 0.85rem;
        text-decoration: none;
        transition: opacity 0.3s ease;

        &:hover {
          opacity: 1;
          text-decoration: underline;
        }
      }
    }
  }

  .footer-nav {
    display: flex;
    justify-content: center;

    .links {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.2rem;
      list-style-type: none;

      li a {
        color: white;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;
        display: inline-block;
        padding: 0.3rem 0;

        &:hover {
          color: rgba(255, 255, 255, 0.9);
          transform: translateX(5px);
        }

        &::after {
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background: white;
          transition: width 0.3s;
        }

        &:hover::after {
          width: 100%;
        }
      }
    }
  }

  .social-contact {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-end;

    .social__links {
      display: flex;
      gap: 1.5rem;
      list-style-type: none;

      li a {
        color: white;
        font-size: 1.4rem;
        transition: all 0.3s ease;
        display: flex;
        padding: 0.5rem;
        
        &:hover {
          transform: translateY(-3px) scale(1.1);
          color: #d0d8ff;
        }
      }
    }

    .contact-info {
      text-align: right;
      font-size: 0.9rem;
      opacity: 0.9;
      line-height: 1.6;

      p {
        transition: opacity 0.3s ease;
        
        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .scroll-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #4361ee;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    z-index: 100;
    animation: ${pulse} 2s infinite;

    &:hover {
      background: #3a0ca3;
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    svg {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
    text-align: center;

    .footer-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .footer-nav {
      justify-content: center;
      
      .links {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    .social-contact {
      align-items: center;
      
      .contact-info {
        text-align: center;
      }
    }

    .scroll-top {
      width: 45px;
      height: 45px;
      bottom: 1.5rem;
      right: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;

    .footer-nav .links {
      grid-template-columns: 1fr;
    }

    .copyright .legal-links {
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
    }
  }
`;