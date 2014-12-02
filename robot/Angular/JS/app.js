var app = angular.module('app', ['ngMaterial', 'ngRoute']);

//route config
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
          templateUrl: '/Angular/Views/AWS.html',
          controller: 'AWS'
      })
      .when('/angular', {
          templateUrl: '/Angular/Views/Angular.html',
          controller: 'Angular'
      })
      .when('/webapi', {
          templateUrl: '/Angular/Views/WebAPI.html',
          controller: 'WebAPI'
      })
      .otherwise({
          redirectTo: '/'
      });

    //$locationProvider.html5Mode(true);
});