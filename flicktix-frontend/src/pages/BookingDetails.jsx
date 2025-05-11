import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";
import "./BookingDetails.css";

const BookingDetails = () => {
  const { id } = useParams(); // Get movie ID from URL params
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [movie, setMovie] = useState(null);
  const [seatsByTime, setSeatsByTime] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [bookingStatus, setBookingStatus] = useState(null);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/movies/${id}`)
      .then((response) => {
        const movieData = response.data;

        // Set the image URL based on the movie ID
        movieData.imageUrl = `/images/${movieData.id}.jpg`; // Use the movie ID to fetch image

        setMovie(movieData);
        setSeatsByTime(generateSeats(movieData.totalSeats));
        generateRandomRating(); // Generate random rating when movie data is fetched
      })
      .catch((error) => console.error("Error fetching movie:", error));
  }, [id]);

  const generateSeats = (totalSeats) => {
    const result = {};
    ["10:00 AM", "2:00 PM", "6:00 PM"].forEach(time => {
      result[time] = Array.from({ length: totalSeats }, (_, i) => ({
        seatNumber: i + 1,
        isBooked: Math.random() > 0.3,  // Randomly mark some seats as booked
      }));
    });
    return result;
  };

  const toggleSeat = (seatNumber) => {
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seatNumber)) {
        return prevSelected.filter((seat) => seat !== seatNumber);
      }
      return [...prevSelected, seatNumber];
    });
  };

  const handleBookSeats = () => {
    console.log("Selected seats:", selectedSeats);
    axios.post(`http://localhost:8080/api/movies/${id}/book`, selectedSeats)
      .then((response) => {
        console.log("Booking response:", response);
        setBookingStatus({
          success: true,
          bookedSeats: selectedSeats,
          movieName: movie.title,
          director: movie.director,
          time: selectedTime,
        });

        // Navigate to the confirmation page with booking details
        navigate(`/booking-confirmation`, {
          state: { movieName: movie.title, director: movie.director, seats: selectedSeats, time: selectedTime },
        });

        setSeatsByTime(generateSeats(movie.totalSeats)); // Refresh seats
      })
      .catch((error) => {
        console.error("Booking failed:", error);
        setBookingStatus({
          success: false,
          message: "Booking failed, please try again.",
        });
      });
  };

  const generateRandomRating = () => {
    setRating((Math.random() * (5 - 1) + 1).toFixed(1)); // Generate random rating between 1 and 5
  };

  if (!movie || !seatsByTime[selectedTime]) return <p>Loading...</p>;

  return (
    <>
      <NavBar showBackArrow />
      <div className="booking-container">
        {/* Movie Image and Info Section */}
        <div className="movie-info-container">
          <div className="movie-image-container">
            {movie.imageUrl ? (
              <img
                src={movie.imageUrl}  // Directly use the image URL based on the ID
                alt={movie.title}
                className="movie-image"
              />
            ) : (
              <p className="no-image-text">No Image Available</p>
            )}
          </div>

          <div className="movie-details">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-description">{movie.description}</p>
            <p className="movie-director"><strong>Director:</strong> {movie.director || "N/A"}</p>
            <p className="movie-release-date"><strong>Release Date:</strong> {movie.releaseDate || "N/A"}</p>
            <p className="movie-rating"><strong>Rating:</strong> {rating || "N/A"}</p> {/* Random Rating */}
          </div>
        </div>

        {/* Showtime Selection */}
        <div className="showtime-buttons">
          {Object.keys(seatsByTime).map((time) => (
            <button
              key={time}
              className={time === selectedTime ? "active" : ""}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Seat Layout */}
        <div className="seat-layout">
          {seatsByTime[selectedTime].map(({ seatNumber, isBooked }) => (
            <div
              key={seatNumber}
              className={`seat ${isBooked ? "unavailable" : selectedSeats.includes(seatNumber) ? "selected" : "available"}`}
              onClick={() => !isBooked && toggleSeat(seatNumber)}
            >
              {seatNumber}
            </div>
          ))}
        </div>

        {/* Seat Legend */}
        <div className="legend">
          <span className="green-box" /> Available
          <span className="red-box" /> Booked
          <span className="yellow-box" /> Selected
        </div>

        {/* Booking Footer */}
        <div className="booking-footer">
          <button onClick={handleBookSeats} disabled={selectedSeats.length === 0}>
            Book Selected Seats
          </button>

          {bookingStatus && (
            <div className={`booking-status ${bookingStatus.success ? "success" : "failure"}`}>
              {bookingStatus.success
                ? `Successfully booked for ${movie.title}. Seats: ${bookingStatus.bookedSeats.join(", ")}`
                : bookingStatus.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
