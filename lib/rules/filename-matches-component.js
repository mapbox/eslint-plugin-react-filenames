'use strict';

var Components = require('../util/Components');
var path = require('path');
var decamelize = require('decamelize');
var ignoredFilenames = ['<text>', '<input>'];

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function getComponentName(node) {

  // var Hello = React.createClass({ ... });
  if (
    node.parent && node.parent.parent &&
    node.parent.parent.type === 'VariableDeclarator' &&
    node.parent.parent.id.name) {
    return node.parent.parent.id.name;
  }

  // class Hello extends React.Component { }
  if (node.type === 'ClassDeclaration' &&
    node.id.type === 'Identifier' &&
    node.id.name) {
    return node.id.name;
  }

  // var DontLook = function() { return (<div>Hello {this.props.name}</div>); };
  if (
    node.parent && node.parent.id &&
    (node.type === 'FunctionExpression' ||
    node.type === 'ArrowFunctionExpression') &&
    node.id === null &&
    node.parent.type === 'VariableDeclarator' &&
    node.parent.id.type === 'Identifier') {
    return node.parent.id.name;
  }

  // function FolksWolves() { return (<div>Hello {this.props.name}</div>); }
  if (
    node.type === 'FunctionDeclaration' &&
    node.id) {
    return node.id.name;
  }

  return null;
}

module.exports = {
  meta: {
    docs: {
      description: 'Enforce naming patterns',
      category: 'Best Practices',
      recommended: true
    },
    schema: [{
      type: 'object',
      properties: { },
      additionalProperties: false
    }]
  },
  create: Components.detect(function(context, components) {

    /**
     * Reports missing display name for a given component
     * @param {Object} component The component to process
     */
    function reportNonMatchingComponentName(node, rawName, name, filename) {
      context.report(
        node,
        'Component name ' + rawName + ' (' + name + ') does not match filename ' + filename
      );
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      'Program:exit': function() {
        var list = components.list();
        var filename = context.getFilename();
        var extension = path.extname(filename);
        var isFromStdin = ignoredFilenames.indexOf(filename) !== -1;
        var filenameWithoutExtension = path.basename(filename, extension);

        if (isFromStdin) {
          return;
        }

        // Report non-matching display names
        for (var component in list) {
          if (list.hasOwnProperty(component)) {
            var node = list[component].node;
            var name = getComponentName(node);
            if (name !== null && decamelize(name) !== filenameWithoutExtension) {
              reportNonMatchingComponentName(
                node, name, decamelize(name), filenameWithoutExtension);
            }
          }
        }
      }
    };
  })
};
