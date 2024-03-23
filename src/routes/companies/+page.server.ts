import { db } from '$lib/server/db';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { companyTable } from '$lib/server/schema';

export const load: PageServerLoad = async () => {
  const companies = await db.query.companyTable.findMany({
    with: { movies: true },
    orderBy: [asc(companyTable.name)],
  });
  return { companies };
};
