import type { MovieApiResponse } from "../types/types";
import { PUBLIC_API_KEY } from "$env/static/public"
// const API_KEY = "7edefdf731502b6398dd9b4d2c622614";

export async function getMovies(page: number): Promise<MovieApiResponse> {
  console.log("PUBLIC_API_KEY", PUBLIC_API_KEY)
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${PUBLIC_API_KEY}&language=en-US&page=${page}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}
