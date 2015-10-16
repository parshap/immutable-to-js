"use strict";

var Immutable = require("immutable");

module.exports = function toJS(value) {
  if (Immutable.Iterable.isIterable(value)) {
    return value.toJS();
  }
  else {
    return value;
  }
};
