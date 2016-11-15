var Hellrazor = (function () {
  this.createError = function(name, message) {
    console.log(typeof name != "string");
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
      if(msg) {
        if(typeof msg != "string") {
          throw new Error("message: is not of type String");
        }
      }

      this.name = name;
      this.message = msg || message;
    }
    customError.prototype = new Error();

    return customError;
  };

  return this;
}());
