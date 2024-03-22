<script lang="ts">
  import MovieCard from '$lib/components/MovieCard.svelte';

  export let data;
  $: movies = data.movies;
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<ul>
  {#each movies as movie}
    <li>
      <MovieCard {movie} genre={movie.genre} />
    </li>
  {/each}
</ul>
