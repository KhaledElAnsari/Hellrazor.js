var Hellrazor = (function () {
  this.createError = function(name, message) {



    
    if(!name) {
      throw new Error("name: is not defined");
    }
    else if(typeof name != "string") {
      throw new Error("name: is not of type String");
    }

    if(!message) {
      throw new Error("message: is not defined");
    }
    else if(typeof message != "string") {
      throw new Error("message: is not of type String");
    }

    function customError(msg) {
      var tmp = Error.call(this); // temporary Object from the Error Object

      if(msg) {
        if(typeof msg != "string") {
          throw new Error("message: is not of type String");
        }
      }

      if(Object.defineProperties) {
        Object.defineProperties(this, {
          "stack": {
            value: tmp.stack
          },
          "name": {
            value: name
          },
          "message": {
            value: (msg || message)
          }
        });
      }
      else {
        this.name = name;
        this.message = msg || message;
      }
    }

    if(Object.create) {
      customError.prototype = Object.create(Error.prototype);
    }
    else {
      customError.prototype = new Error();
    }
    customError.prototype.constructor = customError;

    return customError;
  };

  return this;
}());
