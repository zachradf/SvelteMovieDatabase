import type { MovieApiResponse } from "../types/types";
import { PUBLIC_API_KEY } from "$env/static/public"

//function to fetch all movies matching the specifications
export async function getMovies(page: number): Promise<MovieApiResponse> {
  const response = await fetch(
    //!TO DO figure out which of these is correct
    // `https://api.themoviedb.org/3/movie/popular?api_key=${PUBLIC_API_KEY}&language=en-US&page=${page}`
    `https://api.themoviedb.org/3/discover/movie?api_key=${PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&primary_release_date.gte=1957&with_cast&with_crew&page=${page}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}
console.log(getMovies(1))
//function to fetch movie details about a single movie
export async function getDetails(id: number): Promise<MovieApiResponse> {//!TO DO change this to the correct type
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${PUBLIC_API_KEY}&language=en-US`
  )
  console.log("THIS IS RESPONSE IN GET MOVIES",response)
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}