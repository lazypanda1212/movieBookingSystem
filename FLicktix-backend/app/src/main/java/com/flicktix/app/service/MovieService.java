package com.flicktix.app.service;

import com.flicktix.app.model.Movie;
import com.flicktix.app.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class MovieService {

    private final MovieRepository repository;

    public MovieService(MovieRepository repository) {
        this.repository = repository;

    }

    public Movie save(Movie movie) {
        return repository.save(movie);
    }

    public List<Movie> getAll() {
        return repository.findAll();
    }

    public List<Movie> getAvailableMovies() {
        return repository.findByTotalSeatsGreaterThanSeatsTaken();
    }

    public Movie getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Movie bookSeats(Long movieId, int[] seatNumbers) {
        Movie movie = repository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        // Ensure seats are properly booked and serialized
        movie.bookSeats(seatNumbers);

        // Save the updated movie
        return repository.save(movie);
    }

}
