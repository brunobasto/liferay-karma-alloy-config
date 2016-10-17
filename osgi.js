'use strict';

var path = require('path');

module.exports = {
	appsDir: function() {
		return path.resolve(this.portalDir(), 'modules', 'apps');
	},

	frontendDir: function() {
		return path.join(this.portalDir(), 'modules', 'apps', 'foundation', 'frontend-js', 'frontend-js-web');
	},

	frontendTmpSrcDir: function() {
		return path.join(this.frontendDir(), 'tmp', 'META-INF', 'resources');
	},

	modulePath: function(bundleName) {
		return path.resolve(this.appsDir(), 'forms-and-workflow', '*', bundleName);
	},

	moduleResourcesPath: function(bundleName) {
		return path.resolve(this.resourcesPath(this.modulePath(bundleName)));
	},

	portalDir: function() {
		return path.resolve().substr(0, path.resolve().indexOf('/modules'));
	},

	resourcesClassesPath: function(bundleDir) {
		return path.resolve(bundleDir, 'classes', 'META-INF', 'resources');
	},

	resourcesPath: function(bundleDir) {
		return path.resolve(bundleDir, 'src', 'main', 'resources', 'META-INF', 'resources');
	},

	soyDir: function() {
		return path.join(this.portalDir(), 'modules', 'apps', 'foundation', 'frontend-js', 'frontend-js-soyutils-web');
	},

	soyJSDir: function() {
		return path.join(this.resourcesClassesPath(this.soyDir()));
	}
};