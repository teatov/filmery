import {
  parseAfi,
  parseImdb,
  parseFilmAffinity,
  scrape,
} from '$lib/server/scraper';
import { saveTransaction } from '$lib/server/saveMovie';

const getAfiLinks = async () => {
  const listUrl = 'https://www.afi.com/afis-100-years-100-movies/';
  const $ = await scrape(listUrl);
  const links: string[] = [];
  $('a.movie-detail.m_detail').each(function (i) {
    links[i] = $(this).data().href as string;
  });
  console.log(links);
  return links;
};

const getImdbLinks = async () => {
  const listUrl = 'https://www.imdb.com/chart/toptv/?ref_=chtmvm_ql_6';
  const $ = await scrape(listUrl);
  const links: string[] = [];
  $('ul.ipc-metadata-list a.ipc-title-link-wrapper').each(function (i) {
    links[i] = 'https://www.imdb.com' + ($(this).attr('href') as string);
  });
  console.log(links);
  return links;
};

const getFilmAffinityLinks = async () => {
  const listUrl = 'https://www.filmaffinity.com/en/ranking.php?rn=ranking_fa_movies';
  const $ = await scrape(listUrl);
  const links: string[] = [];
  $('ul#top-movies li div.mc-title a').each(function (i) {
    links[i] = ($(this).attr('href') as string);
  });
  console.log(links);
  return links;
};

const seed = async () => {
  // const afiLinks = await getAfiLinks();

  // afiLinks.forEach(async link => {
  //   const result = await parseAfi(link);
  //   console.log(result);
  //   await saveTransaction(result);
  // });

  const imdbLinks = await getImdbLinks();

  imdbLinks.forEach(async link => {
    const result = await parseImdb(link);
    console.log(result);
    await saveTransaction(result);
  });

  // const filmAffinityLinks = await getFilmAffinityLinks();

  // filmAffinityLinks.forEach(async link => {
  //   const result = await parseFilmAffinity(link);
  //   console.log(result);
  //   await saveTransaction(result);
  // });
};

seed();
