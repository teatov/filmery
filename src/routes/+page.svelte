<script lang="ts">
  import MovieCard from '$lib/components/MovieCard.svelte';
  import FilterForm from '$lib/components/FilterForm.svelte';

  export let data;
  $: movies = data.movies;
  $: countries = data.countries;
  $: genres = data.genres;
  $: staff = data.staff;
  $: companies = data.companies;
  $: query = data.query;
</script>

<svelte:head>
  <title>Movies</title>
</svelte:head>

<div class="flex gap-4 flex-col lg:flex-row">
  <div class="lg:max-w-64 w-full">
    <p>{data.moviesCount} movies total</p>
    <FilterForm {countries} {genres} {staff} {companies} {query} />
  </div>
  {#if movies.length > 0}
    <ul class="space-y-4">
      {#each movies as movie}
        <li>
          <MovieCard {movie} />
        </li>
      {/each}
    </ul>
  {:else}
    <p>No movies found</p>
  {/if}
  <div>
    <p>{data.page} / {data.pagesTotal}</p>
    <div class="flex gap-4">
      <a href={data.prevPage}>Previous</a>
      <a href={data.nextPage}>Next</a>
    </div>
  </div>
</div>
