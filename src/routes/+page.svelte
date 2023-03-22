<script>
  import MovieList from "../components/MovieList.svelte";
  import Header from "../components/Header.svelte";

</script>

<div class="app">
  <Header/>
  <p><MovieList/></p>
</div>

<style>
  .app {
    padding: 30px;
    background-color: rgb(254, 244, 254);
    background-image: url(https://img.freepik.com/free-vector/abstract-blue-light-pipe-speed-zoom-black-background-technology_1142-9120.jpg);
    color: rgb(123, 71, 129);
  }

</style>
  