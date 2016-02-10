"use strict";

import handlebars from "handlebars";

import { stdin } from "../procs.js";

export function register(cli) {
    cli.route(/^start ([a-z-]+)$/, function (session_name) {
        stdin(function* () {
            const session = cli.args.scrumfile.sessions[session_name];
            const context = cli.args.getContext();
            
            yield `screen -dmS ${session_name}\n`;
            
            let index = 0;
            for (index; index < session.windows.length; index++) {
                const w = session.windows[index];
                const hb_render_execs = handlebars.compile(w.execs);
                const execs = hb_render_execs(context);
                
                yield `screen -S ${session_name} -x screen -t "${w.title}" sh -c ${execs}\n`;
            }
        });
    });
}