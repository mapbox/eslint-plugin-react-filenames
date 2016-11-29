'use strict';

var allRules = {
  'filename-matches-component': require('./lib/rules/filename-matches-component')
};

module.exports = {
  rules: allRules,
  configs: {
    recommended: {
      plugin: [
        'react-filenames'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'react-filenames/filename-matches-component': 2
      }
    }
  }
};
