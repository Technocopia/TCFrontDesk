import React from 'react'
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

const MOCK_AGENDA_SLIDE_1 =           {
  type: 'calendar_agenda',
  events: [
    {
      title: 'Tool Training: Wood Shop Series IV',
      contactName: '',
      contactEmail: 'lauren.monroe@technocopia.org',
      start: '2019-02-25T18:00:00-05:00',
      end: '2019-02-25T20:00:00-05:00'
    },
    {
      title: 'Happy Hacker Society',
      contactName: '',
      contactEmail: 'jacob.berry@technocopia.org',
      start: '2019-02-28T19:00:00-05:00',
      end: '2019-02-28T21:00:00-05:00'
    },
    {
      title: 'Tool Training: Wood Shop Series I',
      contactName: '',
      contactEmail: 'lauren.monroe@technocopia.org',
      start: '2019-03-04T18:00:00-05:00',
      end: '2019-03-04T20:00:00-05:00'
    },
    {
      title: 'Digital Design for Makers: Inkscape Basics',
      contactName: 'Adam Zelny',
      contactEmail: 'adam.zelny@technocopia.org',
      start: '2019-03-05T19:00:00-05:00',
      end: '2019-03-05T21:00:00-05:00'
    }
  ]
}

const MOCK_IMG_SLIDE_1 = {
  type: 'img',
  src: 'http://scontent-frx5-1.cdninstagram.com/vp/972ed630562c335756b1f6ed32d97059/5D28DA9F/t51.2885-15/e35/51401571_251620515779099_3022661471651301488_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com',
  caption: '@astegink’s first zipper pouch class was a success! There are more classes coming for our brand new textiles studio. Check our website for all the details. . . . #sewing #handmade #makerspace #makersgonnamake #worcesterma'
};

const MOCK_IMG_SLIDE_2 = {
  type: 'img',
  src: 'https://static1.squarespace.com/static/51f533d1e4b0de43ba620290/51f58c3fe4b02c290dcd5762/58b5fddd6b8f5b9a422a694a/1488322077713/IMG_9604.JPG?format=1500w',
  caption: ''
};

const MOCK_IMG_SLIDE_3 = {
  type: 'img',
  src: 'http://scontent-frx5-1.cdninstagram.com/vp/9ce8685fe5d89c64a94d19526de27a80/5D023A06/t51.2885-15/e35/50481261_1220574508082096_6721812819080323087_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com',
  caption: '@dempsalicious’ new space at @technocopia is coming along! What are you working on today? . . #artist #customs #technocopia #makersgonnamake #makerspace #worcester'
};

const MOCK_IMG_SLIDE_4 = {
  type: 'img',
  src: 'https://static1.squarespace.com/static/51f533d1e4b0de43ba620290/51f58c3fe4b02c290dcd5762/58b5fa7f20099e54562233e0/1488321975977/IMG_9584.JPG?format=1500w',
  caption: ''
};

const MOCK_IMG_SLIDE_5 = {
  type: 'img',
  src: 'https://static1.squarespace.com/static/51f533d1e4b0de43ba620290/51f58c3fe4b02c290dcd5762/58b5f99ed1758e628707b4a2/1488320981442/IMG_9596.JPG?format=1500w',
  caption: ''
};

const testSlides = [
  MOCK_IMG_SLIDE_1,
  MOCK_AGENDA_SLIDE_1,
  MOCK_IMG_SLIDE_1,
  MOCK_IMG_SLIDE_2,
  MOCK_AGENDA_SLIDE_1,
  MOCK_IMG_SLIDE_3,
  MOCK_IMG_SLIDE_4,
  MOCK_AGENDA_SLIDE_1,          
  MOCK_IMG_SLIDE_5,
  MOCK_IMG_SLIDE_3,
];


class Carousel extends React.Component {
  static defaultProps = {
    slides: testSlides,
    //    apiFetch: noop
  }

  componentDidMount() {
    //const { apiFetch } = this.props
    //apiFetch()
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
