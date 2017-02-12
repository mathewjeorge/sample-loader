/// <reference path="../../typings/index.d.ts" />

import {sideBar} from './sideBar/sideBar';
import {projects} from './projects/projects';
import {milestones} from "./milestones/milestones";

angular.module('test.app')
    .component(projects.componentName, new projects())
    .component(milestones.componentName, new milestones())
    .component(sideBar.componentName, new sideBar());