/*
 * grunt-svn-fetch
 * https://github.com/jones/svn-fetch
 *
 * Copyright (c) 2013 Stephen Jones
 * Licensed under the MIT license.
 */

'use strict';

var nPath = require('path');
var async = require('async');

module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-exec');

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('svn_fetch', 'Updates or checks out the desired files', function () {
		var exec = require('child_process').exec;
		// Get the task options, with the config defaults
		var options = this.options(grunt.config.get('svn_options'));
		var map = this.data.map;
		var fullCmd = "";
		var done = this.async();

		function getCmd(path) {
			var command = options.bin;
			var fullPath = nPath.join(options.path, path);
			if (grunt.file.exists(fullPath + '/.svn')) {
				command = [ command, 'update', fullPath ].join(' ');
			} else {
				command = [ command, 'checkout', options.repository + map[path], fullPath ].join(' ');
			}
			for (var key in options.svnOptions) {
				command += ' --' + key + "='" + options.svnOptions[key] +"'";
			}
			return command;
		}

		if (map !== undefined) {
			Object.keys(map).forEach(function (item, index) {
				fullCmd += getCmd(item);
				fullCmd = Object.keys(map).length - 1 !== index ? fullCmd + " && " : fullCmd;
			});
			var execOptions = {
				cmd: fullCmd,
				callback: done
			};
			grunt.config("exec.svn", execOptions);
			grunt.task.run("exec:svn");
		} else {
			grunt.log.error('\n\'map\' missing.');
			done(false);
		}
	});
};
