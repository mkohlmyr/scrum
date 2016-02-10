"use strict";

import child_process from "child_process";

export function stdin(g) {
    const sh = child_process.spawn("sh");
    for (let line of g()) {
        sh.stdin.write(line);
    } return sh.stdin.end();
}

export function terminal(command, parameters, cwd) {
    child_process.spawn(command, parameters, {cwd: cwd, stdio: "inherit"});
}