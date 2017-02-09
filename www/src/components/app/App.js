import React from 'react'
//import Header from '../../containers/app/Header'
import './App.css'

export default class App extends React.Component {
  
  constructor(props,context){
    super(props,context);
    console.log('bbbb',props,context)
  }
  render () {
     console.log(this);
    return (
      <div> Ra 
       
      </div>
    )
  }
}
