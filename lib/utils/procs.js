"use strict";

const child_process = require("child_process");

function stdin(writer) {
    const sh = child_process.spawn("sh");
    writer(sh.stdin, function () {
        sh.stdin.end();
    });
}

function exec(command, callback) {
    child_process.exec(command, function (error, stdout, stderr) {
        callback(stdout.split(/\r?\n/));
    });
}

function terminal(command, parameters, cwd) {
    return child_process.spawn(command, parameters, {"cwd": cwd, "stdio": "inherit"});
}

module.exports = {
    "exec": exec,
    "stdin": stdin,
    "terminal": terminal
};
