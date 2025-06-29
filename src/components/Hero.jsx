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
          <div className="search-container">
            <div className="input-group">
              <label htmlFor="destination">¿A dónde quieres viajar?</label>
              <input 
                id="destination"
                type="text" 
                placeholder="Ej: Cancún, París, Tokio"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="check-in">Fecha de llegada</label>
              <input 
                id="check-in"
                type="date" 
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="input-group">
              <label htmlFor="check-out">Fecha de salida</label>
              <input 
                id="check-out"
                type="date" 
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate || new Date().toISOString().split('T')[0]}
              />
            </div>
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
  min-height: 600px;
  max-height: 1000px;
  margin-top: 0;
  overflow: hidden;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(60%);
    }
  }
  
  .content {
    position: relative;
    height: 100%;
    width: 100%;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    box-sizing: border-box;
    text-align: center;
    
    .title {
      color: white;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      max-width: 1200px;
      margin: 0 auto;
      
      h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        letter-spacing: 0.1rem;
        margin-bottom: 1rem;
        line-height: 1.2;
        animation: fadeInDown 1s ease;
      }
      
      p {
        text-align: center;
        padding: 0 1rem;
        margin: 0 auto;
        margin-top: 0.5rem;
        font-size: clamp(1rem, 2vw, 1.3rem);
        line-height: 1.6;
        max-width: 800px;
        animation: fadeInUp 1s ease;
      }
    }
    
    .search {
      background-color: rgba(255, 255, 255, 0.9);
      padding: 1.5rem;
      border-radius: 0.8rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      width: 90%;
      max-width: 1000px;
      animation: fadeIn 1.5s ease;
      display: flex;
      flex-direction: column;
      
      .search-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 1.5rem;
        
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }
      }
      
      .input-group {
        display: flex;
        flex-direction: column;
        text-align: left;
        
        label {
          font-size: 0.9rem;
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
          
          &[type="date"] {
            cursor: pointer;
          }
        }
      }
      
      button {
        padding: 1rem;
        cursor: pointer;
        border-radius: 0.5rem;
        border: none;
        color: white;
        background: linear-gradient(135deg, #4361ee, #3a0ca3);
        font-size: 1rem;
        font-weight: 600;
        text-transform: uppercase;
        transition: all 0.3s ease;
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
        
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

  /* Media Queries específicas */
  @media (max-width: 768px) {
    height: auto;
    min-height: 500px;
    
    .content {
      padding: 4rem 1rem;
      
      .title {
        h1 {
          font-size: 2rem;
        }
        p {
          font-size: 1rem;
          padding: 0;
        }
      }
      
      .search {
        width: 100%;
        padding: 1.5rem 1rem;
        
        button {
          max-width: 100%;
        }
      }
    }
  }

  @media (max-width: 480px) {
    min-height: 400px;
    
    .content {
      padding: 3rem 1rem;
      gap: 1.5rem;
      
      .title {
        h1 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        p {
          font-size: 0.9rem;
        }
      }
      
      .search {
        padding: 1rem;
        
        .input-group {
          label {
            font-size: 0.8rem;
          }
          
          input {
            font-size: 0.9rem;
          }
        }
        
        button {
          padding: 0.8rem;
          font-size: 0.9rem;
        }
      }
    }
  }
`;