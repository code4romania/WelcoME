import React, {Component, PropTypes} from 'react'
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
        remove={this.context.handlers.removeToastr}
        {...this.props}
      />
    )
  }

  render () {
    const toastrs = this.context.store.toastrs
    return (
      <div className={cn('redux-toastr', this.props.position, this.props.className)}>
        {toastrs.map(item => this._renderToastrBox(item))}
      </div>
    )
  }
}

Toastr.displayName = 'Toastr'
Toastr.propTypes = {
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

Toastr.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default Toastr
