/// <reference path="../../../typings/index.d.ts" />

import IScope = angular.IScope;

/** Loader config **/
export interface LoaderConfig {
    container?: string; // container of loader
    size?: string; // size of loader in pixles
    color?: string; // default loader color
    strokeWidth?: string; // width of loader path
    loaderImage?: string; // Custom image for custom loader
    loaderImageAlt?: string; // Alt text for loader image
    loaderClass?: string; // Used for custom loader class - Required if specified custom image
    fallbackImage?: string; // Fall back which image to use in case of provided image fails
    message?: string;
    messageClass?: string;
    cancelEvent?: Function;
    reloadEvent?: Function;
}

/** Loader Possible Attributes Interface */
interface LoaderScope extends ng.IScope, LoaderConfig {
    addLoader: Function;
}

export class loader implements ng.IDirective {

    /** Loader Constructor */
    constructor($compile: ng.ICompileService) {
        this._$compile = $compile;
    }

    /** Loader Factory for initiating for loader instance */
    public static Factory() {
        let directive = ($compile: ng.ICompileService) => {
            return new loader($compile);
        };

        directive['$inject'] = ['$compile']; // Add compile service as a dependency

        return directive;
    }

    private _$compile: ng.ICompileService;

    restrict = 'E';
    controllerAs = "$ctrl";
    controller = loaderController;
    scope = {
        "size": "@",
        "color": "@",
        "strokeWidth": "@",
        "loaderImage": "@",
        "loaderImageAlt": "@",
        "loaderClass": "@",
        "fallbackImage": "@",
        "message": "@",
        "messageClass": "@",
    };

    activeLoaders: string[] = [];
    activeLoadersCancelEvents: {} = {};
    activeLoadersReloadEvents: {} = {};
    config: LoaderConfig = {
        color: '#0057e7',
        size: '50',
        strokeWidth: '2',
        messageClass: 'loaderMessageCont',
    };

    link = (scope: LoaderScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        if (scope.color) this.config.color = scope.color;
        if (scope.size) this.config.size = scope.size;
        if (scope.strokeWidth) this.config.strokeWidth = scope.strokeWidth;
        if (scope.loaderImage) this.config.loaderImage = scope.loaderImage;
        if (scope.loaderImageAlt) this.config.loaderImageAlt = scope.loaderImageAlt;
        if (scope.loaderClass) this.config.loaderClass = scope.loaderClass;
        if (scope.fallbackImage) this.config.fallbackImage = scope.fallbackImage;
        if (scope.message) this.config.message = scope.message;
        if (scope.messageClass) this.config.messageClass = scope.messageClass;

        scope.addLoader = (payload: LoaderScope) => {
            let loaderEle, loaderId;
            let config: LoaderConfig = angular.extend(angular.extend({}, this.config), angular.extend({}, payload));

            if (config && config.container) {
                loaderEle = angular.element(document.getElementById(config.container));
                loaderId = 'loader_' + config.container;
            } else {
                loaderEle = angular.element(document.body);
                loaderId = 'loader_body';
            }

            if (this.activeLoaders.indexOf(loaderId) !== -1) {
                return false;
            }

            this.activeLoaders.push(loaderId);

            if (payload && payload.cancelEvent) {
                this.activeLoadersCancelEvents[loaderId] = payload.cancelEvent;
            }

            if (payload && payload.reloadEvent) {
                this.activeLoadersReloadEvents[loaderId] = payload.reloadEvent;
            }

            let html: any = '';

            if (config.loaderImage) { /** If specified loader image the prepare html accordingly else assig default loader */
                if (!config.loaderClass) {
                    throw new Error("Loader class is required when specifying custom loader image."); // Throw exception if not provided loader class when using custom image
                } else {
                    html += `<div class="${config.loaderClass}" id="${loaderId}">`;
                    html += '<div class="customCont">';
                    html += `<img src="${config.loaderImage}" alt="${config.loaderImageAlt ? config.loaderImageAlt : ''}" onerror="this.src='${config.fallbackImage ? config.fallbackImage : ''}'">`;

                    if (config.message) {
                        html += `<div class="${config.messageClass}">${config.message}</div>`;
                    }

                    html += '<div>';

                    if (payload && payload.cancelEvent) {
                        html += `<button type="button" class="btn btn-danger" ng-click="cancelEvent('${loaderId}')">Cancel</button>`;
                    }

                    if (payload && payload.reloadEvent) {
                        html += `<button type="button" class="btn btn-primary" ng-click="reloadEvent('${loaderId}')">Reload</button>`;
                    }

                    html += '</div>';
                    html += '</div>';
                    html += `</div>`;
                }
            } else {
                html += `
                <div class="showbox" id="${loaderId}">
                    <div class="loader" style="width: ${config.size}px">
                        <svg class="circular" viewBox="25 25 50 50">
                            <circle class="path" style="stroke: ${config.color}" cx="50" cy="50" r="20" fill="none" stroke-width="${config.strokeWidth}" stroke-miterlimit="10"/>
                        </svg>
                    </div>`;
                if (config.message) {
                    html += `<div class="${config.messageClass}">${config.message}</div>`;
                }

                html += '<div class="text-center">';

                if (payload && payload.cancelEvent) {
                    html += `<button type="button" class="btn btn-danger" ng-click="cancelEvent('${loaderId}')">Cancel</button>`;
                }

                html += '</div>';
                html += `</div>`;
            }

            loaderEle.append(this._$compile(html)(scope));
        };

        scope.$on('loader:open', (event, payload: LoaderScope) => {
            scope.addLoader(payload);
        });

        scope.$on('loader:error', (event, payload: LoaderScope) => {
            let config: LoaderConfig = angular.extend({}, payload);
            config.loaderImage = 'img/error.png';
            config.loaderClass = 'loaderError';
            config.message = 'Something wrong happened :(';
            scope.addLoader(config);
        });

        scope.$on('loader:close', (event, payload: {container: string}) => {
            let config: LoaderConfig = {};

            if (!payload) {
                config = {container: 'loader_body'};
            } else if ('container' in payload) {
                config.container = 'loader_' + payload.container;
            } else {
                config.container = 'loader_body';
            }

            angular.element(document.getElementById(config.container)).remove();
            this.activeLoaders.splice(this.activeLoaders.indexOf(config.container), 1);

            if (config.container in this.activeLoadersCancelEvents) {
                delete this.activeLoadersCancelEvents[config.container];
            }

            if (config.container in this.activeLoadersReloadEvents) {
                delete this.activeLoadersReloadEvents[config.container];
            }
        });

        scope.cancelEvent = (loaderId: string) => {
            if (loaderId in this.activeLoadersCancelEvents) {
                this.activeLoadersCancelEvents[loaderId]();
            }
        };

        scope.reloadEvent = (loaderId: string) => {
            if (loaderId in this.activeLoadersReloadEvents) {
                this.activeLoadersReloadEvents[loaderId]();
            }
        };
    }
}

/** Loader controller */
class loaderController {
    static $inject = ['$scope'];

    constructor(private scope: IScope) {

    }
}
