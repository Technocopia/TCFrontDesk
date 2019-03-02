import React from 'react'
import { CSSTransition } from 'react-transition-group';

import classNames from 'classnames'
import style from './style.css'

const preface = 'tcfd-ticker'

class Ticker extends React.Component {
  static defaultProps = {}

  state = {
      stateOfIn: false,
      message : ""
  };
  
  // Begin Enter: Do anything!
  onEnterHandler()  {
     console.log({message: 'Begin Enter...'});
  }
 
  onEnteredHandler ()  {
    this.setState({stateOfIn: false})
    console.log({message: 'OK Entered!'});
  }
 
  onEnteringHandler() {
     console.log({message: 'Entering... (Wait timeout!)'});
  }
 
  // Begin Exit: Do anything!
  onExitHandler() {
     console.log({message: 'Begin Exit...'});
  }
 
  onExitingHandler() {
     console.log({message: 'Exiting... (Wait timeout!)'});
  }
 
  onExitedHandler() {
     console.log({message: 'OK Exited!'});
  }

  
  render = () => {
    const { className, active } = this.props
    const { stateOfIn } = this.state
    const itemText = "Terrific to end our collaborative workspace tour with a visit to YouthBuild Worcester members - these young folks, trained in construction and other trades, built out the last third of the @Technocopia facility.  @TRAmerica_Inc"
    return (
      active && <div className={className}><div className={preface}>
        <CSSTransition
          classNames={`${preface}-item`}
          timeout={5000}
          in={this.state.stateOfIn}
              onEnter = {() =>  this.onEnterHandler()}
              onEntering = {() =>  this.onEnteringHandler()}
              onEntered={() =>  this.onEnteredHandler()}
 
              onExit={() =>  this.onExitHandler()}
              onExiting={() =>  this.onExitingHandler()}
              onExited={() =>  this.onExitedHandler()}
        >
        <span className={`${preface}-item`}>{itemText}</span>
        </CSSTransition>
        <button className={`${preface}-tmp-btn`} onClick={() => {this.setState({ stateOfIn: !stateOfIn });}}>Set {JSON.stringify(!stateOfIn)}</button>
     </div></div>
    )
  }
}

export default Ticker
