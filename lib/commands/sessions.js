"use strict";

const procs = require("../utils/procs");
const printing = require("../utils/printing");

module.exports = function (cli) {
    cli.route(/^sessions$/, function () {
        procs.exec(`screen -ls`, function (stdout) {
            if (stdout[0] && (stdout[0].indexOf("There is a screen on:") > -1 || stdout.indexOf("There are screens on:") > -1)) {
                const pattern = /([0-9]{1,6})\.([^\s]+).*([0-9]{2}\/[0-9]{2}\/[0-9]{2}) ([0-9]{2}\:[0-9]{2}\:[0-9]{2})/;
                const sessions = [];
                stdout.forEach(function (line) {
                    const matches = line.match(pattern);
                    if (matches && matches.length === 5) {
                        sessions.push({
                            "pid": matches[1],
                            "name": matches[2],
                            "date": matches[3],
                            "time": matches[4]
                        });
                    }
                });
                if (sessions.length) {
                    return printing.normal.apply(
                        printing,
                        [
                            "Active GNU Screen sessions",
                            sessions.map(function (sess) {
                                return `${sess.pid}.${printing.highlight(sess.name)} ${sess.date} ${sess.time}`
                            })
                        ]
                    );
                }
            }

            printing.normal(
                "No active GNU Screen sessions",
                `GNU Screen did not return any active sessions for ${printing.highlight("screen -ls")}`
            );
        });
    });
}
