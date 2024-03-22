import { db } from '$lib/server/db';
import {
  movieCompanyTable,
  movieStaffTable,
  movieTable,
} from '$lib/server/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const countryId = url.searchParams.get('countryId');
  const genreId = url.searchParams.get('genreId');
  const staffId = url.searchParams.get('staffId');
  const companyId = url.searchParams.get('companyId');

  const movies = await db.query.movieTable.findMany({
    with: { genre: true, staff: { with: { staff: true } } },
    where: (movie, { eq, and, inArray }) =>
      and(
        ...[
          countryId ? eq(movie.countryId, Number(countryId)) : undefined,
          genreId ? eq(movie.genreId, Number(genreId)) : undefined,
          staffId
            ? inArray(
                movie.id,
                db
                  .select({ movieId: movieStaffTable.movieId })
                  .from(movieStaffTable)
                  .where(eq(movieStaffTable.staffId, Number(staffId)))
              )
            : undefined,
          companyId
            ? inArray(
                movie.id,
                db
                  .select({ movieId: movieCompanyTable.movieId })
                  .from(movieCompanyTable)
                  .where(eq(movieCompanyTable.companyId, Number(companyId)))
              )
            : undefined,
        ]
      ),
  });
  return { movies };
};
