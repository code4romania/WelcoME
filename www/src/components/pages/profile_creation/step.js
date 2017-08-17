import React from 'react'
import './stepper.css'

const Step = (props) => {
  return (
    <div className='step-container'>
      {props.children}
    </div>
  );
}

export default Step;