import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as mongodb from 'mongodb';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    // this.movieService.seedMovies();
    return this.movieService.findAllMovies();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie | undefined> {
    try {
      const movie = await this.movieService.findOneMovie(id);
      if (!movie) {
        throw new NotFoundException(`Movie with ID ${id} not found`);
      }
      // console.log('Get movie detail: \n', movie);
      return movie;
    } catch (error) {
      throw new InternalServerErrorException('Error finding movie', error);
    }
  }
  @Delete(':id')
  async deleteMovie(@Param('id') id: string): Promise<any> {
    try {
      const deletedMovie = await this.movieService.deleteMovie(parseInt(id));
      return { message: 'Movie deleted successfully', deletedMovie };
    } catch (error) {
      return { error: 'Error deleting movie', details: error.message };
    }
  }

  // @Post(':id/reviews')
  // async addReviewToMovie(
  //   @Param('id') id: string,
  //   @Body('review') review: string,
  // ): Promise<Movie> {
  //   try {
  //     const movieId = parseInt(id, 10);
  //     const movie = await this.movieService.addReviewToMovie(movieId, review);
  //     return movie;
  //   } catch (error) {
  //     throw new InternalServerErrorException('Error adding review to movie', error);
  //   }
  // }

  //   @Get(':id')
  //   async findOne(@Param('id') id: string): Promise<Movie> {
  //     return this.movieService.findOne(parseInt(id, 10));
  //   }

  //   @Post()
  //   async create(@Body() movieData: Movie): Promise<Movie> {
  //     return this.movieService.create(movieData);
  //   }
}
