import {
  div,
  h
} from '@cycle/dom'
import xs from 'xstream'

class MyElem extends HTMLElement {
  constructor() {
    super();
    console.log('created AppDrawer custom element')
  }
}
const customElements = window['customElements']

if (customElements) {
  console.log('defining custom element', 'my-elem', MyElem)
  customElements.define('my-elem', MyElem);
} else {
  console.error('window.customElements and CustomElementRegistry not available yet in this browser!!!')
}

export function App(sources) {
  console.log('creating VDOM tree')
  const vtree$ = xs.of(
    div('My Awesome Cycle.js app'),
    h('aside', {
      is: 'my-elem'
    })
  )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}