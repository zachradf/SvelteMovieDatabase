<script lang="ts">
	import type { Movie } from '../types/types';
	import { navigate } from 'svelte-routing';

  export let expanded: boolean;
	export let movie: Movie;
  export let movieDetails: any; //TODO: type this

  let notableCast: boolean  = false;
  let loading: boolean = true;
  let directors: { name: string; }[] = getDirectors();

  const MAX_WIDTH: {NOT_EXPANDED: string, EXPANDED: string} = {
    NOT_EXPANDED: "110px",
    EXPANDED: "95%"
  }
  const P_MAX_WIDTH: {NOT_EXPANDED: string, EXPANDED: string} = {
    NOT_EXPANDED: "50%",
    EXPANDED: "90%"
  }

  let pMaxWidth: string = P_MAX_WIDTH.NOT_EXPANDED;
  let titleMaxWidth: string = MAX_WIDTH.NOT_EXPANDED;

  function adjustViewport(){
    const header = document.getElementById('movie-card-' + movie.id);
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const headerxAxis = header ? header.getBoundingClientRect().x : 0;

    let adjustedOffset: number;
    if(headerxAxis < 100){
      adjustedOffset = .6
    } else if(headerxAxis < 300) {
      adjustedOffset = 1.35
    } else {
      adjustedOffset = 1.5
    }

    window.scrollTo({ // scroll to just below the header
      top: window.pageYOffset + (adjustedOffset * headerHeight), // add a small offset
      behavior: 'smooth' //adds a smooth scrolling animation
    });
  }

	async function handleClick() {
    //navigates to specific movie card
    navigate(`/movies/${movie.id}`);  
    //toggles expanded state
    if(expanded){
      handleClose()

    } else {
      // adjustViewport();
      expanded = true;
      loading = false;
      titleMaxWidth = MAX_WIDTH.EXPANDED;
      pMaxWidth = P_MAX_WIDTH.EXPANDED;

    }
	}

  function handleClose(){
    navigate(`/`)    //returns to "home page" 

    expanded = false; //toggles expanded state and settings
    notableCast = false;
    titleMaxWidth = MAX_WIDTH.NOT_EXPANDED;
    pMaxWidth = P_MAX_WIDTH.NOT_EXPANDED;
  }

  function toggleNotableCast(){
    notableCast = !notableCast;
  }

  function getDirectors(){
    return movieDetails.credits.crew.filter((crewMember : {job: string}) => crewMember.job === 'Director')
  }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="movie-card" id="movie-card-{movie.id}">
	{#if movie.poster_path}
		<img
			src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
			alt={`Poster for ${movie.title}`}
      on:click= {handleClick}
		/>
	{:else}
		<div class="missing-poster" on:click={handleClick}>No poster available</div>
	{/if}
    <h2 on:click= {handleClick} style="max-width: {titleMaxWidth}" >{movie.title}</h2>
    <p style="max-width: {pMaxWidth}">Release date: {movie.release_date}</p>
    <p style="max-width: {pMaxWidth}">Original Language: {movieDetails.original_language}</p>
    <p2 style="max-width: {pMaxWidth}">Genres:
      {#if !expanded}
      <p3>{movieDetails.genres[0].name}</p3>
      {:else}
      {#each movieDetails.genres as genre}
      <li>{genre.name}</li>
      {/each}
      {/if}
    </p2>
	{#if expanded} 
		<p style="max-width: {pMaxWidth}">Overview: {movie.overview}</p>
		<p style="max-width: {pMaxWidth}">Rating: {movie.vote_average} ({movie.vote_count})</p>
    {#if loading === true}
    <p>Loading...</p>
  {:else}
  <span>
    <button class="cast-button" on:click={toggleNotableCast}>Notable Cast and Crew</button>
  </span>
    {#if notableCast === true}
    <div>    
      <p> Director: {directors[0].name}</p>
      {#if directors.length > 1}
      <p> Co-Director: {directors[1].name}</p>
      {/if}
    </div>
    <ul>
    <li> Cast: {movieDetails.credits.cast[0].name}</li><img src={`https://image.tmdb.org/t/p/w92${movieDetails.credits.cast[0].profile_path}`} alt={'actor profile picture'}/>
    <li> Cast: {movieDetails.credits.cast[1].name}</li><img src={`https://image.tmdb.org/t/p/w92${movieDetails.credits.cast[1].profile_path}`} alt={'actor profile picture'}/>
    <li> Cast: {movieDetails.credits.cast[2].name}</li><img src={`https://image.tmdb.org/t/p/w92${movieDetails.credits.cast[2].profile_path}`} alt={'actor profile picture'}/>
    <li> Cast: {movieDetails.credits.cast[3].name}</li><img src={`https://image.tmdb.org/t/p/w92${movieDetails.credits.cast[3].profile_path}`} alt={'actor profile picture'}/>
    <li> Cast: {movieDetails.credits.cast[4].name}</li><img src={`https://image.tmdb.org/t/p/w92${movieDetails.credits.cast[4].profile_path}`} alt={'actor profile picture'}/>
  </ul>
    {/if}
  {/if}
		<button class="close-button" on:click|stopPropagation={handleClose}>&times;</button>
	{/if}
</div>

<style>
	.movie-card {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
		color: rgba(255, 255, 255, 0.848);
		background-color: #401856;
		border-radius: 0.5rem;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	}

	.movie-card:hover {
		transform: scale(1.03);
		box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
	}

	.movie-card h2 {
    text-align: left;
    overflow-x: visible;
  }

	.movie-card p {
		text-align: left;
		margin: 0.5rem 0;
		background-color: #401856;
		padding: 10px;
	}

  .movie-card p2 {
    text-align: left;
    margin: 0.5rem 0;
    background-color: #401856;
    padding: 10px;
  }

	.movie-card p3 {
		text-align: left;
		margin: 0.5rem 0;
    max-width: 100px;
		background-color: #401856;
	}

	.movie-card img {
		border-radius: 0.25rem;
    max-width: 200px;
	}

	.missing-poster {
		width: 185px;
		height: 278px;
		background-color: #ccc;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.5rem;
		font-weight: bold;
		text-align: center;
		color: #333;
	}

 .close-button {
		background-color: #290f37;
		color: white;
		border: none;
		font-size: 1.5rem;
    margin: 1%;
		padding: 0.5rem;
		cursor: pointer;
	}

  .cast-button {
    background: none;
    border: none;
    color: #ccc;
    font-size: 16px;
    font-weight: bold;
    text-decoration: underline;
    transition: color 0.3s ease;
  }

  .cast-button:hover {
    color: #fffafa;
    transform: scale(1.05);
  }
  
</style>
