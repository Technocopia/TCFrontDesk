import React from 'react';
import './app.css';
import WelcomeDesk from './components/WelcomeDesk'
export default class App extends React.Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <WelcomeDesk />
    );
  }
}
