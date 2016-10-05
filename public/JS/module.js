angular.module('Cypher',['ngRoute'])
    .config(Router);

Router.$inject = ['$routeProvider'];

function Router ($routeProvider){
console.info('router loaded fam')

 $routeProvider.otherwise({ redirecto: '/about'  });

$routeProvider
    .when('/tracks', {
        templateUrl: '/html/templates/mytracks.html',
        controller: 'cypherCtrl as cCtrl '
    })
    .when('/about',{
        templateUrl: 'html/templates/aboutyou.html',
        controller: 'cypherCtrl as cCtrl'
    })

};