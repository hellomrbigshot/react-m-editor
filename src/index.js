import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import classnames from 'classnames'
import hljs from './assets/js/hljs'
import throttle from 'lodash/throttle'
import { config } from './assets/js/config'
import ToolBar from './components/ToolBar'
import Column from './components/Column'

import './assets/css/editor.scss'
import './assets/css/preview.scss'
import './assets/css/xt256.scss'

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code) => {
    return hljs.highlightAuto(code).value
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: true,
  headerIds: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})
function Editor (props) {
  const { placeholder, theme, showLineNum, value } = props
  const [mode, setMode] = useState(props.mode)
  const [fullScreen, setFullScreen] = useState(props.fullScreen)
  const [iconLength, setIconLength] = useState(config.length)
  const [columnsLength, setColumnsLength] = useState(1)
  const [scrollType, setScrollType] = useState('edit')
  const mEditor = useRef(null)
  const mTextarea = useRef(null)
  const editWrapper = useRef(null)
  const previewWrapper = useRef(null)
  const inputPre = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      getColumnLines()
    }, 200)
  }, [value, fullScreen, mode])

  useEffect(() => {
    window.addEventListener('resize', handleThrottleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleThrottleResize)
    }
  }, [])

  const getColumnLines = () => { // get column length
    const textareaHeight = inputPre.current.scrollHeight
    const length = Math.max(value.split('\n').length, (textareaHeight - 20) / 30)
    setColumnsLength(length)
  }
  const handleModeChange = (mode) => { // change mode
    setMode(mode)
  }
  const handleFullScreenChange = () => { // fullScreen change
    setFullScreen(!fullScreen)
  }
  const handleAppendContent = (str) => { // append content
    const pos = mTextarea.current.selectionStart
    const { value, onChange } = props
    if (pos > -1) {
      const content = `${value.slice(0, pos)}${str}${value.slice(pos)}`
      onChange(content)
      mTextarea.current.blur()
      setTimeout(() => {
        mTextarea.current.selectionStart = pos + str.length
        mTextarea.current.selectionEnd = pos + str.length
        mTextarea.current.focus()
      })
    }
  }
  const handleScroll = useCallback(throttle(() => { // scroll
    const editWrapperMaxScrollTop = editWrapper.current.scrollHeight - editWrapper.current.clientHeight
    const previewWrapperMaxScrollTop = previewWrapper.current.scrollHeight - previewWrapper.current.clientHeight
    if (scrollType === 'edit') {
      previewWrapper.current.scrollTop = (editWrapper.current.scrollTop / editWrapperMaxScrollTop) * previewWrapperMaxScrollTop
    } else if (scrollType === 'preview') {
      editWrapper.current.scrollTop = (previewWrapper.current.scrollTop / previewWrapperMaxScrollTop) * editWrapperMaxScrollTop
    }
  }, 30))
  const handleResize = () => { // resize
    console.log('trigger')
    const width = mEditor.current.clientWidth
    let iconLength = null
    if (width > 780) {
      iconLength = config.length
    } else if (width > 680) {
      iconLength = config.length - 3
    } else if (width > 640) {
      iconLength = config.length - 6
    } else if (width > 500) {
      iconLength = config.length - 9
      iconLength = 0
      setMode('edit')
    }
    setIconLength(iconLength)
    getColumnLines()
  }
  const handleThrottleResize = throttle(handleResize, 300)
  const handleValueChange = (e) => { // get value
    const value = e.target.value
    const { onChange, contentType } = props
    onChange(contentType === 'markdown' ? value : marked(value))
  }

  const handleKeyPress = (e) => { // key press event
    const TABKEY = 9
    if (e.keyCode === TABKEY) { // 自定义 tab 事件
      handleAppendContent('    ')
      if (e.preventDefault) {
        e.preventDefault()
      }
    }
  }
  return (
    <div
      ref={mEditor}
      className={classnames('editor', `${theme}-editor`, fullScreen && 'editor-fullscreen')}
    >
      <ToolBar
        iconLength={iconLength}
        mode={mode}
        fullScreen={fullScreen}
        modeChange={handleModeChange}
        fullScreenChange={handleFullScreenChange}
        appendContent={handleAppendContent}
      />
      <div className='editor-content'>
        <div
          className={
            classnames(
              'editor-content-edit',
              mode === 'edit' && 'active',
              mode === 'preview' && 'inactive'
            )
          }
          ref={editWrapper}
          onMouseOver={() => { setScrollType('edit') }}
          onScroll={handleScroll}
        >
          <div className='editor-content-edit-block'>
            {
              showLineNum
                ? (
                    <Column
                      length={columnsLength}
                    />
                  )
                : null
            }
            <div className='editor-content-edit-input'>
              <div ref={inputPre}>{value.replace(/\n$/, '\n ')}</div>
              <textarea
                ref={mTextarea}
                value={value}
                placeholder={placeholder}
                onKeyDown={handleKeyPress}
                onChange={handleValueChange}
              />
            </div>
          </div>
        </div>
        <div
          className={classnames('editor-content-preview', mode === 'preview' && 'active', mode === 'edit' && 'inactive')}
          ref={previewWrapper}
          onMouseOver={() => { setScrollType('preview') }}
          onScroll={handleScroll}
        >
          <div className='m-editor-preview' dangerouslySetInnerHTML={{__html: marked(value)}} />
        </div>
      </div>
    </div>
  )
}

Editor.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  fullScreen: PropTypes.bool,
  contentType: PropTypes.oneOf(['markdown', 'html']),
  showLineNum: PropTypes.bool,
  mode: PropTypes.oneOf(['live', 'edit', 'preview']),
  theme: PropTypes.oneOf(['light', 'dark']),
  onChange: PropTypes.func
}

Editor.defaultProps = {
  fullScreen: false,
  showLineNum: true,
  placeholder: '请输入内容',
  mode: 'live',
  theme: 'dark',
  contentType: 'markdown'
}

export const MEditor = Editor
