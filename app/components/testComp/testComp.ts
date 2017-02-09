/// <reference path="../../../typings/index.d.ts" />

export class testComp implements ng.IComponentOptions {
    static componentName = 'testComp';
    
    bindings:any;

    templateUrl = 'js/components/testComp/testComp.html';

    constructor(){}
}