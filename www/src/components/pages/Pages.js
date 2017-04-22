import React from 'react'
import PropTypes from 'prop-types'
import './Pages.css'
const Pages = ({pages}) => {
  return (
    <div>
      {pages.map(({Page, visible, key}) => (
        visible ? <Page key={key} /> : null
      ))}
    </div>
  )
}

Pages.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    Page: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    props: PropTypes.object,
    visible: PropTypes.bool

  })).isRequired
}
export default Pages
