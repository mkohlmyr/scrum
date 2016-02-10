"use strict";

import { stdin } from "../procs.js";

export function register(cli) {
    cli.route(/^stop ([a-z-]+)$/, function (session_name) {
        stdin(function* () {
            yield `screen -S ${session_name} -X quit`;
        });
    });
}