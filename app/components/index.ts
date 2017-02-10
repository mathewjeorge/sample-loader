/// <reference path="../../typings/index.d.ts" />

import {testComp} from './testComp/testComp';
import {sideBarComp} from './sideBar/sideBarComp';

angular.module('test.app')
    .component(testComp.componentName, new testComp())
    .component(sideBarComp.componentName, new sideBarComp());