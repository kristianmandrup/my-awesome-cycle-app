import xs from 'xstream'
import {
  div,
  button
} from '@cycle/dom'

export function Counter({
  DOM
}) {
  const add$ = DOM
    .select('.add')
    .events('click')
    .mapTo(+1);

  const subtract$ = DOM
    .select('.subtract')
    .events('click')
    .mapTo(-1);

  const change$ = xs.merge(add$, subtract$);

  const count$ = change$.fold((total, change) => total + change, 0);

  return {
    DOM: count$.map(count =>
      div('.counter', [
        div('.count', count.toString()),
        button('.add', 'Add'),
        button('.subtract', 'Subtract')
      ])
    )
  }
}