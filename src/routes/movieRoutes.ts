import express from 'express';
import * as movieController from '../controllers/movieController';

// Defining the routes for movies
const movieRoutes = express.Router();
movieRoutes.get('/', movieController.getAllMovies);
movieRoutes.post('/', movieController.addMovie);
movieRoutes.get('/search', movieController.getAllMovies);
movieRoutes.put('/:id', movieController.updateMovieById);
movieRoutes.delete('/:id', movieController.deleteMovieById);

export { movieRoutes };
