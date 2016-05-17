"use strict";

const version = require("./version");
const start = require("./start");
const open = require("./open");
const stop = require("./stop");

module.exports = [
    version,
    start,
    open,
    stop
];
