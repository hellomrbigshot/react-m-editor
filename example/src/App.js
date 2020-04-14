import React, { Component } from 'react'
import MEditor from 'react-m-editor'
import logo from './logo.svg'

// import { text } from './example'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'hello world',
      theme: 'light'
    }
  }

  render () {
    const { value, theme } = this.state
    const toggleTheme = () => {
      this.setState({
        theme: theme === 'light' ? 'dark' : 'light'
      })
    }
    return (
      <div className='App' style={{ background: theme === 'light' ? '#fff' : '#2a2c33' }}>
        <button className='theme-button' onClick={ toggleTheme }>切换主题</button>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
        </header>
        <div style={{margin: '20px auto', width: '90%'}}>
          <MEditor
            value={ value }
            theme={ theme }
            onChange={(content) => this.handleChange(content)}
          />
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
    console.log(value)
    this.setState({
      value
    })
  }
}
