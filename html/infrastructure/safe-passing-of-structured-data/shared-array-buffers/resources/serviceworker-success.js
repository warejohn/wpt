"use strict";
self.importScripts("/resources/testharness.js");

let state = "start in worker";

self.onmessage = e => {
  if (e.data === "start in window") {
    assert_equals(state, "start in worker");
    e.source.postMessage(state);
    state = "we are going to send a messageerror";
  } else if (e.data === "we are expecting a messageerror")  {
    assert_equals(state, "we are going to send a messageerror");
    e.source.postMessage(new SharedArrayBuffer());
    state = "done in worker";
  } else {
    e.source.postMessage(`worker onmessage was reached when in state "${state}" and data ${e.data}`);
  }
};