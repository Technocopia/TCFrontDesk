const moment = require('moment');
const fetch = require('node-fetch');
const mockCalendarData = require('./__mocks__/data/calendar.json');

const getFeedUrl = (timeStart, timeEnd) => `https://clients6.google.com/calendar/v3/calendars/technocopia.org_6g9a51732ae14f69s1jq8h5uds@group.calendar.google.com/events?calendarId=technocopia.org_6g9a51732ae14f69s1jq8h5uds%40group.calendar.google.com&singleEvents=true&timeZone=America%2FNew_York&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=${timeStart.format()}&timeMax=${timeEnd.format()}&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs`;

const DEV = false;

// use var for now so it can be rewired in a test
// TODO: find a better solution
// eslint-disable-next-line no-var
var fetchData = async (timeStart, timeEnd) => {
  let content = {};

  try {
    const url = getFeedUrl(timeStart, timeEnd);
    const response = await fetch(url);
    const json = await response.json();
    content = json;
  } catch (err) {
    content.error = err.message;
  }
  return content;
};

// query calendar for upcoming events and assemble into standard json output
const upcomingEvents = async () => {
  const timeStart = moment();
  const timeEnd = moment().add(1, 'M');

  let JSONData;
  if (DEV) {
    JSONData = mockCalendarData;
  } else {
    JSONData = await fetchData(timeStart, timeEnd);
  }

  if (!JSONData.items) {
    throw new Error('No Data');
  }

  const events = JSONData.items.map(({
    summary: title, description, status, start: { dateTime: start }, end: { dateTime: end }
  }) => ({
    title,
    description,
    contactName: '',
    contactEmail: 'info@technocopia.org',
    start,
    end,
    status
  }));

  return events;
};

module.exports = {
  upcomingEvents
};
