# react-m-editor

> A markdown editor with React.js

[![NPM](https://img.shields.io/npm/v/react-m-editor.svg)](https://www.npmjs.com/package/react-m-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Install

```
yarn add react-m-editor
```

## Usage


```jsx
import React, { Component } from 'react'

import MEditor from 'react-m-editor'

class Example extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'hello world'
    }
  }
  render () {
    return (
      <MEditor onChange={() => this.handleChange(value)} />
    )
  }
  handleChange (value) {
    this.setState({
      value
    })
  }
}
```

## Preview

[address](https://hellomrbigshot.github.io/react-m-editor)

## Api

### props

| name       | type   | default     | description     |
| ---------- | -------| ----------- | --------------- |
| value      | String |             | value           |
| placeholder| String | 请输入……     | placehoder      |
| mode       | String | live        | one of ['live', 'edit', 'preview']|
| fullScreen | Boolean| false       | full screen     |
| showLineNum| Boolean| true        | show side line number |
| theme      | String | light       | light or dark   |


### event

| name     | params | description    |
| -------  | ------ | -----------    |
| onChange | content: String | change event |


## License

MIT © [hellomrbigshot](https://github.com/hellomrbigshot)
