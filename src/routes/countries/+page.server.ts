import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const countries = await db.query.countryTable.findMany({ with: { movies: true } });
  return { countries };
};
