"use strict";

const procs = require("../utils/procs");
const printing = require("../utils/printing");

module.exports = function (cli) {
    cli.route(/^stop ([a-z-]+)$/, function (slug) {
        procs.exec(`screen -S ${slug} -X quit`, function (stdout) {
            if (stdout[0] && stdout[0].indexOf("No screen session found.") > -1) {
                printing.normal(
                    "Session not found",
                    `GNU Screen does not appear to be running a session named ${printing.highlight(slug)}`
                );
            } else {
                printing.normal(
                    "GNU Screen session stopping",
                    `Ran ${printing.highlight("-X quit")} against ${printing.highlight(slug)}`
                );
            }
        });
    });
}
