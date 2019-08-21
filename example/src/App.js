import React, { Component } from 'react'

import MEditor from 'react-m-editor'
// import { text } from './example'

export default class App extends Component {
  render () {
    return (
      <div style={{margin: '50px auto', width: '90%'}}>
        <MEditor value='hello world'/>
      </div>
    )
  }
}
