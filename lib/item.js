/*!
 * redis-mock
 * (c) 2012 Kristian Faeldt <faeldt_kristian@cyberagent.co.jp>
 */

/**
 * Constructor
 */
var RedisItem = function (type) {
    // types:
    // - hash: 0
    // - string: 1
    this.type = type||0;
    this.expires = -1;
    this.data = {};
}

/**
 * Export the constructor
 */



module.exports = exports = RedisItem;