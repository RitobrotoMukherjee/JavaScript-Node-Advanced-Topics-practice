/**
 * Write a function that returns another function with having access to
 * the outser function's scope(Lexical scoping).
 * 
 * Witll also write a higher order function that takes a function as an argument
 * and returns a new function. 
 * 
 * As functions can be passed as arguments in JavaScript, they are called first-class citizens.
 * A function that takes another function as an argument or returns a function is called a higher-order function.
 * 
 * Example of closures and higher order functions:
 */

function validator() {
    throw new Error("Initial value must be provided");
}

const IncrementorAndDecrementor = function(initialValue = validator()) {
    let data = initialValue;

    const incrementor = function() {
        data += 1;
        return data;
    }

    const decrementor = function() {
        data -= 1;
        return data;
    }

    return {
        incrementor,
        decrementor
    };
}

const counter = IncrementorAndDecrementor(55);
console.log(counter.incrementor());
console.log(counter.incrementor());
console.log(counter.decrementor());
