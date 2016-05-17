#!/usr/bin/node --harmony
"use strict";

const cli = require("../lib/cli");
const commands = require("../lib/commands/index");

cli.main(commands);
