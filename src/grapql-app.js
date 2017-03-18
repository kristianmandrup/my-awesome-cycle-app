import most from 'most'
import hold from '@most/hold'
import {
  run
} from '@cycle/most-run'
import {
  makeDOMDriver,
  h
} from '@motorcycle/dom'
import ApolloClient, {
  createNetworkInterface
} from 'apollo-client'
import {
  makeGraphQLDriver,
  gql
} from 'cycle-graphql-driver'

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'include'
  }
})

export default function runApp(dom, network) {
  run(app, {
    DOM: dom || makeDOMDriver('#container'),
    GRAPHQL: makeGraphQLDriver({
      client: new ApolloClient({
        networkInterface: network || networkInterface
      }),
      templates: {
        fetchItem: gql `
  query fetchItem($id: ID!) {
    item($id) {
      id
      name
      description
      events {
        time
        value
      }
    }
  }
        `,
        fetchAll: gql `
  query {
    items {
      id, name
    }
  }
        `,
        setItem: gql `
  mutation setItem($id: ID!, $name: String, $desc: String) {
    setItem($id, $name, $desc) {
      id
    }
  }
        `
      }
    })
  })
}


export function app({
  DOM,
  GRAPHQL
}) {
  let response$ = GRAPHQL
    .flatMap(r$ => r$
      .recoverWith(err => most.of({
        errors: [err.message]
      }))
    )
    .filter(({
      errors
    }) => {
      if (errors && errors.length) {
        console.log('errors:', errors)
        return false
      }
      return true
    })
    .map(({
      data
    }) => data)

  let itemList$ = response$.filter(data => data.items)

  let vtree$ = itemList$
    .map(items =>
      h('ul', items.map(item =>
        h('li', {
          props: {
            id: item.id
          }
        }, item.name)
      ))
    )

  return {
    DOM: vtree$,
    GRAPHQL: most.from([{
      query: 'fetchItems'
    }, {
      mutation: 'setItem',
      variables: {
        id: 123,
        name: 'an item',
        desc: 'this is an item'
      }
    }])
  }
}