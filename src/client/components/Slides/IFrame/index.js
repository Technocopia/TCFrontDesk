import React from 'react';

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
export default IFrame;
