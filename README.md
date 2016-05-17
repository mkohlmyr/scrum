# scrum
 - [GNU Screen](http://www.gnu.org/software/screen/manual/screen.html)
 - [NPM scrum](https://www.npmjs.com/package/scrum)

What is scrum?
------
Scrum is an interface for GNU Screen which enables the use of JSON files (a "scrumfile") to configure groups of services or commands to run together in a single GNU Screen session. A potential use-case would be if you are developing for a microservices architecture and need to different services together as a group.

Scrumfile
------
When scrum executes it will look for scrumfiles (`scrumfile.json`) under `~/` and the current directory. You can also specify any json file to use with the flag `--scrumfile ../../myscrumfile.json`. Scrumfiles adhere to a very simple structure.
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

Dynamic flags
------
When a group is started by scrum, all the commands to be executed for it will be compiled and rendered as handlebars templates with a context that contains two variables `opt` and `env`.

If you run `scrum start my-serfices -f true` `{{opt.f}}` will be replaced by `true` and can be used in the commands that will execute. Under `env` you have access to the username (`env.user`), home directory (`env.home`), working directory (`env.pwd`), terminal name (`env.term`), shell name (`env.shell`), platform (`env.platform`) and process id (`env.pid`) as provided by the [Node.js process API](https://nodejs.org/api/process.html). To correctly start the session we defined in the above example scrumfile, we would run `scrum start session_1 -n somevalue -w othervalue`.

