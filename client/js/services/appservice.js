gentra.factory("appService", function ($q,$http,$localStorage,$window) { 
return{

  createLanguage: function(name){
       $http({
               method : "POST",
               url    : '/api/languages', 
               data   : { name:name }
            }).success(function(response){
           langName =response.data;     
        }).error(function(error){
          console.log("error!!");         
        });      
    },   

    getAll:function(){
    var deferred = $q.defer();
    $http({
        method:"GET",
        url:'api/languages/'
      }).then(function (response) {
      language=response.data;
      deferred.resolve(response);    
    },function errorCallback(response) {
          deferred.reject(response);
      console.log('error',response);
    });
    return deferred.promise;    
    },


    removeLanguage:function(id){
       var deferred = $q.defer();
            $http({ 
               url: '/api/languages/'+id,
               method: 'DELETE'
            }).then(function (response) {
      removeitem=response.data;
      deferred.resolve(response);
      },function errorCallback(response) {
          deferred.reject(response);
          console.log('error',response);
      });
       return deferred.promise;
    },


//add gender
  createGender: function(name){
       $http({
               method : "POST",
               url    : '/api/genders', 
               data   : { name:name }
            }).success(function(response){
           gender =response.data;     
        }).error(function(error){
          console.log("error!!");         
        });      
    },   

    getAllGenders:function(){
    var deferred = $q.defer();
    $http({
        method:"GET",
        url:'api/genders/'
      }).then(function (response) {
      genders=response.data;
      deferred.resolve(response);    
    },function errorCallback(response) {
          deferred.reject(response);
      console.log('error',response);
    });
    return deferred.promise;    
    },


    removeGender:function(id){
       var deferred = $q.defer();
            $http({ 
               url: '/api/genders/'+id,
               method: 'DELETE'
            }).then(function (response) {
      removeitem=response.data;
      deferred.resolve(response);
      },function errorCallback(response) {
          deferred.reject(response);
          console.log('error',response);
      });
       return deferred.promise;
     },
     createCorporation: function(name){
       $http({
               method : "POST",
               url    : '/api/financial_corportaions', 
               data   : { name:name }
            }).success(function(response){
           gender =response.data;     
        }).error(function(error){
          console.log("error!!");         
        });      
    },   

    getAllCorporation:function(){
    var deferred = $q.defer();
    $http({
        method:"GET",
        url:'api/financial_corportaions/'
      }).then(function (response) {
      genders=response.data;
      deferred.resolve(response);    
    },function errorCallback(response) {
          deferred.reject(response);
      console.log('error',response);
    });
    return deferred.promise;    
    },


    removeCorporation:function(id){
       var deferred = $q.defer();
            $http({ 
               url: '/api/financial_corportaions/'+id,
               method: 'DELETE'
            }).then(function (response) {
      removeitem=response.data;
      deferred.resolve(response);
      },function errorCallback(response) {
          deferred.reject(response);
          console.log('error',response);
      });
       return deferred.promise;
     }

     
  
}

   
});

