export interface LoaderServiceScope {
    container?: string; // container of loader directive
    size?: string; // size of loader in pixles
    color?: string; // default loader color
    strokeWidth?: string; // width of loader path
    loaderImage?: string; // Custom image for custom loader
    loaderImageAlt?: string; // Alt text for loader image
    loaderClass?: string; // Used for custom loader class - Required if specified custom image
    fallbackImage?: string; // Fall back which image to use in case of provided image fails
}

export class loaderService {
    scope: ng.IRootScopeService;
    compile: ng.ICompileService;

    static $inject = ['$rootScope', '$compile'];

    activeLoaders: string[] = [];

    constructor($scope: ng.IRootScopeService, $compile: ng.ICompileService) {
        this.scope = $scope;
        this.compile = $compile;
    }

    listen() {
        this.scope.$on('loader:open', (event, payload: LoaderServiceScope) => {
            let loaderEle, loaderId;

            if (payload && payload.container) {
                loaderEle = angular.element(document.getElementById(payload.container));
                loaderId = 'loader_' + payload.container;
            } else {
                loaderEle = angular.element(document.body);
                loaderId = 'loader_body';
            }

            if (this.activeLoaders.indexOf(loaderId) !== -1) {
                return false;
            }

            this.activeLoaders.push(loaderId);

            let html = `
                <div loader id="${loaderId}" 
                    ${payload && payload.size ? 'size="' + payload.size + '"' : ''}
                    ${payload && payload.color ? 'color="' + payload.color + '"' : ''}
                    ${payload && payload.strokeWidth ? 'stroke-width="' + payload.strokeWidth + '"' : ''}
                    ${payload && payload.loaderImage ? 'loader-image="' + payload.loaderImage + '"' : ''}
                    ${payload && payload.loaderImageAlt ? 'loader-image-alt="' + payload.loaderImageAlt + '"' : ''}
                    ${payload && payload.loaderClass ? 'loader-class="' + payload.loaderClass + '"' : ''}
                    ${payload && payload.fallbackImage ? 'fallback-image="' + payload.fallbackImage + '"' : ''}
                ></div>
            `;

            let loader = this.compile(html)(this.scope);

            loaderEle.append(loader);
        });

        this.scope.$on('loader:close', (event, payload: {container: string}) => {
            if (!payload) {
                payload = {container: 'loader_body'};
            } else if ('container' in payload) {
                payload.container = 'loader_' + payload.container;
            } else {
                payload.container = 'loader_body';
            }

            angular.element(document.getElementById(payload.container)).remove();
            this.activeLoaders.splice(this.activeLoaders.indexOf(payload.container), 1);
        });
    }
}
