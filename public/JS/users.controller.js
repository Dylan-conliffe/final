angular.module('Cypher')
    .controller('cypherCtrl', cypherController)



cypherController.$inject = ['$http', 'Upload']

function cypherController($http, Upload) {
    var cCtrl = this;

    cCtrl.hello = "yass! it's working"

    cCtrl.createProfile = function () {
        Upload.upload({
            url: '/profile/edit',
            method: "POST",
            data: {
                files: cCtrl.pic ,
                data: {
                    about: cCtrl.about,
                    role: cCtrl.role,
                    software: cCtrl.software,
                    artist: cCtrl.artist
                }
            }
        }).then(function (response) {
            console.log("updated user: ", response);
        }, function (error) {
           // console.error(error,'yo',req.session.user);
        });
    }

    cCtrl.getProfile = function () {

        $http.get('/me').then(function (response) {
            // // console.log("Profile data: ", response.data);
            // cCtrl.tracks = response.data.tracks
            // cCtrl.pic = response.data.pic;
            // cCtrl.about = response.data.about;
            // cCtrl.role = response.data.role;
            // cCtrl.artist = response.data.artist;
            // cCtrl.software = response.data.software;
            // // console.log(response.data.software)
              //  console.log(cCtrl.about)
        })
    }


}