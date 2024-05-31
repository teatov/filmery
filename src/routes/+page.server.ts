import { db } from '$lib/server/db';
import {
  companyTable,
  countryTable,
  genreTable,
  movieCompanyTable,
  movieStaffTable,
  movieTable,
  staffTable,
} from '$lib/server/schema';
import { asc, count } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const nameIncludes = url.searchParams.get('nameIncludes')?.trim();
  const releaseYear = url.searchParams.get('releaseYear')?.trim();
  const countryId = url.searchParams.get('countryId');
  const genreId = url.searchParams.get('genreId');
  const staffId = url.searchParams.get('staffId');
  const companyId = url.searchParams.get('companyId');
  const pageString = url.searchParams.get('page');

  const pageSize = 50;
  const page = pageString ? Number(pageString) : 1;

  const movies = await db.query.movieTable.findMany({
    with: { genre: true, staff: { with: { staff: true } } },
    orderBy: asc(movieTable.id),
    limit: pageSize,
    offset: (page - 1) * pageSize,
    where: (movie, { eq, and, inArray, like, sql }) =>
      and(
        ...[
          nameIncludes
            ? sql`lower(${movie.title}) like ${`%${nameIncludes.toLowerCase()}%`}`
            : undefined,
          releaseYear ? like(movie.releaseDate, `${releaseYear}-%`) : undefined,
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

  const moviesCount = (await db.select({ count: count() }).from(movieTable))[0]
    .count;
  const pagesTotal = Math.ceil(moviesCount / pageSize);

  const nextPage = new URL(url.href);
  nextPage.searchParams.set(
    'page',
    String(page >= pagesTotal ? pagesTotal : page + 1)
  );
  const prevPage = new URL(url.href);
  prevPage.searchParams.set('page', String(page <= 0 ? 0 : page - 1));

  return {
    page,
    pageSize,
    pagesTotal: pagesTotal,
    nextPage: nextPage.href,
    prevPage: prevPage.href,
    movies,
    moviesCount,
    countries,
    genres,
    staff,
    companies,
    query: {
      nameIncludes,
      releaseYear,
      countryId,
      genreId,
      staffId,
      companyId,
    },
  };
};
