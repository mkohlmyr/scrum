"use strict";

import minimist from "minimist";
import fs from "fs";
import path from "path";

export function getEnvironment() {
    return {
        "user": process.env.USER,
        "home": process.env.HOME,
        "pwd": process.env.PWD,
        "term": process.env.TERM,
        "shell": process.env.SHELL,
        "platform": process.platform,
        "pid": process.pid
    };
}

export function getArguments() {
    const min = minimist(process.argv.slice(2));
    const command = min._.join(" ");
    delete min._;
    return {
        opts: min,
        command: command
    }
}

export function getScrumfile(explicit) {
    const actual = explicit || path.join(process.cwd(), "scrumfile.json");
    const file = fs.readFileSync(actual, "utf8");
    return JSON.parse(file);
}

export class Arguments {
    constructor() {
        const args = getArguments();
        
        this.command = args.command;
        this.opts = args.opts;
        
        this.scrumfile = getScrumfile(this.opts.scrumfile);
        this.env = getEnvironment();
    }
    
    getContext() {
        return {env: this.env, arg: this.opts};
    }
}