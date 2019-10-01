const get = require('lodash/get');
const fetch = require('node-fetch');
const mockImageData = require('./__mocks__/data/images.json');

const getFeedUrl = () => 'https://www.instagram.com/technocopia/';

// const DEV = true;
const DEV = false;

// use var for now so it can be rewired in a test
// TODO: find a better solution
// eslint-disable-next-line no-var
var fetchData = async () => {
  try {
    const url = getFeedUrl();
    const response = await fetch(url);
    const html = await response.text();
    const jsonString = html.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1);
    return JSON.parse(jsonString);
  } catch ({ message }) {
    return { error: message };
  }
};

const recentImages = async () => {
  let JSONData;
  if (DEV) {
    JSONData = mockImageData;
  } else {
    JSONData = await fetchData();
  }


  // also: https://codelike.pro/fetch-instagram-posts-from-profile-without-__a-parameter/
  const edges = get(JSONData, 'entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges');
  if (!edges) {
    throw new Error('No Data');
  }

  const images = edges
    .map(({ node }) => node)
    .filter(({ __typename: type }) => type === 'GraphImage')
    .map((imageNode) => {
      const caption = get(imageNode, 'edge_media_to_caption.edges[0].node.text');
      const src = get(imageNode, 'thumbnail_resources[4].src');
      const likes = get(imageNode, 'edge_liked_by.count');
      return {
        type: 'img',
        src,
        caption,
        likes
      };
    });
  return images;
};

module.exports = {
  recentImages
};
