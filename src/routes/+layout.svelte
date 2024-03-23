<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import '../app.css';

  type NavLink = {
    title: string;
    url: string;
  };

  const navLinks: NavLink[] = [
    {
      title: 'Movies',
      url: '/',
    },
    {
      title: 'Genres',
      url: '/genres',
    },
    {
      title: 'Staff',
      url: '/staff',
    },
    {
      title: 'Countries',
      url: '/countries',
    },
    {
      title: 'Companies',
      url: '/companies',
    },
  ];
</script>

<header class="container py-6">
  <nav>
    <ul class="flex justify-center gap-4">
      {#each navLinks as navLink}
        <li>
          <Button href={navLink.url} variant="ghost">{navLink.title}</Button>
        </li>
      {/each}
    </ul>
  </nav>
</header>

<main class="container max-w-screen-lg mx-auto">
  <slot />
</main>
