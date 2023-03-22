<script lang="ts">
    import type { Movie } from '../types/types';
    import { navigate } from 'svelte-routing';
    import { getDetails } from '../functions/movieApi';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';

    export let movie: Movie;

	let movieDetails;


</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="movie-details">
		<p>Overview: {movie.overview}</p>
		<p>Rating: {movie.vote_average}</p>
		<p>Number of Reviews: {movie.vote_count}</p>
    	<p>movieDetails: {movieDetails}</p>
</div>

<style>
	/* .movie-card {
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
	} */
  
</style>
