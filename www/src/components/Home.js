import React from 'react'
const Home = (props) => props.auth.authenticated ? <h1>Authenticated</h1> : <h1>Home</h1>
export default Home
