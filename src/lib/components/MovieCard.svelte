<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import type { Movie, Genre, MovieStaff, Staff } from '$lib/server/schema';

  export let movie: Movie & {
    genre: Genre | null;
    staff: (MovieStaff & { staff: Staff | null })[] | null;
  };
  const releaseDate = new Date(movie.releaseDate);
</script>

<Card.Root class="flex overflow-hidden">
  {#if movie.poster}
    <img src={movie.poster} alt={movie.title} class="max-h-64" />
  {/if}
  <div>
    <Card.Header>
      <Card.Title
        ><Button href="/{movie.id}" variant="link" class="text-lg p-0"
          >{movie.title}</Button
        ></Card.Title
      >
      <Card.Description
        >{releaseDate.getFullYear()} - {movie?.genre?.name}</Card.Description
      >
    </Card.Header>
    <Card.Content>
      <p class="line-clamp-3">{movie.synopsis}</p>
    </Card.Content>
    {#if movie.staff}
      <Card.Footer>
        <ul class="flex flex-wrap gap-x-4">
          {#each movie.staff.slice(0, 3) as staffMember}
            <li>
              <span class="text-muted-foreground">{staffMember.credit}:</span>
              {staffMember.staff?.name}
            </li>
          {/each}
        </ul>
      </Card.Footer>
    {/if}
  </div>
</Card.Root>
