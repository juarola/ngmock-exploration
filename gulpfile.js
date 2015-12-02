// enables gulp
// var gulp = require('gulp');
var gulp = require('gulp-help')(require('gulp'));

// command line args for gulp
var args = require('yargs').argv;

// prefix with ./ to look for local file instead of node package
// you can skip the extension ("js")
// n.b. execute the returned function to get access to configured values
var config = require('./gulp.config')();

var browserSync = require('browser-sync');

// autoloading gulp-plugins, removed the need
// for separate requires. use $.nameOfThePluginWithoutGulpDash
var $ = require('gulp-load-plugins')({
    lazy: true
});

var port = process.env.PORT || config.defaultPort;


/* TASKS */

// gulp.task('help', function () {
// 
// });
// 
// gulp.task('default', ['help']);


gulp.task('serve-dev', function() {
    serve(true);
});



/* FUNCTIONS */


function serve(isDev) {

    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('restart', function(ev) {
            log('nodemon restarted ' + ev);

            setTimeout(function() {
                browserSync.notify('realoading browsersync');
                browserSync.reload({
                    stream: false
                });
            }, config.browserReloadDelay);
        })
        .on('start', function() {
            log('nodemon started');
            startBrowserSync(isDev);
        })
        .on('crash', function() {
            log('nodemon crash');
        })
        .on('exit', function() {
            log('nodemon exit');
        });
}


function startBrowserSync(isDev) {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('starting browsersync on port ' + port);

    if (isDev) {
        gulp.watch(config.less, ['less2css'])
            .on('change', function(ev) {
                changeEvent(ev);
            });

        gulp.watch(config.jsxFiles, ['jsx'])
            .on('change', function(ev) {
                changeEvent(ev);
            });
            
        gulp.watch(config.specs)
            .on('change', function(ev) {
                changeEvent(ev);
            });
    } else {
        gulp.watch([config.less, config.jsfiles], ['optimize', browserSync.reload])
            .on('change', function(ev) {
                changeEvent(ev);
            });
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.client + '/**/*.*',
            '!' + config.less,
            '!' + config.jsxFiles,
            config.temp + '/*.js',
            config.temp + '/*.css',
            '**/*.spec.js',
            'src/*.js'
        ] : [],
        ghostMode: {
            clicks: true,
            scroll: true,
            location: true,
            forms: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'testing-123',
        notify: true,
        reloadDelay: 0
    };

    browserSync(options);
}


function changeEvent(ev) {
    var regex = '/.*(?=/' + config.source;
    log('File ' + ev.path + ' ' + ev.type);
    log('File ' + ev.path.replace(regex, '') + ' ' + ev.type);
}

// logs string and object messages
function log(message) {
    if (typeof(message) === 'object') {
        for (var item in message) {
            if (message.hasOwnProperty(item)) {
                $.util.log($.util.colors.cyan(message[item]));
            }
        }
    }
    if (typeof(message) === 'string') {
        $.util.log($.util.colors.cyan(message));
    }
}
