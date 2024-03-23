import { db } from '$lib/server/db';
import {
  countryTable,
  companyTable,
  genreTable,
  staffTable,
  movieStaffTable,
  movieTable,
  movieCompanyTable,
} from '$lib/server/schema';
import type { FullMovie } from '$lib/server/scraper';

const upsertCategory = async (
  name: string,
  category:
    | typeof countryTable
    | typeof genreTable
    | typeof staffTable
    | typeof companyTable
) => {
  return (
    await db
      .insert(category)
      .values({ name })
      .onConflictDoUpdate({ target: category.name, set: { name } })
      .returning()
  )[0];
};

const saveFullMovie = async (fullMovie: FullMovie) => {
  const country = await upsertCategory(fullMovie.country.name, countryTable);
  const genre = await upsertCategory(fullMovie.genre.name, genreTable);

  const movieValues = {
    ...fullMovie.movie,
    countryId: country.id,
    genreId: genre.id,
  };

  const movie = (
    await db
      .insert(movieTable)
      .values(movieValues)
      .onConflictDoUpdate({
        target: [movieTable.title, movieTable.releaseDate],
        set: movieValues,
      })
      .returning()
  )[0];

  fullMovie.staff.forEach(async movieStaff => {
    const staff = await upsertCategory(movieStaff.staff.name, staffTable);
    await db
      .insert(movieStaffTable)
      .values({
        credit: movieStaff.credit,
        movieId: movie.id,
        staffId: staff.id,
      })
      .onConflictDoNothing();
  });

  fullMovie.companies.forEach(async movieCompany => {
    const company = await upsertCategory(movieCompany.name, companyTable);
    await db
      .insert(movieCompanyTable)
      .values({
        movieId: movie.id,
        companyId: company.id,
      })
      .onConflictDoNothing();
  });

  console.log(`${fullMovie.movie.title} ${fullMovie.movie.releaseDate} SAVED`);
};

export const saveTransaction = async (fullMovie: FullMovie) => {
  await db.transaction(async tx => {
    try {
      await saveFullMovie(fullMovie);
    } catch (error) {
      console.log(error);
      await tx.rollback();
    }
  });
};
