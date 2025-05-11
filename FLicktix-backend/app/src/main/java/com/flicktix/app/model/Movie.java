package com.flicktix.app.model;

import jakarta.persistence.*;
import java.util.Arrays;
import java.util.Base64;

@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String director;

    @Column(name = "total_seats")
    private int totalSeats;

    @Column(name = "seats_taken")
    private int seatsTaken;

    private String imageUrl;

    @Lob
    @Column(name = "seats_booked", columnDefinition = "LONGTEXT") // Changed to LONGTEXT for larger storage capacity
    private String seatsBookedSerialized; // serialized form for DB

    @Transient
    private boolean[] seatsBooked; // transient => not saved directly

    public Movie() {
        // Default constructor
    }

    @PostLoad
    @PostPersist
    @PostUpdate
    private void loadSeatsBooked() {
        if (seatsBookedSerialized != null && !seatsBookedSerialized.isEmpty()) {
            // Decode the Base64 string and parse the seats
            String decoded = new String(Base64.getDecoder().decode(seatsBookedSerialized));
            String[] parts = decoded.substring(1, decoded.length() - 1).split(", ");
            seatsBooked = new boolean[parts.length];
            for (int i = 0; i < parts.length; i++) {
                seatsBooked[i] = Boolean.parseBoolean(parts[i]);
            }
        } else if (totalSeats > 0) {
            seatsBooked = new boolean[totalSeats];
        }
    }

    @PrePersist
    @PreUpdate
    private void saveSeatsBooked() {
        if (seatsBooked != null) {
            // Convert the boolean array to a string and then encode it as Base64
            StringBuilder sb = new StringBuilder();
            for (boolean seat : seatsBooked) {
                sb.append(seat).append(",");
            }
            String serializedSeats = sb.toString();
            seatsBookedSerialized = Base64.getEncoder().encodeToString(serializedSeats.getBytes());
        }
    }

    public int getAvailableSeats() {
        return totalSeats - seatsTaken;
    }

    public boolean[] getSeatsBooked() {
        if (this.seatsBooked == null && this.totalSeats > 0) {
            this.seatsBooked = new boolean[this.totalSeats];
        }
        return seatsBooked;
    }

    public void setSeatsBooked(boolean[] seatsBooked) {
        this.seatsBooked = seatsBooked;
    }

    public void bookSeats(int[] seatNumbers) {
        if (seatsBooked == null || seatsBooked.length != totalSeats) {
            seatsBooked = new boolean[totalSeats];
        }
        for (int seat : seatNumbers) {
            if (seat >= 0 && seat < seatsBooked.length && !seatsBooked[seat]) {
                seatsBooked[seat] = true;
                seatsTaken++;
            } else {
                throw new RuntimeException("Seat " + seat + " is already booked or invalid.");
            }
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public int getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(int totalSeats) {
        this.totalSeats = totalSeats;
        this.seatsBooked = new boolean[totalSeats];
    }

    public int getSeatsTaken() {
        return seatsTaken;
    }

    public void setSeatsTaken(int seatsTaken) {
        this.seatsTaken = seatsTaken;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    // Builder pattern
    public static MovieBuilder builder() {
        return new MovieBuilder();
    }

    public static class MovieBuilder {
        private String title;
        private String description;
        private String director;
        private int totalSeats;
        private int seatsTaken;
        private String imageUrl;

        public MovieBuilder title(String title) {
            this.title = title;
            return this;
        }

        public MovieBuilder description(String description) {
            this.description = description;
            return this;
        }

        public MovieBuilder director(String director) {
            this.director = director;
            return this;
        }

        public MovieBuilder totalSeats(int totalSeats) {
            this.totalSeats = totalSeats;
            return this;
        }

        public MovieBuilder seatsTaken(int seatsTaken) {
            this.seatsTaken = seatsTaken;
            return this;
        }

        public MovieBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public Movie build() {
            Movie movie = new Movie();
            movie.title = this.title;
            movie.description = this.description;
            movie.director = this.director;
            movie.totalSeats = this.totalSeats;
            movie.seatsTaken = this.seatsTaken;
            movie.imageUrl = this.imageUrl;
            movie.seatsBooked = new boolean[totalSeats];
            return movie;
        }
    }
}
