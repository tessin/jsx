"use strict";

var render = require("./index");
var React = require("react");
var ReactDOMServer = require("react-dom/server");

test("jsx", () => {
  var el = render(React, "<div/>", {});
  expect(el).toEqual(expect.objectContaining({ type: "div" }));
});

function Component() {
  return "Component!";
}

test("jsx with Component", () => {
  var el = render(React, "<Component/>", { Component });
  expect(el).toEqual(expect.objectContaining({ type: Component }));
});

test("jsx with Component (renderToStaticMarkup)", () => {
  var el = render(React, "<Component/>", { Component });
  expect(ReactDOMServer.renderToStaticMarkup(el)).toEqual("Component!");
});

// test("parse jsx Hello World! (renderToStaticMarkup)", () => {
//   var el = parse(React, "<div><h1>Hello World!</h1></div>", {});
//   expect(el).toEqual(
//     expect.objectContaining({ type: "div", children: { type: "h1" } })
//   );
// });

test("jsx Hello World! (renderToStaticMarkup)", () => {
  var el = render(React, "<div><h1>Hello World!</h1></div>", {});
  expect(ReactDOMServer.renderToStaticMarkup(el)).toEqual(
    "<div><h1>Hello World!</h1></div>"
  );
});

test("jsx unordered list (renderToStaticMarkup)", () => {
  var el = render(
    React,
    "<ul><li>list item 1</li><li>list item 2</li><li>list item 3</li></ul>",
    {}
  );
  expect(ReactDOMServer.renderToStaticMarkup(el)).toEqual(
    "<ul><li>list item 1</li><li>list item 2</li><li>list item 3</li></ul>"
  );
});
