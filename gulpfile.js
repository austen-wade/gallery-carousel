var gulp = require("gulp");
var browserSync = require("browser-sync");
var csso = require("gulp-csso");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");

gulp.task("sass", function() {
  return (
    gulp
      .src("src/styles.scss")
      .pipe(sass.sync().on("error", sass.logError))
      .pipe(autoprefixer())
      // .pipe(csso())
      .pipe(gulp.dest("dest"))
      .pipe(browserSync.reload({ stream: true }))
  );
});

gulp.task("js", function() {
  return gulp.src("src/index.js").pipe(gulp.dest("dest"));
});

gulp.task("html", function() {
  gulp.src(["src/index.html"]).pipe(gulp.dest("dest"));
});

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "./dest/"
    }
  });
});

gulp.task("bs-reload", function() {
  browserSync.reload();
});

gulp.task("compile-all", ["sass", "html"]);

gulp.task("default", ["html", "sass", "js", "browser-sync"], function() {
  gulp.watch("src/**/*.scss", ["sass"]);
  gulp.watch("src/**/*.html", ["html", "bs-reload"]);
  gulp.watch("src/**/*.js", ["js", "bs-reload"]);
});
