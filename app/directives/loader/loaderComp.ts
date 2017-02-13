/// <reference path="../../../typings/index.d.ts" />

import IScope = angular.IScope;

interface LoaderAttrs extends ng.IAttributes {
    size: String;
    color: String;
    strokeWidth: String;
}

export class loader implements ng.IDirective {
    
    constructor($compile: ng.ICompileService) {
        this._$compile = $compile;
    }

    public static Factory() {
        var directive = ($compile: ng.ICompileService) =>
        {
            return new loader($compile);
        };

        directive['$inject'] = ['$compile'];

        return directive;
    }

    private _$compile : ng.ICompileService;
    private loaderDefaultColor: String = "#0057e7";
    private loaderSize: String = "50";
    private loaderStrokeWidth: String = "2";

    restrict = 'A';
    // templateUrl = 'js/directives/loader/loader.html';
    // replace = true;
    controllerAs = "$ctrl";
    controller = loaderController;
    scope = {
        "inProgress": "="
    };

    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: LoaderAttrs) => {
        let size = attrs.size ? attrs.size : this.loaderSize;
        let color = attrs.color ? attrs.color : this.loaderDefaultColor;
        let strokeWidth = attrs.strokeWidth ? attrs.strokeWidth : this.loaderStrokeWidth;
        var html = '<div class="showbox" ng-show="$ctrl.show"><div class="loader" style="width: '+ size +'px"><svg class="circular" viewBox="25 25 50 50"><circle class="path" style="stroke: '+ color +'" cx="50" cy="50" r="20" fill="none" stroke-width="'+ strokeWidth +'" stroke-miterlimit="10"/></svg></div></div>';
        element.append(html);
        this._$compile(element.contents())(scope);
    }
}

class loaderController {
    static $inject = ['$scope'];

    show: boolean = false;
    name: String = "Jay Shah";

    constructor(private scope: IScope, element: ng.IAugmentedJQuery) {
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
