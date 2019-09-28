import React from 'react';
import PropTypes from 'prop-types';

import BootstrapCarousel from 'react-bootstrap/Carousel';

import IFrame from '../Slides/IFrame';
import ImageWithCaption from '../Slides/ImageWithCaption';
import CalendarAgenda from '../Slides/CalendarAgenda';

import './style.css';

const TYPE_IFRAME = 'iframe';
const TYPE_IMG = 'img';
const TYPE_CALENDAR_AGENDA = 'calendar_agenda';

const DEFAULT_INTERVAL = 8000;

class Carousel extends React.Component {
  section = (item) => {
    switch (item.type) {
      case TYPE_IFRAME: {
        const { src } = item;
        return <IFrame src={src} />;
      }
      case TYPE_IMG: {
        const { caption, src } = item;
        return <ImageWithCaption src={src} caption={caption} />;
      }
      case TYPE_CALENDAR_AGENDA: {
        const { events } = item;
        return <CalendarAgenda events={events} />;
      }
      default: {
        return <div>{JSON.stringify(item)}</div>;
      }
    }
  }

  render = () => {
    const { slides, className } = this.props;
    return (slides.length
      && (
      <div className={className}>
        <div className="tcfd-carousel">
          <BootstrapCarousel
            indicators={false}
            controls={false}
            interval={DEFAULT_INTERVAL}
            className="bootstrap-carousel"
          >
            {slides.map((slide, i) => (
              <BootstrapCarousel.Item key={`${i}-${slide.type}`}>
                <div className="bootstrap-carousel-item">{this.section(slide)}</div>
              </BootstrapCarousel.Item>
            ))}
          </BootstrapCarousel>
        </div>
      </div>
      )
    );
  }
}

Carousel.defaultProps = {
  slides: [],
  className: ''
};

Carousel.propTypes = {
  slides: PropTypes.array,
  className: PropTypes.string
};

export default Carousel;
