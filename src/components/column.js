import React from 'react';

export default function SideColumn (props) {
  const { length } = props;
  return (<ul className="editor-content-edit-column">{
    new Array(length).fill('').map((item, i) => (
      <li key={i}>{i + 1}</li>
    ))
  }</ul>)
}
