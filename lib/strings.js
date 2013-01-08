/*!
 * redis-mock
 * (c) 2012 Kristian Faeldt <faeldt_kristian@cyberagent.co.jp>
 */

/**
* Module dependencies
*/
var item = require("./item.js");

/**
 * Set
 */
exports.set = function (mockInstance, key, value, callback) {
    mockInstance.storage[key] = new item(1);
    mockInstance.storage[key].data = value;

    if (callback) {
        process.nextTick(function () {
            callback(null, "OK");
        });
    }
}

/**
 * Setex
 */
exports.setex = function (mockInstance, key, seconds, value, callback) {
    mockInstance.storage[key] = new item(1);
    mockInstance.storage[key].data = value;
    mockInstance.storage[key].expires = seconds;

    mockInstance._toggleExpireCheck(true);

    if (callback) {
        process.nextTick(function () {
            callback(null, "OK");
        });
    }
}

/**
 * Get
 */
exports.get = function (mockInstance, key, callback) {
    var value = null;

    if (mockInstance.storage[key] && mockInstance.storage[key].type == 1) {
        value = mockInstance.storage[key].data;
    }

    if (callback) {
        process.nextTick(function () {
            callback(null, value);
        });
    }
}

