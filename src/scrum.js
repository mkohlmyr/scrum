#!/usr/bin/env node

"use strict";

require("babel-polyfill");

import { CommandLineInterface } from "./routing.js";

import { register as start } from "./commands/start.js";
import { register as open } from "./commands/open.js";
import { register as stop } from "./commands/stop.js";

const commands = [
    start,
    open,
    stop
];

const cli = new CommandLineInterface(commands);

cli.main();