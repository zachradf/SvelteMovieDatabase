<script>
import MovieList from "../components/MovieList.svelte";
import SearchBar from "../components/SearchBar.svelte";
import Header from "../components/Header.svelte";
</script>
<div class="app">
<Header></Header>
<h2>
  <SearchBar></SearchBar>
</h2>
<p>
  <MovieList></MovieList>
</p>
</div>
<style>
  .app {
    padding: 30px;
    /* background-color: rgb(242, 241, 242); */
    background-color: rgb(254, 244, 254);
    color: rgb(123, 71, 129);
  }
  </style>