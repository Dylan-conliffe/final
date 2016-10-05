angular.module('Cypher')
.factory('cypherFactory',cFactory)

cFactory.$inject = ['$http'];

function cFactory($http){
    function getTracks(){
        return $http.get('/profile/tracks')


}};
