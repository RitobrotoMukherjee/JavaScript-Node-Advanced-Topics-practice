const object = {
    name: "Ritobroto",
    lname: "Mukherjee",
    greeting: function(msg) {
        console.log(`${msg}, ${this.name}!`);
    }
}

// Polyfill for Function.prototype.bind

const helloWName = function (message) {
    console.log(`${message}, ${this.name} ${this.lname}!`);
}

const boundHello = helloWName.bind(object, "Hello");
boundHello(); // Hello, Ritobroto Mukherjee!

Function.prototype.myBind = function(context, ...args) {
    const self = this;
    return function() {
        return self.apply(context, args);
    }
}

const myBoundHello = helloWName.myBind(object, "Hi");
myBoundHello(); // Hi, Ritobroto Mukherjee!

// Polyfill for Function.prototype.call
const greet = function(type, punctuation) {
    console.log(`${type}: ${this.name}${punctuation}`);
}

greet.call(object, "\nIn built call", "!"); // In built call: Ritobroto!

Function.prototype.myCall = function(context, ...args) {
    context = context || globalThis; // Fallback to global object if context is null/undefined
    const uniqueSym = Symbol(); // Create a unique property to avoid overwriting
    context[uniqueSym] = this;  // Assign the function to the context object
    // console.log("\nUsing myCall Polyfill:", context);
    const result = context[uniqueSym](...args); // Invoke the function
    delete context[uniqueSym]; // Clean up as we added a temporary property
    return result;
}

greet.myCall(object, "Polyfill Call:", "."); // Polyfill Call: Ritobroto!