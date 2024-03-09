import express from 'express';
import { movieRoutes } from './movieRoutes';

export const routes = express.Router();

// Movies routes
routes.use('/movies', movieRoutes);
