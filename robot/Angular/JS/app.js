var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

//route config
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
          templateUrl: '/Angular/Views/Common/StoredProcTab.html',
          controller: 'Angular'
      })
      .when('/AWS', {
          templateUrl: '/Angular/Views/AWS/AWS.html',
          controller: 'AWS'
      })
      .when('/PHP', {
          templateUrl: '/Angular/Views/PHP/PHP.html',
          controller: 'PHP'
      })
      .when('/WebAPI', {
          templateUrl: '/Angular/Views/Common/StoredProcTab.html',
          controller: 'WebAPI'
      })
      .otherwise({
          redirectTo: '/'
      });

    //$locationProvider.html5Mode(true);
});


// setup globals
app.run(function ($rootScope) {

    $rootScope.Debug = false;

    $rootScope.Config = {
        BaseURL: '/api/'
    }


    $rootScope.$on("populated", function () {
        ExternalLibraryInit();
    });

    $rootScope.$on("loaded", function () {
        ExternalLibraryInit();
    });


    function ExternalLibraryInit() {
        //init bootstrap material design library
        $.material.init();
        //use jquery to allow our code to be selectable
        $('pre').prop('title', 'click to select');
        $('pre').on('click', function () { SelectText(this) });
    }

});


var token = "";