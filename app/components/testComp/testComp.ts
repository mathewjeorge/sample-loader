/// <reference path="../../../typings/index.d.ts" />

import {httpService} from "../../services/httpService";
import IScope = angular.IScope;
import IRootScopeService = angular.IRootScopeService;
import ITimeoutService = angular.ITimeoutService;
export class testComp implements ng.IComponentOptions {
    static componentName = 'testComp';

    bindings: any;
    templateUrl: string;
    controller: any;

    constructor() {
        this.templateUrl = 'js/components/testComp/testComp.html';
        this.controller = testController;
        this.bindings = {};
    }
}

class testController {
    static $inject = ['httpService', '$rootScope', '$timeout'];

    constructor(public _httpService: httpService, public rootScope: IRootScopeService, public timeout: ITimeoutService) {
    }

    go() {
        this.rootScope.$broadcast('showLoader');

        this._httpService.get('http://localhost:4000/itwillfail', {})
            .then((response: any) => {
                console.log(response);
                this.timeout(() => {
                    this.rootScope.$broadcast('hideLoader');
                }, 3000);
            })
            .catch((response: any) => {
                console.log(response);
                this.timeout(() => {
                    this.rootScope.$broadcast('hideLoader');
                }, 3000);
            });
    }
}
