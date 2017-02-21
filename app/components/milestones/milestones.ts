/// <reference path="../../../typings/index.d.ts" />

import {httpService} from "../../services/httpService";
import IScope = angular.IScope;
import IRootScopeService = angular.IRootScopeService;
import ITimeoutService = angular.ITimeoutService;
import {LoaderConfig} from "../../directives/loader/loaderComp";
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

    loaderConfig: LoaderConfig = {
        color: '#f45942',
        size: '60',
        strokeWidth: '5',
        container: 'milestone_cont',
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
                }, 5000);
            })
            .catch((response: any) => {
                console.log(response);
                this.timeout(() => {
                    this.rootScope.$broadcast('loader:close', this.loaderConfig);
                }, 5000);
            });
    }

    goBody() {
        this.rootScope.$broadcast('loader:open');
        this._httpService.get('http://localhost:4000/itwillfail', {})
            .then((response: any) => {
                console.log(response);
                this.timeout(() => {
                    this.rootScope.$broadcast('loader:close');
                }, 5000);
            })
            .catch((response: any) => {
                console.log(response);
                this.timeout(() => {
                    this.rootScope.$broadcast('loader:close');
                }, 5000);
            });
    }
}
