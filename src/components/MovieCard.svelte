<script lang="ts">
	import type { Movie } from '../types/types';
	import { navigate } from 'svelte-routing';
	import { getDetails } from '../functions/movieApi';
  import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
  import {MovieDetails} from './MovieDetails.svelte';

	export let movie: Movie;

	let expanded = false;
	let movieDetails = writable({});
  let loading = true;

	async function fetchMoviesDetails(id: number) {//fires the getDetails function
		const { results } = await getDetails(id);
		return results;
	}

	async function handleClick() {
    if(expanded){//returning to homepage
      navigate(`/`)
    } else{//navigates to specific movie card
      navigate(`/movies/${movie.id}`);  
    }

		expanded = !expanded;

		if (expanded) {//fetches movieDetails if card is being expanded
			//  const details = await fetchMoviesDetails(movie.id);
      //  movieDetails.set(JSON.stringify(details));
       loading = false;
		}
	}

  onMount(async () => {
    
       const details = await fetchMoviesDetails(movie.id);
       movieDetails.set(JSON.stringify(details));
       console.log('THIS IS MOVIEDETAILS', movieDetails);
    
  });

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="movie-card" on:click={handleClick}>
	{#if movie.poster_path}
		<img
			src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
			alt={`Poster for ${movie.title}`}
		/>
	{:else}
		<div class="missing-poster">No poster available</div>
	{/if}
    <h2>{movie.title}</h2>
    <p>Release date: {movie.release_date}</p>
    <p>Genres: {movie.genre_ids.join(', ')}</p>
	{#if expanded} 
		<p>Overview: {movie.overview}</p>
		<p>Rating: {movie.vote_average}</p>
		<p>Number of Reviews: {movie.vote_count}</p>
    {#if loading === true}
    <p>Loading...</p>
  {:else}
    <p>movieDetails: {movieDetails}</p>
  {/if}
		<button class="close-button" on:click|stopPropagation={handleClick}>&times;</button>
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
    max-width: 100%;
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
		padding: 0.5rem;
		cursor: pointer;
	}
  
</style>
