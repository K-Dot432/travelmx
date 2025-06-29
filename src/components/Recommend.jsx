import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { 
  FaStar, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaHeart, 
  FaArrowRight,
  FaMoneyBillWave,
  FaClock,
  FaPlane,
  FaTimes,
  FaCheck,
  FaHotel,
  FaExclamationTriangle,
  FaBus
} from "react-icons/fa";
import { MdPayment, MdCancel } from "react-icons/md";

// Importa tus imágenes de destino aquí
import Destination1 from "../assets/destino1.png";
import Destination2 from "../assets/destino2.png";

export default function Recommend() {
  const [loaded, setLoaded] = useState(false);
  const [activePackage, setActivePackage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [visibleDestinations, setVisibleDestinations] = useState(4);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [travelDates, setTravelDates] = useState({
    startDate: "",
    endDate: "",
    passengers: 1
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [userBookings, setUserBookings] = useState([]);
  const [bookingStep, setBookingStep] = useState(1);
  const [transportSelection, setTransportSelection] = useState(null);
  const [hotelSelection, setHotelSelection] = useState(null);

  useEffect(() => {
    setLoaded(true);
    const bookings = JSON.parse(localStorage.getItem('userBookings')) || [];
    setUserBookings(bookings);
  }, []);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(item => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const calculateTravelTime = (startDate, endDate) => {
    if (!startDate || !endDate) return "0 días";
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return `${diffDays} días`;
  };

  const calculateNights = () => {
    if (!travelDates.startDate || !travelDates.endDate) return 0;
    
    const start = new Date(travelDates.startDate);
    const end = new Date(travelDates.endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    if (!selectedDestination || !travelDates.startDate || !travelDates.endDate) return 0;
    
    const nights = calculateNights();
    const transportCost = transportSelection ? transportSelection.cost * travelDates.passengers : 0;
    
    // Calcular habitaciones necesarias (2 personas por habitación)
    const rooms = Math.ceil(travelDates.passengers / 2);
    const hotelCost = hotelSelection ? hotelSelection.cost * nights * rooms : 0;
    
    return transportCost + hotelCost;
  };

  const handleBookNow = (destination) => {
    setSelectedDestination(destination);
    setBookingStep(1);
    setShowBookingModal(true);
    setTravelDates({
      startDate: "",
      endDate: "",
      passengers: 1
    });
    setTransportSelection(null);
    setHotelSelection(null);
  };

  const handleBookingSubmit = () => {
    if (!travelDates.startDate || !travelDates.endDate) {
      alert("Por favor selecciona las fechas de tu viaje");
      return;
    }
    setBookingStep(2);
  };

  const handlePaymentSubmit = () => {
    if (!paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvv || !paymentInfo.name) {
      alert("Por favor completa todos los campos de pago");
      return;
    }
    
    const newBooking = {
      id: Date.now(),
      destination: selectedDestination,
      dates: travelDates,
      paymentInfo,
      transport: transportSelection,
      hotel: hotelSelection,
      status: "confirmado",
      createdAt: new Date().toISOString(),
      travelTime: calculateTravelTime(travelDates.startDate, travelDates.endDate),
      total: calculateTotal()
    };
    
    const updatedBookings = [...userBookings, newBooking];
    setUserBookings(updatedBookings);
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    
    setShowPaymentModal(false);
    setShowBookingModal(false);
    alert(`¡Reserva confirmada para ${selectedDestination.title}!`);
  };

  const cancelBooking = (bookingId) => {
    const updatedBookings = userBookings.filter(booking => booking.id !== bookingId);
    setUserBookings(updatedBookings);
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    alert("Reserva cancelada exitosamente");
  };

  const packages = [
    "Escapadas de Fin de Semana",
    "Paquetes Vacacionales",
    "Tours en Grupo",
    "Viajes Extendidos"
  ];

  const destinations = [
    {
      id: 1,
      image: Destination1,
      title: "Cancún, México",
      description: "Disfruta de las playas más hermosas del Caribe Mexicano con todos los servicios de lujo.",
      basePrice: 15800,
      duration: "4 noches / 5 días",
      rating: 4.8,
      location: "Quintana Roo",
      features: ["Playa", "Todo Incluido", "Familiar"],
      packageType: [1, 2, 4],
      transports: [
        {
          type: "Avión",
          icon: <FaPlane />,
          cost: 2500,
          duration: "2h 30m",
          description: "Vuelo directo desde Ciudad de México (AICM)"
        },
        {
          type: "Autobús",
          icon: <FaBus />,
          cost: 1200,
          duration: "24h",
          description: "Viaje directo ADO GL con servicio premium"
        }
      ],
      hotels: [
        { type: "Gran turismo", cost: 4500 },
        { type: "Boutique", cost: 3800 },
        { type: "Cinco estrellas", cost: 3500 },
        { type: "Cuatro estrellas", cost: 2500 },
        { type: "Tres estrellas", cost: 1500 }
      ]
    },
    {
      id: 2,
      image: Destination2,
      title: "Los Cabos, México",
      description: "Experiencia única donde el desierto se encuentra con el mar en el Pacífico Mexicano.",
      basePrice: 18500,
      duration: "3 noches / 4 días",
      rating: 4.7,
      location: "Baja California Sur",
      features: ["Romántico", "Aventura", "Lujo"],
      packageType: [1, 2, 3],
      transports: [
        {
          type: "Avión",
          icon: <FaPlane />,
          cost: 3000,
          duration: "2h",
          description: "Vuelo directo desde Ciudad de México (AICM)"
        },
        {
          type: "Autobús",
          icon: <FaBus />,
          cost: 1800,
          duration: "25h",
          description: "Autobús a La Paz + transbordo a Los Cabos"
        }
      ],
      hotels: [
        { type: "Gran turismo", cost: 5000 },
        { type: "Boutique", cost: 4200 },
        { type: "Cinco estrellas", cost: 3800 },
        { type: "Cuatro estrellas", cost: 2800 },
        { type: "Tres estrellas", cost: 1800 }
      ]
    },
    // ... otros destinos
  ];

  const loadMoreDestinations = () => {
    setVisibleDestinations(prev => prev + 4);
  };

  const filteredDestinations = destinations
    .filter(dest => dest.packageType.includes(activePackage))
    .slice(0, visibleDestinations);

  const nights = calculateNights();

  return (
    <Section id="recommend" className={loaded ? "visible" : ""}>
      <div className="title">
        <h2>Destinos Populares</h2>
        <p className="subtitle">Explora nuestros destinos más solicitados por nuestros clientes</p>
      </div>
      
      <div className="packages">
        <ul>
          {packages.map((pkg, index) => (
            <li
              key={index}
              className={activePackage === index + 1 ? "active" : ""}
              onClick={() => {
                setActivePackage(index + 1);
                setVisibleDestinations(4);
              }}
            >
              {pkg}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="destinations">
        {filteredDestinations.map((destination) => (
          <DestinationCard 
            key={destination.id}
            className="destination"
          >
            <div className="image-container">
              <img src={destination.image} alt={destination.title} />
              <button 
                className={`favorite-btn ${favorites.includes(destination.id) ? "active" : ""}`}
                onClick={() => toggleFavorite(destination.id)}
              >
                <FaHeart />
              </button>
              <div className="rating">
                <FaStar className="star-icon" />
                {destination.rating}
              </div>
            </div>
            
            <div className="info-container">
              <h3>{destination.title}</h3>
              <p className="description">{destination.description}</p>
              
              <div className="features">
                {destination.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag">{feature}</span>
                ))}
              </div>
              
              <div className="details">
                <div>
                  <FaMapMarkerAlt className="icon" />
                  <span>{destination.location}</span>
                </div>
                <div>
                  <FaCalendarAlt className="icon" />
                  <span>{destination.duration}</span>
                </div>
              </div>
              
              <div className="price-container">
                <span className="price-label">Desde</span>
                <div className="price">${destination.basePrice.toLocaleString()}</div>
                <span className="per-person">por persona</span>
              </div>
              
              <button 
                className="book-btn"
                onClick={() => handleBookNow(destination)}
              >
                Reservar Ahora
                <FaArrowRight className="arrow-icon" />
              </button>
            </div>
          </DestinationCard>
        ))}
      </div>
      
      {showBookingModal && selectedDestination && (
        <ModalOverlay>
          <ModalContainer>
            <CloseButton onClick={() => setShowBookingModal(false)}>
              <FaTimes />
            </CloseButton>
            
            <ModalContent>
              <h3>Reservar: {selectedDestination.title}</h3>
              
              {bookingStep === 1 && (
                <>
                  <div className="info-row">
                    <FaMoneyBillWave />
                    <span>Precio base: ${selectedDestination.basePrice.toLocaleString()} MXN</span>
                  </div>
                  
                  <div className="info-row">
                    <FaMapMarkerAlt />
                    <span>Origen: Ciudad de México</span>
                  </div>
                  
                  <FormGroup>
                    <label>Fecha de Salida</label>
                    <input 
                      type="date" 
                      value={travelDates.startDate}
                      onChange={(e) => setTravelDates({...travelDates, startDate: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>Fecha de Regreso</label>
                    <input 
                      type="date" 
                      value={travelDates.endDate}
                      onChange={(e) => setTravelDates({...travelDates, endDate: e.target.value})}
                      min={travelDates.startDate || new Date().toISOString().split('T')[0]}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>Pasajeros</label>
                    <input 
                      type="number" 
                      min="1"
                      max="10"
                      value={travelDates.passengers}
                      onChange={(e) => setTravelDates({...travelDates, passengers: parseInt(e.target.value)})}
                    />
                  </FormGroup>
                  
                  {travelDates.startDate && travelDates.endDate && (
                    <div className="info-row">
                      <FaClock />
                      <span>Duración total del viaje: {calculateTravelTime(travelDates.startDate, travelDates.endDate)}</span>
                    </div>
                  )}
                  
                  <ActionButtons>
                    <button onClick={() => setShowBookingModal(false)}>Cancelar</button>
                    <button className="primary" onClick={handleBookingSubmit}>Continuar</button>
                  </ActionButtons>
                </>
              )}
              
              {bookingStep === 2 && (
                <>
                  <h4>Selecciona Transporte y Hotel</h4>
                  <p className="info-text">Origen: Ciudad de México</p>
                  
                  <TransportOptions>
                    <h5>Medio de Transporte</h5>
                    {selectedDestination.transports.map((transport, index) => (
                      <TransportCard 
                        key={index}
                        selected={transportSelection?.type === transport.type}
                        onClick={() => setTransportSelection(transport)}
                      >
                        <div className="transport-header">
                          <div className="transport-icon">{transport.icon}</div>
                          <div className="transport-type">{transport.type}</div>
                        </div>
                        <div className="transport-details">
                          <div className="transport-cost">${transport.cost.toLocaleString()} MXN</div>
                          <div className="transport-duration">{transport.duration}</div>
                        </div>
                        <p className="transport-description">{transport.description}</p>
                        
                        {selectedDestination.title.includes("Cabos") && transport.type === "Autobús" && (
                          <div className="warning">
                            <FaExclamationTriangle /> Requiere transbordo en La Paz
                          </div>
                        )}
                      </TransportCard>
                    ))}
                  </TransportOptions>

                  <HotelOptions>
                    <h5>Tipo de Hotel</h5>
                    {selectedDestination.hotels.map((hotel, index) => (
                      <HotelCard 
                        key={index}
                        selected={hotelSelection?.type === hotel.type}
                        onClick={() => setHotelSelection(hotel)}
                      >
                        <div className="hotel-info">
                          <FaHotel className="hotel-icon" />
                          <span className="hotel-type">{hotel.type}</span>
                        </div>
                        <span className="hotel-price">${hotel.cost.toLocaleString()} MXN/noche</span>
                      </HotelCard>
                    ))}
                  </HotelOptions>

                  <ActionButtons>
                    <button onClick={() => setBookingStep(1)}>Atrás</button>
                    <button 
                      className="primary" 
                      onClick={() => setBookingStep(3)}
                      disabled={!transportSelection || !hotelSelection}
                    >
                      Continuar a Pago
                    </button>
                  </ActionButtons>
                </>
              )}
              
              {bookingStep === 3 && (
                <>
                  <h4>Información de Pago</h4>
                  
                  <FormGroup>
                    <label>Número de Tarjeta</label>
                    <input 
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                    />
                  </FormGroup>
                  
                  <FormRow>
                    <FormGroup>
                      <label>Fecha de Expiración</label>
                      <input 
                        type="text"
                        placeholder="MM/AA"
                        value={paymentInfo.expiry}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label>CVV</label>
                      <input 
                        type="text"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                      />
                    </FormGroup>
                  </FormRow>
                  
                  <FormGroup>
                    <label>Nombre en la Tarjeta</label>
                    <input 
                      type="text"
                      value={paymentInfo.name}
                      onChange={(e) => setPaymentInfo({...paymentInfo, name: e.target.value})}
                    />
                  </FormGroup>
                  
                  <Summary>
                    <h5>Resumen de Compra</h5>
                    <div className="summary-row">
                      <span>Destino:</span>
                      <span>{selectedDestination.title}</span>
                    </div>
                    <div className="summary-row">
                      <span>Fechas:</span>
                      <span>{travelDates.startDate} a {travelDates.endDate}</span>
                    </div>
                    <div className="summary-row">
                      <span>Pasajeros:</span>
                      <span>{travelDates.passengers}</span>
                    </div>
                    <div className="summary-row">
                      <span>Duración:</span>
                      <span>{calculateTravelTime(travelDates.startDate, travelDates.endDate)}</span>
                    </div>
                    {transportSelection && (
                      <div className="summary-row">
                        <span>Transporte:</span>
                        <span>{transportSelection.type} (${transportSelection.cost.toLocaleString()} × {travelDates.passengers})</span>
                      </div>
                    )}
                    {hotelSelection && (
                      <div className="summary-row">
                        <span>Hotel:</span>
                        <span>{hotelSelection.type} (${hotelSelection.cost.toLocaleString()} × {nights} noches)</span>
                      </div>
                    )}
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span>${calculateTotal().toLocaleString()} MXN</span>
                    </div>
                  </Summary>
                  
                  <ActionButtons>
                    <button onClick={() => setBookingStep(2)}>Atrás</button>
                    <button className="primary" onClick={handlePaymentSubmit}>
                      <MdPayment /> Confirmar Pago
                    </button>
                  </ActionButtons>
                </>
              )}
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
      
      {userBookings.length > 0 && (
        <BookingsSection>
          <h3>Mis Reservas</h3>
          <BookingsGrid>
            {userBookings.map(booking => (
              <BookingCard key={booking.id}>
                <img src={booking.destination.image} alt={booking.destination.title} />
                <div className="booking-info">
                  <h4>{booking.destination.title}</h4>
                  <p>{booking.dates.startDate} - {booking.dates.endDate}</p>
                  <p>{booking.travelTime}</p>
                  <p>{booking.dates.passengers} pasajero(s)</p>
                  <p>Transporte: {booking.transport?.type}</p>
                  <p>Hotel: {booking.hotel?.type}</p>
                  <p className="status">{booking.status}</p>
                  <p className="total">Total: ${booking.total?.toLocaleString() || "0"} MXN</p>
                </div>
                <button 
                  className="cancel-btn"
                  onClick={() => cancelBooking(booking.id)}
                >
                  <MdCancel /> Cancelar
                </button>
              </BookingCard>
            ))}
          </BookingsGrid>
        </BookingsSection>
      )}
    </Section>
  );
}

// Estilos
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Section = styled.section`
  padding: 6rem 2rem;
  background-color: #f9f9f9;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .title {
    text-align: center;
    margin-bottom: 4rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    
    h2 {
      font-size: 2.8rem;
      color: #023e8a;
      margin-bottom: 1.2rem;
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
  
  .packages {
    display: flex;
    justify-content: center;
    margin: 2rem 0 4rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    scrollbar-width: thin;
    scrollbar-color: #4361ee #f0f0f0;
    
    &::-webkit-scrollbar {
      height: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f0f0f0;
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: #4361ee;
      border-radius: 3px;
    }
    
    ul {
      display: flex;
      list-style-type: none;
      gap: 1.2rem;
      padding: 0 1.5rem;
      
      li {
        padding: 0.9rem 1.8rem;
        border-bottom: 3px solid transparent;
        font-weight: 600;
        color: #666;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.3s ease;
        border-radius: 0.5rem;
        background-color: rgba(255, 255, 255, 0.7);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        
        &:hover {
          color: #023e8a;
          background-color: white;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        &.active {
          color: white;
          background-color: #4361ee;
          border-bottom: 3px solid #3a0ca3;
          box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
        }
      }
    }
  }
  
  .destinations {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 2.5rem;
    margin-bottom: 4rem;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1.5rem;
  }
  
  .view-more-btn {
    display: block;
    margin: 3rem auto 0;
    padding: 1rem 2.8rem;
    background: transparent;
    border: 2px solid #4361ee;
    color: #4361ee;
    font-weight: 600;
    border-radius: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.1rem;
    
    &:hover {
      background-color: #4361ee;
      color: white;
      box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
    }
  }
  
  @media (max-width: 1024px) {
    .destinations {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    }
  }
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
    
    .packages {
      margin: 1.5rem 0 3rem;
      
      ul {
        padding: 0 1rem;
        
        li {
          padding: 0.7rem 1.2rem;
          font-size: 0.95rem;
        }
      }
    }
    
    .destinations {
      grid-template-columns: 1fr;
      padding: 0;
      gap: 2rem;
    }
  }
`;

const DestinationCard = styled.div`
  background-color: white;
  border-radius: 1.2rem;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
  opacity: 0;
  animation: ${fadeIn} 0.6s forwards;
  animation-delay: ${props => props.index * 0.1}s;
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
    
    .book-btn {
      background: linear-gradient(135deg, #3a0ca3, #4361ee);
      
      .arrow-icon {
        transform: translateX(3px);
      }
    }
  }
  
  .image-container {
    position: relative;
    height: 250px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
    
    .favorite-btn {
      position: absolute;
      top: 1.2rem;
      right: 1.2rem;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 2;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
      
      svg {
        color: #ccc;
        font-size: 1.3rem;
        transition: all 0.3s ease;
      }
      
      &:hover {
        background: white;
        transform: scale(1.1);
        
        svg {
          color: #ff6b6b;
        }
      }
      
      &.active {
        svg {
          color: #ff6b6b;
          animation: ${pulse} 0.5s ease;
        }
      }
    }
    
    .rating {
      position: absolute;
      bottom: 1.2rem;
      left: 1.2rem;
      background: rgba(0, 0, 0, 0.75);
      color: white;
      padding: 0.4rem 1rem;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.95rem;
      font-weight: 600;
      z-index: 2;
      
      .star-icon {
        color: #ffd700;
        font-size: 1rem;
      }
    }
  }
  
  .info-container {
    padding: 1.8rem;
    
    h3 {
      font-size: 1.5rem;
      color: #023e8a;
      margin-bottom: 0.8rem;
      line-height: 1.3;
    }
    
    .description {
      color: #555;
      margin-bottom: 1.2rem;
      line-height: 1.6;
      font-size: 1rem;
    }
    
    .features {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin-bottom: 1.6rem;
      
      .feature-tag {
        background-color: #f0f4ff;
        color: #4361ee;
        padding: 0.4rem 0.9rem;
        border-radius: 2rem;
        font-size: 0.85rem;
        font-weight: 500;
        transition: all 0.3s ease;
        
        &:hover {
          background-color: #4361ee;
          color: white;
        }
      }
    }
    
    .details {
      display: flex;
      gap: 1.6rem;
      margin-bottom: 1.6rem;
      
      div {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        color: #666;
        font-size: 0.95rem;
        
        .icon {
          color: #4361ee;
          font-size: 1rem;
        }
      }
    }
    
    .price-container {
      margin-bottom: 1.6rem;
      
      .price-label {
        display: block;
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 0.3rem;
      }
      
      .price {
        font-size: 1.9rem;
        font-weight: 700;
        color: #023e8a;
        line-height: 1;
      }
      
      .per-person {
        color: #888;
        font-size: 0.9rem;
      }
    }
    
    .book-btn {
      width: 100%;
      padding: 0.9rem;
      background: linear-gradient(135deg, #4361ee, #3a0ca3);
      border: none;
      border-radius: 0.6rem;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      
      .arrow-icon {
        transition: transform 0.3s ease;
      }
      
      &:hover {
        box-shadow: 0 5px 15px rgba(58, 12, 163, 0.3);
      }
    }
  }
`;

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
  background: white;
  border-radius: 1rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const ModalContent = styled.div`
  h3 {
    color: #023e8a;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  h4 {
    color: #023e8a;
    margin: 1.5rem 0;
  }
  
  .info-text {
    color: #666;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }
  
  .info-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0;
    color: #555;
    
    svg {
      color: #4361ee;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }
  
  input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #4361ee;
    }
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  
  ${FormGroup} {
    flex: 1;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  button {
    flex: 1;
    padding: 0.8rem;
    border-radius: 0.5rem;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &.primary {
      background: #4361ee;
      color: white;
      border-color: #4361ee;
      
      &:hover {
        background: #3a0ca3;
      }
      
      &:disabled {
        background: #a0a0a0;
        border-color: #a0a0a0;
        cursor: not-allowed;
      }
    }
    
    &:hover {
      background: #f0f0f0;
    }
  }
`;

const Summary = styled.div`
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
  
  h5 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #023e8a;
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    
    &.total {
      font-weight: bold;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #ddd;
      font-size: 1.1rem;
    }
  }
`;

const BookingsSection = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
  
  h3 {
    color: #023e8a;
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

const BookingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const BookingCard = styled.div`
  background: white;
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .booking-info {
    padding: 1.2rem;
    flex-grow: 1;
    
    h4 {
      margin: 0 0 0.5rem;
      color: #023e8a;
    }
    
    p {
      margin: 0.3rem 0;
      color: #555;
      font-size: 0.9rem;
      
      &.status {
        color: #48c774;
        font-weight: 500;
      }
      
      &.total {
        font-weight: 600;
        color: #023e8a;
        margin-top: 0.5rem;
      }
    }
  }
  
  .cancel-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.8rem;
    background: #ff6b6b;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      background: #f03e3e;
    }
  }
`;

const TransportOptions = styled.div`
  margin: 1.5rem 0;
  
  h5 {
    color: #023e8a;
    margin-bottom: 1rem;
  }
`;

const TransportCard = styled.div`
  border: 1px solid ${props => props.selected ? '#4361ee' : '#ddd'};
  background: ${props => props.selected ? '#f0f4ff' : 'white'};
  border-radius: 0.8rem;
  padding: 1.2rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #4361ee;
  }
  
  .transport-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    
    .transport-icon {
      color: #4361ee;
      font-size: 1.2rem;
    }
    
    .transport-type {
      font-size: 1.1rem;
    }
  }
  
  .transport-details {
    display: flex;
    justify-content: space-between;
    color: #666;
    
    .transport-cost {
      font-weight: 600;
      color: #023e8a;
    }
    
    .transport-duration {
      background: #e7f1ff;
      color: #4361ee;
      padding: 0.2rem 0.6rem;
      border-radius: 1rem;
      font-size: 0.9rem;
    }
  }
  
  .transport-description {
    margin: 0.5rem 0 0;
    color: #666;
    font-size: 0.9rem;
  }
  
  .warning {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #e67700;
    background: #fff9db;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.9rem;
  }
`;

const HotelOptions = styled.div`
  margin: 2rem 0 1.5rem;
  
  h5 {
    color: #023e8a;
    margin-bottom: 1rem;
  }
`;

const HotelCard = styled.div`
  border: 1px solid ${props => props.selected ? '#4361ee' : '#ddd'};
  background: ${props => props.selected ? '#f0f4ff' : 'white'};
  border-radius: 0.8rem;
  padding: 1rem;
  margin-bottom: 0.8rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #4361ee;
  }
  
  .hotel-info {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    
    .hotel-icon {
      color: #4361ee;
      font-size: 1.2rem;
    }
    
    .hotel-type {
      font-weight: 500;
    }
  }
  
  .hotel-price {
    font-weight: 600;
    color: #023e8a;
  }
`;