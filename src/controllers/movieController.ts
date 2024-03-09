import { Request, Response } from 'express';
import * as  movieService from '../services/movieService';

// Adding new movie.
async function addMovie(req: Request, res: Response) {
    try {
        const response = await movieService.addMovie(req.body);
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// Get all movies list
async function getAllMovies(req: Request, res: Response) {
    try {
        const query: { q?: string } = req.query;
        const response = await movieService.getAllMovies(query.q);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// Update movie data by id
async function updateMovieById(req: Request, res: Response) {
    try {
        const query: { role?: string } = req.query;
        const response = await movieService.updateMovieById(req.params.id, req.body, query.role);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// Delete movie record by id
async function deleteMovieById(req: Request, res: Response) {
    try {
        const query: { role?: string } = req.query;
        const response = await movieService.deleteMovieById(req.params.id, query.role);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}


export { addMovie, getAllMovies, updateMovieById , deleteMovieById}
