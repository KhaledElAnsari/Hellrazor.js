var Hellrazor = function() {
    this.createError = function(name, message) {
        if (!name) {
            throw new Error("name: is not defined");
        } else if (name.constructor !== String) {
            throw new Error("name: is not of type String");
        }
        if (!message) {
            throw new Error("message: is not defined");
        } else if (message.constructor !== String) {
            throw new Error("message: is not of type String");
        }
        function customError(msg) {
            if (msg) {
                if (msg.constructor !== String) {
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
}();
