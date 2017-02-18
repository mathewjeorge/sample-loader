/// <reference path="../typings/index.d.ts" />

import {loaderService} from "./services/loaderService";
angular.module('management.app', ['routes.app'])
    .config(function ($logProvider, $compileProvider, environmentalConfig) {

        $logProvider.debugEnabled(environmentalConfig.logDebug);
        $compileProvider.debugInfoEnabled(environmentalConfig.compileDebug);

    })
    .run((loaderService: loaderService) => {
        loaderService.listen();
    });

require('./components');
require('./services');
require('./directives');