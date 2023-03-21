import type { MovieApiResponse } from "../types/types";
import { PUBLIC_API_KEY } from "$env/static/public"
// const API_KEY = "7edefdf731502b6398dd9b4d2c622614";

export async function getMovies(page: number): Promise<MovieApiResponse> {
  const response = await fetch(
    // `https://api.themoviedb.org/3/movie/popular?api_key=${PUBLIC_API_KEY}&language=en-US&page=${page}`
    `https://api.themoviedb.org/3/discover/movie?api_key=${PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&primary_release_date.gte=1957&with_cast&with_crew&page=${page}`

  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

export async function getDetails(id: number): Promise<MovieApiResponse> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${PUBLIC_API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}