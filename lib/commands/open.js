"use strict";

const procs = require("../utils/procs");

module.exports = function (cli) {
    cli.route(/^open ([a-z-]+)$/, function (slug) {
        procs.terminal("screen", ["-x", slug], cli.argv.env.cwd);
    });
}
