import React from 'react';
import Header from '../../containers/app/Header';
import './StaticApp.css';

export default class StaticApp extends React.Component {
  render() {
    return (
      <div>
         <Header/> {this.props.children}
      </div>
    );
  }
}