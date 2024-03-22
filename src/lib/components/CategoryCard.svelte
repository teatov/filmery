<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';

  export let name: string;
  export let amount: number;
  export let url: string;
</script>

<Card.Root>
  <Card.Header class="flex-row justify-between items-center gap-4 p-4">
    <Card.Title
      ><Button href={url} variant="link" class="text-lg p-0">{name}</Button
      ></Card.Title
    >
    <Card.Description class="!m-0">{amount} movie(s)</Card.Description>
  </Card.Header>
</Card.Root>
