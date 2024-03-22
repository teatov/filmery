<script lang="ts">
  import { Separator } from '$lib/components/ui/separator';
  import { Button } from '$lib/components/ui/button';

  export let data;
  $: movie = data.movie;
</script>

<svelte:head>
  <title>Staff</title>
</svelte:head>

<section class="flex gap-4 mb-4">
  <div>
    <img src={movie.poster} alt={movie.title} class="max-w-64 max-h-96" />
  </div>
  <div class="space-y-4">
    <h1 class="text-4xl font-bold">{movie.title}</h1>
    <p>{movie.synopsis}</p>
    <Separator />
    <ul class="grid grid-cols-2 gap-4">
      <li>
        <span class="text-muted-foreground">Release date:</span>
        {new Date(movie.releaseDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </li>
      <li>
        <span class="text-muted-foreground">Genre:</span>
        <Button
          href={`/?genreId=${movie.genreId}`}
          variant="link"
          class="p-0 text-md h-auto"
        >
          {movie.genre?.name}
        </Button>
      </li>
      <li>
        <span class="text-muted-foreground">Duration:</span>
        {movie.duration} min
      </li>
      <li>
        <span class="text-muted-foreground">Country:</span>
        <Button
          href={`/?countryId=${movie.countryId}`}
          variant="link"
          class="p-0 text-md h-auto"
        >
          {movie.country?.name}
        </Button>
      </li>
    </ul>
  </div>
</section>

<Separator />
<section class="space-y-4 my-4">
  <h2 class="text-2xl font-bold">Cast and crew</h2>
  <ul class="grid grid-cols-2 gap-4">
    {#each movie.staff as movieStaff}
      <li>
        <span class="text-muted-foreground">{movieStaff.credit}:</span>
        <Button
          href={`/?staffId=${movieStaff.staffId}`}
          variant="link"
          class="p-0 text-md h-auto"
        >
          {movieStaff.staff?.name}
        </Button>
      </li>
    {/each}
  </ul>
</section>

<Separator />
<section class="space-y-4 my-4">
  <h2 class="text-2xl font-bold">Production companies</h2>
  <ul class="grid grid-cols-2 gap-4">
    {#each movie.companies as movieCompany}
      <li>
        <Button
          href={`/?companyId=${movieCompany.companyId}`}
          variant="link"
          class="p-0 text-md h-auto"
        >
          {movieCompany.company?.name}
        </Button>
      </li>
    {/each}
  </ul>
</section>
