import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button'
import './common.css'
import omit from 'object.omit'

export default class WButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  toggleHover = () => {
    this.setState({hover: !this.state.hover})
  }

  getPrimaryColor = () => {
    return !!this.props.primaryColor
      ? this.props.primaryColor
      : '#79afff';
  }

  getStyle = () => {
    return {
      fontWeight: '500',
      fontSize: '15px',
      lineHeight: '35px',
      fontFamily: 'Roboto',
      boxShadow: '0 0',
      height: '50px',
      width: '100%',
      color: this.state.hover ? this.getPrimaryColor() : '#ffffff',
      backgroundColor: this.state.hover
        ? '#ffffff'
        : this.getPrimaryColor(),
      border: this.state.hover
        ? '1.5px solid ' + this.getPrimaryColor()
        : 'none',
      borderRadius: '0px',
      textTransform: 'none',
    };
  }

  render = () => {
    return (
      <Button
        {...omit(this.props, 'primaryColor')}
        raised
        style={this.getStyle()}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover} />
    );
  }
}
