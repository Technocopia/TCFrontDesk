import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const preface = 'tcfd-slide-iframe';

const IFrame = ({ src }) => (
  <div className={`${preface}`}>
    <iframe src={`http://technocopia.org${src}`} title="tecnocopia {$src}" />
  </div>
);

IFrame.propTypes = {
  src: PropTypes.string.isRequired
};

export default IFrame;
