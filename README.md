# react-m-editor

> A markdown editor with React.js

![GitHub package.json version](https://img.shields.io/github/package-json/v/hellomrbigshot/react-m-editor)
![GitHub](https://img.shields.io/github/license/hellomrbigshot/react-m-editor)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Install

```
yarn add react-m-editor
```

## Usage with React


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
      <MEditor
        theme='dark'
        showLineNum={false}
        onChange={() => this.handleChange(value)}
      />
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
| contentType| String | markdown    | markdown or html |
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
