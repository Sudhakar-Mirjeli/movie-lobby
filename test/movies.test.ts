import request from 'supertest';
import app from '../src/index';
import { MovieModel } from '../src/models/movieModel';


describe('POST /api/movies', () => {
  it('should create a new movie', async () => {
    const newMovie = {
      title: 'Movie 1',
      genre: 'Action',
      rating: 4.5,
      streamingLink: 'https://google.com/movie1'
    };

    const response = await request(app)
      .post('/api/movies')
      .send(newMovie);
    import('chai').then(chai => {
      const expect = chai.expect;
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('New Movie added successfully.');
    })
  });
});


describe('GET /api/movies', () => {
  it('should return all movies', async () => {
    const response = await request(app)
      .get('/api/movies');

    import('chai').then(chai => {
      const expect = chai.expect;
      expect(response.status).to.equal(200);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data).to.have.lengthOf.at.least(1);
    })
  });
});


describe('GET /api/movies/search?q={query}: Search API', () => {
  it('should return movies matching the search query', async () => {
    const query = 'SIR'; // Search query

    const response = await request(app)
      .get(`/api/movies/search?q=${query}`);

    import('chai').then(chai => {
      const expect = chai.expect;
      expect(response.status).to.equal(200);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.be.greaterThan(0);
    })
  });

  it('should return an empty array if no movies match the search query', async () => {
    const query = 'NonExistentGenre'; // Non-existent search query

    const response = await request(app)
      .get(`/api/movies/search?q=${query}`);

    import('chai').then(chai => {
      const expect = chai.expect;
      expect(response.status).to.equal(200);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.equal(0);
    })
  });
});



describe('PUT /api/movies/:id', () => {
  it('should update an movie with having admin role', async () => {
    // Create a new movie
    const newMovie = new MovieModel({
      title: 'New Movie to update',
      genre: 'Action',
      rating: 4.0,
      streamingLink: 'https://fb.com/new_post'
    });
    await newMovie.save();

    // Update the movie with new data
    const updatedMovieData = {
      title: 'Updated Movie',
      genre: 'Updated Genre',
      rating: 3.5,
      streamingLink: 'https://ig.com/updated_post'
    };
    let role = "admin"
    const response = await request(app)
      .put(`/api/movies/${newMovie._id}`)
      .query({ role })
      .send(updatedMovieData);

    // Checking if the update was successful
    import('chai').then(chai => {
      const expect = chai.expect;
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ message: 'Movie updated successfully.' });
    });
  });

  it('should not update an movie without having admin role', async () => {
    // Create a new movie
    const newMovie = new MovieModel({
      title: 'New Movie not to be update',
      genre: 'Action',
      rating: 4.0,
      streamingLink: 'https://youtube.com/new_movie'
    });
    await newMovie.save();

    // Update the movie with new data
    const updatedMovieData = {
      title: 'Updated Movie',
      genre: 'Updated Genre',
      rating: 3.5,
      streamingLink: 'https://youtube.com/updated_movie'
    };

    const response = await request(app)
      .put(`/api/movies/${newMovie._id}`)
      .send(updatedMovieData);

    import('chai').then(chai => {
      const expect = chai.expect;
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ message: 'Only admin role can updae' });
    });
  });
})


describe('DELETE /api/movies/:id', () => {
  it('should delete an movie with having admin role', async () => {
    // Create a new movie
    const newMovie = new MovieModel({
      title: 'New Movie to be deleted',
      genre: 'Action',
      rating: 4.0,
      streamingLink: 'https://youtube.com/new_movie'
    });
    await newMovie.save();


    let role = "admin"
    const response = await request(app)
      .delete(`/api/movies/${newMovie._id}`)
      .query({ role })

    // Check if the delete was successful
    import('chai').then(chai => {
      const expect = chai.expect;
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ message: 'Movie deleted successfully' });

    });
  });

  it('should not delete an movie without having admin role', async () => {
    // Create a new movie
    const newMovie = new MovieModel({
      title: 'New Movie not to be deleted',
      genre: 'Action',
      rating: 4.0,
      streamingLink: 'https://example.com/new_movie'
    });
    await newMovie.save();


    const response = await request(app)
      .delete(`/api/movies/${newMovie._id}`)

    import('chai').then(chai => {
      const expect = chai.expect;
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ message: 'Only admin role can delete' });
    });
  });
})





