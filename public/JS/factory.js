angular.module('Cypher')
.factory('cypherFactory',cFactory)

cFactory.$inject = ['$http'];

function cFactory($http){
    function getTracks(){
        return $http.get('/tracks')
    }
    function createUsers(userData){
        return $http.post('/users',userData)
    }
    return{
        createUsers:createUsers
    }

}