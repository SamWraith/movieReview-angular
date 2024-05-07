// movie.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as mongodb from 'mongodb';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { Review } from './review.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Review) // Inject the Review repository
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async seedMovies(): Promise<void> {
    const moviesData = [
      { title: 'Inception', releaseYear: 2010, genre: 'Sci-Fi' },
      { title: 'The Dark Knight', releaseYear: 2008, genre: 'Action' },
      { title: 'Pulp Fiction', releaseYear: 1994, genre: 'Crime' },
      { title: 'Forrest Gump', releaseYear: 1994, genre: 'Drama' },
      { title: 'The Matrix', releaseYear: 1999, genre: 'Sci-Fi' },
    ];

    this.movieRepository.create(moviesData);
    await this.movieRepository.save(moviesData);
  }
  async findAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find();
  }
  async findOneMovie(id: string): Promise<Movie | undefined> {
    try {
      // console.log(`from find One Movie: ${id}`);
      const movie = await this.movieRepository.findOne({
        where: { _id: new mongodb.ObjectId(id) },
      });
      // console.log(movie);
      return movie;
    } catch (error: any) {
      console.log(error.message.message);
    }
  }
  async deleteMovie(id: number): Promise<Movie | undefined> {
    const movieToDelete = await this.movieRepository.findOne({
      where: { _id: new mongodb.ObjectId(id) },
    });

    if (!movieToDelete) {
      throw new Error(`Movie with ID ${id} not found`);
    }

    await this.movieRepository.delete(id);

    return movieToDelete;
  }
  async addReviewToMovie(
    movieId: number,
    reviewContent: string,
  ): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { _id: new mongodb.ObjectId(movieId) },
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const review = new Review();
    review.content = reviewContent;
    // review.movie = movie;

    await this.reviewRepository.save(review);

    // return this.movieRepository.findOne(movieId, { relations: ['reviews'] });
    return this.movieRepository.findOne({
      where: { _id: new mongodb.ObjectId(movieId) },
      relations: ['reviews'],
    });
  }
}
