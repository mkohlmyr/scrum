"use strict";

const minimist = require("minimist");

function get() {
    const min = minimist(process.argv.slice(2));
    const cmd = min._.join(" ");
    delete min._;
    return {
        "cmd": cmd,
        "opt": min,
        "env": {
            "user": process.env.USER,
            "home": process.env.HOME,
            "pwd": process.env.PWD,
            "term": process.env.TERM,
            "shell": process.env.SHELL,
            "platform": process.platform,
            "pid": process.pid
        }
    }
}

module.exports = {
    "get": get
};
