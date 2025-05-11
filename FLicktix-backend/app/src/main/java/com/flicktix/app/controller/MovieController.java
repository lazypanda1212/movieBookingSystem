package com.flicktix.app.controller;

import com.flicktix.app.model.Movie;
import com.flicktix.app.service.MovieService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService service;

    public MovieController(MovieService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Movie> addMovie(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("director") String director,
            @RequestParam("totalSeats") int totalSeats,
            @RequestParam(value = "imageUrl", required = false) String imageUrl // Expect uploaded URL
    ) {
        if (title == null || description == null || director == null || totalSeats <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null); // Or return a proper error message
        }

        Movie movie = Movie.builder()
                .title(title)
                .description(description)
                .director(director)
                .totalSeats(totalSeats)
                .seatsTaken(0)
                .imageUrl(imageUrl)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(movie));
    }

    @GetMapping
    public List<Movie> getAllMovies() {
        return service.getAll();
    }

    @GetMapping("/available")
    public List<Movie> getAvailableMovies() {
        return service.getAvailableMovies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovie(@PathVariable Long id) {
        Movie movie = service.getById(id);
        return movie != null ? ResponseEntity.ok(movie) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/book")
    public ResponseEntity<Object> bookSeats(
            @PathVariable Long id,
            @RequestBody int[] seatNumbers) {
        try {
            service.bookSeats(id, seatNumbers);
            return ResponseEntity.ok("Seats booked successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error booking seats: " + e.getMessage());
        }
    }


}
