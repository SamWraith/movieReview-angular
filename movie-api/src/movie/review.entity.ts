// review.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { Movie } from './movie.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  // @ManyToOne(() => Movie, movie => movie.reviews, { nullable: true })
  // movie: Movie;
}
