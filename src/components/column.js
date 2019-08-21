import React from 'react'
import PropTypes from 'prop-types'
import '../assets/css/column.scss'

export default function SideColumn (props) {
  const { length } = props
  return (<ul className='editor-content-edit-column'>{
    new Array(length).fill('').map((item, i) => (
      <li key={i}>{i + 1}</li>
    ))
  }</ul>)
}

SideColumn.propTypes = {
  length: PropTypes.number
}
