import React, { Component } from 'react'
import classnames from 'classnames'
import '../assets/css/tooltip.scss'

let timer = null
export default class ToolTip extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  handleMouseEnter = () => {
    clearTimeout(timer)
    if (this.state.visible === false) {
      this.setState({
        visible: true
      })
    }
  }
  handleMouseLeave = (type) => {
    if (type === 'main') {
      timer = setTimeout(() => {
        this.setState({
          visible: false
        })
      }, 100)
    }
  }
  render () {
    // eslint-disable-next-line react/prop-types
    const { children, content } = this.props
    const { visible } = this.state
    return (
      <div
        className='tooltip-wrapper'
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseEnter}
        onMouseLeave={() => this.handleMouseLeave('main')}
      >
        { Array.isArray(children) ? children[0] : children }
        <div
          className={classnames('tooltip-content', visible ? 'mouse-in' : '')}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={() => this.handleMouseLeave('content')}
        >
          {
            content || children[1]
          }
        </div>
      </div>
    )
  }
}
