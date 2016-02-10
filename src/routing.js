"use strict";

import { Arguments } from "./arguments.js"; 

export class Route {
    constructor(template, actionfn) {
        this.template = template;
        this.actionfn = actionfn;
        this.cache = undefined;
    }
    
    accepts(path) {
        this.cache = path.match(this.template);
        if (this.cache) {
            return true;
        } return false;
    }
    
    follow() {
        return this.actionfn.apply(undefined, Array.prototype.slice.call(this.cache, 1));
    }
}

export class Map {
    constructor() {
        this.store = [];
        this.cache = undefined;
    }
    
    route(template, actionfn) {
        this.store.push(new Route(template, actionfn));
        return this;
    }
    
    accepts(path) {
        this.cache = undefined;
        return this.store.some((route) => {
            return route.accepts(path) && (this.cache = route);
        });
    }
}

export class CommandLineInterface extends Map {
    constructor(commands) {
        super();
        
        commands.forEach((register) => {
            register(this);
        });
    }
    
    main() {
        this.args = new Arguments(process.argv);
        if (this.accepts(this.args.command)) {
            this.cache.follow();
        }
    }
}