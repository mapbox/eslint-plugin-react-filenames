eslint-plugin-react-filenames
===================

Enforce naming conventions in React projects.

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

```sh
$ npm install eslint
```

If you installed `ESLint` globally, you have to install React plugin globally too. Otherwise, install it locally.

```sh
$ npm install eslint-plugin-react
```

# Configuration

Add `plugins` section and specify ESLint-plugin-React as a plugin.

```json
{
  "plugins": [
    "react/filenames"
  ]
}
```

You can also specify some settings that will be shared across all the plugin rules.

```js
{
  "settings": {
    "react": {
      "createClass": "createClass", // Regex for Component Factory to use, default to "createClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "15.0" // React version, default to the latest React stable release
    }
  }
}
```

With ESLint 2.x.x or 3.x.x:

```json
{
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

Finally, enable all of the rules that you would like to use.  Use [our preset](#recommended) to get reasonable defaults quickly, and/or choose your own:

```json
  "rules": {
    "react-filenames/filename-matches-component": "error"
  }
```

# List of supported rules

* [react/filename-matches-component](docs/rules/filename-matches-component.md): ...

# License

This is based on ESLint-plugin-React, so it's also licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
