<script lang="ts">
  import { onMount } from "svelte";
  import { getMovies, getDetails } from "../functions/movieApi";
  import type { Movie, MovieCards } from "../types/types";
  import MovieCard from "./MovieCard.svelte";


  const PAGE_SIZE = 50;
  let results: Movie[] = [];
  let resultsArray: Movie[] = [];
  let loading = false;
  let query: string = "";
  let movieCards: MovieCards = []
  let allowScroll: boolean = true;
  


  async function fetchMovies(page: number) {
    // console.log('MOVIE array IN FETCH MOVIES1', movieArray)
   ({ results } = await getMovies(page));
  // resultsArray.push(...results)
  resultsArray = [...resultsArray, ...results]
  // console.log('THIS IS RESULTS ', resultsArray)
  const moviesArray = [];
  for (const movie of results) {
    const details = await getDetails(movie.id);
    // console.log('THIS IS FETCH MOVIE DETAILS', moviesArray)
    moviesArray.push({
    component: MovieCard,
    props: {
      movie,
      expanded: false,
      movieDetails: details,
    },
  });
  }
  return moviesArray;
}

  async function loadMoreMovies() {
    console.log('load more movies')
    //this conditional throttles the requests
    if (loading) return;
    loading = true;
    //finds current page number and increments
    const nextPage = Math.ceil(movieCards.length / PAGE_SIZE) + 1;
    //fetch new movies from the next page
    const newMovies = await fetchMovies(nextPage);
    console.log('THIS IS NEW MOVIES', newMovies)
    movieCards = [...movieCards, ...newMovies];
    loading = false;
  }

  function genreSearch(genreObj: {name: string}){//searches for matching genres
    return genreObj.name.toLowerCase() === query
  }

  function handleScroll() {//infinite scroll, fires loadMoreMovies() at the bottom of the page
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if(!allowScroll) return;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      loadMoreMovies();
    }
  }


onMount(async () => {
  const initialMovies = await fetchMovies(1);
  console.log('THIS IS INITIAL MOVIES', initialMovies[0].props.movieDetails)
  movieCards = initialMovies
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
});

async function handleSearch(event: Event) {
  if(query === '' || undefined){
    movieCards = await fetchMovies(1);
    allowScroll = true;
  } else {
    allowScroll = false;
    query = (event.target as HTMLInputElement).value.toLowerCase();
    console.log('query', query)
  }
}

//!TO DO write this function to filter to include matching genres
function filterMovies(movie: MovieCard) {
  console.log('movie',movie.props.movieDetails.genres);
  return movie.props.movie.title.toLowerCase().includes(query) || movie.props.movieDetails.genres.some(genreSearch);
}

async function getFilteredMovies() {
  movieCards = movieCards.filter((el)=>filterMovies(el))
  console.log('movies in filtermovies', movieCards)
}
</script>

  <div>
    <span>
      <input type="text" placeholder="Search by title or genre" bind:value={query} on:input={handleSearch} />
      <button on:click={getFilteredMovies}>Search</button>
   </span> 
  </div>
  <div class="movie-grid" >
  {#each movieCards as { component, props }}
    <svelte:component this={component} {...props} />
    {:else}
        <p>Loading...</p>
  {/each}
</div>

<style>
  .movie-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0px;
    border-radius: 0.5rem;
    height: auto;
    background-color: #401856;
  }
  input {
    width: 30%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    transition: border-color 0.2s ease-in-out;
  }

  input:focus {
    outline: none;
    border-color: #007aff;
  }

  button {
    display: block;
    width: 30%;
    padding: 10px;
    background-color: #9707b7;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  button:hover {
    background-color: #480357;
  }

</style>
  