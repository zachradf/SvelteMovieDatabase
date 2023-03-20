export interface Movie {
    id: number;
    title: string;
    release_date: string;
    genre_ids: number[];
    poster_path: string;
    original_title: string;
    overview: string;
    vote_average: number;
    vote_count: number;
  }
export interface MovieApiResponse {
    results: Movie[];
  }