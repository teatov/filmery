<script lang="ts">
  export let data;
  $: movies = data.movies;
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<table>
  {#each movies as movie}
    <tr>
      <th>
        {movie.id}
      </th>
      <th>{movie.title}</th>
    </tr>
  {/each}
</table>
