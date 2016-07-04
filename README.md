# scrum

What is GNU Screen?
------
Screen is a essentially a terminal multiplexer. You can run multiple processes and access them all through one terminal. You can switch between processes easily and even detach entirely until you actually need to interact with the process.

What is scrum?
------
Scrum is a CLI proxy for GNU Screen which enables the use of JSON files (a "scrumfile") to configure groups of services or commands to run together in a single GNU Screen session. An example use-case would be if you are developing for a microservices architecture and need to run many different services at the same time.

Scrumfile
------
Scrumfiles can be provided in three ways and will be used in the following order of preference by the CLI.
1. A `.json` file provided with the flag `--scrumfile ../../myscrumfile.json`.
2. A file named `scrumfile.json` under the current directory in which scrum is being invoked.
3. A file named `scrumfile.json` under the `~/` directory.
Scrumfiles adhere to a very simple structure, making it easy to add new sessions and windows when needed. The following is an example of a scrumfile that defines a single session with two windows (processes).
```
{
    "session_1": {
        "Window A": "cd somedir; node somefile.js -n {{opt.n}}",
        "Window B": "cd otherdir; python somefile.python -w {{opt.w}} --user {{env.user}}"
    }
}
```

Available commands
------
 - `scrum start <session>`
 - `scrum open <session>`
 - `scrum stop <session>`
 - `scrum version`
 - `scrum version latest`
 - `scrum sessions`

Dynamic flags
------
When a group is started by scrum, all the commands to be executed for it will be compiled and rendered as handlebars templates with a context that contains two variables `opt` and `env`.

If you run `scrum start my-serfices -f true` `{{opt.f}}` will be replaced by `true` and can be used in the commands that will execute. Under `env` you have access to the username (`env.user`), home directory (`env.home`), working directory (`env.pwd`), terminal name (`env.term`), shell name (`env.shell`), platform (`env.platform`) and process id (`env.pid`) as provided by the [Node.js process API](https://nodejs.org/api/process.html). To correctly start the session we defined in the above example scrumfile, we would run `scrum start session_1 -n somevalue -w othervalue`.

Links
------
 - [NPM scrum](https://www.npmjs.com/package/scrum)
 - [GNU Screen Manual](http://www.gnu.org/software/screen/manual/screen.html)
 - [Gnu Screen Quick Reference](http://aperiodic.net/screen/quick_reference)
