gentra.factory("bannerService", function ($q,$http,$localStorage,$window) { 
  
return{

  /*fileUpload: function(image_info){
       $http({
               method : "POST",
               url    : "/api/banners",
               data   : { 
                          name:image_info.file,from:image_info.myDate1,
                          to:image_info.myDate2,postion:image_info.postion                           
                        }
            })
        .success(function(response){
          userDetail =response.data;            
        })
        .error(function(error){
          console.log("error!!");
          
        });
      
      }, */  

    getImages:function(){
    var deferred = $q.defer();
    $http({
        method:"GET",
        url:'api/banners/'
      }).then(function (response) {
      images=response.data;
      deferred.resolve(response);    
    },function errorCallback(response) {
          deferred.reject(response);
      console.log('error',response);
    });
    return deferred.promise;
    
    },

    getById:function(id){
    var deferred = $q.defer();
    $http({
        method:"GET",
        url:'api/banners/'+id,
      }).then(function (response) {
      editdata=response.data;
      deferred.resolve(response);    
    },function errorCallback(response) {
          deferred.reject(response);
      console.log('error',response);
    });
    return deferred.promise;
    
    },


    saveUpdateinfo:function(id,image){
   
     var deferred = $q.defer();
      $http({
        method:"POST",
        url:'api/banners/'+ id +'/replace',
        data:{   name:image.name,
                 from:image.from,
                 to:image.to,
                 postion:image.postion
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


    removeItem:function(id){
       var deferred = $q.defer();
            $http({ 
               url: '/api/banners/'+id,
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
