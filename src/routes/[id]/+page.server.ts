import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const movie = await db.query.movieTable.findFirst({
    where: (movie, { eq }) => eq(movie.id, Number(params.id)),
    with: {
      country: true,
      genre: true,
      staff: { with: { staff: true } },
      companies: { with: { company: true } },
    },
  });

  if (!movie) {
    error(404, {
      message: 'Movie not found',
    });
  }

  return { movie };
};
