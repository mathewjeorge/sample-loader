/// <reference path="../../../typings/index.d.ts" />

import IScope = angular.IScope;

/** Loader Possible Attrbutes Interface */
interface LoaderScope extends ng.IScope {
    size?: string; // size of loader in pixles
    color?: string; // default loader color
    strokeWidth?: string; // width of loader path
    loaderImage?: string; // Custom image for custom loader
    loaderImageAlt?: string; // Alt text for loader image
    loaderClass?: string; // Used for custom loader class - Required if specified custom image
    fallbackImage?: string; // Fall back which image to use in case of provided image fails
}

export class loader implements ng.IDirective {

    /** Loader Constructor */
    constructor($compile: ng.ICompileService) {
        this._$compile = $compile;
    }

    /** Loader Factory for initiating for loader instance */
    public static Factory() {
        var directive = ($compile: ng.ICompileService) => {
            return new loader($compile);
        };

        directive['$inject'] = ['$compile']; // Add compile service as a dependency

        return directive;
    }

    private _$compile: ng.ICompileService;
    private loaderDefaultColor: string = "#0057e7"; // Default loader color
    private loaderSize: string = "50"; // Default loader size
    private loaderStrokeWidth: string = "2"; // Default loader line width

    restrict = 'A';
    controllerAs = "$ctrl";
    controller = loaderController;
    scope = {
        "inProgress": "=",
        "size": "@",
        "color": "@",
        "strokeWidth": "@",
        "loaderImage": "@",
        "loaderImageAlt": "@",
        "loaderClass": "@",
        "fallbackImage": "@"
    };

    link = (scope: LoaderScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {

        /** Set loader settings */
        let size = scope.size ? scope.size : this.loaderSize;
        let color = scope.color ? scope.color : this.loaderDefaultColor;
        let strokeWidth = scope.strokeWidth ? scope.strokeWidth : this.loaderStrokeWidth;
        let html: any;

        /** If specified loader image the prepare html accordingly else assig default loader */
        if (scope.loaderImage) {
            if (!scope.loaderClass) {
                throw new Error("Loader class is required when specifying custom loader image."); // Throw exception if not provided loader class when using custom image
            } else {
                html = `<div class="${scope.loaderClass}" ng-show="$ctrl.show">
                            <img src="${scope.loaderImage}" alt="${scope.loaderImageAlt ? scope.loaderImageAlt : ''}" onerror="this.src='${scope.fallbackImage ? scope.fallbackImage : ''}'">
                        </div>`;
            }
        } else {
            html = `
                <div class="showbox" ng-show="$ctrl.show">
                    <div class="loader" style="width: ${size}px">
                        <svg class="circular" viewBox="25 25 50 50">
                            <circle class="path" style="stroke: ${color}" cx="50" cy="50" r="20" fill="none" stroke-width="${strokeWidth}" stroke-miterlimit="10"/>
                        </svg>
                    </div>
                </div>`;
        }
        element.append(html);
        this._$compile(element.contents())(scope);
    }
}

/** Loader controller */
class loaderController {
    static $inject = ['$scope'];

    show: boolean = false;

    constructor(private scope: IScope) {
        this.showLoader();

        // Keep watch on controller flag. If true then show loader else hide loader
        /*this.scope.$watch("inProgress", (n: Boolean) => {
         if (n === true) {
         this.showLoader();
         } else {
         this.hideLoader();
         }
         });*/
    }

    showLoader() {
        this.show = true;
    }

    hideLoader() {
        this.show = false;
    }
}
