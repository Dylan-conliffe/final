angular.module('Cypher')
    .controller('cypherCtrl', cypherController)




cypherController.$inject = ['$http','Upload']

function cypherController($http,Upload) {
    var cCtrl = this;
   
    cCtrl.hello = "yass! it's working"

  cCtrl.createProfile = function(){
      var newUser =  { 
          about : cCtrl.about,
          pic :  cCtrl.pic,
          role : cCtrl.role,
          software : cCtrl.software,
          artist: cCtrl.artist
      }

      $http.post('/updateProfile', newUser).then(function(response) {
          console.log("updated user: ", response)
      });
  }

  cCtrl.getProfile = function() {

      $http.get('/me').then(function(response){
        console.log("Profile data: ", response.data);
        
        //cCtrl.pic =   response.data.pic;
        cCtrl.about = response.data.about;
        cCtrl.role = response.data.role;
        cCtrl.artist = response.data.artist;
        cCtrl.software= response.data.software;
      })
  }

 }       
 






