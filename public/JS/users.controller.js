angular.module('Cypher')
    .controller('cypherCtrl', cypherController)




cypherController.$inject = ['$http','cypherFactory','Upload']

function cypherController($http,cypherFactory,Upload) {
    var cCtrl = this;
    console.log(cypherController,+ 'loaded')
    cCtrl.hello = "yass! it's working"
        
 
}






