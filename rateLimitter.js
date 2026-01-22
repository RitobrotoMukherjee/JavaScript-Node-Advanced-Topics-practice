function RateLimitter(fn, ...args) {

    let lastCalled = 0;
    return function(delay) {
        const currentTime = Date.now();
        if(currentTime - lastCalled >= delay) {
            fn.apply(this, args);
            lastCalled = currentTime;
            return;

        }
        console.error(`\nCannot call this function till next: ${Math.abs((currentTime - lastCalled)/1000).toFixed(2)} Sec.\n`);
    }

}



const limitedFunction = RateLimitter(function(message) {
    
    console.log(`Function called with message: ${message} at ${new Date().toLocaleTimeString()}`);

}, "Hello, Rate Limitter!");



// Testing the RateLimitter

limitedFunction(2000); // Should execute

setTimeout(() => limitedFunction(2000), 1000); // Should not execute

setTimeout(() => limitedFunction(2000), 2500); // Should execute

// Test with `this context
console.log("\nTesting with 'this' context:\n");

const object = {
    name: "Ritobroto",
    greeting: function(msg) {
        console.log(`${msg}, ${this.name}!`);
    }
}

object.greetRateLimited = RateLimitter(object.greeting, "Hey");
object.greetRateLimited(3000); // Should execute
