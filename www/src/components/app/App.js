import React from 'react';
import Header from '../../containers/app/Header';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/> {this.props.children}
      </div>
    );
  }
}