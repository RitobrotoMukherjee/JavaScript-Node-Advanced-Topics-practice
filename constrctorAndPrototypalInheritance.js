/**
 * File purpose:
 * Short guide and reference for constructor functions and prototypal inheritance in JavaScript.
 * Use this comment to remember intent, patterns, and common pitfalls when modifying or extending
 * the examples and tests in this file.
 *
 * Key ideas:
 * - Constructor function: regular function intended to be invoked with `new`. Inside its body,
 *   `this` becomes the newly created object and you assign instance (own) properties there.
 * - Prototype: functions have a `prototype` object. Methods placed on Constructor.prototype are
 *   shared by all instances, avoiding per-instance copies and saving memory.
 * - Prototype chain: when accessing a property, JS looks on the object itself, then its prototype,
 *   then the prototype's prototype, etc. This is how inheritance and method sharing work.
 *
 * Typical patterns:
 * - Define instance data inside the constructor:
 *     function Person(name) { this.name = name; }
 * - Define shared methods on the prototype:
 *     Person.prototype.greet = function() { return `Hi, I'm ${this.name}`; };
 * - Implement inheritance safely:
 *     Child.prototype = Object.create(Parent.prototype);
 *     Child.prototype.constructor = Child;
 *
 * ES6 note:
 * - `class` / `extends` provide clearer syntax but use the same prototypal model under the hood.
 *   Prefer `class` for readability unless you need explicit prototype manipulation.
 *
 * Best practices & gotchas:
 * - Do not define methods inside constructors (creates a new function per instance).
 * - Avoid mutable objects on the prototype (shared state across instances leads to bugs).
 * - Arrow functions are not suitable as constructors (no own `this` and cannot be called with `new`).
 * - When replacing a prototype object, restore the `constructor` property if callers rely on it.
 * - Prefer Object.create for setting prototypes instead of assigning `new Parent()` which calls Parent().
 *
 * Debugging tips:
 * - Use Object.getPrototypeOf(obj) and obj.hasOwnProperty(key) to distinguish own vs inherited properties.
 * - Use Object.getOwnPropertyNames(Constructor.prototype) to inspect prototype methods.
 * - Use `instanceof` to test prototype membership: obj instanceof Constructor.
 *
 * Short cheatsheet:
 * - Create: const x = new Constructor(args);
 * - Share method: Constructor.prototype.method = function() { ... };
 * - Inherit: Child.prototype = Object.create(Parent.prototype); Child.prototype.constructor = Child;
 *
 * This header should provide enough context for maintainers to understand the examples and
 * why certain patterns are used in the rest of this file.
 */

const Vehicle = function (make, model, started = false) {
    this.make = make;
    this.model = model;
    this.started = started;
}

Vehicle.prototype.start = function () {
    this.started = true;
    console.log(`Vehicle started: ${this.make} ${this.model}`);
}

Vehicle.prototype.isStarted = function () {
    return this.started;
}

Vehicle.prototype.run = function (runBy) {
    if (this.isStarted()) {
        console.log(`${this.make} ${this.model} is running by ${runBy}`);
    } else {
        console.log(`${this.make} ${this.model} is not started`);
    }
}

Vehicle.prototype.stop = function () {
    this.started = false;
    console.log(`Vehicle stopped: ${this.make} ${this.model}`);
}

const VIC = new Vehicle('Toyota', 'VIC');

console.log("Main Vehicle");

VIC.start();
VIC.run('Alice');

const Car = function(make, model) {
    Vehicle.call(this, make,model);
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

const CarObj = new Car('Ford', 'Mustang');

console.log("\n");
console.log(`After protype inheritance:`);
CarObj.start();
console.log("After Start:",CarObj.isStarted());
CarObj.run("Queen");

CarObj.stop();
console.log("After Stop:",CarObj.isStarted());
CarObj.run("Queen");

const CarWithDoors = function(make, model, doors) {
    Vehicle.apply(this, [make, model]);
    this.doors = doors;
}

CarWithDoors.prototype = Object.create(Car.prototype);
CarWithDoors.prototype.constructor = CarWithDoors;

console.log("\n");
console.log("Car With Doors Constructor:");
const CarWithDoors1 = new CarWithDoors('Honda', 'Civic', 4);
CarWithDoors1.start();
console.log(`Car doors: ${CarWithDoors1.doors}`);
console.log(`Car is started: ${CarWithDoors1.isStarted()}`);
CarWithDoors1.run('Santanu');

CarWithDoors1.stop();
console.log(`After Stop: ${CarWithDoors1.isStarted()}`);
CarWithDoors1.run('Santanu');
