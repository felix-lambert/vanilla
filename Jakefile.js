// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/* globals jake: false, desc: false, task: false, complete: false, fail: false */

(function() {
	"use strict";
  var jshint = require("simplebuild-jshint");

	/**
	 * General purpose tasks
	 */
	desc("Default build");
	task("default", ["version", "lint"], function() {
		console.log("\n\nBUILD OK");
	});

	desc("Run a localhost server");
	task("run", function() {
		console.log("Run http-server here")
		jake.exec("node node_modules/.bin/http-server src")
	})

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

  desc("Lint the code");
  task("lint", function() {
    console.log('Linting Javascript: .');
    jshint.checkFiles({
      files: ["Jakefile.js", "src/**/*.js"],
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
    	}
    }, complete, fail);
  }, {async: true});
}());
