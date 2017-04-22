import React from 'react'
import PropTypes from 'prop-types'

const Example = ({className, action, num}) => {
  return (
    <div className={className} onClick={action}>Some Amazing Component {num}</div>
  )
}
Example.PropTypes = {
  className: PropTypes.string,
  num: PropTypes.number,
  action: PropTypes.func
}

export default Example
