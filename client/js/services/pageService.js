gentra.factory("pageService", function ($q,$http,$localStorage,$window,$sessionStorage) {
    
var pageDetail; 
  
return{

  createPage: function(page){  

       $http({
               method : "POST",
               url    : "/api/pages",
               data   : {
                         title :page.title,description:page.htmlcontent,status: page.status
                        }
              }).success(function(response){
                 pageDetail =response.data
                console.log("success!!");            
         }).error(function(error){
          console.log("error!!");          
        });      
  },

  getAllPage:function(){
       var deferred = $q.defer();
       $http({
        method:"GET",
        url:'api/pages/'
       }).then(function (response) {
       Pages=response.data;
       deferred.resolve(response);    
       },function errorCallback(response) {
          deferred.reject(response);
        console.log('error',response);
       });
       return deferred.promise;
    
   },
   

  getPageById:function(id){
      var deferred = $q.defer();
      $http({
          method:"GET",
          url:'api/pages/'+id,
        }).then(function (response) {
        editdata=response.data;
        deferred.resolve(response);    
      },function errorCallback(response) {
            deferred.reject(response);
        console.log('error',response);
      });
      return deferred.promise;
      
  },

  saveUpdatepage:function(id,edit_Page){
   
      var deferred = $q.defer();
      $http({
        method:"POST",
        url:'api/pages/'+ id +'/replace',
        data:{
               title :edit_Page.title,description:edit_Page.htmlcontent,status: edit_Page.status
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

  removePage:function(id){
       var deferred = $q.defer();
            $http({ 
               url: '/api/pages/'+id,
               method: 'DELETE'
            }).then(function (response) {
      remove_User=response.data;
      deferred.resolve(response);
      },function errorCallback(response) {
          deferred.reject(response);
          console.log('error',response);
      });
       return deferred.promise;
  }


   }
});