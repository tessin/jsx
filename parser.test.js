"use strict";

var Lexer = require("./lexer");
var Tokenizer = require("./tokenizer");
var Parser = require("./parser");

test("parse <p />", () => {
  var parser = new Parser(new Tokenizer(new Lexer("<p />")));
  expect(parser.parse()).toBeTruthy();
  expect(parser.root()).toEqual(["#root", null, ["p", null]]);
});

test("parse <div />", () => {
  var parser = new Parser(new Tokenizer(new Lexer("<div />")));
  expect(parser.parse()).toBeTruthy();
  expect(parser.root()).toEqual(["#root", null, ["div", null]]);
});

test("parse <div>...</div> #1", () => {
  var parser = new Parser(new Tokenizer(new Lexer("<div></div>")));
  expect(parser.parse()).toBeTruthy();
  expect(parser.root()).toEqual(["#root", null, ["div", null]]);
});

test("parse <div>...</div> #2", () => {
  var parser = new Parser(new Tokenizer(new Lexer("<div><h1 /></div>")));
  expect(parser.parse()).toBeTruthy();
  expect(parser.root()).toEqual(["#root", null, ["div", null, ["h1", null]]]);
});

test("parse <div>...</div> #3", () => {
  var parser = new Parser(
    new Tokenizer(new Lexer("<div><h1 /><p /><p /></div>"))
  );
  expect(parser.parse()).toBeTruthy();
  expect(parser.root()).toEqual([
    "#root",
    null,
    ["div", null, ["h1", null], ["p", null], ["p", null]]
  ]);
});

test("parse <div>...</div> #4", () => {
  var parser = new Parser(
    new Tokenizer(new Lexer("<div><h1>hello world</h1></div>"))
  );
  expect(parser.parse()).toBeTruthy();
  expect(parser.root()).toEqual([
    "#root",
    null,
    ["div", null, ["h1", null, "hello world"]]
  ]);
});

test("parse <div>...</div> #5", () => {
  var parser = new Parser(
    new Tokenizer(
      new Lexer(
        "<div><h1>How can I use goto in Javascript?</h1><p>ECMAScript has no goto statement.</p></div>"
      )
    )
  );
  expect(parser.parse()).toBeTruthy();
  expect(parser.root()).toEqual([
    "#root",
    null,
    [
      "div",
      null,
      ["h1", null, "How can I use goto in Javascript?"],
      ["p", null, "ECMAScript has no goto statement."]
    ]
  ]);
});

test('parse <a href="about:blank" />', () => {
  var parser = new Parser(new Tokenizer(new Lexer('<a href="about:blank" />')));
  expect(parser.parse()).toBeTruthy();
  expect(parser.root()).toEqual([
    "#root",
    null,
    ["a", { href: "about:blank" }]
  ]);
});

test("parse <a href='about:blank' />", () => {
  var parser = new Parser(new Tokenizer(new Lexer("<a href='about:blank' />")));
  expect(parser.parse()).toBeTruthy();
  expect(parser.root()).toEqual([
    "#root",
    null,
    ["a", { href: "about:blank" }]
  ]);
});
