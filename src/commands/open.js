"use strict";

import { terminal } from "../procs.js";

export function register(cli) {
    cli.route(/^open ([a-z-]+)/, function (session_name) {
        terminal("screen", ["-x", session_name], cli.args.env.cwd);
    })
}