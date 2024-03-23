import { parseAfi } from '$lib/server/scraper';
import { saveTransaction } from '$lib/server/saveMovie';

const seed = async () => {
  const afiLinks = [
    'https://catalog.afi.com/Catalog/moviedetails/53895',
    'https://catalog.afi.com/Film/70648-THE-GRANDBUDAPESTHOTEL',
    'https://catalog.afi.com/Film/54370-ETERNAL-SUNSHINEOFTHESPOTLESSMIND',
    'https://catalog.afi.com/Film/58980-THE-NAKEDGUNFROMTHEFILESOFPOLICESQUAD',
    'https://catalog.afi.com/Film/64882-FANTASTIC-MRFOX',
  ];
  afiLinks.forEach(async link => {
    const result = await parseAfi(link);
    console.log(result);
    await saveTransaction(result);
  });
};

seed();
