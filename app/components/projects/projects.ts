/// <reference path="../../../typings/index.d.ts" />

import {httpService} from "../../services/httpService";
import IScope = angular.IScope;
import IRootScopeService = angular.IRootScopeService;
import ITimeoutService = angular.ITimeoutService;
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
    inProgress: Boolean = true;
    loaderConfig: Object = {"color": "#4286f4", "size": "40"}; // Laoder config

    constructor(public _httpService: httpService, public rootScope: IRootScopeService, public timeout: ITimeoutService) {
    }

    go() {
        // this.rootScope.$broadcast('showLoader');
        this._httpService.get('http://localhost:4000/itwillfail', {})
            .then((response: any) => {
                console.log(response);
                this.timeout(() => {
                    this.inProgress = false;
                    // this.rootScope.$broadcast('hideLoader');
                }, 3000);
            })
            .catch((response: any) => {
                console.log(response);
                this.timeout(() => {
                    this.inProgress = false;
                    // this.rootScope.$broadcast('hideLoader');
                }, 3000);
            });
    }
}
