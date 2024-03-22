import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const companies = await db.query.companyTable.findMany({ with: { movies: true } });
  return { companies };
};
