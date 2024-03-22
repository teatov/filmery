import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const genres = await db.query.genreTable.findMany({ with: { movies: true } });
  return { genres };
};
