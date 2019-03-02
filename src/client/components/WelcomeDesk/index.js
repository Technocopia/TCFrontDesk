import React from 'react'
import DocumentMeta from 'react-helmet'
import classNames from 'classnames'
import Carousel from './../Carousel'
import Ticker from './../Ticker'

import './style.css';

const preface = 'tcfd-welcome'

class WelcomeDesk extends React.Component {
  static defaultProps = {}

  render = () => {
    return (
      <div className={preface}>
        <DocumentMeta>
          <title>Technocopia Welcome Desk</title>
	  {<link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossorigin="anonymous"
          />}
        </DocumentMeta>
        <Carousel className={`${preface}-carousel`}/>
        <Ticker className={`${preface}-ticker`} active={false} />
      </div>
    )
  }
}

export default WelcomeDesk
