import React from 'react'
import LinearProgress from 'react-md/lib/Progress/LinearProgress'
import './LoadingApp.css'

const LoadingApp = () => {
  return (
    <div>
      <LinearProgress id='progress-loading' className='progress-loading' />
    </div>
  )
}

export default LoadingApp
