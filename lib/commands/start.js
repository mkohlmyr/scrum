"use strict";

const handlebars = require("handlebars");
const procs = require("../utils/procs");
const scrumfile = require("../utils/scrumfile");
const printing = require("../utils/printing");

module.exports = function (cli) {
    cli.route(/^start ([a-z-]+)$/, function (slug) {
        procs.stdin(function (stdin, done) {
            const context = cli.getTemplateContext();
            const session = scrumfile.session(slug, cli.scrumfiles);

            if (!session) {
                printing.error(
                    "GNU Screen session failed to start",
                    `No session named ${printing.highlight(slug)} could be found in the active scrumfiles`
                );
                done();
            } else {
                stdin.write(`screen -dmS ${slug}\n`);

                for (let title in session) {
                    const to_run = handlebars.compile(session[title])(context);
                    stdin.write(`screen -S ${slug} -X screen -t \"${title}\" sh -c \"${to_run}\"\n`);
                }

                stdin.write(`screen -S ${slug} -p 0 -X stuff \"exit\\n\"`);
                printing.normal(
                    "GNU Screen session started",
                    `Run ${printing.highlight("scrum open " + slug)} to attach to the session`,
                    `Detach at any time by pressing ${printing.highlight("ctrl+a")} followed by ${printing.highlight("d")}`
                );
                done();
            }
        });
    });
}
