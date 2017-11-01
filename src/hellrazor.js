var Hellrazor = (function () {
  this.createError = function(name, defaultMsg) {
    if(!name || typeof name !== "string") {
      throw new Error("Please define a valid error name of type string");
    }

    if(!defaultMsg || typeof defaultMsg !== "string") {
      throw new Error("Please define a valid default message of type string");
    }

    function customError(msg) {
      var tmp = Error.call(this); // temporary Object from the Error Object

      if(msg && typeof msg !== "string") {
        throw new Error("message: is not of type String");
      }
      
      if(Object.defineProperties) {
        Object.defineProperties(this, {
          stack: {
            value: tmp.stack
          },
          name: {
            value: name
          },
          message: {
            value: (msg || defaultMsg)
          }
        });
      } else {
        this.name = name;
        this.message = msg || defaultMsg;
      }
    }

    if(Object.create) {
      customError.prototype = Object.create(Error.prototype);
    } else {
      customError.prototype = new Error();
    }
    customError.prototype.constructor = customError;

    return customError;
  };

  return this;
} ());