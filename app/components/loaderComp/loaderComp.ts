/// <reference path="../../../typings/index.d.ts" />

import IScope = angular.IScope;
export class loaderComp implements ng.IComponentOptions {
    static componentName = 'loaderComp';

    bindings: any;
    controller: any;
    templateUrl: string;

    constructor() {
        this.templateUrl = 'js/components/loaderComp/loaderComp.html';
        this.controller = loaderController;
    }
}

class loaderController {
    static $inject = ['$scope'];

    show: boolean;

    constructor(private scope: IScope) {
        this.hideLoader();

        this.scope.$on('showLoader', () => {
            this.showLoader();
        });

        this.scope.$on('hideLoader', () => {
            this.hideLoader();
        });
    }

    showLoader() {
        //console.log('showing loader');
        this.show = true;
    }

    hideLoader() {
        //console.log('hiding loader');
        this.show = false;
    }
}
