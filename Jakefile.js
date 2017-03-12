// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/* globals jake: false, desc: false, task: false, complete: false, fail: false */

(function() {
	"use strict";
  var jshint = require("simplebuild-jshint");
	var karma = require("simplebuild-karma")
	var KARMA_CONFIG = "karma.conf.js"

	/**
	 * General purpose tasks
	 */
	desc("Default build");
	task("default", ["version", "lint", "test"], function() {
		console.log("\n\nBUILD OK");
	});

	desc("Run a localhost server");
	task("run", function() {
		console.log("Run http-server here")
		jake.exec("node node_modules/.bin/http-server src")
	})

	desc("Start the Karma server (run this first)");
	task("karma", function() {
		console.log('Starting karma server: ')
		karma.start({
			configFile: KARMA_CONFIG
		}, complete, fail)
	}, { async: true });

	/**
	 * Supporting tasks
	 */
  desc("Check Node version");
  var packageJson = require("./package.json");
  var expectedNodeVersion = 'v' + packageJson.engines.node;
  task("version", function() {
		console.log("Checking Node version: .");
    var actualVersion = process.version;
    if (actualVersion !== expectedNodeVersion)
      fail("Incorrect Node version: expected " + expectedNodeVersion + " but was " + actualVersion)
	});

	desc("Run tests");

	task("test", function() {
			console.log("Testing javascript:")
			karma.run({
				configFile: KARMA_CONFIG,
				expectedBrowsers: [
					"Firefox 51.0.0 (Ubuntu 0.0.0)",
					"Chrome 56.0.2924 (Linux 0.0.0)"
				],
				strict: !process.env.loose
			}, complete, fail)
	}, {async: true})

  desc("Lint the code");
  task("lint", function() {
    console.log('Linting Javascript: .');
    jshint.checkFiles({
      files: [
				"Jakefile.js",
				"src/**/*.js"
			],
    	options: {
      	asi: true,
				freeze: true,
				futurehostile: true,
				latedef: "nofunc",
				noarg: true,
				nocomma: true,
				nonew: true,
				strict: true,
				undef: true,
				node: true,
				browser: true
    	},
			globals: {
				describe: false,
				it: false,
				before: false,
				after: false,
				beforeEach: false,
				afterEach: false
			}
    }, complete, fail);
  }, {async: true});
}());
