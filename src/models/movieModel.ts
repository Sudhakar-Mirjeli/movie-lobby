import { Schema, model, Document } from 'mongoose';

const movieSchema = new Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number },
    streamingLink: { type: String }
});

export const MovieModel = model<Document>('movies', movieSchema);

