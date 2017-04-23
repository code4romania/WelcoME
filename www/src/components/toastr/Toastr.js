import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import ToastrBox from './ToastrBox'
import './Toastr.css'
class Toastr extends Component {
  _renderToastrBox (item) {
    // Default options from props, but item can override them with own.
    const mergedItem = {
      ...item,
      options: {
        progressBar: this.props.progressBar,
        transitionIn: this.props.transitionIn,
        transitionOut: this.props.transitionOut,
        ...item.options
      }
    }
    return (
      <ToastrBox
        key={item.id}
        item={mergedItem}
        remove={this.props.removeToastr}
        {...this.props}
      />
    )
  }

  render () {
    return (
      <div className={cn('redux-toastr', this.props.position, this.props.className)}>
        {this.props.toastrs.map(item => this._renderToastrBox(item))}
      </div>
    )
  }
}

Toastr.displayName = 'Toastr'
Toastr.propTypes = {
  toastrs: PropTypes.array.isRequired,
  removeToastr: PropTypes.func.isRequired,
  options: PropTypes.object,
  position: PropTypes.string,
  timeOut: PropTypes.number,
  progressBar: PropTypes.bool,
  transitionIn: PropTypes.string,
  transitionOut: PropTypes.string
}

Toastr.defaultProps = {
  position: 'bottom-right',
  timeOut: 6000,
  progressBar: true,
  transitionIn: 'bounceIn',
  transitionOut: 'bounceOut'
}

export default Toastr
