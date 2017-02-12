import {loader} from "./loader/loaderComp";
angular.module('management.app')
    .directive('loader', loader.instance);
