import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent {
  constructor(private http: HttpClient, private zone: NgZone) {}
  moviesList: any[] = [];
  searchQuery: string = '';
  filteredMoviesList: any[] = [];

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.http.get('http://localhost:3000/movies').subscribe((movies: any) => {
      this.moviesList = movies;
      this.filteredMoviesList = movies;
    });
  }

  // deleteMovie(id: number) {
  //   this.http.delete(`http://localhost:3000/movies/${id}`).subscribe(
  //     () => {
  //       console.log(`Movie with ID ${id} deleted successfully`);
  //       this.loadMovies();
  //     },
  //     (error) => {
  //       console.error('Error deleting movie:', error);
  //     }
  //   );
  // }
  searchMovies() {
    this.zone.run(() => {
      console.log(this.searchQuery);
      this.filteredMoviesList = this.moviesList.filter((movie) =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      console.log(this.filteredMoviesList);
    });
  }
}
