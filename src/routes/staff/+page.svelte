<script lang="ts">
  import CategoryList from '$lib/components/CategoryList.svelte';

  export let data;
  $: staff = data.staff;
</script>

<svelte:head>
  <title>Staff</title>
</svelte:head>

<CategoryList
  categories={staff.map(staffMember => {
    return {
      name: staffMember.name,
      amount: staffMember.movies.length,
      url: `/?staffId=${staffMember.id}`,
    };
  })}
/>
