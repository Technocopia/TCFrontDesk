import React from 'react';
import PropTypes from 'prop-types'

import './style.css';

const preface = 'tcfd-slide-iframe';

class IFrame extends React.Component {
  render = () => {
    const { src } = this.props;
    return (
      <div className={`${preface}`}>
        <iframe src={`http://technocopia.org${src}`} />
      </div>
    );
  }
}

IFrame.propTypes = {
  src: PropTypes.string.isRequired
}

export default IFrame;
