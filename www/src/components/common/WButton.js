import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button'
import omit from 'object.omit'
const styles = require('./common.css')

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
      : styles.wFocus;
  }

  getColor = () => {
    return this.props.primary !== false
      ? this.getPrimaryColor()
      : styles.wDarkGrey;
  }

  getButtonHeight = () => {
    return !!this.props.buttonHeight
      ? this.props.buttonHeight
      : 40;
  }

  getLineHeight = () => {
    return this.getButtonHeight() - 15;
  }

  getStyle = () => {
    return {
      fontWeight: '500',
      fontSize: '15px',
      lineHeight: this.getLineHeight() + 'px',
      fontFamily: 'Roboto',
      boxShadow: '0 0',
      height: this.getButtonHeight() + 'px',
      width: '100%',
      color: this.state.hover ? this.getColor() : '#ffffff',
      backgroundColor: this.state.hover
        ? '#ffffff'
        : this.getColor(),
      border: this.state.hover
        ? '1.5px solid ' + this.getColor()
        : 'none',
      borderRadius: '0px',
      textTransform: 'none',
    };
  }

  render = () => {
    return (
      <Button
        {...omit(this.props, 'primaryColor', 'buttonHeight')}
        raised
        style={this.getStyle()}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover} />
    );
  }
}
