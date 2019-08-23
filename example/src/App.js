import React, { Component } from 'react'
import MEditor from 'react-m-editor'
import logo from './logo.svg'

// import { text } from './example'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  render () {
    const { value } = this.state
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div style={{margin: '20px auto', width: '90%'}}>
          <MEditor value={ value } onChange={(content) => this.handleChange(content)}/>
        </div>
      </div>
    )
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        value: 'hello world'
      })
    }, 200)
  }
  handleChange (value) {
    this.setState({
      value
    })
  }
}
