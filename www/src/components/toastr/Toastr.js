import React, {Component, PropTypes} from 'react'
import cn from 'classnames'
import ToastrBox from './ToastrBox'
import ToastrConfirm from './ToastrConfirm'
import {EE} from './toastrEmitter'
import { _bind } from './utils'

class Toastr extends Component {
  constructor (props, context) {
    super(props, context)
    this.toastrFired = {}
    _bind('_addToMemory', this)
  }

  componentDidMount () {
    const {addToastr, showConfirmToastr, cleanToastr, removeByTypeToastr} = this.context.handlers
    const add = addToastr
    const showConfirm = showConfirmToastr
    const clean = cleanToastr
    const removeByType = removeByTypeToastr

    EE.on('toastr/confirm', showConfirm)
    EE.on('add/toastr', add)
    EE.on('clean/toastr', clean)
    EE.on('removeByType/toastr', removeByType)
  }

  componentWillUnmount () {
    EE.removeListener('toastr/confirm')
    EE.removeListener('add/toastr')
    EE.removeListener('clean/toastr')
    EE.removeListener('removeByType/toastr')
    this.toastrFired = {}
  }

  _addToMemory (id) {
    this.toastrFired[id] = true
  }

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
    const {addToastr, showConfirmToastr, cleanToastr, removeByTypeToastr, removeToastr, hideConfirmToastr} = this.context.handlers
    const propsContext = {
      add: addToastr,
      showConfirm: showConfirmToastr,
      clean: cleanToastr,
      removeByType: removeByTypeToastr,
      remove: removeToastr,
      hideConfirm: hideConfirmToastr
    }
    return (
      <ToastrBox
        key={item.id}
        inMemory={this.toastrFired}
        addToMemory={this._addToMemory}
        item={mergedItem}
        {...this.props}
        {... propsContext}
      />
    )
  }

  render () {
    const toastr = this.context.store.toastr
    console.log(toastr)
    return (
      <div className={cn('redux-toastr', this.props.position, this.props.className)}>
        {toastr.confirm &&
          <ToastrConfirm
            key={toastr.confirm.id}
            confirm={toastr.confirm}
            {...this.props}
          />
        }
        {toastr && toastr.toastrs.map(item => this._renderToastrBox(item))}
      </div>
    )
  }
}

Toastr.displayName = 'Toastr'
Toastr.propTypes = {
  toastr: PropTypes.object,
  options: PropTypes.object,
  position: PropTypes.string,
  timeOut: PropTypes.number,
  confirmOptions: PropTypes.object,
  progressBar: PropTypes.bool,
  transitionIn: PropTypes.string,
  transitionOut: PropTypes.string
}

Toastr.defaultProps = {
  position: 'top-right',

  timeOut: 5000,
  progressBar: false,
  transitionIn: 'bounceIn',
  transitionOut: 'bounceOut',
  confirmOptions: {
    transitionIn: 'bounceInDown',
    transitionOut: 'bounceOutUp',
    okText: 'ok',
    cancelText: 'cancel',
    disableCancel: false
  }
}

Toastr.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default Toastr
