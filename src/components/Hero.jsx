import React, { useState } from "react";
import styled from "styled-components";
import homeImage from "../assets/hero.png";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const handleSearch = () => {
    // Lógica para manejar la búsqueda
    console.log({ searchQuery, checkInDate, checkOutDate });
  };

  return (
    <Section id="hero">
      <div className="background">
        <img src={homeImage} alt="Destino de viaje paradisíaco" />
      </div>
      <div className="content">
        <div className="title">
          <h1>DESCUBRE EL MUNDO CON NOSOTROS</h1>
          <p>
            Encuentra las mejores experiencias de viaje a precios increíbles. 
            Vive aventuras inolvidables con nuestras ofertas exclusivas.
          </p>
        </div>
        <div className="search">
          <div className="container">
            <label htmlFor="destination">¿A dónde quieres viajar?</label>
            <input 
              id="destination"
              type="text" 
              placeholder="Ej: Cancún, París, Tokio"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="container">
            <label htmlFor="check-in">Fecha de llegada</label>
            <input 
              id="check-in"
              type="date" 
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="container">
            <label htmlFor="check-out">Fecha de salida</label>
            <input 
              id="check-out"
              type="date" 
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              min={checkInDate || new Date().toISOString().split('T')[0]}
            />
          </div>
          <button onClick={handleSearch}>Buscar Viajes</button>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  max-height: 800px;
  margin-top: 0;

  .background {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(60%);
    }
  }
  
  .content {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 3;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 0 1rem;
    
    .title {
      color: white;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      
      h1 {
        font-size: 3.5rem;
        letter-spacing: 0.2rem;
        margin-bottom: 1rem;
        animation: fadeInDown 1s ease;
      }
      
      p {
        text-align: center;
        padding: 0 20vw;
        margin-top: 0.5rem;
        font-size: 1.3rem;
        line-height: 1.6;
        animation: fadeInUp 1s ease;
      }
    }
    
    .search {
      display: flex;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 1.5rem;
      border-radius: 0.8rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      width: 80%;
      max-width: 1000px;
      animation: fadeIn 1.5s ease;
      
      .container {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        padding: 0 1.5rem;
        flex: 1;
        
        label {
          font-size: 1rem;
          color: #03045e;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        
        input {
          background-color: transparent;
          border: none;
          border-bottom: 2px solid #4361ee;
          width: 100%;
          padding: 0.5rem 0;
          color: #333;
          font-size: 1rem;
          
          &::placeholder {
            color: #666;
            opacity: 0.7;
          }
          
          &:focus {
            outline: none;
            border-bottom-color: #023e8a;
          }
        }
      }
      
      button {
        padding: 1rem 2rem;
        cursor: pointer;
        border-radius: 0.5rem;
        border: none;
        color: white;
        background: linear-gradient(135deg, #4361ee, #3a0ca3);
        font-size: 1.1rem;
        font-weight: 600;
        text-transform: uppercase;
        transition: all 0.3s ease;
        align-self: center;
        margin-left: 1rem;
        
        &:hover {
          background: linear-gradient(135deg, #3a0ca3, #4361ee);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        &:active {
          transform: translateY(0);
        }
      }
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media screen and (max-width: 980px) {
    height: auto;
    min-height: 600px;
    
    .content {
      .title {
        h1 {
          font-size: 2.5rem;
        }
        p {
          padding: 0 5vw;
          font-size: 1.1rem;
        }
      }
      
      .search {
        flex-direction: column;
        width: 90%;
        padding: 1.5rem;
        gap: 1.5rem;
        
        .container {
          padding: 0;
          width: 100%;
        }
        
        button {
          width: 100%;
          margin: 1rem 0 0 0;
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    .content {
      .title {
        h1 {
          font-size: 2rem;
        }
        p {
          font-size: 1rem;
        }
      }
    }
  }
`;