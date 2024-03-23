import * as cheerio from 'cheerio';
import type {
  NewCompany,
  NewCountry,
  NewGenre,
  NewMovie,
  NewMovieStaff,
  NewStaff,
} from '$lib/server/schema';

type FullStaff = NewMovieStaff & { staff: NewStaff };

export type FullMovie = {
  movie: NewMovie;
  country: NewCountry;
  genre: NewGenre;
  staff: FullStaff[];
  companies: NewCompany[];
};

const scrape = async (url: string) => {
  const response = await fetch(url);
  const body = await response.text();

  return cheerio.load(body);
};

export const parseAfi = async (url: string): Promise<FullMovie> => {
  const $ = await scrape(url);

  const title = $('#search_header .searchtitle').text().trim();

  const releaseDateText = $('#fullCredits .row div:contains("Release Date:")')
    .next()
    .text()
    .trim();
  const releaseDate = new Date(releaseDateText).toISOString();

  const durationText = $('#fullCredits .row div:contains("Duration(in mins):")')
    .next()
    .text()
    .trim();
  const duration = Number(durationText.split('-')[0]);

  const synopsis = $('#fullhistory2').text().trim().slice(0, 200);

  const countryName = $('#fullCredits .row div:contains("Country:")')
    .next()
    .text()
    .trim();

  const genreName =
    $('#genreContainer .row div:contains("Genre:")').next().text().trim() ||
    $('#genreContainer .row div:contains("Genres:")')
      .next()
      .find('a')
      .first()
      .text()
      .trim();

  const staff: FullStaff[] = [];
  $('.blockMovies .search-container .movieResult .resultContainer').each(
    function () {
      const movieStaff = {
        credit: $(this).find('.resultHed').text().trim().slice(0, -1),
      };

      if (movieStaff.credit === 'Production Companies') return;

      if (movieStaff.credit.endsWith('s')) {
        movieStaff.credit = movieStaff.credit.slice(0, -1);
      }

      $(this)
        .find('a')
        .each(function () {
          const name = $(this).text().trim();
          if (name === '[ More ]') return;
          staff.push({ ...movieStaff, staff: { name } });
        });
    }
  );

  const companies: NewCompany[] = [];
  $('#fullCredits .row div:contains("DISTRIBUTION COMPANY")')
    .parent()
    .next('.row')
    .find('a')
    .each(function () {
      const company = {
        name: $(this).text().trim(),
      };
      companies.push(company);
    });
  $('#fullCredits .row div:contains("PRODUCTION COMPANIES")')
    .parent()
    .next('.row')
    .find('a')
    .each(function () {
      const company = {
        name: $(this).text().trim(),
      };
      companies.push(company);
    });

  const movie: NewMovie = {
    title,
    releaseDate,
    duration,
    synopsis,
  };
  const country: NewCountry = {
    name: countryName,
  };
  const genre: NewCountry = {
    name: genreName,
  };

  return { movie, country, genre, staff, companies };
};
