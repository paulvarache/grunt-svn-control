/*
 * grunt-svn-fetch
 * https://github.com/jones/svn-fetch
 *
 * Copyright (c) 2013 Stephen Jones
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Configuration to be run (and then tested).
    svn_config: {
      options: {
          repository: "svn://localhost/",
          path: ".tmp/"
      }
    },

    svn_fetch: {
        test: {
            map: {
                "vedif.servo.dataviz": "vedif.servo.dataviz/trunk"
            }
        }
    },

    svn_tag: {
        options: {
            version: "0.4.0",
            message: "Version 0.4.0"
        },
        test: {
            map: {
                "vedif.servo.dataviz": "1"
            }
        }
    },

    clean: {
        test: ['.tmp']
    }


  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');


    grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean:test', 'svn_config:test', 'svn_fetch:test', 'svn_tag:test']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
