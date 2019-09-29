require('regenerator-runtime/runtime');
const rewire = require('rewire');
const goodData = require('../__mocks__/data/calendar.json');

const fetchDataBadFormat = async () => ({ bad: 'format' });
const fetchDataGoodFormat = async () => goodData;

describe('calendar tests', () => {
  test('If the remote calendar JSON is not in the expected format, throw an error', async () => {
    const rewiredCalendar = rewire('../calendar');
    // eslint-disable-next-line no-underscore-dangle
    rewiredCalendar.__set__('fetchData', fetchDataBadFormat);

    expect.assertions(1);
    try {
      await rewiredCalendar.upcomingEvents();
    } catch (e) {
      // TODO: check error
      expect(true).toBe(true);
    }
  });
  test('If the remote calendar JSON is not in the expected format, throw an error', async () => {
    const rewiredCalendar = rewire('../calendar');
    // eslint-disable-next-line no-underscore-dangle
    rewiredCalendar.__set__('fetchData', fetchDataGoodFormat);
    const results = await rewiredCalendar.upcomingEvents();
    // todo: switch result expectation to snapshot match
    expect(results).toHaveLength(75);
  });
});
