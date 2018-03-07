// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass        = require('gulp-sass');
var compass     = require('gulp-compass');
var minifycss   = require('gulp-clean-css');
var sourcemaps  = require('gulp-sourcemaps');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');

var paths = {
  resourceSass   : 'resource/sass', //  pasta resource são os arquivos a serem processados
  resourceJs     : 'resource/scripts',
  resourceFonts  : 'resource/fonts',
  resourceVendor : 'node_modules/',
  assetsCss      : 'assets/css', //  pasta assets são os arquivos gerados
  assetsJs       : 'assets/js',
  assetsFonts    : 'assets/fonts',
};

var fileNames = {
  css : {
    'main'    : 'main.css',
    'vendor'  : 'vendors.css',
  },

  js  : {
    'main'    : 'main.js',
    'vendor'  : 'vendors.js',
  }
};

var resourceFiles = {
  sass    : paths.resourceSass + '/**/*.scss',
  // sass  : [paths.resourceSass + 'main.scss'],
  scripts : paths.resourceJs + '**/*.js',
  vendors : {
        js : [
             paths.resourceVendor + 'jquery/dist/jquery.js',
             //paths.resourceVendor + 'bootstrap/dist/js/bootstrap.js',
             paths.resourceVendor + 'materialize-css/dist/js/materialize.js',
             paths.resourceVendor + 'slick-carousel/slick/slick.js',
        ],
        css : [
            paths.resourceSass + 'vendors.scss'
        ],
        fonts: [
            paths.resourceFonts + '/*',
            //paths.resourceVendor + 'materialize-css/dist/fonts/roboto/*',
            //paths.resourceVendor + 'bootstrap-sass/assets/fonts/bootstrap/*',
        ]
    },
    watch : {
        js : paths.resourceJs + '**/*.js',
        sass : paths.resourceSass + '**/*.scss',
    }
}

gulp.task('sass', function () {
  return gulp.src(resourceFiles.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.assetsCss));
});

// Minify JS
gulp.task('scripts', function() {
    return gulp.src(resourceFiles.scripts)
        .pipe(concat(fileNames.js.main))
        .pipe(uglify())
        .pipe(gulp.dest(paths.assetsJs));
});

// Concatenate CSS e JS vendors
gulp.task('vendors:sass', function() {
    return gulp.src(resourceFiles.vendors.css)
        .pipe(minifycss())
        .pipe(gulp.dest(paths.assetsCss));
});

gulp.task('vendors:js', function() {
    return gulp.src(resourceFiles.vendors.js)
        .pipe(concat(fileNames.js.vendor))
        .pipe(uglify())
        .pipe(gulp.dest(paths.assetsJs));
});

gulp.task('fonts', function() {
    gulp.src(resourceFiles.vendors.fonts)
        .pipe(gulp.dest(paths.assetsFonts));
 });

gulp.task('sass:watch', function () {
  gulp.watch('resource/sass/**/*.scss', ['sass']);
});

gulp.task('default', [
  'sass', 
  'vendors:sass', 
  'scripts', 
  'vendors:js', 
  'fonts'
  ]
);