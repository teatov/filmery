import { db } from '$lib/server/db';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { staffTable } from '$lib/server/schema';

export const load: PageServerLoad = async () => {
  const staff = await db.query.staffTable.findMany({
    with: { movies: true },
    orderBy: [asc(staffTable.name)],
  });
  return { staff };
};
