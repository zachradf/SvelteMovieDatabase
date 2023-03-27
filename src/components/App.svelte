<script lang="ts">
    import MovieList from "./MovieList.svelte";
    import Header from "./Header.svelte";
</script>

<div class="app">
    <Header/>
    <p><MovieList/></p>
</div>

<style>
  .app {
    background-image: url(https://img.freepik.com/free-vector/abstract-blue-light-pipe-speed-zoom-black-background-technology_1142-9120.jpg);
    color: rgb(123, 71, 129);
    overflow-x: hidden
  }
</style>