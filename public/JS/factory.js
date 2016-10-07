angular.module('Cypher')
    .factory('cypherFactory', cFactory)

cFactory.$inject = ['$http', 'Upload'];

function cFactory($http, Upload) {

    console.log('are you there?')

    function getTracks() {
        return $http.get('/profile/tracks')


    }
    function postTracks(){
        return Upload.upload({
            url: '/profile/tracks',
            method: 'POST',
            data :{
                files : 
            } 
        })
    }

 $http.get('/me')
        .then(function(res) {
        cCtrl.user = resp.data
        console.log(resp.data)
        })


    return {
        getTracks: getTracks
    }
};