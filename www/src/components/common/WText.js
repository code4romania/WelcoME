import React from 'react'
import PropTypes from 'prop-types'
import './common.css'

const WText = (props) => {
  let className = "welcome-" + props.type;

  return (
    <div>
      <p className={className}>
        {props.text}
      </p>
      {props.children}
    </div>
  );
}

WText.propTypes = {
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'p']),
  text: PropTypes.string.isRequired,
}

export default WText
