/// <reference path="../typings/index.d.ts" />

angular.module('test.app', ['routes.app'])
    .config(function ($logProvider, $compileProvider, environmentalConfig) {

        $logProvider.debugEnabled(environmentalConfig.logDebug);
        $compileProvider.debugInfoEnabled(environmentalConfig.compileDebug);

    });

require('./components');
require('./services');