"use strict";

class Route {
    constructor(pattern, action) {
        this.pattern = pattern;
        this.action = action;
        this.cache = null;
    }

    accepts(string) {
        this.cache = string.match(this.pattern);
        if (this.cache) {
            return true;
        } return false;
    }

    follow() {
        return this.action.apply(null, Array.prototype.slice.call(this.cache, 1));
    }
}

class Router {
    constructor() {
        this.store = [];
        this.cache = null;
    }

    route(pattern, action) {
        this.store.push(new Route(pattern, action));
        return this;
    }

    accepts(string) {
        this.cache = null;
        return this.store.some((route) => {
            return route.accepts(string) && (this.cache = route);
        });
    }

    follow() {
        if (this.cache) {
            return this.cache.follow();
        } return null;
    }
}

module.exports = {
    "Route": Route,
    "Router": Router
};
