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

    grunt.registerMultiTask('svn_config', 'Set the connexion vars', function () {
        var options = this.options({
            bin:         'svn',
            repository:  '',
            path:        '',
            execOptions: {},
            svnOptions: {}
        });

        grunt.config.set("svn_options", options);
    });
};
