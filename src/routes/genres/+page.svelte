<script lang="ts">
  import CategoryList from '$lib/components/CategoryList.svelte';

  export let data;
  $: genres = data.genres;
</script>

<svelte:head>
  <title>Genres</title>
</svelte:head>

<CategoryList
  categories={genres.map(genre => {
    return {
      name: genre.name,
      amount: genre.movies.length,
      url: `/?genreId=${genre.id}`,
    };
  })}
/>
