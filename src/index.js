import React, { Component } from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import classnames from 'classnames'
import hljs from './assets/js/hljs'
import { throttle } from './assets/js/util'
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

export default class MEditor extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    fullScreen: PropTypes.bool,
    contentType: PropTypes.oneOf(['markdown', 'html']),
    showLineNum: PropTypes.bool,
    mode: PropTypes.oneOf(['live', 'edit', 'preview']),
    theme: PropTypes.oneOf(['light', 'dark']),
    onChange: PropTypes.func
  }
  static defaultProps = {
    fullScreen: false,
    showLineNum: true,
    placeholder: '请输入内容',
    mode: 'live',
    theme: 'dark',
    contentType: 'markdown'
  }
  constructor (props) {
    super(props)
    this.state = {
      mode: props.mode,
      fullScreen: props.fullScreen,
      columnLength: 1,
      iconLength: config.length
    }
  }
  componentDidMount () {
    this.throttleResize = throttle(this.handleResize, 100, this)
    this.throttleScroll = throttle(this.handleScroll, 30, this)
    window.addEventListener('resize', this.throttleResize)
    this.handleResize()
  }
  /**
   * value 改变时重新计算行数
   * fullScreen 改变时重新计算行数
   * mode 改变时重新计算行数，但是 mode 有一个 .2s 的动画，所以要添加延时函数
   *  */
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.value !== this.props.value || prevState.fullScreen !== this.state.fullScreen) {
      this.getColumnLines()
    }
    if (prevState.mode !== this.state.mode) {
      setTimeout(() => {
        this.getColumnLines() // transition needs .2s
      }, 200)
    }
  }
  componentWillUnmount () { // remove resize
    window.removeEventListener('resize', this.throttleResize)
  }
  handleScroll = () => { // scroll
    const { editWrapper, previewWrapper } = this
    const editWrapperMaxScrollTop = editWrapper.scrollHeight - editWrapper.clientHeight
    const previewWrapperMaxScrollTop = previewWrapper.scrollHeight - previewWrapper.clientHeight
    if (this.scrollType === 'edit') {
      previewWrapper.scrollTop = (editWrapper.scrollTop / editWrapperMaxScrollTop) * previewWrapperMaxScrollTop
    } else if (this.scrollType === 'preview') {
      editWrapper.scrollTop = (previewWrapper.scrollTop / previewWrapperMaxScrollTop) * editWrapperMaxScrollTop
    }
  }
  handleResize = () => { // resize
    let width = this.mEditor.clientWidth
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
      this.setState({
        mode: 'edit'
      })
    }
    this.setState({
      iconLength
    })
    this.getColumnLines()
  }
  handleValueChange = (e) => { // get value
    const value = e.target.value
    const { onChange, contentType } = this.props
    onChange(contentType === 'markdown' ? value : marked(value))
  }
  getColumnLines = () => { // get column length
    const { value } = this.props
    const textareaHeight = this.inputPre.scrollHeight
    const columnLength = Math.max(value.split('\n').length, (textareaHeight - 20) / 30)
    this.setState({
      columnLength
    })
  }
  handleModeChange = (mode) => { // change mode
    this.setState({
      mode
    })
  }
  handleFullScreenChange = () => { // fullScreen change
    this.setState({
      fullScreen: !this.state.fullScreen
    })
  }
  handleAppendContent = (str) => { // append content
    const pos = this.mTextarea.selectionStart
    const { value, onChange } = this.props
    if (pos > -1) {
      const content = `${value.slice(0, pos)}${str}${value.slice(pos)}`
      onChange(content)
      this.mTextarea.blur()
      setTimeout(() => {
        this.mTextarea.selectionStart = pos + str.length
        this.mTextarea.selectionEnd = pos + str.length
        this.mTextarea.focus()
      })
    }
  }
  handleKeyPress = (e) => { // key press event
    const TABKEY = 9
    if (e.keyCode === TABKEY) { // 自定义 tab 事件
      this.handleAppendContent('    ')
      if (e.preventDefault) {
        e.preventDefault()
      }
    }
  }
  render () {
    const { columnLength, iconLength, mode, fullScreen } = this.state
    const { value, placeholder, theme, showLineNum } = this.props
    return (
      <div
        className={classnames('editor', `${theme}-editor`, fullScreen && 'editor-fullscreen')}
        ref={editor => { this.mEditor = editor }}
      >
        <ToolBar
          iconLength={iconLength}
          mode={mode}
          fullScreen={fullScreen}
          modeChange={this.handleModeChange}
          fullScreenChange={this.handleFullScreenChange}
          appendContent={this.handleAppendContent}
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
            ref={input => { this.editWrapper = input }}
            onMouseOver={() => { this.scrollType = 'edit' }}
            onScroll={this.throttleScroll}
          >
            <div className='editor-content-edit-block'>
              {
                showLineNum ? (
                  <Column
                    length={columnLength}
                  />
                ) : null
              }
              <div className='editor-content-edit-input'>
                <div ref={input => { this.inputPre = input }}>{value.replace(/\n$/, '\n ')}</div>
                <textarea
                  onChange={this.handleValueChange}
                  value={value}
                  placeholder={placeholder}
                  ref={input => { this.mTextarea = input }}
                  onKeyDown={this.handleKeyPress}
                />
              </div>
            </div>
          </div>
          <div
            className={classnames('editor-content-preview', mode === 'preview' && 'active', mode === 'edit' && 'inactive')}
            ref={input => { this.previewWrapper = input }}
            onMouseOver={() => { this.scrollType = 'preview' }}
            onScroll={this.throttleScroll}
          >
            <div className='m-editor-preview' dangerouslySetInnerHTML={{__html: marked(value)}} />
          </div>
        </div>
      </div>
    )
  }
}
