<script lang="ts">
  import { onMount } from "svelte";
  import { getMovies, getDetails } from "../functions/movieApi";
  import type { Movie, MovieCards } from "../types/types";
  import MovieCard from "./MovieCard.svelte";
  import Dropdown from "./DropDown.svelte";

  const PAGE_SIZE: number = 50;
  const genresArray: string[] = []
  let results: Movie[] = [];
  let resultsArray: Movie[] = [];
  let loading: boolean = true;
  let query: string = "";
  let movieCards: MovieCards = []
  let allowScroll: boolean = true;
  let selectedOption: string = 'No Filter';

  
  async function fetchMovies(page: number): Promise<MovieCards> {
    //fetches movies from the movie api
    ({ results } = await getMovies(page));
    //this is used when filtering by genre or title
    resultsArray = [...resultsArray, ...results]
    //moviesArray will be our array of movie cards
    const moviesArray = [];
    for (const movie of results) {
      const details = await getDetails(movie.id);
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
    //this conditional throttles the requests
    if (loading) return;
    loading = true;
    //finds current page number and increments
    const nextPage = Math.ceil(movieCards.length / PAGE_SIZE) + 1;
    //fetch new movies from the next page
    const newMovies = await fetchMovies(nextPage);
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
  const initialMovies = await fetchMovies(1);//loads initial movies
  movieCards = initialMovies
  window.addEventListener("scroll", handleScroll);//adds event listener for infinite scroll
  return () => window.removeEventListener("scroll", handleScroll);
});

async function handleSearch(event: Event) {
  if(query === '' || undefined){
    movieCards = await fetchMovies(1);//resets movieCards to initial state
    allowScroll = true;
  } else {
    allowScroll = false; //disables infinite scroll while searching
    query = (event.target as HTMLInputElement).value.toLowerCase();
  }
}

function filterMovies(movie: MovieCard) {
  return movie.props.movie.title.toLowerCase().includes(query) || movie.props.movieDetails.genres.some(genreSearch);
}

function getFilteredMovies() {
  movieCards = movieCards.filter((el)=>filterMovies(el))
}
function genreFilter(genre: string){
  if(movieCards.length === 0){

  }
  movieCards = movieCards.filter((el)=>el.props.movieDetails.genres.some((genreObj)=>genreObj.name === genre))
}

async function handleSelect(event: CustomEvent<{ option: string }>) {
  if(event.detail.option === 'No Filter'){//resets movieCards to initial state
    selectedOption = 'No Filter'
    movieCards = await fetchMovies(1)
    return;

  } else if(selectedOption === 'No Filter') {//if no filter is currently selected
    genresArray.push(event.detail.option);
    selectedOption = event.detail.option;

  } else {//if a filter is being added
    if(genresArray.includes(event.detail.option)) return; //if the filter is already selected, do nothing
    genresArray.push(event.detail.option);
    selectedOption += ' + ' + event.detail.option;

  }
  genresArray.forEach((genre) => {
    genreFilter(genre);
  })
    
  }

</script>

  <div class='search-container'>
      <input type="text" placeholder="Search by title or genre" bind:value={query} on:input={handleSearch} />
      <div>
      <button on:click={getFilteredMovies}>Search</button>
      <Dropdown
      options={['Comedy', 'Drama', 'Thriller', 'Action', 'Animation', 'Science Fiction', 'Horror', 'No Filter']}
      selectedOption={selectedOption}
      on:select={handleSelect}
    />
  </div>
  </div>
  <div class="movie-grid" >
  {#if movieCards.length === 0 && query !== '' || movieCards.length === 0 && selectedOption !== 'No Filter'}
    <p>No Movies Matching Your Criteria</p>
  {/if}
  {#each movieCards as { component, props }}
    <svelte:component this={component} {...props} />
    {:else}
    {#if loading && query === '' && selectedOption === 'No Filter'}
        <p>Loading...</p>
    {/if}
  {/each}
</div>

<style>
  .movie-grid {
    color: whitesmoke;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0px;
    border-radius: 0.5rem;
    height: auto;
    background-color: #401856;
  }
  /* .movie-grid .p {
    color: white
  } */

  .search-container {
    align-items: center;
    margin-bottom: 1rem;
    min-width: 600px;
  }
  
  .search-container > * {
    margin-right: 0.5rem;
  }
  
  .search-container input {
    flex-grow: .25;
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
    margin-bottom: 5px;
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
  