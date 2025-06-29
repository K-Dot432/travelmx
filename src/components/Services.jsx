import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaMoneyBillWave, FaShieldAlt, FaCreditCard, FaMapMarkedAlt } from "react-icons/fa";

export default function Services() {
  const [loaded, setLoaded] = useState(false);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const services = [
    {
      id: 1,
      icon: <FaMoneyBillWave className="service-icon" />,
      title: "Los Mejores Precios",
      description: "Garantizamos los mejores precios del mercado. Si encuentras un precio más bajo, te igualamos.",
      color: "#4cc9f0",
      features: [
        "Garantía de mejor precio",
        "Ofertas exclusivas",
        "Descuentos por temporada"
      ]
    },
    {
      id: 2,
      icon: <FaShieldAlt className="service-icon" />,
      title: "Viajes Seguros",
      description: "Todos nuestros paquetes incluyen seguros de viaje y protocolos de seguridad certificados.",
      color: "#4895ef",
      features: [
        "Seguro médico incluido",
        "Asistencia 24/7",
        "Protocolos COVID-19"
      ]
    },
    {
      id: 3,
      icon: <FaCreditCard className="service-icon" />,
      title: "Pagos Flexibles",
      description: "Múltiples métodos de pago y planes de financiamiento para que viajes sin preocupaciones.",
      color: "#4361ee",
      features: [
        "Hasta 12 MSI",
        "Pago en divisas",
        "Sin comisiones"
      ]
    },
    {
      id: 4,
      icon: <FaMapMarkedAlt className="service-icon" />,
      title: "Asesoría Personalizada",
      description: "Nuestros expertos en viajes crean itinerarios personalizados según tus preferencias.",
      color: "#3a0ca3",
      features: [
        "Itinerarios a medida",
        "Recomendaciones exclusivas",
        "Atención personal"
      ]
    }
  ];

  return (
    <Section id="services" className={loaded ? "visible" : ""}>
      <div className="header">
        <h2>Nuestros Servicios</h2>
        <p className="subtitle">Todo lo que necesitas para disfrutar de un viaje perfecto</p>
      </div>
      
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard 
            key={service.id}
            serviceColor={service.color}
            onMouseEnter={() => setActiveService(service.id)}
            onMouseLeave={() => setActiveService(null)}
            className={activeService === service.id ? "active" : ""}
          >
            <div className="card-content">
              <div className="icon-container">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p className="description">{service.description}</p>
              
              <div className="features">
                {service.features.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
              
              <button className="learn-more">
                Saber más
                <span className="arrow">→</span>
              </button>
            </div>
          </ServiceCard>
        ))}
      </div>
    </Section>
  );
}

// Componente de tarjeta separado para mejor rendimiento
const ServiceCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 1.5rem;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: ${props => props.serviceColor};
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: -1;
  }
  
  &:hover, &.active {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    
    &::before {
      height: 100%;
      opacity: 0.1;
    }
    
    .icon-container {
      transform: scale(1.1);
      background-color: ${props => props.serviceColor};
      
      .service-icon {
        color: white;
      }
    }
    
    .learn-more {
      background-color: ${props => props.serviceColor};
      color: white;
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .card-content {
    position: relative;
    z-index: 2;
  }
  
  .icon-container {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    
    .service-icon {
      font-size: 2rem;
      color: ${props => props.serviceColor};
      transition: all 0.3s ease;
    }
  }
  
  h3 {
    font-size: 1.4rem;
    color: #023e8a;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 2px;
      background-color: ${props => props.serviceColor};
      transition: width 0.3s ease;
    }
  }
  
  &:hover h3::after {
    width: 80px;
  }
  
  .description {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }
  
  .features {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    
    .feature-tag {
      background-color: rgba(255, 255, 255, 0.7);
      color: ${props => props.serviceColor};
      padding: 0.3rem 0.8rem;
      border-radius: 2rem;
      font-size: 0.8rem;
      font-weight: 500;
      border: 1px solid ${props => props.serviceColor};
    }
  }
  
  .learn-more {
    padding: 0.7rem 1.5rem;
    background: transparent;
    border: 2px solid ${props => props.serviceColor};
    color: ${props => props.serviceColor};
    border-radius: 2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transform: translateY(10px);
    opacity: 0.9;
    
    .arrow {
      transition: transform 0.3s ease;
    }
    
    &:hover {
      .arrow {
        transform: translateX(3px);
      }
    }
  }
`;

const Section = styled.section`
  padding: 6rem 2rem;
  background-color: white;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .header {
    text-align: center;
    margin-bottom: 4rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    
    h2 {
      font-size: 2.8rem;
      color: #023e8a;
      margin-bottom: 1rem;
      line-height: 1.2;
      
      @media (max-width: 768px) {
        font-size: 2.2rem;
      }
    }
    
    .subtitle {
      color: #666;
      font-size: 1.2rem;
      line-height: 1.6;
      
      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2.5rem;
    max-width: 1200px;
    margin: 0 auto;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 0 1rem;
    }
  }
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;