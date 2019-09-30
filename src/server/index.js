const express = require('express');
// const { upcomingEvents } = require('./lib/content/calendar');
const { getSlides } = require('./lib/slides');

const app = express();

app.use(express.static('dist'));

/*
const testSlides = [
  MOCK_IMG_SLIDE_1,
  MOCK_IFRAME_SLIDE_1,
  MOCK_AGENDA_SLIDE_1,
  MOCK_IMG_SLIDE_1,
  MOCK_IMG_SLIDE_2,
  MOCK_AGENDA_SLIDE_1,
  MOCK_IMG_SLIDE_3,
  MOCK_IMG_SLIDE_4,
  MOCK_AGENDA_SLIDE_1,
  MOCK_IMG_SLIDE_5,
  MOCK_IMG_SLIDE_3,
];
*/

// const testTicker = `Terrific to end our collaborative workspace tour with a visit
// to YouthBuild Worcester members - these young folks, trained in construction and
// other trades, built out the last third of the @Technocopia facility.  @TRAmerica_Inc`;

const testTicker = '';

app.get('/api/fetch', async (req, res) => {
  // const results = await upcomingEvents();
  const results = await getSlides();
  res.send(results);
});

app.get('/api/carousel/slides', async (req, res) => {
  const slides = await getSlides();
  res.send(slides);
});

app.get('/api/ticker', (req, res) => res.send(JSON.stringify(testTicker)));

app.listen(process.env.PORT || 9001, () => console.log(`Listening on port ${process.env.PORT || 9001}!`));
