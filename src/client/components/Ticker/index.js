import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const preface = 'tcfd-ticker';

const FPS = 400;
const STEP = 1;
const TIMEOUT = 1 / FPS * 1000;

class Ticker extends React.Component {
  state = {
    messageXPos: 0
  };

  componentDidMount() {
    const { active } = this.props;
    if (active) {
      this.setState({ messageXPos: this.container.offsetWidth });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { message } = this.props;
    if (message.length !== nextProps.message.length) {
      clearTimeout(this.tickerTimer);
      if (this.container) {
        this.setState({ messageXPos: this.container.offsetWidth });
      }
    }
  }

  componentDidUpdate() {
    const { active } = this.props;
    if (active) {
      this.startAnimation();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.tickerTimer);
  }

  startAnimation = () => {
    const { timeBefore, timeAfter, loop } = this.props;
    const { messageXPos } = this.state;

    const containerWidth = this.container.offsetWidth;
    const messageWidth = this.message.offsetWidth;

    clearTimeout(this.tickerTimer);
    const isLeading = messageXPos >= containerWidth;
    const timeout = isLeading ? timeBefore : TIMEOUT;


    const animate = () => {
      let newMessageXPos = messageXPos - STEP;

      const hasLeftScreen = messageXPos <= -messageWidth;

      if (hasLeftScreen) {
        if (loop) {
          newMessageXPos = containerWidth;
        } else {
          return;
        }
      }

      if (hasLeftScreen && timeAfter) {
        this.tickerTimer = setTimeout(() => {
          this.setState({ messageXPos: newMessageXPos });
          this.tickerTimer = setTimeout(animate, TIMEOUT);
        }, timeAfter);
      } else {
        this.setState({ messageXPos: newMessageXPos });
        this.tickerTimer = setTimeout(animate, TIMEOUT);
      }
    };

    this.tickerTimer = setTimeout(animate, timeout);
  }

  updateContainerRef = (el) => {
    this.container = el;
  }

  updateMessageRef = (el) => {
    this.message = el;
  }

  render = () => {
    const { messageXPos } = this.state;
    const { className, active, message } = this.props;

    const style = {
      left: messageXPos,
    };
    return (
      active && (
      <div className={className}>
        <div
          ref={this.updateContainerRef}
          className={preface}
        >
          <span
            ref={this.updateMessageRef}
            className={`${preface}-message ${preface}-message-shadow`}
            style={style}
            title={message}
          >
            {message}
          </span>
        </div>
      </div>
      )
    );
  }
}

Ticker.defaultProps = {
  message: '',
  loop: true,
  timeBefore: 0,
  timeAfter: 0,
  active: true,
  className: ''
};

Ticker.propTypes = {
  message: PropTypes.string,
  loop: PropTypes.bool,
  timeBefore: PropTypes.number,
  timeAfter: PropTypes.number,
  active: PropTypes.bool,
  className: PropTypes.string
};

export default Ticker;
