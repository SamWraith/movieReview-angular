import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.entity';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}
  @Post(':id/')
  async addMovieReview(@Body() body: CreateReviewDto): Promise<Review> {
    console.log('From reviews controller');
    const review = await this.reviewService.addReview(body);
    return review;
  }

  @Get(':id/')
  async getMovieReviews(@Param('id') id: string): Promise<Review[]> {
    try {
      // const movieId = parseInt(id, 10);
      console.log(id);
      return await this.reviewService.getReviews(id);
    } catch (error) {
      throw new InternalServerErrorException('Error getting reviews', error);
    }
  }
}
