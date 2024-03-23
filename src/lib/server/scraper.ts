import * as cheerio from 'cheerio';

const scrape = async (url: string) => {
  const response = await fetch(url);
  const body = await response.text();

  return cheerio.load(body);
};

export const parseAfi = async (url: string) => {
  const $ = await scrape(url);

  const title = $('#search_header .searchtitle').text().trim();
  const releaseDateText = $('#fullCredits .row div:contains("Release Date:")')
    .next()
    .text().trim();
  const releaseDate = new Date(releaseDateText);
  const durationText = $('#fullCredits .row div:contains("Duration(in mins):")')
    .next()
    .text().trim();
  const duration = Number(durationText);
  const country = $('#fullCredits .row div:contains("Country:")').next().text().trim();
  const synopsis = $('#fullhistory2').text().slice(0, 200).trim();

  console.log(title, releaseDate, duration, country, synopsis);
};
