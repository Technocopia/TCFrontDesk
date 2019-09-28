import React from 'react';
import DocumentMeta from 'react-helmet';
import Carousel from '../Carousel';
import Ticker from '../Ticker';

import './style.css';

const preface = 'tcfd-welcome';

class WelcomeDesk extends React.Component {
  state = {
    slides: [],
    ticker: ''
  }

  componentDidMount() {
    this.loadSlides();
    this.loadTicker();
  }

  async loadSlides() {
    try {
      const response = await fetch('/api/carousel/slides');
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const slides = await response.json();
      this.setState({ slides });
    } catch (e) {
      console.error(e);
      this.setState({ slides: [] });
    }
  }

  async loadTicker() {
    try {
      const response = await fetch('/api/ticker/');
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const ticker = await response.json();
      this.setState({ ticker });
    } catch (e) {
      console.error(e);
      this.setState({ ticker: null });
    }
  }

  render = () => {
    const { slides, ticker } = this.state;
    return (
      <div className={preface}>
        <DocumentMeta>
          <title>Technocopia Welcome Desk</title>
          {<link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossOrigin="anonymous"
          />}
        </DocumentMeta>
        <Carousel slides={slides} className={`${preface}-carousel`} />
        <Ticker className={`${preface}-ticker`} active={!!ticker} message={ticker} />
      </div>
    );
  }
}

export default WelcomeDesk;
