import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const preface = 'tcft-slide-image-with-caption';

const ImageWithCaption = ({ src, caption }) => (
  <div className={preface}>
    <div className={`${preface}-img-container`}>
      <img src={src} alt={caption} />
    </div>
    <div className={`${preface}-caption-container`}>{caption && <p>{caption}</p>}</div>
  </div>
);


ImageWithCaption.defaultProps = {
  caption: ''
};

ImageWithCaption.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string
};

export default ImageWithCaption;
