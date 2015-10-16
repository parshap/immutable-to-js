# immutable-to-js

Function to convert an [*immutable-js*][immutable] value to a regular
JavaScript value. If the given value is not an *immutable-js* value, it
is simply returned.

[immutable]: http://facebook.github.io/immutable-js/

## Use Case

When using `Immutable.fromJS(value)` on arbitrary values a
*non-immutable* value can be returned (e.g., `Immutable.fromJS(5)
=== 5`). To then convert the value back to a regular js object, we have
to first make sure the value *is* an immutable value and then call
`.toJS()` on it. This module provides a static `toJS(value)` function
that performs the necessary type checking to guarantee the return value
is a regular js object.

```js
var value = Immutable.fromJS(someValue); // May result in immutable, may not
var unwrapped = toJS(value); // Guarantee value is not immutable
```

## Example

```js
var toJS = require("immutable-to-js");
var Immutable = require("immutable");

toJS(Immutable.Map({ foo: 1 })); // -> { foo: 1 }
toJS(Immutable.fromJS([1, 2, 3])); // -> [1, 2, 3]
toJS("hello"); // -> "hello"
toJS(5); // -> 5
```

## API

```js
var toJS = require("immutable-to-js");
```

### `toJS(value)`

Convert `value` to a regular js value. If `value` is not an
*immutable-js* value, it is simply returned.
