import React, { PropTypes } from 'react'

const Home = (props, { store }) => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

Home.contextTypes = {
  store: PropTypes.object.isRequired
}

export default Home
