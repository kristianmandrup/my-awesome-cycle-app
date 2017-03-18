# Cycle.js App with Ava and Time testing

Sample app created using [create-cycle-app](https://github.com/cyclejs-community/create-cycle-app)

Added:
- [Ava test runner](https://github.com/avajs/ava)
- [Time mocks](https://github.com/cyclejs/time)

## Recipes

Use snabdom `h` to create VDOM nodes for snabbdom used by @cycle/dom

```js
const h = require('snabbdom/h').default

```
h('google-map', {lat: '20.54', lng: '30.62'})
```

## Use Custom Element v1

See [custom elements : getting started](https://developers.google.com/web/fundamentals/getting-started/primers/customelements)

```js
class AppDrawer extends HTMLElement {
  //...
}

window.customElements.define('app-drawer', AppDrawer);
```

### Add a Polymer Web component

Add the `webcomponents-loader` polyfill

```html
<script src="/bower_components/webcomponentsjs/webcomponents-loader.js"></script>
```

Link to the Polymer elements you want to use

```html
<link rel="import" href="/src/my-app/my-app.html">
```

Use the custom elements like any html element, such as `h('my-app')`

## Run tests

`npm run test:ava` or simply `ava`

Test config in `package.json`

```json
{
  // ...
  "ava": {
    "require": ["babel-register"]
  },
  "babel": {
    "presets": [
      "@ava/stage-4",
      "@ava/transform-test-files",
      "es2015"
    ]
  }
}
```

Enjoy!

## License

MIT