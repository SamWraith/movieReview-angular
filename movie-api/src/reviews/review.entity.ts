import {
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  // id: number;
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  review: string;

  @Column()
  movieId: string;
  // movieId: number;
  // userId: number;
  // content: string;
  // rating: number;
  // createdAt: Date;
  // updatedAt: Date;
  // user: User;
  // movie: Movie;
}
