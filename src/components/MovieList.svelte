   <script lang="ts">
    import { onMount } from "svelte";
    import { getMovies } from "../functions/movieApi";
    import type { Movie } from "../types/types";
    import MovieCard from "./MovieCard.svelte";
  
    const PAGE_SIZE = 50;
    let movies: Movie[] = [];
    let movieCards: { component: typeof MovieCard; props: { movie: Movie } }[] = [];
    let loading = false;
  
    async function fetchMovies(page: number) {
      const { results } = await getMovies(page);
      return results;
    }
  
    async function loadMoreMovies() {
      if (loading) return;
      loading = true;
      const nextPage = Math.ceil(movieCards.length / PAGE_SIZE) + 1;
      const newMovies = await fetchMovies(nextPage);
      movies = [...movies, ...newMovies];
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
  
    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        loadMoreMovies();
      }
    }
  
    onMount(() => {
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
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    });

    function handleSearch(event: Event) {
    query = (event.target as HTMLInputElement).value.toLowerCase();
  }

  function filterMovies(movie: Movie) {
    return movie.title.toLowerCase().includes(query);
  }

  function getFilteredMovies() {
    return movies.filter(filterMovies);
  }
</script>

<div>
  <label for="search-input">Search by title:</label>
  <input id="search-input" type="text" on:input={handleSearch} />
</div>  
  <div class="movie-grid" style="overflow-y: auto">
    {#each movieCards as { component, props }}
    <svelte:component this={component} {...props} />
      {:else}
      {#if loading}
        <p>Loading...</p>
      {/if}
    {/each}
  </div>
  
 
  <style>
    .movie-grid {
      display: grid;
      gap: 20px;
      border-radius: 0.5rem;
      /* border: 9px solid;
      border-image: linear-gradient(to top, #401856 0%, rgb(254, 244, 254) 100%); */
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      background-color: #401856;
      overflow-y: auto;
    }
  </style>
   
    <!-- <script lang="ts">
      import { onMount } from "svelte";
      import { getMovies } from "../functions/movieApi";
      import type { Movie } from "../types/types";
      import MovieCard from "./MovieCard.svelte";
    
      const PAGE_SIZE = 50;
      let movies: Movie[] = [];
      let movieCards: { component: typeof MovieCard; props: { movie: Movie } }[] = [];
      let loading = false;
      let query = "";
    
      async function fetchMovies(page: number) {
        const { results } = await getMovies(page);
        return results;
      }
    
      async function loadMoreMovies() {
        if (loading) return;
        loading = true;
        const nextPage = Math.ceil(movieCards.length / PAGE_SIZE) + 1;
        const newMovies = await fetchMovies(nextPage);
        movies = [...movies, ...newMovies];
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
    
      function handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 50) {
          loadMoreMovies();
        }
      }
    
      onMount(() => {
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
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      });
    
      function handleSearch(event: Event) {
        query = (event.target as HTMLInputElement).value.toLowerCase();
        console.log('HERE IS QUERY---------------------------------------',query);
        return
      }
    
      function filterMovies(movie: Movie) {
        return movie.title.toLowerCase().includes(query);
      }
    
      function getFilteredMovies() {
        return query ? movies.filter(filterMovies(movie)) : movies;
      }

    </script>

      <div>
      <div>
        <label for="search-input">Search by title:</label>
        <input id="search-input" type="text" on:input={handleSearch} />
      </div>
      <div class="movie-grid" style="overflow-y: auto">
        {#if !loading}
        {#each movieCards as { component, props }}
        <svelte:component this={component} {...props} />
        {/each}
        {:else}
          <p>Loading...</p>
        {/if}
      </div>
    </div>

    <style>
      .movie-grid {
        display: grid;
        gap: 20px;
        border-radius: 0.5rem;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        background-color: #401856;
        overflow-y: auto;
      }
    </style>
     -->