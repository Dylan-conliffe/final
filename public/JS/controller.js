angular.module('Cypher')
.controller('cypherCtrl',cypCtrl)


cypCtrl.$inject = ['$http','cypherFactory'];

// $routeProvider
// .when('/')


function cypCtrl($http,cypherFactory){
    var cCtrl = this;
    cCtrl.userList = []


cCtrl.createUser = function(){
 cypherFactory.createUsers({
    username: cCtrl.username,
    password: cCtrl.password,
    email:    cCtrl.email
 })   
 .then(function(res){
     console.log(res.data);
     cCtrl.userList.push(res.data);
 })
}

  

}
