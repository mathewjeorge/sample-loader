/// <reference path="../typings/index.d.ts" />

angular.module('management.app', ['routes.app'])
    .config(function ($logProvider, $compileProvider, environmentalConfig) {

        $logProvider.debugEnabled(environmentalConfig.logDebug);
        $compileProvider.debugInfoEnabled(environmentalConfig.compileDebug);

    })
    .run(() => {

    });

require('./components');
require('./services');
require('./directives');