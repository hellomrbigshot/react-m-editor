import hljs from './hljs'
import { markedHighlight } from 'marked-highlight'
import {  Marked } from 'marked'
const markedFun = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    }
  }),
  {
    pedantic: false,
    gfm: true,
    breaks: true
  }
)

export const betterMarked = (str: string) => { // replace <code> tags to <code class="hljs">
  return (markedFun.parse(str) as string).replace(/<code( class="language-[A-Za-z]*")?>/g, '<code class="hljs">')
}
