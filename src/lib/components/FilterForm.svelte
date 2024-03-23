<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import * as Select from '$lib/components/ui/select';
  import type { Company, Country, Genre, Staff } from '$lib/server/schema';
  import { text } from '@sveltejs/kit';

  export let countries: Country[];
  export let genres: Genre[];
  export let staff: Staff[];
  export let companies: Company[];
  export let query: {
    nameIncludes: string | undefined;
    releaseYear: string | undefined;
    countryId: string | null;
    genreId: string | null;
    staffId: string | null;
    companyId: string | null;
  };

  const categories: {
    name: string;
    label: string;
    value: string | null;
    items: typeof countries | typeof genres | typeof staff | typeof companies;
  }[] = [
    {
      name: 'countryId',
      label: 'Country',
      value: query.countryId,
      items: countries,
    },
    { name: 'genreId', label: 'Genre', value: query.genreId, items: genres },
    { name: 'staffId', label: 'Staff', value: query.staffId, items: staff },
    {
      name: 'companyId',
      label: 'Company',
      value: query.companyId,
      items: companies,
    },
  ];

  const inputs: {
    name: string;
    label: string;
    value: string | undefined;
    type: string;
  }[] = [
    {
      name: 'nameIncludes',
      label: 'Name includes',
      value: query.nameIncludes,
      type: 'text',
    },
    {
      name: 'releaseYear',
      label: 'Release year',
      value: query.releaseYear,
      type: 'number',
    },
  ];
</script>

<form action="/" method="GET" class="space-y-4 w-full">
  {#each inputs as input}
    <div class="space-y-1.5">
      <Label for={input.name}>{input.label}</Label>
      <Input
        type={input.type}
        id={input.name}
        name={input.name}
        value={input.value}
      />
    </div>
  {/each}
  {#each categories as category}
    <div class="space-y-1.5">
      <Label for={category.name}>{category.label}</Label>
      <Select.Root
        name={category.name}
        selected={{
          value: category.value ?? '',
          label: category.items.find(item => item.id === Number(category.value))
            ?.name,
        }}
      >
        <Select.Trigger id={category.name}>
          <Select.Value placeholder="-" />
        </Select.Trigger>
        <Select.Content fitViewport class="overflow-y-auto">
          <Select.Item value="">-</Select.Item>
          {#each category.items as item}
            <Select.Item value={item.id}>{item.name}</Select.Item>
          {/each}
        </Select.Content>
        <Select.Input />
      </Select.Root>
    </div>
  {/each}
  <Button type="submit">Search</Button>
</form>
