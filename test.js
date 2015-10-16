"use strict";

Error.stackTraceLimit = Infinity;

var toJS = require("./");
var test = require("tape");
var Immutable = require("immutable");

var PRIMITIVES = [
  undefined,
  null,
  true,
  false,
  -1,
  -0,
  0,
  1,
  1000000000000000000000000000000000000,
  3.14,
  Infinity,
  Math.PI,
  "",
  "foo",
];

var OBJECTS = [
  {},
  {
    foo: 1,
  },
  {
    foo: 1,
    bar: {
      foo: "baz",
    },
  },
  new Object(),
];

var ARRAYS = [
  [],
  [1, 2, 3],
  [[1], 2],
  [{}],
  [ { foo: 1 }, [5] ],
];

var OTHERS = [
  new Date(),
  new Error("foo"),
  /regex/,
  new RegExp("foo"),
];

var ITERABLES = [].concat(
  ARRAYS,
  OBJECTS
);

var ALL = [].concat(
  PRIMITIVES,
  ARRAYS,
  OBJECTS,
  OTHERS
);

test("immutable-to-js", function(t) {
  // Immutable.fromJS
  ALL.forEach(function(val) {
    t.deepEqual(toJS(Immutable.fromJS(val)), val);
    t.strictEqual(toJS(val), val);
  });

  // List
  ARRAYS.forEach(function(val) {
    t.deepEqual(toJS(Immutable.fromJS(val)), val);
    t.strictEqual(toJS(val), val);
  });

  // Map
  OBJECTS.forEach(function(val) {
    t.deepEqual(toJS(Immutable.Map(val)), val);
    t.strictEqual(toJS(val), val);
  });

  // OrderedMap
  OBJECTS.forEach(function(val) {
    t.deepEqual(toJS(Immutable.OrderedMap(val)), val);
  });

  // Set
  ARRAYS.forEach(function(val) {
    t.deepEqual(toJS(Immutable.Set(val)), val);
  });

  // OrderedSet
  ARRAYS.forEach(function(val) {
    t.deepEqual(toJS(Immutable.OrderedSet(val)), val);
  });

  // Stack
  ARRAYS.forEach(function(val) {
    t.deepEqual(toJS(Immutable.Stack(val)), val);
  });

  // Record
  OBJECTS.forEach(function(val) {
    var Record = new Immutable.Record(val);
    t.deepEqual(toJS(new Record()), val);
  });

  // Seq
  ITERABLES.forEach(function(val) {
    t.deepEqual(toJS(Immutable.Seq(val)), val);
  });

  // KeyedSeq
  OBJECTS.forEach(function(val) {
    t.deepEqual(toJS(Immutable.Seq.Keyed(val)), val);
  });

  // IndexedSeq
  ARRAYS.forEach(function(val) {
    t.deepEqual(toJS(Immutable.Seq.Indexed(val)), val);
  });

  // SetSeq
  ARRAYS.forEach(function(val) {
    t.deepEqual(toJS(Immutable.Seq.Set(val)), val);
  });

  // Iterable
  ITERABLES.forEach(function(val) {
    t.deepEqual(toJS(Immutable.Iterable(val)), val);
  });

  // KeyedIterable
  OBJECTS.forEach(function(val) {
    t.deepEqual(toJS(Immutable.Iterable.Keyed(val)), val);
  });

  // IndexedIterable
  ARRAYS.forEach(function(val) {
    t.deepEqual(toJS(Immutable.Iterable.Indexed(val)), val);
  });

  // SetIterable
  ARRAYS.forEach(function(val) {
    t.deepEqual(toJS(Immutable.Iterable.Set(val)), val);
  });

  // Range
  t.deepEqual(toJS(Immutable.Range(0, 3)), [0, 1, 2]);

  // Repeat
  t.deepEqual(toJS(Immutable.Repeat("foo", 2)), ["foo", "foo"]);

  // NaN
  t.equal(typeof toJS(NaN), "number");
  t.ok(toJS(NaN) !== toJS(NaN));

  t.end();
});
