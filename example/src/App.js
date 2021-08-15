import React, { useState, useEffect } from 'react'
import { MEditor } from 'react-m-editor'
import logo from './logo.svg'

// import { text } from './example'
export default function App () {
  const [value, setValue] = useState('')
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    setTimeout(() => {
      setValue('hello world')
    }, 200)
  }, [])
  const handleChange =  (value) => {
    console.log(value)
    setValue(value)
  }
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
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
          onChange={(content) => handleChange(content)}
        />
      </div>
    </div>
  )
}
