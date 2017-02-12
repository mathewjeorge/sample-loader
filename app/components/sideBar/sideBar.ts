/// <reference path="../../../typings/index.d.ts" />

import {httpService} from "../../services/httpService";
import IScope = angular.IScope;
import IRootScopeService = angular.IRootScopeService;
import ITimeoutService = angular.ITimeoutService;
export class sideBar implements ng.IComponentOptions {
    static componentName = 'sideBar';

    bindings: any;
    templateUrl: string;
    controller: any;

    constructor() {
        this.templateUrl = 'js/components/sidebar/sidebar.html';
        this.controller = sidebarController;
        this.bindings = {};
    }
}

class sidebarController {
    static $inject = ['httpService', '$rootScope', '$timeout'];
    inProgress: Boolean = true;
    navigationLinks: String[];

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
                }, 1000);
            })
            .catch((response: any) => {
                console.log(response);
                this.timeout(() => {
                    this.navigationLinks = ["Dashboard", "Shortcuts", "Overview", "Events", "About", "Services", "Contact"];
                    this.inProgress = false;
                    // this.rootScope.$broadcast('hideLoader');
                }, 1000);
            });
    }
}
