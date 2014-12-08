/*
 * grunt-svn-fetch
 * https://github.com/jones/svn-fetch
 *
 * Copyright (c) 2013 Stephen Jones
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('svn_tag', 'Tag your project at the desired revision', function () {
        var exec = require('child_process').exec;
        // Get the task options, with the config defaults
        var options = this.options(grunt.config.get('svn_options'));
        var done = this.async();
        var map = this.data.map;
        var async = require('async');

        function tag(revision, src, callback) {
            var command = options.bin;
            var fullRepo = options.repository + src + '/trunk';
            var dest = options.repository + src + "/tags/" + options.version;
            fullRepo += revision === "trunk" ? "" : "@" + revision;
            command = [ command, 'copy', fullRepo, dest, "-m", "'"+options.message+"'" ].join(' ');
            for (var key in options.svnOptions) {
                command += ' --' + key + "='" + options.svnOptions[key] +"'";
            }
            grunt.log.write('Tagging ' + fullRepo + '\n');
            exec(command, options.execOptions, function (error, stdout) {
                grunt.log.write(stdout);
                if (error !== null) {
                    grunt.log.error('\n#' + command + "\n" + error);
                }
                callback();
            });
        }

        if (map !== undefined) {
            var funcs = [];
            for (var key in map) {
                funcs.push(tag.bind(this, map[key], key));
            }
            async.series(funcs, function (err, result) {
                done();
            });
        } else {
            grunt.log.error('\n\'map\' missing.');
            done(true);
        }
    });
};
