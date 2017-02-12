/// <reference path="../../../typings/index.d.ts" />

import {httpService} from "../../services/httpService";
import IScope = angular.IScope;
import IRootScopeService = angular.IRootScopeService;
import ITimeoutService = angular.ITimeoutService;
export class milestones implements ng.IComponentOptions {
    static componentName = 'milestones';

    bindings: any;
    templateUrl: string;
    controller: any;

    constructor() {
        this.templateUrl = 'js/components/milestones/milestones.html';
        this.controller = milestonesController;
        this.bindings = {};
    }
}

class milestonesController {
    static $inject = ['httpService', '$rootScope', '$timeout'];
    inProgress: Boolean = true;

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
                }, 5000);
            })
            .catch((response: any) => {
                console.log(response);
                this.timeout(() => {
                    this.inProgress = false;
                    // this.rootScope.$broadcast('hideLoader');
                }, 5000);
            });
    }
}
