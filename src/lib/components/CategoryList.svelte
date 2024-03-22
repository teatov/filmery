<script lang="ts">
  import CategoryCard from '$lib/components/CategoryCard.svelte';

  export let categories: { name: string; amount: number; url: string }[];
</script>

<ul class="grid grid-cols-2 gap-4">
  {#each categories as category}
    <li>
      <CategoryCard {...category} />
    </li>
  {/each}
</ul>
