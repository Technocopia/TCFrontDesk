import React from 'react'
import PropTypes from 'prop-types';

//import { CSSTransition } from 'react-transition-group';

import classNames from 'classnames'
import style from './style.css'

const preface = 'tcfd-ticker'

//const message = "Terrific to end our collaborative workspace tour with a visit to YouthBuild Worcester members - these young folks, trained in construction and other trades, built out the last third of the @Technocopia facility.  @TRAmerica_Inc"

//const message = "123456789000000002000000000000000000003000000000000000000000400000000000000000000x"
const message = "ABCD"


const FPS = 400;
const STEP = 1;
const TIMEOUT = 1 / FPS * 1000;

class Ticker extends React.Component {
  static defaultProps = {
    message,
    loop: false,
    timeBefore: 0,
    timeAfter: 0
  }

  static propTypes = {
    message: PropTypes.string,
    loop: PropTypes.bool,
    timeBefore: PropTypes.number,
    timeAfter: PropTypes.number
  }

  state = {
    animatedWidth: 0,
    overflowWidth: 0
  };

  componentDidMount() {
    this.measureMessage();
    this.startAnimation()
  }

  componentDidUpdate() {
    this.measureMessage();
    this.startAnimation()
  }

  componentWillUnmount() {
    clearTimeout(this.marqueeTimer);
  }

  componentWillReceiveProps(nextProps) {
    const { message } = this.props
    if (message.length !== nextProps.message.length) {
      clearTimeout(this.marqueeTimer);
      this.setState({ animatedWidth: 0 });
    }
  }

  measureMessage() {
    const container = this.container;
    const node = this.message;

    if (container && node) {
      const containerWidth = container.offsetWidth;
      const textWidth = node.offsetWidth;
      const overflowWidth = textWidth - containerWidth;
      if (overflowWidth !== this.state.overflowWidth) {
        this.setState({ overflowWidth });
      }
    }
  }

  startAnimation = () => {
//    console.log('starting animation')
    const { timeBefore, timeAfter, loop } = this.props
    const { animatedWidth, overflowWidth } = this.state
    clearTimeout(this.marqueeTimer);
    const isLeading = animatedWidth === 0;
    const timeout = isLeading ? timeBefore : TIMEOUT;
    console.log(animatedWidth)
    const animate = () => {
      let newAnimatedWidth = animatedWidth + STEP;
      const isRoundOver = newAnimatedWidth > overflowWidth;

      if (isRoundOver) {
        if (loop) {
          newAnimatedWidth = 0;
        } else {
          return;
        }
      }

      if (isRoundOver && timeAfter) {
        this.marqueeTimer = setTimeout(() => {
          this.setState({ animatedWidth: newAnimatedWidth });
          this.marqueeTimer = setTimeout(animate, TIMEOUT);
        }, timeAfter);
      } else {
        this.setState({ animatedWidth: newAnimatedWidth });
        this.marqueeTimer = setTimeout(animate, TIMEOUT);
      }
    }

    this.marqueeTimer = setTimeout(animate, timeout);
  }

  updateContainerRef = el => this.container = el
  updateMessageRef = el => this.message = el
  
  render = () => {
    const { animatedWidth } = this.state
    const { className, active, message } = this.props

    const style = {
      'right': animatedWidth,
    }

    return (
      active && <div className={className}><div
        ref={this.updateContainerRef}
        className={preface}
      >
        <span
          ref={this.updateMessageRef}
          className={`${preface}-message`}
          style={style}
          title={message}
        >
          {message}
        </span>
      </div></div>
    )
  }
}

export default Ticker
