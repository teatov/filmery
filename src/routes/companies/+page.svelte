<script lang="ts">
  import CategoryList from '$lib/components/CategoryList.svelte';

  export let data;
  $: companies = data.companies;
</script>

<svelte:head>
  <title>Companies</title>
</svelte:head>

<CategoryList
  categories={companies.map(company => {
    return {
      name: company.name,
      amount: company.movies.length,
      url: `/?companyId=${company.id}`,
    };
  })}
/>
