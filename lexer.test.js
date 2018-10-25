"use strict";

var Lexer = require("./lexer");

var CHAR_A = "a".charCodeAt(0);
var CHAR_B = "b".charCodeAt(0);
var CHAR_C = "c".charCodeAt(0);
var CHAR_D = "d".charCodeAt(0);

test("lex abc", () => {
  var lex = new Lexer("abc");

  expect(lex.accept(CHAR_A)).toBeTruthy();
  expect(lex.accept(CHAR_B)).toBeTruthy();
  expect(lex.accept(CHAR_C)).toBeTruthy();
  expect(lex.accept(CHAR_D)).toBeFalsy();

  expect(lex.yield()).toBe("abc");
});
