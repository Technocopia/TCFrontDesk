const chunk = require('lodash/chunk');
const flatten = require('lodash/flatten');
const orderBy = require('lodash/orderBy');
const take = require('lodash/take');
const times = require('lodash/times');
const zip = require('lodash/zip');

const { upcomingEvents } = require('../content/calendar');
const { recentImages } = require('../content/images');

/*
const MOCK_AGENDA_SLIDE_1 = {
  type: 'calendar_agenda',
  events: [
    {
      title: 'Tool Training: Wood Shop Series IV',
      contactName: '',
      contactEmail: 'lauren.monroe@technocopia.org',
      start: '2019-02-25T18:00:00-05:00',
      end: '2019-02-25T20:00:00-05:00'
    },
    {
      title: 'Happy Hacker Society',
      contactName: '',
      contactEmail: 'jacob.berry@technocopia.org',
      start: '2019-02-28T19:00:00-05:00',
      end: '2019-02-28T21:00:00-05:00'
    },
    {
      title: 'Tool Training: Wood Shop Series I',
      contactName: '',
      contactEmail: 'lauren.monroe@technocopia.org',
      start: '2019-03-04T18:00:00-05:00',
      end: '2019-03-04T20:00:00-05:00'
    },
    {
      title: 'Digital Design for Makers: Inkscape Basics',
      contactName: 'Adam Zelny',
      contactEmail: 'adam.zelny@technocopia.org',
      start: '2019-03-05T19:00:00-05:00',
      end: '2019-03-05T21:00:00-05:00'
    }
  ]
};
*/

const EVENTS_PER_SLIDE = 4;

const getSlides = async () => {
  const allEventsPromise = upcomingEvents();
  const recentImagesPromise = recentImages();

  const [allEvents, allImages] = await Promise.all([allEventsPromise, recentImagesPromise]);

  const eventSlides = chunk(orderBy(allEvents, 'start'), EVENTS_PER_SLIDE).map(events => ({ type: 'calendar_agenda', events }));

  // alternate events and images
  // if there are more images than events, truncate the images
  // if there are more events than images, repeat some images
  const imageSlides = (eventSlides.length <= allImages.length)
    ? take(allImages, eventSlides.length)
    : times(eventSlides.length, index => allImages[index % allImages.length]);
  console.log(imageSlides);
  return flatten(zip(eventSlides, imageSlides));
};

module.exports = {
  getSlides
};
