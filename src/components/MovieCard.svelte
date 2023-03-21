   <script lang="ts">
    import type { Movie } from "../types/types";
    import { Link, navigate } from "svelte-routing";
    import getDetails from "../functions/movieApi";
    import { onMount } from "svelte";
    
    export let movie: Movie;
    
    let expanded = false;
    
    async function fetchMoviesDetails(id: number) {
      const { results } = await getDetails(id);
      console.log('THIS IS RESULTS______', results)
      return results;
    }

    function handleClick() {
      navigate(`/movies/${movie.id}`);
      expanded = !expanded;
      
      // const body = document.querySelector("body");
      // body.style.overflow = expanded ? "auto" : "auto";
      // body.className = expanded ? "full-width" : "movie-card";
      // console.log(body.className)
    }
    
    function handleClose() {
      expanded = false;
      const body = document.querySelector("body");
      body.style.overflow = "auto";
    }
    
    // $: style = `
    //   .movie-card {
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //     padding: 1rem;
    //     color: rgba(255, 255, 255, 0.848);
    //     background-color: rgb(37, 32, 32);
    //     border-radius: 0.5rem;
    //     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    //     margin: 0.5rem;
    //     position: ${expanded ? "fixed" : "relative"};
    //     max-height: ${expanded ? "100%" : "auto"};
    //     max-width: ${expanded ? "100%" : "185px"};
    //     height: ${expanded ? "100%" : "auto"};
    //     position: ${expanded ? "fixed" : "relative"};
    //     top: ${expanded ? "0" : "auto"};
    //     left: ${expanded ? "0" : "auto"};
    //     z-index: ${expanded ? "999" : "0"};
    //     overflow-y: ${expanded ? "scroll" : "hidden"};
    //     width: ${expanded ? "100%" : "auto"};
    //     transition: all 0.5s ease-in-out;
    //   }
    $: style = `.movie-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.848);
  background-color: rgb(37, 32, 32);
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 0.5rem;
  max-height: ${expanded ? "none" : "auto"};
  max-width: ${expanded ? "100%" : "100px"};
  height: ${expanded ? "100%" : "auto"};
  width: ${expanded ? "100%" : "auto"};
  position: ${expanded ? "fixed" : "relative"};
  top: ${expanded ? "0" : "auto"};
  left: ${expanded ? "0" : "auto"};
  z-index: ${expanded ? "999" : "0"};
  overflow-y: ${expanded ? "scroll" : "hidden"};
  transition: all 0.5s ease-in-out;
  grid-row: ${expanded ? "span 2" : "auto"};
  grid-column: ${expanded ? "1 / -1" : "auto"};
}

      
      .movie-card:hover {
        transform: scale(1.03);
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
      }
      
      .close-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background-color: rgb(37, 32, 32);
        color: white;
        border: none;
        font-size: 1.5rem;
        padding: 0.5rem;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
      }
    `;
  </script>
  <!-- <Link to={`/movies/${movie.id}`}> -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="movie-card" on:click={handleClick}>
    {#if movie.poster_path}
      <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={`Poster for ${movie.title}`} />
    {:else}
      <div class="missing-poster">No poster available</div>
    {/if}
    <h2>{movie.title}</h2>
    <p>Release date: {movie.release_date}</p>
    <p>Genres: {movie.genre_ids.join(", ")}</p>
    {#if expanded}
    <p>Overview: {movie.overview}</p>
    <p>Rating: {movie.vote_average}</p>
    <p>Number of Reviews: {movie.vote_count}</p>
    <button class="close-button" on:click|stopPropagation={handleClose}>&times;</button>
    {/if}
  </div>
<!-- </Link> -->

  <style>
    .movie-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      font-family: "Roboto","Helvetica","Arial",sans-serif;
      color: rgba(255, 255, 255, 0.848);
      background-color: #401856;
      border-radius: 0.5rem;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }
    
    .movie-card:hover {
      transform: scale(1.03);
box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
}
.movie-card h2,
.movie-card p {
  text-align: left;
  margin: 0.5rem 0;
  background-color: #401856;
  padding: 10px;
}
.movie-card img{
  border-radius: 0.25rem;
  
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
  