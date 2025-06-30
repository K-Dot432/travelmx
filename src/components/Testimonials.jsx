import React, { useState, useEffect } from "react";
import styled from "styled-components";
import avatarImage from "../assets/avatar.png"; // Usa WebP

export default function Testimonials() {
  const [loaded, setLoaded] = useState(false);
  const [testimonials] = useState([
    {
      id: 1,
      quote: "Excelente servicio, nos ayudaron a planear el viaje perfecto para nuestra luna de miel.",
      name: "Ana Martínez",
      role: "Clienta satisfecha"
    },
    {
      id: 2,
      quote: "Nunca había tenido una experiencia tan personalizada. ¡Volveré a viajar con ellos!",
      name: "Carlos Rodríguez",
      role: "Viajero frecuente"
    },
    {
      id: 3,
      quote: "Los precios son increíbles y el trato es excepcional. 100% recomendado.",
      name: "Luisa Fernández",
      role: "Bloggera de viajes"
    }
  ]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Section id="testimonials" className={loaded ? "visible" : ""}>
      <div className="title">
        <h2>Reseñas de Clientes</h2>
        <p>Lo que nuestros clientes dicen sobre nosotros</p>
      </div>
      <div className="testimonials">
        {testimonials.map((testimonial) => (
          <div className="testimonial" key={testimonial.id}>
            <p>{testimonial.quote}</p>
            <div className="info">
              <img 
                src={avatarImage} 
                alt={testimonial.name} 
                loading="lazy"
                width="60"
                height="60"
              />
              <div className="details">
                <h4>{testimonial.name}</h4>
                <span>{testimonial.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 5rem 0;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .title {
    text-align: center;
    margin-bottom: 3rem;
    
    h2 {
      font-size: 2.5rem;
      color: #023e8a;
      margin-bottom: 1rem;
    }
    
    p {
      color: #666;
      font-size: 1.1rem;
    }
  }

  .testimonials {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 0 2rem;
    max-width: 1200px;
    margin: 0 auto;

    .testimonial {
      background-color: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }

      p {
        color: #555;
        line-height: 1.6;
        font-style: italic;
        margin-bottom: 1.5rem;
      }

      .info {
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
          border-radius: 50%;
          width: 60px;
          height: 60px;
          object-fit: cover;
        }

        .details {
          h4 {
            color: #023e8a;
            margin-bottom: 0.3rem;
          }

          span {
            color: #666;
            font-size: 0.9rem;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    margin: 3rem 0;
    
    .title {
      h2 {
        font-size: 2rem;
      }
    }

    .testimonials {
      grid-template-columns: 1fr;
      padding: 0 1rem;
    }
  }
`;