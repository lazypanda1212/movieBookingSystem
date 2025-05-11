package com.flicktix.app.repository;


import com.flicktix.app.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query("SELECT m FROM Movie m WHERE m.totalSeats > m.seatsTaken")
    List<Movie> findByTotalSeatsGreaterThanSeatsTaken();
}
