import { asc, eq, relations } from 'drizzle-orm';
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { db } from '$lib/server/db';

export const movieTable = sqliteTable(
  'movie',
  {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    poster: text('poster'),
    releaseDate: text('releaseDate').notNull(),
    duration: integer('duration').notNull(),
    synopsis: text('synopsis').notNull(),
    countryId: integer('countryId').references(() => countryTable.id),
    genreId: integer('genreId').references(() => genreTable.id),
  },
  movie => {
    return {
      titleDateIndex: uniqueIndex('movie_unique_title_date').on(
        movie.title,
        movie.releaseDate
      ),
    };
  }
);

export type Movie = typeof movieTable.$inferSelect;
export type NewMovie = typeof movieTable.$inferInsert;

export const movieRelations = relations(movieTable, ({ many, one }) => ({
  country: one(countryTable, {
    fields: [movieTable.countryId],
    references: [countryTable.id],
  }),
  genre: one(genreTable, {
    fields: [movieTable.genreId],
    references: [genreTable.id],
  }),
  staff: many(movieStaffTable),
  companies: many(movieCompanyTable),
}));

export const genreTable = sqliteTable('genre', {
  id: integer('id').primaryKey(),
  name: text('name').notNull().unique(),
});

export type Genre = typeof genreTable.$inferSelect;
export type NewGenre = typeof genreTable.$inferInsert;

export const genreRelations = relations(genreTable, ({ many }) => ({
  movies: many(movieTable),
}));

export const staffTable = sqliteTable('staff', {
  id: integer('id').primaryKey(),
  name: text('name').notNull().unique(),
});

export type Staff = typeof staffTable.$inferSelect;
export type NewStaff = typeof staffTable.$inferInsert;

export const staffRelations = relations(staffTable, ({ many }) => ({
  movies: many(movieStaffTable),
}));

export const movieStaffTable = sqliteTable(
  'movieStaff',
  {
    id: integer('id').primaryKey(),
    credit: text('credit').notNull(),
    movieId: integer('movieId').references(() => movieTable.id),
    staffId: integer('staffId').references(() => staffTable.id),
  },
  movieStaff => {
    return {
      creditMovieStaffIndex: uniqueIndex(
        'movieStaff_unique_credit_movie_staff'
      ).on(movieStaff.credit, movieStaff.movieId, movieStaff.staffId),
    };
  }
);

export type MovieStaff = typeof movieStaffTable.$inferSelect;
export type NewMovieStaff = typeof movieStaffTable.$inferInsert;

export const movieStaffRelations = relations(movieStaffTable, ({ one }) => ({
  movie: one(movieTable, {
    fields: [movieStaffTable.movieId],
    references: [movieTable.id],
  }),
  staff: one(staffTable, {
    fields: [movieStaffTable.staffId],
    references: [staffTable.id],
  }),
}));

export const countryTable = sqliteTable('country', {
  id: integer('id').primaryKey(),
  name: text('name').notNull().unique(),
});

export type Country = typeof countryTable.$inferSelect;
export type NewCountry = typeof countryTable.$inferInsert;

export const countryRelations = relations(countryTable, ({ many }) => ({
  movies: many(movieTable),
}));

export const companyTable = sqliteTable('company', {
  id: integer('id').primaryKey(),
  name: text('name').notNull().unique(),
});

export type Company = typeof companyTable.$inferSelect;
export type NewCompany = typeof companyTable.$inferInsert;

export const companyRelations = relations(companyTable, ({ many }) => ({
  movies: many(movieCompanyTable),
}));

export const movieCompanyTable = sqliteTable(
  'movieCompany',
  {
    id: integer('id').primaryKey(),
    movieId: integer('movieId').references(() => movieTable.id),
    companyId: integer('companyId').references(() => companyTable.id),
  },
  movieCompany => {
    return {
      movieCompanyIndex: uniqueIndex('movieCompany_unique_movie_company').on(
        movieCompany.movieId,
        movieCompany.companyId
      ),
    };
  }
);

export type MovieCompany = typeof movieCompanyTable.$inferSelect;
export type NewMovieCompany = typeof movieCompanyTable.$inferInsert;

export const movieCompanyRelations = relations(
  movieCompanyTable,
  ({ one }) => ({
    movie: one(movieTable, {
      fields: [movieCompanyTable.movieId],
      references: [movieTable.id],
    }),
    company: one(companyTable, {
      fields: [movieCompanyTable.companyId],
      references: [companyTable.id],
    }),
  })
);
