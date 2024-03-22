<script lang="ts">
  import MovieCard from '$lib/components/MovieCard.svelte';

  export let data;
  $: movies = data.movies;
</script>

<svelte:head>
  <title>Movies</title>
</svelte:head>

{#if movies.length > 0}
  <ul>
    {#each movies as movie}
      <li>
        <MovieCard {movie} />
      </li>
    {/each}
  </ul>
{:else}
  <p>No movies found</p>
{/if}
