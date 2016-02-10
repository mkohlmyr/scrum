"use strict";

import gulp from "gulp";
import babel from "gulp-babel";
import gutil from "gulp-util";

gulp.task("babel", () => {
    let s = gulp.src("./src/**/*.js");
    s = s.pipe(babel());
    s = s.on("error", gutil.log);
    s = s.pipe(gulp.dest("./dist"));
    s = s.on("error", gutil.log);
    return s;
});

gulp.task("watch", () => {
    gulp.watch("./src/**/*.js", {"debounceDelay": 512}, ["babel"]);
});

gulp.task("default", ["babel", "watch"]);
