import {
  test
} from 'ava'

import {
  mockTimeSource
} from '@cycle/time'

import {
  mockDOMSource
} from '@cycle/dom';

import {
  select
} from 'snabbdom-selector'

import {
  Counter
} from './counter';

test('Counter', async t => {
  const Time = mockTimeSource();

  const addClick$ = Time.diagram(`---x--x-------x--x--|`);
  const subtractClick$ = Time.diagram(`---------x----------|`);
  const expectedCount$ = Time.diagram(`0--1--2--1----2--3--|`);

  const DOM = mockDOMSource({
    '.add': {
      click: addClick$
    },

    '.subtract': {
      click: subtractClick$
    },
  });

  const counter = Counter({
    DOM
  });

  const count$ = counter.DOM.map(vtree => select('.count', vtree)[0].text);

  Time.assertEqual(count$, expectedCount$)

  await Time.run();
});