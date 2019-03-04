import React from 'react'
import axios from 'axios';


//import { noop } from 'app/utils'
import BootstrapCarousel from 'react-bootstrap/Carousel';
import classNames from 'classnames'

// import { getSlides } from 'app/modules/carousel/carousel.selectors'
// import { apiFetch } from 'app/modules/carousel/carousel.actions'

import ImageWithCaption from './../Slides/ImageWithCaption'
import CalendarAgenda from './../Slides/CalendarAgenda'

import './style.css'

const TYPE_IMG = 'img'
const TYPE_CALENDAR_AGENDA = 'calendar_agenda'

const DEFAULT_INTERVAL = 8000

class Carousel extends React.Component {
  static defaultProps = {
    slides: []
  }

  section = item => {
    switch(item.type) {
    case TYPE_IMG:
      const { src, caption } = item
      return <ImageWithCaption src={src} caption={caption} />
    case TYPE_CALENDAR_AGENDA:
      const { events } = item
      return <CalendarAgenda events={events} />
    default:
      return <div>{JSON.stringify(item)}</div>
    }
  }
  
  render = () => {
    const { slides, className } = this.props
    return (slides.length &&
      <div className={className}><div className="tcfd-carousel">
        <BootstrapCarousel
          indicators={false}
          controls={false}
          interval={DEFAULT_INTERVAL}
          className="bootstrap-carousel">
          {slides.map((slide, i) =>
          <BootstrapCarousel.Item key={i}>
            <div className={`bootstrap-carousel-item`}>{this.section(slide)}</div>
          </BootstrapCarousel.Item>
          )}
        </BootstrapCarousel>
      </div></div>
    )
  }
}

export default Carousel
