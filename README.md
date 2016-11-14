# Hellrazor.js

Create custom errors for your JavaScript projects

# Installation

1- in browser:
```html
<script src="/js/hellrazor.min.js"></script>
```
2- via NPM:
```
npm install hellrazor
```

# Usage
You'll use `createError()` method to create an error, it takes two strings as parameters for `Error Name` & `Error Message` and will return the new error `Function`

```javascript
// if you have commonjs in your project
// if not skip this line
var Hellrazor = require("hellrazor");

// The below is the same in any JavaScript environment (Browser or Node.js)
var e = Hellrazor.createError("erropac", "use hellrazor 'cause Chrome can't always be your savior");

try {
  // you can re-assign the message if you want
  throw new e("newMsg");
}
catch (err) {
  console.log(err.name); // erropac
  console.log(err.message); // use hellrazor 'cause Chrome can't always be your savior
  console.log(err.stack);
  console.log(err instanceof Error); // true
  console.log(err instanceof e); // true
}
```

### Extra

You can extra objects to the custom error using `prototype`, for example the time when the error occurred

```javascript
var e = Hellrazor.createError("errorName","errorMsg");
try {
  e.prototype.happenAt = new Date();
  throw new e();
}
catch (err) {
  console.log(e.happenAt);
}
```

# License
This project is under the MIT license.
