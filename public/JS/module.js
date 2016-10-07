angular.module('Cypher', ['ngRoute','ngFileUpload'])
    .config(Router);

Router.$inject = ['$routeProvider'];

function Router($routeProvider) {
    console.info('router loaded fam')

    $routeProvider.otherwise({
        redirectTo: '/about'
    });

    $routeProvider
        .when('/tracks', {
            templateUrl: '/html/templates/mytracks.html',
            controller: 'cypherCtrl as cCtrl'
        })
        .when('/about', {
            templateUrl: 'html/templates/aboutyou.html',
            controller: 'cypherCtrl as cCtrl'
        })
       .when('/edit',{
           templateUrl: '/html/templates/edit.html',
           controller: 'cypherCtrl as cCtrl'
       })
};
