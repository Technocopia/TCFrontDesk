import React from 'react';
import './style.css';

const preface = 'tcft-slide-image-with-caption';

class ImageWithCaption extends React.Component {
  render = () => {
    const { src, caption } = this.props;
    return (
      <div className={preface}>
        <div className={`${preface}-img-container`}>
          <img src={src} />
        </div>
        <div className={`${preface}-caption-container`}>{caption && <p>{caption}</p>}</div>
      </div>
    );
  }
}
export default ImageWithCaption;
