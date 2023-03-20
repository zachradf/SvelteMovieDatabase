import type { MovieApiResponse } from "../types/types";
const API_KEY = "7edefdf731502b6398dd9b4d2c622614";

// interface MovieApiResponse {
//     results: Movie[];
//   }
  
// export interface Movie {
//   id: number;
//   title: string;
//   release_date: string;
//   genre_ids: number[];
//   poster_path: string;
// }

// export async function getMovies(): Promise<MovieApiResponse> {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
//   );

//   if (!response.ok) {
//     throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
//   }

//   return await response.json();
// }

export async function getMovies(page: number): Promise<MovieApiResponse> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}
