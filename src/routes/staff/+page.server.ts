import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const staff = await db.query.staffTable.findMany({ with: { movies: true } });
  return { staff };
};
