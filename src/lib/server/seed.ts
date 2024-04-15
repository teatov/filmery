import { parseAfi, scrape } from '$lib/server/scraper';
import { saveTransaction } from '$lib/server/saveMovie';
import * as cheerio from 'cheerio';

const seed = async () => {
  const afiList = 'https://www.afi.com/afis-100-years-100-movies/';
  const $ = await scrape(afiList);
  const afiLinks: string[] = [];
  $('a.movie-detail.m_detail').each(function (i) {
    afiLinks[i] = $(this).data().href as string;
  });
  console.log(afiLinks);

  afiLinks.forEach(async link => {
    const result = await parseAfi(link);
    console.log(result);
    await saveTransaction(result);
  });
};

seed();
