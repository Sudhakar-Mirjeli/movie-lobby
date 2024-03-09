
import { MovieModel } from '../models/movieModel'
import mongoose from 'mongoose';


interface MovieRequest {
    title: string;
    genre: string;
    rating: number;
    streamingLink: string;
}

// Adds new movie.
async function addMovie(movieRQ: MovieRequest) {
    try {
        const movieData = {
            title: movieRQ.title,
            genre: movieRQ.genre,
            rating: movieRQ.rating,
            streamingLink: movieRQ.streamingLink
        };
        const movieDocument = new MovieModel(movieData);
        await movieDocument.save();
        return {
            status: true,
            message: 'New Movie added successfully.'
        }
    } catch (error: any) {
        return {
            status: false,
            message: 'Error while adding new movie.'
        }
    }
}

// Fetches all movies list
async function getAllMovies(query?: string) {
    try {
        let moviesData: { [key: string]: any }[] = [];
        if (query) {
            let search = {
                $or: [
                    { "title": new RegExp(query, 'i') },
                    { "genre": new RegExp(query, 'i') }
                ]
            }
            moviesData = await MovieModel.find(search)
        } else moviesData = await MovieModel.find({})
        return {
            status: true,
            data: moviesData,
            message: 'Movies retrieved successfully.'
        }
    } catch (error: any) {
        console.error("Error fetching movies:", error);
        return {
            status: false,
            message: 'Error while retrieving movies.'
        }
    }
}

// Updates movie data by id
async function updateMovieById(id: string, movieRQ: MovieRequest, query?: string) {
    try {
        if (query == "admin") {
            await MovieModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, movieRQ)
            return {
                status: true,
                message: 'Movie updated successfully.'
            }
        } else
            return {
                status: false,
                message: 'Only admin role can updae'
            }
    } catch (error: any) {
        console.error("Error updating movie:", error);
        return {
            status: false,
            message: 'Error while updating movie.'
        }
    }
}

// Deletes an movie record by id
async function deleteMovieById(id: string, query?: string) {
    try {
        if (query == "admin") {
            await MovieModel.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(id) })
            return {
                status: true,
                message: 'Movie deleted successfully.'
            }
        } else
            return {
                status: false,
                message: 'Only admin role can delete'
            }
    } catch (error: any) {
        console.error("Error deleting movie:", error);
        return {
            status: false,
            message: 'Error while deleting movie.'
        }
    }
}

export { addMovie, getAllMovies, updateMovieById, deleteMovieById }
