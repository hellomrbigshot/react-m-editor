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

Use the component

```jsx
import React, { useState } from 'react'

import { MEditor } from 'react-m-editor'
import 'react-m-editor/dist/index.min.css'

function Example () {
  const [value, setValue] = useState('')
  const handleChange = ({ content, htmlContent }) => {
    setValue(content)
    console.log(htmlContent)
  }
  return (
    <MEditor
      theme='dark'
      showLineNum={false}
      onChange={() => handleChange(contentObj)}
    />
  )
}
```

The component also exports ```marked``` function:

```javascript
// The marked funciton will replace
// <code> or <code class="language-*"> tag
// to <code class="hljs">

import { marked } from 'react-m-editor'

let a = '```console.log('hello world')```'
console.log(marked(a)) // <p><code class="hljs">console.log(&#39;hello world&#39;)</code></p>

```

## Preview

[address](https://hellomrbigshot.github.io/react-m-editor)

## Api

### props

| name       | type   | default     | description     |
| ---------- | -------| ----------- | --------------- |
| value      | string |   -         | value           |
| placeholder| string |   -         | placehoder      |
| mode       | live \| edit \| preview | live      | edit mode |
| fullScreen | boolean| false       | full screen     |
| showLineNum| boolean| true        | show side line number |
| theme      | string | light       | light or dark   |
| autoScroll | boolean| true        | auto sroll or not |
| debounce   | boolean | false | debounce render html when edit |
| debounceWait | number | 200 | debounce wait time |
| onChange   | function ({ content, htmlContent }) | - | callback when editor changes |
| onModeChange | function (mode, oldMode) | - | callback when editor's mode changes |
| onFullScreenChange | function (isFullScreen) | - | callback when editor's fullscreen changes |

## License

MIT © [hellomrbigshot](https://github.com/hellomrbigshot)
