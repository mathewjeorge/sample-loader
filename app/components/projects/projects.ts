/// <reference path="../../../typings/index.d.ts" />

import {httpService} from "../../services/httpService";
import IScope = angular.IScope;
import IRootScopeService = angular.IRootScopeService;
import ITimeoutService = angular.ITimeoutService;
import {LoaderConfig} from "../../directives/loader/loaderComp";
export class projects implements ng.IComponentOptions {
    static componentName = 'projects';

    bindings: any;
    templateUrl: string;
    controller: any;

    constructor() {
        this.templateUrl = 'js/components/projects/projects.html';
        this.controller = projectsController;
        this.bindings = {};
    }
}

class projectsController {
    static $inject = ['httpService', '$rootScope', '$timeout'];

    loaderConfig: LoaderConfig = {
        message: 'Loading...',
        container: 'projects_cont',
    };

    constructor(public _httpService: httpService, public rootScope: IRootScopeService, public timeout: ITimeoutService) {
    }

    go() {
        this.rootScope.$broadcast('loader:open', this.loaderConfig);
        this._httpService.get('http://localhost:4000/itwillfail', {})
            .then((response: any) => {
                console.log(response);
                this.timeout(() => {
                    this.rootScope.$broadcast('loader:close', this.loaderConfig);
                }, 3000);
            })
            .catch((response: any) => {
                console.log(response);
                this.timeout(() => {
                    this.rootScope.$broadcast('loader:close', this.loaderConfig);
                }, 3000);
            });
    }
}
