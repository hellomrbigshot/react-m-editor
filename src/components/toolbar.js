import React from 'react'
import { config } from '../assets/js/config'
import PropTypes from 'prop-types'
import '../assets/css/icon.css'
import '../assets/css/toolbar.scss'

import classnames from 'classnames'

const modeConfig = [
  {
    mode: 'edit',
    title: '编辑',
    icon: 'icon-tianxie'
  },
  {
    mode: 'live',
    title: '分栏',
    icon: 'icon-fenlan'
  },
  {
    mode: 'preview',
    title: '预览',
    icon: 'icon-zitiyulan'
  }
]

function Toolbar (props) {
  const { fullScreen, modeChange, mode, iconLength, appendContent, fullScreenChange } = props
  return (<div className='editor-toolbar'>
    <ul className='editor-toolbar-tools'>
      {
        config.map((item, key) => {
          return item.showIcon && key < iconLength ? (
            <li key={key}>
              <span
                className={classnames('iconfont', item.icon)}
                title={item.title}
                onClick={() => { appendContent(item.content) }}
              />
            </li>
          ) : null
        })
      }
    </ul>
    <ul className='editor-toolbar-mode'>
      <li>
        <span
          className={classnames('iconfont', !fullScreen ? 'icon-quanping' : 'icon-huanyuanhuabu')}
          title={!fullScreen ? '全屏' : '还原'}
          onClick={fullScreenChange}
        />
      </li>
      {
        modeConfig.map((item, i) => (
          <li key={i}>
            <span className={classnames('iconfont', item.icon, mode === item.mode && 'muted')} onClick={() => { modeChange(item.mode) }} />
          </li>
        ))
      }
    </ul>
  </div>)
}
Toolbar.propTypes = {
  fullScreen: PropTypes.bool,
  mode: PropTypes.string,
  iconLength: PropTypes.number,
  appendContent: PropTypes.func,
  fullScreenChange: PropTypes.func,
  modeChange: PropTypes.func
}

export default Toolbar
