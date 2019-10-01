const express = require('express');
const cache = require('memory-cache');
const { getSlides } = require('./lib/slides');

const app = express();

app.use(express.static('dist'));

const CACHE_MINUTES = 10;
const CACHE_TIMEOUT = 1000 * 60 * CACHE_MINUTES;

// const tickerText = `Terrific to end our collaborative workspace tour with a visit
// to YouthBuild Worcester members - these young folks, trained in construction and
// other trades, built out the last third of the @Technocopia facility.  @TRAmerica_Inc`;

const tickerText = '';

app.get('/api/carousel/slides', async (req, res) => {
  const cachedSlides = cache.get('slides');
  if (cachedSlides) {
    console.info('pulling slides from cache');
    res.send(cachedSlides);
    return;
  }
  const slides = await getSlides();
  console.info('regenerating slides');
  res.send(cache.put('slides', slides, CACHE_TIMEOUT));
});

app.get('/api/ticker', (req, res) => res.send(JSON.stringify(tickerText)));

app.listen(process.env.PORT || 9001, () => console.log(`Listening on port ${process.env.PORT || 9001}!`));
