'use strict';

var osgi = require('./osgi.js');
var path = require('path');
var replacer = require('./replacer');

var frontendTmpSrcDir = osgi.frontendTmpSrcDir();
var soyDir = osgi.soyDir();
var soyJSDir = osgi.soyJSDir();

var modules = [];

var auiNodePath = path.resolve() + '/node_modules/alloy-ui/build';
var liferayMock = path.resolve() + '/node_modules/liferay-forms-alloy-config';

var preprocessors = {};

preprocessors['/**/*.js'] = ['replacer'];
preprocessors[liferayMock + '/mocks/*.js'] = ['replacer'];
preprocessors['src/testFrontend/*.js'] = ['commonjs'];

module.exports = {
	addModule: function(dependency) {

		modules.push(osgi.moduleResourcesPath(dependency.modulePath) + dependency.pattern);

		modules.push(
			{
				included: false,
				pattern: osgi.moduleResourcesPath(dependency.modulePath) + dependency.excludePattern
			}
		);

		preprocessors[osgi.moduleResourcesPath(dependency.modulePath) + '/**/!(*.soy).js'] = ['coverage'];
	},

	includeAUIFiles: function() {
		var auiFiles = [];
		var types = ['js', 'css', 'png'];

		for (var key in types) {
			auiFiles.push(
				{
					included: false,
					pattern: auiNodePath + '/**/*.' + types[key]
				}
			);
		}

		return auiFiles;
	},

	setConfig: function(config) {
		config.set(
			{
				browserDisconnectTimeout: 5000,
				browsers: ['Chrome'],
				files: this.files.concat(this.includeAUIFiles()).concat(modules),
				frameworks: ['chai', 'commonjs', 'mocha', 'sinon'],
				preprocessors: preprocessors,
				replacerPreprocessor: {
					replacer: replacer.replaceModulePath
				},
				reporters: ['mocha', 'progress']
			}
		);
	},

	setConfigCoverage: function(config) {
		config.set(
			{
				browsers: ['Chrome'],
				coverageReporter: {
					dir: path.resolve('build/coverage'),
					reporters: [
						{
							type: 'html'
						},
						{
							subdir: 'lcov',
							type: 'lcov'
						},
						{
							type: 'text-summary'
						}
					]
				},
				files: this.files.concat(this.includeAUIFiles()).concat(modules),
				frameworks: ['chai', 'commonjs', 'mocha', 'sinon'],
				preprocessors: preprocessors,
				replacerPreprocessor: {
					replacer: replacer.replaceModulePath
				},
				reporters: ['coverage', 'progress', 'threshold'],
				thresholdReporter: {
					branches: 80,
					functions: 80,
					lines: 80,
					statements: 80
				}
			}
		);
	},

	files: [
		auiNodePath + '/aui/aui.js',
		frontendTmpSrcDir + '/loader/loader.js',
		liferayMock + '/mocks/*.js',
		soyJSDir + '/config.js',
		soyDir + '/classes/META-INF/resources/soyutils.js'
	]
};