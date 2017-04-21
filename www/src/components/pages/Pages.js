import React from 'react'
import PropTypes from 'prop-types'
const Pages = ({pages}) => {
  return (
    <div>
      {pages.map(({Page, props, visible}) => (
        visible ? <Page {...props} /> : null
      ))}
    </div>
  )
}
Pages.propTypes = {
  pages: PropTypes.array.isRequired
}
export default Pages
