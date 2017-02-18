import {httpService} from "./httpService";
import {loaderService} from "./loaderService";
angular.module('management.app')
    .service('httpService', httpService)
    .service('loaderService', loaderService);
