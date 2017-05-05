gentra.factory("userService", function ($q,$http,$localStorage,$window,$sessionStorage) {
    
var userDetail; 
  
return{

  createUser: function(customer){  
       var current = new Date();
       $http({
               method : "POST",
               url    : "/api/Appusers",
               data   : { 
                          first_name :customer.firstname.toLowerCase(), last_name:customer.lastname.toLowerCase(), username:customer.username, email:customer.email,password:customer.password,
                          date_of_birth:customer.myDate1, defaultlanguage_id:customer.language, gender_id:customer.gender, score:customer.score,Activation_code:customer.authentication,
                          points:customer.points, current_flag:"false",created_date: current                          
                        }
            })
        .success(function(response){
          userDetail =response.data
           console.log(userDetail);
            
        })
        .error(function(error){
          console.log("error!!");
          
        });
      
  },

  getAllUser:function(){
       var deferred = $q.defer();
       $http({
        method:"GET",
        url:'api/Appusers/'
       }).then(function (response) {
       Users=response.data;
       deferred.resolve(response);    
       },function errorCallback(response) {
          deferred.reject(response);
        console.log('error',response);
       });
       return deferred.promise;
    
   },
   

  getUserById:function(id){
      var deferred = $q.defer();
      $http({
          method:"GET",
          url:'api/Appusers/'+id,
        }).then(function (response) {
        editdata=response.data;
        deferred.resolve(response);    
      },function errorCallback(response) {
            deferred.reject(response);
        console.log('error',response);
      });
      return deferred.promise;
      
  },

  saveUpdateuser:function(id,eu){
   
      var deferred = $q.defer();
      $http({
        method:"POST",
        url:'api/Appusers/'+ id +'/replace',
        data:{
               first_name :eu.first_name.toLowerCase(), last_name:eu.last_name.toLowerCase(), username:eu.username, email:eu.email,password:eu.password,
               date_of_birth:eu.date_of_birth, defaultlanguage_id:eu.defaultlanguage_id, gender_id:eu.gender_id, score:eu.score,
               points:eu.points,Activation_code:eu.Activation_code
             }
      }).then(function (response) {
      data=response.data;
      deferred.resolve(response);     
      },function errorCallback(response) {
          deferred.reject(response);
      console.log('error',response);
      });
      return deferred.promise;

  },

  removeUser:function(id){
       var deferred = $q.defer();
            $http({ 
               url: '/api/Appusers/'+id,
               method: 'DELETE'
            }).then(function (response) {
      remove_User=response.data;
      deferred.resolve(response);
      },function errorCallback(response) {
          deferred.reject(response);
          console.log('error',response);
      });
       return deferred.promise;
  },

   findAllUser:function(){
       var deferred = $q.defer();
       $http({
        method:"GET",
        url:'api/users_external_accounts/'
       }).then(function (response) {
       Users=response.data;
       deferred.resolve(response);    
       },function errorCallback(response) {
          deferred.reject(response);
        console.log('error',response);
       });
       return deferred.promise;
    
    },


    getMessages:function(id){
     var deferred = $q.defer();
       $http({
        method:"GET",
        url:'/api/messages/?filter[where][userid]='+id
       }).then(function (response) {
       Users=response.data;
       deferred.resolve(response);    
       },function errorCallback(response) {
          deferred.reject(response);
        console.log('error',response);
       });
       return deferred.promise;
    }
   

   }


});

