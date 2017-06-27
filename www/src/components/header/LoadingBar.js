import React from 'react'
import LinearProgress from 'react-md/lib/Progress/LinearProgress'
import './LoadingBar.css'

const LoadingBar = () => {
  return (
    <div>
      <LinearProgress 
        id='progress-loading' 
        className='progress-loading'
        style={{height: '2px'}} />
    </div>
  );
}

export default LoadingBar
