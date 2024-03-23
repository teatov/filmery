import { parseAfi } from './scraper';

const seed = async () => {
  const result = await parseAfi(
    'https://catalog.afi.com/Catalog/moviedetails/53895'
  );
  console.log(result);
};

seed();
