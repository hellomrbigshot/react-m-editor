import React, { useState, useRef, ReactNode, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import '../assets/css/tooltip.scss'

export interface ToolTipProps {
  children?: Array<ReactNode>;
  content?: string;
}

function ToolTip ({ children, content }: ToolTipProps) {
  const [visible, setVisible] = useState(false)
  const visible2 = useRef(false)
  const handleMouseEnter = (e: MouseEvent, type: string) => {
    e.stopPropagation()
    if (type === 'content') {
      visible2.current = true
    }
    setVisible(true)
  }
  const handleMouseLeave = (e: MouseEvent ,type: string) => {
    e.stopPropagation()
    if (type === 'main') {
      setTimeout(() => {
        if (!visible2.current) {
          setVisible(false)
        }
      }, 500)
    } else if (type === 'content') {
      visible2.current = false
      setVisible(false)
    }
  }
  return (
    <div
      className='tooltip-wrapper'
    >
      <div
        onMouseEnter={e => handleMouseEnter(e, 'main')}
        onMouseLeave={e => handleMouseLeave(e, 'main')}
      >
        { Array.isArray(children) ? children[0] : children }
      </div>
      <div
        className={classnames('tooltip-content', visible ? 'mouse-in' : '')}
        onMouseEnter={e => handleMouseEnter(e, 'content')}
        onMouseLeave={e => handleMouseLeave(e, 'content')}
      >
        {
          content || (Array.isArray(children) && children[1])
        }
      </div>
    </div>
  )
}

ToolTip.propTypes = {
  children: PropTypes.array,
  content: PropTypes.string
}

export default ToolTip
