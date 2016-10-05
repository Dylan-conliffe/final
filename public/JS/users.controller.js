

angular.module('Cypher',[])
    .controller('cypherCtrl',cypherController)






function cypherController(){
    var cCtrl = this;
    cCtrl.hello = "yass! it's working"
}





//  var s3 = require('s3');
 
// var s3Client = s3.createClient({
//     s3Options :{   
//         accessKeyId : ' need to change this '  ,
//         secretAccessKey : 'this too'
//     }
// });