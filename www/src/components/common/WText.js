import React from 'react'
import PropTypes from 'prop-types'
import './common.css'

const WText = ({type, text}) => {
  let className = "welcome-" + type;

  return (
    <div>
      <label className={className}>
        {text}
      </label>
    </div>
  );
}

WText.propTypes = {
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'label']),
  text: PropTypes.string.isRequired,
}

export default WText
