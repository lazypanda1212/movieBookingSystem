import React from "react";
import { useLocation, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import QRCode from "react-qr-code";

const BookingConfirmation = () => {
  const location = useLocation();
  const { movieName, director, seats, time } = location.state || {};

  const qrCodeData = `Movie: ${movieName}\nDirector: ${director}\nTime: ${time}\nSeats: ${seats?.join(", ")}`;

  return (
    <>
      <NavBar showBackArrow />
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.headerText}>🎉 Booking Confirmed!</h2>
        </div>

        <div style={styles.mainContent}>
          <div style={styles.qrSection}>
              <QRCode value="Your QR Data Here" size={280} />
            <p style={styles.qrText}>Scan at entry</p>
          </div>

          <div style={styles.detailsSection}>
            <p style={styles.movieTitle}>🎬 {movieName}</p>
            <p style={styles.detail}><strong>🎥 Director:</strong> {director}</p>
            <p style={styles.detail}><strong>⏰ Show Time:</strong> {time}</p>

            <div style={styles.seatsSection}>
              <h3 style={styles.seatsHeader}>🎟️ Seats Booked</h3>
              <ul style={styles.seatsList}>
                {seats && seats.map((seat, index) => (
                  <li key={index} style={styles.seatItem}>Seat <span style={styles.seatHighlight}>{seat}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <Link to="/" style={styles.backButton}>Back to Movie Listings</Link>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#eaf7ea',
    maxWidth: '900px',
    margin: '0 auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  headerText: {
    fontSize: '3rem',
    color: '#2e3d32'
  },
  mainContent: {
    display: 'flex',
    gap: '30px',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  qrSection: {
    flex: '1',
    textAlign: 'center'
  },
  qrText: {
    marginTop: '10px',
    fontStyle: 'italic',
    color: '#555'
  },
  detailsSection: {
    flex: '2',
    textAlign: 'left'
  },
  movieTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#1b5e20',
    marginBottom: '10px'
  },
  detail: {
    backgroundColor: '#c8e6c9',
    padding: '8px',
    borderRadius: '6px',
    marginBottom: '8px',
    fontSize: '1.1rem'
  },
  seatsSection: {
    marginTop: '20px'
  },
  seatsHeader: {
    fontSize: '1.3rem',
    color: '#2e7d32'
  },
  seatsList: {
    listStyle: 'none',
    padding: 0
  },
  seatItem: {
    fontSize: '1.1rem',
    marginBottom: '5px'
  },
  seatHighlight: {
    backgroundColor: '#81c784',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: 'bold'
  },
  footer: {
    textAlign: 'center',
    marginTop: '30px'
  },
  backButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#1976d2',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold'
  }
};

export default BookingConfirmation;
