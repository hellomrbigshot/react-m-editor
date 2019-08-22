import React, { Component } from 'react'
import MEditor from 'react-m-editor'
import logo from './logo.svg'

// import { text } from './example'

export default class App extends Component {
  render () {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div style={{margin: '20px auto', width: '90%'}}>
          <MEditor value='hello world' onChange={(contentObj) => this.handleChange(contentObj)}/>
        </div>
      </div>
    )
  }
  handleChange (content) {
    console.log(content)
  }
}
