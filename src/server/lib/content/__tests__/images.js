require('regenerator-runtime/runtime');
const rewire = require('rewire');
const goodData = require('../__mocks__/data/images.json');

const fetchDataBadFormat = async () => ({ bad: 'format' });
const fetchDataGoodFormat = async () => goodData;

describe('images tests', () => {
  test('If the remote images JSON is not in the expected format, throw an error', async () => {
    const rewiredImages = rewire('../images');
    // eslint-disable-next-line no-underscore-dangle
    rewiredImages.__set__('fetchData', fetchDataBadFormat);

    expect.assertions(1);
    try {
      await rewiredImages.recentImages();
    } catch (e) {
      // TODO: check error
      expect(true).toBe(true);
    }
  });
  test('If the remote images JSON is not in the expected format, throw an error', async () => {
    const rewiredImages = rewire('../images');
    // eslint-disable-next-line no-underscore-dangle
    rewiredImages.__set__('fetchData', fetchDataGoodFormat);
    const results = await rewiredImages.recentImages();
    // todo: switch result expectation to snapshot match
    expect(results).toHaveLength(9);
  });
});
