import {loader} from "./loader/loaderComp";
angular.module('test.app')
    .directive('loader', loader.instance);
