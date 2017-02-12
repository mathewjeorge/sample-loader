/// <reference path="../../../typings/index.d.ts" />

import IScope = angular.IScope;

export class loader implements ng.IDirective {
    /*
    * This static method is needed to return instance
    */
    static instance() : ng.IDirective {
        return new loader;
    }
    restrict = 'A';
    templateUrl = 'js/directives/loader/loader.html';
    // replace = true;
    controllerAs = "$ctrl";
    controller = loaderController;
    scope = {
        "inProgress": "="
    };

    constructor() {
    }

    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
    }
}

class loaderController {
    static $inject = ['$scope'];

    show: boolean = false;
    name: String = "Jay Shah";

    constructor(private scope: IScope) {
        this.hideLoader();

        this.scope.$watch("inProgress", (n: Boolean) => {
            if(n === true) {
                this.showLoader();
            } else {
                this.hideLoader();
            }
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
