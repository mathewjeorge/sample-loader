/// <reference path="../../typings/index.d.ts" />

import {testComp} from './testComp/testComp';
import {sideBarComp} from './sideBar/sideBarComp';
import {loaderComp} from "./loaderComp/loaderComp";

angular.module('test.app')
    .component(testComp.componentName, new testComp())
    .component(loaderComp.componentName, new loaderComp())
    .component(sideBarComp.componentName, new sideBarComp());