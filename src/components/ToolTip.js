import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import '../assets/css/tooltip.scss'

function ToolTip ({ children, content }) {
  const [visible, setVisible] = useState(false)
  const [timer, setTimer] = useState(null)
  const handleMouseEnter = () => {
    clearTimeout(timer)
    if (visible === false) {
      setVisible(true)
    }
  }
  const handleMouseLeave = (type) => {
    if (type === 'main') {
      setTimer(setTimeout(() => {
        setVisible(false)
      }, 100))
    }
  }
  return (
    <div
      className='tooltip-wrapper'
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseEnter}
      onMouseLeave={() => handleMouseLeave('main')}
    >
      { Array.isArray(children) ? children[0] : children }
      <div
        className={classnames('tooltip-content', visible ? 'mouse-in' : '')}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => handleMouseLeave('content')}
      >
        {
          content || children[1]
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
