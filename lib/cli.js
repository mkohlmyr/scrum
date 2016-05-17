"use strict";

const argv = require("./utils/argv");
const routing = require("./utils/routing");
const printing = require("./utils/printing");
const scrumfile = require("./utils/scrumfile");

class CommandLineInterface extends routing.Router {
    constructor(commands) {
        super();

        this.argv = argv.get();
        this.scrumfiles = scrumfile.all(this.argv.env, this.argv.opt);

        commands.forEach((register) => {
            register(this);
        });
    }

    getTemplateContext() {
        return {
            "env": this.argv.env,
            "opt": this.argv.opt
        }
    }

    static main(commands) {
        const cli = new CommandLineInterface(commands);

        if (cli.accepts(cli.argv.cmd)) {
            cli.follow();
        } else {
            printing.error(
                "Invalid command",
                `The string ${printing.highlight(cli.argv.cmd)} does not match any known command`
            );
        }
        return cli;
    }
}

module.exports = {
    "main": CommandLineInterface.main
};
