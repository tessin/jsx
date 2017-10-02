"use strict";

var Lexer = require("./Lexer");
var Tokenizer = require("./Tokenizer");

test("tokenize <p />", () => {
  var tokenizer = new Tokenizer(new Lexer("<p />"));

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("<");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("ident");
  expect(tokenizer.val).toBe("p");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("/");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe(">");

  expect(tokenizer.next()).toBeFalsy();
});

test("tokenize <div></div>", () => {
  var tokenizer = new Tokenizer(new Lexer("<div></div>"));

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("<");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("ident");
  expect(tokenizer.val).toBe("div");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe(">");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("<");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("/");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("ident");
  expect(tokenizer.val).toBe("div");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe(">");

  expect(tokenizer.next()).toBeFalsy();
});

test("tokenize <div>hello world</div>", () => {
  var tokenizer = new Tokenizer(new Lexer("<div>hello world</div>"));

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("<");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("ident");
  expect(tokenizer.val).toBe("div");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe(">");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("text");
  expect(tokenizer.val).toBe("hello world");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("<");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("/");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("ident");
  expect(tokenizer.val).toBe("div");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe(">");

  expect(tokenizer.next()).toBeFalsy();
});

test("tokenize <div>hello world</div>", () => {
  var tokenizer = new Tokenizer(
    new Lexer("<span className='class' title=\"title\" />")
  );

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("<");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("ident");
  expect(tokenizer.val).toBe("span");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("ident");
  expect(tokenizer.val).toBe("className");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("=");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("string");
  expect(tokenizer.val).toBe("'class'");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("ident");
  expect(tokenizer.val).toBe("title");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("=");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("string");
  expect(tokenizer.val).toBe('"title"');

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe("/");

  expect(tokenizer.next()).toBeTruthy();
  expect(tokenizer.tok).toBe(">");

  expect(tokenizer.next()).toBeFalsy();
});
