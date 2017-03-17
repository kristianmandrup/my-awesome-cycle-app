# Cycle.js App with Ava and Time testing

Sample app created using [create-cycle-app](https://github.com/cyclejs-community/create-cycle-app)

Added:
- [Ava test runner](https://github.com/avajs/ava)
- [Time mocks](https://github.com/cyclejs/time)

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