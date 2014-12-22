var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

//route config
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
          templateUrl: '/Angular/Views/Angular.html',
          controller: 'Angular'
      })
      .when('/AWS', {
          templateUrl: '/Angular/Views/AWS.html',
          controller: 'AWS'
      })
      .when('/WebAPI', {
          templateUrl: '/Angular/Views/WebAPI.html',
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
});


var token = "";