import React, { useState, useEffect } from 'react'
import { MEditor } from 'react-m-editor'
import logo from './logo.svg'
import 'react-m-editor/dist/index.min.css'

// import { text } from './example'
export default function App () {
  const [value, setValue] = useState('')
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    setTimeout(() => {
      setValue('hello world')
    }, 200)
  }, [])
  const handleChange = ({ content, htmlContent }) => {
    console.log(htmlContent)
    setValue(content)
  }
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <div className='App' style={{ background: theme === 'light' ? '#fff' : '#2a2c33' }}>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <button className='theme-button' onClick={toggleTheme}>切换主题</button>
      <div style={{margin: '20px auto', width: '90%'}}>
        <MEditor
          value={value}
          theme={theme}
          debounce={true}
          debounceWait={500}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
