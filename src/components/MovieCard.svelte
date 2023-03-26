<script lang="ts">
	import type { Movie } from '../types/types';
	import { navigate } from 'svelte-routing';

  export let expanded: boolean
	export let movie: Movie;
  export let movieDetails: any;

  let notableCast: boolean  = false
  let loading: boolean = true;
  let directors: { name: string; }[] = getDirectors();

	async function handleClick() {
    //navigates to specific movie card
    navigate(`/movies/${movie.id}`);  
    //toggles expanded state
    if(expanded){
      handleClose()
    } else {
		expanded = true;
    loading = false;
    }
		
	}

  function handleClose(){
    //returns to home page and toggles expanded state
    navigate(`/`)
    expanded = false;
    notableCast = false;
  }

  function toggleNotableCast(){
    notableCast = !notableCast;
  }

  function getDirectors(){
    return movieDetails.credits.crew.filter((crewMember) => crewMember.job === 'Director')
  }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="movie-card">
	{#if movie.poster_path}
		<img
			src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
			alt={`Poster for ${movie.title}`}
      on:click= {handleClick}
		/>
	{:else}
		<div class="missing-poster" on:click={handleClick}>No poster available</div>
	{/if}
    <h2 on:click= {handleClick}>{movie.title}</h2>
    <p>Release date: {movie.release_date}</p>
    <p2>Genres:
      {#if !expanded}
      <p3>{movieDetails.genres[0].name}</p3>
      {:else}
      {#each movieDetails.genres as genre}
      <li>{genre.name}</li>
      {/each}
      {/if}
    </p2>
	{#if expanded} 
		<p>Overview: {movie.overview}</p>
		<p>Rating: {movie.vote_average} ({movie.vote_count})</p>
    {#if loading === true}
    <p>Loading...</p>
  {:else}
  <span>
    <button class="cast-button" on:click={toggleNotableCast}>Notable Cast and Crew</button>
  </span>
    {#if notableCast === true}
    <div>    
      <p> Director: {directors[0].name}</p>
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
    max-width: 110px;
  }

	.movie-card p {
		text-align: left;
		margin: 0.5rem 0;
    max-width: 50%;
		background-color: #401856;
		padding: 10px;
	}
	.movie-card p3 {
		text-align: left;
		margin: 0.5rem 0;
    max-width: 100px;
		background-color: #401856;
		padding: 10px;
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
