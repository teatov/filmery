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

export const scrape = async (url: string) => {
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

  const releaseDate = new Date(
    releaseDateText !== '' ? releaseDateText : 0
  ).toISOString();

  const durationText = $('#fullCredits .row div:contains("Duration(in mins):")')
    .next()
    .text()
    .trim();
  const durationNum = Number(durationText.split('-')[0]);
  const duration = !Number.isNaN(durationNum) ? durationNum : 0;

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

export const parseImdb = async (url: string): Promise<FullMovie> => {
  const $ = await scrape(url);

  const title = $('h1').next().text().trim().replace('Original title: ', '');

  const poster = $('div.ipc-poster__poster-image img.ipc-image').attr('src');

  const releaseDateText = $('a:contains("Release date")')
    .next()
    .text()
    .trim()
    .split('(')[0];

  const releaseDate = new Date(
    releaseDateText !== '' ? releaseDateText : 0
  ).toISOString();

  const durationText = $('h1').next().next().children().last().text().trim();

  const durationNum = durationText.split(' ').reduce((prev, curr): number => {
    if (curr.endsWith('h')) {
      return prev + Number(curr.replace('h', '')) * 60;
    }
    if (curr.endsWith('m')) {
      return prev + Number(curr.replace('m', ''));
    }
  }, 0);

  const duration = durationNum ? durationNum : 0;

  const synopsis = $('section.sc-b7c53eda-4.kYwFBt p.sc-466bb6c-3.fOUpWp span')
    .text()
    .trim();

  const countryName = $('span:contains("Country of origin")')
    .next()
    .text()
    .trim();

  const genreName = $(
    'div.ipc-chip-list__scroller a.ipc-chip.ipc-chip--on-baseAlt'
  )
    .first()
    .text()
    .trim();

  const staff: FullStaff[] = [];
  $(
    'div.sc-b7c53eda-3.vXcqY ul.ipc-metadata-list.ipc-metadata-list--dividers-all.title-pc-list.ipc-metadata-list--baseAlt li.ipc-metadata-list__item'
  ).each(function () {
    const movieStaff = {
      credit: $(this).find('.ipc-metadata-list-item__label').text().trim(),
    };

    if (movieStaff.credit.endsWith('s')) {
      movieStaff.credit = movieStaff.credit.slice(0, -1);
    }

    $(this)
      .find('ul.ipc-inline-list a')
      .each(function () {
        const name = $(this).text().trim();

        staff.push({ ...movieStaff, staff: { name } });
      });
  });

  const companies: NewCompany[] = [];
  $('a:contains("Production companies")')
    .next()
    .find('li')
    .each(function () {
      const company = {
        name: $(this).text().trim(),
      };
      companies.push(company);
    });

  const movie: NewMovie = {
    title,
    poster,
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
