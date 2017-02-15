# sample-loader
Sample material loader using Angular Component

## Set Up

- npm install gulp-cli -g
- npm install typescript -g
- npm install typings --global
- npm install
- typings install
- gulp dev

## Loader Options

You need to create options object inside your controller. These are the available options you can provide.

### size 
Size of loader in pixels. Default: 50px

### color
Hex Color Code. Default: `#0057e7`

### strokeWidth
Better if you specify between 2-6. Default 2.

### loaderImage 
Custom loader image url

### loaderClass
Used for custom loader class - Required if specified custom image

### loaderImageAlt
Alt text for loader image

### fallbackImage
Fall back image url in case of provided custom image fails

### Example Usage:

#### 1.
````html
<div id="sidebar-wrapper" ng-init="$ctrl.go()" 
        loader 
        in-progress="$ctrl.inProgress" 
        color="#65f442" 
        size="30" 
        stroke-width="3">
    // content
</div>
````

#### 2.
````html
<div id="sidebar-wrapper" ng-init="$ctrl.go()" 
        loader 
        in-progress="$ctrl.inProgress" 
        loader-image="{{$ctrl.loaderConfig.loaderImage}}"
        loader-class="{{$ctrl.loaderConfig.loaderClass}}"
        fallback-image="{{$ctrl.loaderConfig.loaderImageFallback}}">
    // content
</div>
````