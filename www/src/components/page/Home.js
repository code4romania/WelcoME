import React from 'react'
import PropTypes from 'prop-types'
const Home = (props, { store }) => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

Home.contextTypes = {
  store: PropTypes.object.isRequired
}

export default Home
