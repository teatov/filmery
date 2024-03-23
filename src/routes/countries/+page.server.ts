import { db } from '$lib/server/db';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { countryTable } from '$lib/server/schema';

export const load: PageServerLoad = async () => {
  const countries = await db.query.countryTable.findMany({
    with: { movies: true },
    orderBy: [asc(countryTable.name)],
  });
  return { countries };
};
