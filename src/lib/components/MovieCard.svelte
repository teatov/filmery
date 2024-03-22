<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import type { FullMovie } from '$lib/server/schema';

  export let movie: FullMovie;
  const releaseDate = new Date(movie.releaseDate);
</script>

<Card.Root class="flex overflow-hidden">
  <img src={movie.poster} alt={movie.title} class="max-h-64" />
  <div>
    <Card.Header>
      <Card.Title>{movie.title}</Card.Title>
      <Card.Description
        >{releaseDate.getFullYear()} {movie?.genre?.name}</Card.Description
      >
    </Card.Header>
    <Card.Content>
      <p class="line-clamp-3">{movie.synopsis}</p>
    </Card.Content>
    {#if movie.staff}
      <Card.Footer>
        <ul class="flex flex-wrap gap-4">
          {#each movie.staff as staffMember}
            <li>{staffMember.credit}: {staffMember.staff.name}</li>
          {/each}
        </ul>
      </Card.Footer>
    {/if}
  </div>
</Card.Root>
