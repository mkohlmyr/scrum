"use strict";

const pkg = require("../../package.json");
const latest = require("npm-latest");
const semver = require("semver");
const printing = require("../utils/printing");

module.exports = function register(cli) {
    cli.route(/^version$/, function () {
        const pkgver = printing.highlight(pkg.version);
        return printing.normal(
            "Version information",
            `${pkgver}`
        );
    });

    cli.route(/^version latest$/, function () {
        latest("scrum", {"timeout": 3000}, function (err, npm) {
            if (err) {
                if (err.message) {
                    err = err.toString();
                }
                const latest = printing.highlight("npm-latest");
                const error = JSON.stringify(err)
                return printing.error(
                    "Failed to find latest version",
                    `Query by ${latest} returned ${error}`
                );
            } else if (semver.gt(npm.version, pkg.version)) {
                const command = printing.highlight("npm update -g scrum");
                const npmver = printing.highlight(npm.version);
                const pkgver = printing.highlight(pkg.version);
                return printing.attention(
                    "A new version is available",
                    `Run ${command} to update from ${pkgver} to ${npmver}`
                );
            } else {
                const pkgver = printing.highlight(pkg.version);
                const npmver = printing.highlight(npm.version);
                return printing.normal(
                    "Version information",
                    `${pkgver} (you)`,
                    `${npmver} (npm)`
                );
            }
        });
    });
}
