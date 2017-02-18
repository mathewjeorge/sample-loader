/// <reference path="../../../typings/index.d.ts" />

import {httpService} from "../../services/httpService";
import IScope = angular.IScope;
import IRootScopeService = angular.IRootScopeService;
import ITimeoutService = angular.ITimeoutService;
import {LoaderServiceScope} from "../../services/loaderService";
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

    navigationLinks: String[];

    loaderConfig: LoaderServiceScope = <LoaderServiceScope>{
        color: '#65f442',
        size: '30',
        strokeWidth: '3',
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
                }, 2000);
            })
            .catch((response: any) => {
                console.log(response);
                this.timeout(() => {
                    this.navigationLinks = ["Dashboard", "Shortcuts", "Overview", "Events", "About", "Services", "Contact"];
                    this.rootScope.$broadcast('loader:close', this.loaderConfig);
                }, 2000);
            });
    }
}
