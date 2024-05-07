import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrl: './movie-review.component.css',
})
export class MovieReviewComponent {
  movieId: string = '';
  movie: any = [];
  reviews: any[] = [];
  newReview: string = '';
  reviewContent: string = '';
  reviewsList: any[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    console.log(`this.movieId: ${this.movieId}`);
    this.fetchMovieDetails();
    this.loadReviews();
  }
  // fetchMovieDetails() {
  //   this.http.get(`http://localhost:3000/movies/${this.movieId}`).subscribe((data: any) => {
  //     this.movie = data;
  //     this.reviews = this.movie.reviews;
  //     console.log(this.movie.reviews)
  //   });
  // }
  loadReviews() {
    this.http
      .get(`http://localhost:3000/reviews/${this.movieId}`)
      .subscribe((review: any) => {
        this.reviewsList = review;
      });
  }
  fetchMovieDetails() {
    this.http
      .get(`http://localhost:3000/movies/${this.movieId}`)
      .subscribe((data: any) => {
        this.movie = data;
        console.log(this.movie);
        if (this.movie.reviews) {
          this.reviews = JSON.parse(this.movie.reviews);
          console.log(this.reviews);
        } else {
          this.reviews = [];
        }
        console.log(this.reviews);
      });
  }
  // fetchMovieDetails() {
  //   this.http.get(`http://localhost:3000/movies/${this.movieId}`).subscribe((data: any) => {
  //     console.log('Movie object:', data);
  //     this.movie = data;
  //     this.reviews = this.movie.reviews;
  //     console.log('Reviews:', this.reviews);

  //     if (Array.isArray(this.reviews)) {
  //       this.reviews.forEach((review: any) => {
  //         console.log('Review:', review);
  //       });
  //     } else {
  //       console.log('Reviews is not an array');
  //     }
  //   });
  // }
  submitReview() {
    if (this.newReview) {
      const reviews = {
        review: this.newReview,
        movieId: this.movieId,
      };
      this.http
        .post(`http://localhost:3000/reviews/${this.movieId}`, reviews)
        .subscribe(
          (response: any) => {
            console.log('Review submitted successfully');

            this.fetchMovieDetails();
            this.newReview = '';
            this.loadReviews();
          },
          (error) => {
            console.error('Error submitting review:', error);
          }
        );
    }
  }
}
