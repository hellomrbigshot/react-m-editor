import React, { Component } from 'react';
import marked from 'marked';
import classnames from 'classnames';
import hljs from '../assets/js/hljs';
import { throttle } from '../assets/js/util';
import { config } from '../assets/js/config';
import Toolbar from './toolbar';
import Column from './column';

import '../assets/css/icon.css';
import '../assets/css/editor.scss';
import '../assets/css/preview.scss';

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code) => {
    return hljs.highlightAuto(code).value;
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
});

class MEditor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.value || '',
      columnLength: 1,
      placeholder: props.value || '请输入编辑内容',
      iconLength: config.length,
      mode: 'live',
      fullScreen: props.fullScreen || ''
    }
  }
  render() {
    const { value, columnLength, placeholder, iconLength, mode, fullScreen } = this.state
    return (
      <div className={classnames('editor', fullScreen && 'editor-fullscreen')} ref={editor => this.mEditor = editor}>
        <Toolbar 
          iconLength={iconLength}
          mode={mode}
          fullScreen={fullScreen}
          modeChange={this.handleModeChange}
          fullScreenChange={this.handleFullScreenChange}
          appendContent={this.handleAppendContent}
        />
        <div className="editor-content">
          <div 
            className={
              classnames(
                'editor-content-edit',
                mode === 'edit' && 'active',
                mode === 'preview' && 'inactive'
              )
            }
            onScroll={this.throttleScroll}
          >
            <div className="editor-content-edit-block" onMouseOver={() => {this.scrollType = 'edit'}}>
              <Column length={columnLength} />
              <div className="editor-content-edit-input">
                <div ref={input => this.inputPre = input}>{value.replace(/\n$/, '\n ')}</div>
                <textarea
                  onChange={this.handleValueChange}
                  value={value}
                  placeholder={placeholder}
                  ref={input => this.mTextarea = input}
                />
              </div>
            </div>
          </div>
          <div 
            className={classnames('editor-content-preview', mode === 'preview' && 'active', mode === 'edit' && 'inactive')}
            onMouseOver={() => {this.scrollType = 'preview'}}
          >
            <div className="m-editor-preview" dangerouslySetInnerHTML={{__html: marked(this.state.value)}}></div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    this.throttleResize = throttle(this.handleResize, 100, this);
    window.addEventListener('resize', this.throttleResize);
    this.handleResize();
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.throttleResize);
  }
  handleScroll = () => { // scroll

  }
  handleResize = () => { // resize
    console.log('resize')
    let width = this.mEditor.clientWidth;
    let iconLength = null;
    if (width > 780) {
      iconLength = config.length;
    } else if (680 < width) {
      iconLength = config.length - 3;
    } else if (640 < width) {
      iconLength = config.length - 6;
    } else if (500 < width) {
      iconLength = config.length - 9;
    } else if (width < 500) {
      iconLength = 0;
      this.setState({
        mode: 'edit'
      })
    }
    this.setState({
      iconLength
    });
    this.getColumnLines();
  }
  handleValueChange = (e) => { // get value
    const value = e.target.value;
    this.setState({
      value
    }, () => {
      this.getColumnLines();
    })
  }
  getColumnLines = () => { // get column length
    const value = this.state.value;
    const textareaHeight = this.inputPre.scrollHeight;
    const columnLength = Math.max(value.split('\n').length, (textareaHeight - 20) / 30);
    this.setState({
      columnLength
    })
  }
  handleModeChange = (mode) => { // change mode
    this.setState({
      mode
    });
    setTimeout(() => {
      this.getColumnLines(); // transition needs .2s
    }, 250);
  }
  handleFullScreenChange = () => { // fullScreen change
    this.setState({
      fullScreen: !this.state.fullScreen
    })
  }
  handleAppendContent = (content) => {
    const pos = this.mTextarea.selectionStart;
    const value = this.state.value;
    if (pos > -1) {
      this.setState({
        value: `${value.slice(0, pos)}${content}${value.slice(pos)}`
      }, () => {
        this.mTextarea.blur();
        setTimeout(() => {
          this.mTextarea.selectionStart = pos + content.length;
          this.mTextarea.selectionEnd = pos + content.length;
          this.mTextarea.focus();
          this.getColumnLines();
        });
      })
    }
  }
}

export default MEditor;
