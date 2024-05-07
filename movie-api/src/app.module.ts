import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import * as cors from 'cors';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { Movie } from './movie/movie.entity';
import { MovieService } from './movie/movie.service';
import { MovieModule } from './movie/movie.module';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/review.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://wraith:${process.env.MONGODB_PASS}@cluster0.mlxfvhm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      database: 'movie-api',
      entities: [User, Movie, Review],
      synchronize: true,
      logging: true,
    }),
    // PostModule,
    UserModule,
    MovieModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly movieService: MovieService) {}

  // async onModuleInit() {
  //   await this.movieService.seedMovies();
  // }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
