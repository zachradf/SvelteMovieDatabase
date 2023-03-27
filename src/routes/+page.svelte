<script>
  import { Router, Route } from 'svelte-routing';
  import App from '../components/App.svelte';
  import MoviePage from '../components/MovieCard.svelte';

</script>

<Router>
  <Route path="*" component={App} />
</Router>


  