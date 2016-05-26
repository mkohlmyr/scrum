"use strict";

const path = require("path");
const fs = require("fs");

function get(pth, file) {
    if (pth && file) {
        const scrumfp = path.join(pth, file);
        try {
            return fs.accessSync(scrumfp, fs.R_OK) || require(scrumfp);
        } catch (e) {
        }
    }
    return null;
}

function all(env, opt) {
    let argvpath = null, argvfile = null;
    if (opt.scrumfile) {
        argvpath = path.dirname(opt.scrumfile);
        argvfile = path.basename(opt.scrumfile);
    }
    return {
        "global": get("~/", "scrumfile.json"),
        "local": get(env.pwd, "scrumfile.json"),
        "argv": get(argvpath, argvfile)
    }
}

function session(session, scrumfiles) {
    if (scrumfiles.argv && scrumfiles.argv[session]) {
        return scrumfiles.argv[session];
    }

    if (scrumfiles.local && scrumfiles.local[session]) {
        return scrumfiles.local[session]
    }

    if (scrumfiles.global && scrumfiles.global[session]) {
        return scrumfiles.global[session];
    }

    return null;
}

module.exports = {
    "get": get,
    "all": all,
    "session": session
};
