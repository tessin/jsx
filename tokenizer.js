"use strict";

var Lexer = require("./Lexer");

var CHAR_LEFT_ANGLE_BRACKET = "<".charCodeAt(0);
var CHAR_RIGHT_ANGLE_BRACKET = ">".charCodeAt(0);
var CHAR_SLASH = "/".charCodeAt(0);
var CHAR_DOLLAR = "$".charCodeAt(0);
var CHAR_UNDERSCORE = "_".charCodeAt(0);
var CHAR_EQUALS = "=".charCodeAt(0);
var CHAR_SINGLE_QUOTE = "'".charCodeAt(0);
var CHAR_DOUBLE_QUOTE = '"'.charCodeAt(0);
var CHAR_0 = "0".charCodeAt(0);
var CHAR_9 = "9".charCodeAt(0);
var CHAR_UPPER_A = "A".charCodeAt(0);
var CHAR_UPPER_Z = "Z".charCodeAt(0);
var CHAR_LOWER_A = "a".charCodeAt(0);
var CHAR_LOWER_Z = "z".charCodeAt(0);

function Tokenizer(lex) {
  if (!(lex instanceof Lexer))
    throw new TypeError("arguments[0] should be instance of Lexer");
  this.lex = lex;
  this.tok = "";
  this.val = "";
  this.state = 0;
}

Tokenizer.prototype.next = function() {
  var lex = this.lex;

  switch (this.state) {
    case 0: {
      // #text
      while (lex.not(CHAR_LEFT_ANGLE_BRACKET)) {
        // nom nom nom...
      }
      this.state = 1;
      if (lex.length() > 0) {
        this.tok = "text";
        this.val = lex.yield();
        return true;
      }
      return this.next();
    }
    case 1: {
      // #markup

      // ignore white space
      if (lex.acceptWhiteSpace()) {
        while (lex.acceptWhiteSpace());
        lex.discard();
      }

      // ident
      if (
        lex.accept(CHAR_DOLLAR) ||
        lex.accept(CHAR_UNDERSCORE) ||
        lex.acceptBetween(CHAR_UPPER_A, CHAR_UPPER_Z) ||
        lex.acceptBetween(CHAR_LOWER_A, CHAR_LOWER_Z)
      ) {
        while (
          lex.accept(CHAR_DOLLAR) ||
          lex.accept(CHAR_UNDERSCORE) ||
          lex.acceptBetween(CHAR_0, CHAR_9) ||
          lex.acceptBetween(CHAR_UPPER_A, CHAR_UPPER_Z) ||
          lex.acceptBetween(CHAR_LOWER_A, CHAR_LOWER_Z)
        );
        this.tok = "ident";
        this.val = lex.yield();
        return true;
      }

      // <
      if (lex.accept(CHAR_LEFT_ANGLE_BRACKET)) {
        var s = lex.yield();
        this.tok = s;
        this.val = s;
        return true;
      }

      // /
      if (lex.accept(CHAR_SLASH)) {
        var s = lex.yield();
        this.tok = s;
        this.val = s;
        return true;
      }

      // =
      if (lex.accept(CHAR_EQUALS)) {
        var s = lex.yield();
        this.tok = s;
        this.val = s;
        return true;
      }

      var quote = lex.val;
      if (lex.accept(CHAR_SINGLE_QUOTE) || lex.accept(CHAR_DOUBLE_QUOTE)) {
        while (lex.not(quote)) {
          // nom nom nom...
        }
        lex.expect(quote);
        this.tok = "string";
        this.val = lex.yield();
        return true;
      }

      if (lex.accept(CHAR_RIGHT_ANGLE_BRACKET)) {
        // >
        var s = lex.yield();
        this.tok = s;
        this.val = s;
        this.state = 0; // #text
        return true;
      }

      break;
    }
  }

  return false;
};

Tokenizer.default = Tokenizer;

module.exports = Tokenizer;
