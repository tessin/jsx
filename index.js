"use strict";

var Lexer = require("./lexer");
var Tokenizer = require("./tokenizer");
var Parser = require("./parser");

function buildTree(React, node, env) {
  var type = node[0];
  var envTypeMapping = env[type];
  if (envTypeMapping) {
    node[0] = envTypeMapping;
  }
  // children
  for (var i = 2; i < node.length; i++) {
    if (typeof node[i] === "object") {
      node[i] = buildTree(React, node[i], env);
    }
  }
  return React.createElement.apply(null, node);
}

function render(React, jsx, env) {
  var parser = new Parser(new Tokenizer(new Lexer(jsx)));
  if (!parser.parse()) {
    return null; // empty string, possibly a syntax error
  }
  var root = parser.root();
  if (root.length == 2) {
    return null; // empty string, possibly a syntax error
  }
  var el = buildTree(React, root[2], env);
  return el;
}

render.default = render;

module.exports = render;
