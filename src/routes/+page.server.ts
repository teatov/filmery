import { db } from '$lib/server/db';
import {
  companyTable,
  countryTable,
  genreTable,
  movieCompanyTable,
  movieStaffTable,
  staffTable,
} from '$lib/server/schema';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const nameIncludes = url.searchParams.get('nameIncludes')?.trim();
  const countryId = url.searchParams.get('countryId');
  const genreId = url.searchParams.get('genreId');
  const staffId = url.searchParams.get('staffId');
  const companyId = url.searchParams.get('companyId');

  const movies = await db.query.movieTable.findMany({
    with: { genre: true, staff: { with: { staff: true } } },
    where: (movie, { eq, and, inArray, sql }) =>
      and(
        ...[
          nameIncludes
            ? sql`lower(${movie.title}) like ${`%${nameIncludes.toLowerCase()}%`}`
            : undefined,
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
  const countries = await db.query.countryTable.findMany({
    orderBy: [asc(countryTable.name)],
  });
  const genres = await db.query.genreTable.findMany({
    orderBy: [asc(genreTable.name)],
  });
  const staff = await db.query.staffTable.findMany({
    orderBy: [asc(staffTable.name)],
  });
  const companies = await db.query.companyTable.findMany({
    orderBy: [asc(companyTable.name)],
  });
  return {
    movies,
    countries,
    genres,
    staff,
    companies,
    query: { nameIncludes, countryId, genreId, staffId, companyId },
  };
};
