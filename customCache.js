/**
 * Custom URL Cache using Closure and Higher Order Function concepts.
 * The outer function `CustomURLCache` creates a private `cacheMap` object.
 * The inner function returned has access to this `cacheMap` due to lexical scoping (closure).
 * Each time the inner function is called with a URL, it checks if the URL is already cached.
 * If it is, it returns the cached value; otherwise, it adds the URL to the cache.
 */

const CustomURLCache = function () {
    const cacheMap = {};

    return function(url = null) {
        if(url && cacheMap[url]) {
            console.log(`\nServing ${url} from Cache`);
            return cacheMap[url];
        }
        console.log(`\nSetting ${url} into Cache`);
        cacheMap[url] = true;

        return false;
    }
}

const urlCache = CustomURLCache();
console.log(urlCache("https://example.com/resource1")); // Setting into Cache - false
console.log(urlCache("https://google.com/search")); // Setting into Cache - false
console.log(urlCache("https://google.com/search")); // Serving from Cache - true
