"use strict";

function Lexer(txt) {
  this.txt = txt;
  this.idx = 0;
  this.idy = 0;
  this.val = 0;
  this.load(); // initialize
}

Lexer.prototype.load = function() {
  if (this.idx < this.txt.length) {
    this.val = this.txt.charCodeAt(this.idx);
  } else {
    this.val = 0;
  }
};

Lexer.prototype.read = function() {
  this.idx = this.idx + 1;
};

Lexer.prototype.discard = function() {
  this.idy = this.idx;
};

Lexer.prototype.length = function() {
  return this.idx - this.idy;
};

Lexer.prototype.yield = function() {
  var tok = this.txt.substr(this.idy, this.length());
  this.discard();
  return tok;
};

Lexer.prototype.accept = function(val) {
  if (this.val === val) {
    this.read();
    this.load();
    return true;
  }
  return false;
};

Lexer.prototype.expect = function(val) {
  if (!this.accept(val)) {
    throw new Error("expected " + String.fromCharCode(val));
  }
};

Lexer.prototype.acceptBetween = function(a, b) {
  var val = this.val;
  if (a <= val && val <= b) {
    this.read();
    this.load();
    return true;
  }
  return false;
};

Lexer.prototype.acceptWhiteSpace = function() {
  var val = this.val;
  if (val === 9 || val === 10 || val === 13 || val === 32) {
    this.read();
    this.load();
    return true;
  }
  return false;
};

Lexer.prototype.not = function(val) {
  if (this.val !== 0 && this.val !== val) {
    this.read();
    this.load();
    return true;
  }
  return false;
};

Lexer.default = Lexer;

module.exports = Lexer;
