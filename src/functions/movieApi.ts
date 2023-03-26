import { PUBLIC_API_KEY } from "$env/static/public"

//function to fetch all movies matching the specifications
export async function getMovies(page: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&primary_release_date.gte=1957&with_cast&with_crew&page=${page}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

//function to fetch movie details about a single movie
export async function getDetails(id: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${PUBLIC_API_KEY}&language=en-US&append_to_response=credits&include_image_language=en,null&vote_count.gte=1000000&sort_by=popularity.desc&cast.profile_path.notnull`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}
