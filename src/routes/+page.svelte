<script>
  import { Router, Route } from 'svelte-routing';
  import App from '../components/App.svelte';

</script>

<Router>
  <Route path="*" component={App} />
  <!-- <Route path="/movie/:id" component={MoviePage} /> -->
</Router>


  