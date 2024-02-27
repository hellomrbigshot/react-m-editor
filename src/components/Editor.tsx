import { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react'
import { useMemoizedFn } from 'ahooks'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { throttle, debounce as debounceFunc } from 'lodash-es'
import { betterMarked } from '../assets/js/betterMarked'

import { config } from '../assets/js/config'
import ToolBar from './ToolBar'
import Column from './Column'

import '../assets/css/editor.scss'
import '../assets/css/preview.scss'
import '../assets/css/solarized-light.scss'


export interface EditorProps {
  mode: string;
  fullScreen: boolean;
  placeholder: string;
  theme: string;
  showLineNum: boolean;
  value: string;
  autoScroll: boolean;
  onFullScreenChange?: (isFullScreen: boolean) => void;
  onModeChange?: (newMode: string, mode: string) => void;
  onChange?: (content: { content: string, htmlContent: string }) => void;
  contentType?: string;
  debounceRender: boolean;
  debounceRenderWait?: number;
}



export default function Editor (props: EditorProps) {
  const { placeholder, theme, showLineNum, value, onFullScreenChange, onModeChange, autoScroll, debounceRender, debounceRenderWait, onChange } = props
  const [mode, setMode] = useState(props.mode)
  const [fullScreen, setFullScreen] = useState(props.fullScreen)
  const [iconLength, setIconLength] = useState(config.length)
  const [columnsLength, setColumnsLength] = useState(1)
  const [scrollType, setScrollType] = useState('edit')
  const [markedHtml, setMarkedHtml] = useState('')
  const mEditor = useRef<HTMLDivElement>(null)
  const mTextarea = useRef<HTMLTextAreaElement>(null)
  const editWrapper = useRef<HTMLDivElement>(null)
  const previewWrapper = useRef<HTMLDivElement>(null)
  const inputPre = useRef<HTMLDivElement>(null)

  const getColumnLines = useMemoizedFn(() => { // get column length
    const textareaHeight = inputPre.current?.scrollHeight
    const length = Math.max(value.split('\n').length, ((textareaHeight || 0) - 20) / 30)
    setColumnsLength(length)
  })
  const setHtml = useMemoizedFn((_value: string) => {
    if (debounceRender) {
      debounceMarked.current(_value)
    } else {
      setMarkedHtml(betterMarked(_value))
    }
  })
  useEffect(() => {
    setTimeout(() => {
      getColumnLines()
    }, 200)
  }, [value, fullScreen, mode, getColumnLines])

  useEffect(() => {
    setHtml(value)
  }, [value, setHtml])
  const handleResize = useMemoizedFn(() => {
    const width = mEditor.current!.clientWidth
    let iconLength: number = 0
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
  })
  const handleThrottleResize = useMemoizedFn(throttle(handleResize, 300))

  useEffect(() => { // do once when componentdidmounted
    window.addEventListener('resize', handleThrottleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleThrottleResize)
    }
  }, [handleResize, handleThrottleResize])
  const handleModeChange = (newMode: string) => { // change mode
    onModeChange && onModeChange(newMode, mode)
    setMode(newMode)
  }
  const handleFullScreenChange = (full: boolean) => { // fullScreen change
    setFullScreen(full)
    onFullScreenChange && onFullScreenChange(full)
  }
  const debounceMarked = useRef(debounceFunc((value: string) => {
    setMarkedHtml(betterMarked(value))
  }, debounceRenderWait))
  const handleAppendContent = (str?: string) => { // append content
    if (!str) return
    const pos = mTextarea.current!.selectionStart || 0
    if (pos > -1) {
      const content:string = `${value.slice(0, pos)}${str}${value.slice(pos)}`
      onChange && onChange({ content, htmlContent: betterMarked(content) })
      // setHtml(content)
      mTextarea.current!.blur()
      setTimeout(() => {
        mTextarea.current!.selectionStart = pos + str.length
        mTextarea.current!.selectionEnd = pos + str.length
        mTextarea.current!.focus()
      })
    }
  }

  const handleScroll = autoScroll ? throttle(() => { // scroll
    const editWrapperMaxScrollTop = editWrapper.current!.scrollHeight - editWrapper.current!.clientHeight
    const previewWrapperMaxScrollTop = previewWrapper.current!.scrollHeight - previewWrapper.current!.clientHeight
    if (scrollType === 'edit') {
      previewWrapper.current!.scrollTop = (editWrapper.current!.scrollTop / editWrapperMaxScrollTop) * previewWrapperMaxScrollTop
    } else if (scrollType === 'preview') {
      editWrapper.current!.scrollTop = (previewWrapper.current!.scrollTop / previewWrapperMaxScrollTop) * editWrapperMaxScrollTop
    }
  }, 200) : undefined
  const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => { // get value
    const content = e.target.value
    onChange && onChange({ content, htmlContent: betterMarked(content) })
    // setHtml(content)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => { // key press event
    const TABKEY = 'Tab'
    if (e.code === TABKEY) { // tab event
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
          onMouseEnter={() => { setScrollType('edit') }}
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
          onMouseEnter={() => { setScrollType('preview') }}
          onScroll={handleScroll}
        >
          <div className='m-editor-preview' dangerouslySetInnerHTML={{ __html: markedHtml }} />
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
  autoScroll: PropTypes.bool,
  onChange: PropTypes.func,
  onFullScreenChange: PropTypes.func,
  onModeChange: PropTypes.func,
  debounceRender: PropTypes.bool,
  debounceRenderWait: PropTypes.number
}

Editor.defaultProps = {
  fullScreen: false,
  showLineNum: true,
  placeholder: '',
  mode: 'live',
  theme: 'dark',
  contentType: 'markdown',
  value: '',
  autoScroll: true,
  debounceRender: false,
  debounceRenderWait: 200
}
