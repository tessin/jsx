"use strict";

var Tokenizer = require("./tokenizer");

function Parser(tok) {
  if (!(tok instanceof Tokenizer))
    throw new TypeError("arguments[0] should be instance of Tokenizer");
  this.tok = tok;
  this.tok.next(); // initialize
  this.stack = [
    ["#root", null] // [type, props, children...]
  ];
}

Parser.prototype.accept = function(tok) {
  if (this.tok.tok == tok) {
    this.tok.next();
    return true;
  }
  return false;
};

Parser.prototype.expect = function(tok) {
  if (!this.accept(tok)) {
    throw new Error("expected " + tok + " found " + this.tok.tok);
  }
};

Parser.prototype.peek = function() {
  return this.stack[this.stack.length - 1];
};

Parser.prototype.createElement = function(type, props) {
  var el = [type, null];
  this.peek().push(el); // append as child to parent
  this.stack.push(el);
  return el;
};

Parser.prototype.root = function() {
  return this.stack[0];
};

Parser.prototype.parse = function() {
  if (this.accept("<")) {
    // let's go!

    if (this.accept("/")) {
      // closing tag
      var endTag = this.tok.val;
      this.expect("ident");
      var beginTag = this.stack[this.stack.length - 1][0];
      if (beginTag !== endTag) {
        throw new Error("expected matching closing tag " + beginTag);
      }
      this.expect(">");
      return false; // break while loop
    }

    var beginTag = this.tok.val;
    this.expect("ident");

    var el = this.createElement(beginTag, null);

    while (this.parseProp());

    if (this.accept("/")) {
      // self closing tag
      this.expect(">");
    } else {
      this.expect(">");

      // children
      while (this.parse());
    }

    this.stack.pop();
    return true;
  }
  var text = this.tok.val;
  if (this.accept("text")) {
    this.peek().push(text);
    return true;
  }
  return false;
};

Parser.prototype.parseProp = function() {
  var name = this.tok.val;
  if (this.accept("ident")) {
    var el = this.peek();
    if (this.accept("=")) {
      var val = this.tok.val;
      this.expect("string");
      var props = el[1] || {};
      props[name] = parseLiteral(val);
      el[1] = props;
    } else {
      // implicit boolean
      var props = el[1] || {};
      props[name] = true;
      el[1] = props;
    }
    return true;
  }
  return false;
};

function parseLiteral(str) {
  if (str.charCodeAt(0) === 39) {
    // edge case: single-quoted string literal
    return JSON.parse(
      '"' + str.substr(1, str.length - 2).replace(/"/g, '\\"') + '"' // slower
    );
  }
  return JSON.parse(str); // faster
}

Parser.default = Parser;

module.exports = Parser;
