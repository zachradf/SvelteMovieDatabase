<script lang="ts">
  import { onMount } from "svelte";
  import { getMovies } from "../functions/movieApi";
  import type { Movie } from "../types/types";
  import MovieCard from "./MovieCard.svelte";

  const PAGE_SIZE = 50;
  let movies: Movie[] = [];
  let movieCards: { component: typeof MovieCard; props: { movie: Movie } }[] = [];
  let loading = false;
  let query = "";

  async function fetchMovies(page: number) {//fires the getMovie function
    const { results } = await getMovies(page);
    //!TO DO type results
    return results;
  }

  async function loadMoreMovies() {
    //this conditional throttles the requests
    if (loading) return;
    loading = true;
    //finds current page number and increments
    const nextPage = Math.ceil(movieCards.length / PAGE_SIZE) + 1;
    //fetch new movies from the next page
    const newMovies = await fetchMovies(nextPage);
    //add to movies array
    movies = [...movies, ...newMovies];
    //creates movieCard components and adds to movieCards array
    movieCards = [
      ...movieCards,
      ...newMovies.map((movie) => ({
        component: MovieCard,
        props: {
          movie,
          expanded: false,
        },
      })),
    ];
    loading = false;
  }

  function handleScroll() {//infinite scroll, fires loadMoreMovies() at the bottom of the page
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      loadMoreMovies();
    }
  }

onMount(() => {
  //Initial fetch request for movies
  //Populates MovieCards array
  fetchMovies(1).then((results) => {
    movies = results;
    movieCards = results.map((movie) => ({
      component: MovieCard,
      props: {
        movie,
        expanded: false,
      },
    }));
  });
  //for infinite scroll 
  window.addEventListener("scroll", handleScroll);
  //(LOOK MORE INTO THS)
  return () => window.removeEventListener("scroll", handleScroll);
});

function handleSearch(event: Event) {
  if(query === ''){
    movieCards = [];
    fetchMovies(1).then((results) => {
    movies = results;
    movieCards = results.map((movie) => ({
      component: MovieCard,
      props: {
        movie,
        expanded: false,
      },
    }));
  });
  }
  query = (event.target as HTMLInputElement).value.toLowerCase();
  console.log('THIS IS QUERY______', query);
}

//!TO DO write this function to filter to include matching genres
function filterMovies(movie: Movie) {
  return movie.title.toLowerCase().includes(query) || movie.genre_ids.includes(parseInt(query));
}

function getFilteredMovies() {
  movieCards = [];
  movies = [...movies.filter((el)=>filterMovies(el))];
  movieCards = movies.map((movie) => ({
      component: MovieCard,
      props: {
        movie,
        expanded: false,
      },
    }));
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
  