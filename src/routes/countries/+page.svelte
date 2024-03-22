<script lang="ts">
  import CategoryList from '$lib/components/CategoryList.svelte';

  export let data;
  $: countries = data.countries;
</script>

<svelte:head>
  <title>Countries</title>
</svelte:head>

<CategoryList
  categories={countries.map(country => {
    return {
      name: country.name,
      amount: country.movies.length,
      url: `/?countryId=${country.id}`,
    };
  })}
/>
