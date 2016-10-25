'use strict';

var karmaReplacerPreprocessor = require('karma-replacer-preprocessor');
var path = require('path');

var alloyPath = path.resolve() + '/node_modules/alloy-ui/build';
var configPath = path.resolve() + '/node_modules/liferay-karma-alloy-config';

var baseFiles = [
	{
		included: true,
		pattern: alloyPath + '/aui/aui.js',
	},
	{
		included: false,
		pattern: alloyPath + '/**/*.js'
	},
	{
		included: false,
		pattern: alloyPath + '/**/*.css'
	},
	{
		included: false,
		pattern: alloyPath + '/**/*.png'
	},
	configPath + '/mocks/*.js'
];

module.exports = function(config) {
	var plugins = config.plugins || [];

	config.set(
		{
			files: baseFiles.concat(config.files || []),
			plugins: plugins.concat([karmaReplacerPreprocessor])
		}
	);
};