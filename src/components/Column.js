import React from 'react'
import PropTypes from 'prop-types'
import '../assets/css/column.scss'

export default function SideColumn (props) {
  const { length } = props
  return (
    <ul className='editor-content-edit-line-num'>{
      new Array(length).fill('').map((_, i) => (
        <li key={i}>{i + 1}</li>
      ))
    }</ul>
  )
}

SideColumn.propTypes = {
  length: PropTypes.number
}
