/************************************************ admin ************************************************/

gentra.controller('adminCtrl', function($scope, $http, $stateParams, $state, $location,$localStorage,$sessionStorage,userService){
//date picker code

$scope.myDate = new Date('yyyy-mm-dd');

  $scope.minDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() - 1,
      $scope.myDate.getDate());

  $scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() + 1,
      $scope.myDate.getDate());

  $scope.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  };



/*login admin*/
$scope.login = function(user,pass){
// console.log(user+''+ pass);
 $http({
   method : "GET",
   url    : "/api/admins"   
 }).
 then(function successCallback(response){
  if(response.data.error){
    $scope.error = response.data.error;
  }
  else{        
        $scope.admins = response.data;
          for(var i=0; i<$scope.admins.length; i++){
            if($scope.admins[i].username==user && $scope.admins[i].password==pass){
            $localStorage.username = $scope.admins[i].username;
            $location.path('/dashboard');
          }
          else{
            alert('Invalid username/password');
            $location.path('/login');
          }
        }         
  }
 },function errorCallback(response){
  console.log('error',response);
});

}

//***pdf**

/*add users*/
$scope.customer = {};
$scope.addUser = function(){ 

  var email = $scope.customer.email;
  
  //check if user exists
     $http({
      method : "GET",
      url    : "/api/Appusers/findOne?filter[where][or][1][username]="+$scope.customer.username+"&filter[where][or][0][email]="+email     
      }).
 then(function successCallback(response){
  console.log(response);
    if(response.data.error){
      $scope.error = response.data.error;
    }
    else{   

            $scope.result = response.data;
                  console.log($scope.result.email);
                  
                  if($scope.result.email == email){
                    //check for email
                    alert("Email already exists. Please choose diffrent email.");
                  }else if($scope.result.username == $scope.customer.username){
                    //check for username
                    alert("Username already exists. Please choose diffrent username.");
                  }else{
                  
                  }
        }
  },function errorCallback(response){
  console.log('error',response);
  if(response.data.statusText="Not Found"){
    userService.createUser($scope.customer);
    $location.path('/userlist'); 
  }
});              


}
 
/*show users list*/
$scope.uu=0;
userService.getAllUser().then(function(response) {    
    $scope.Users = response.data;
    console.log($scope.Users);
        /*$scope.currentPage = 1;
        $scope.totalItems = $scope.Users.length;
        $scope.entryLimit = 10; 
        $scope.noOfpages = Math.ceil($scope.totalItems / $scope.entryLimit);*/
    for(var i=0; i<$scope.Users.length; i++){
        $scope.uu++;
      }
});

/*edit user by id*/
$scope.gender;
$scope.eu = $sessionStorage.eu;
$scope.userById = function(id){  
    userService.getUserById(id).then(function(response) {    
     $scope.EU = response.data;
     
     $sessionStorage.eu=  $scope.EU;
    $location.path('/editU');
  });
}

/*save edited user by id*/
$scope.updateUser = function(id){
/*     $http({
          method : "GET",
          url    : "/api/Appusers/findOne?filter[where][or][1][username]="+$scope.eu.username+"&filter[where][or][0][email]="+$scope.eu.email     
      }).
 then(function successCallback(response){
  console.log(response);
    if(response.data.error){
      $scope.error = response.data.error;
    }
    else{   

            $scope.Data = response.data;
                  //console.log($scope.Data.email);
                  
                  if($scope.Data.email == $scope.eu.email){
                    //check for email
                    alert("Email already exists. Please choose diffrent email.");
                  }else if($scope.Data.username == $scope.eu.username){
                    //check for username
                    alert("Username already exists. Please choose diffrent username.");
                  }else{
                  
                  }
        }
  },function errorCallback(response){
  console.log('error',response);
  if(response.data.statusText="Not Found"){
    userService.saveUpdateuser(id,$scope.eu);
    $location.path('/userlist'); 
  }
});*/

  userService.saveUpdateuser(id,$scope.eu).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.Data=response.data;       
        $location.path('/userlist'); 
      }      
     }, function errorCallback(response) {
      console.log('error',response);
     });
 }

/*delete users*/
$scope.deleteUser = function(id){ 
    userService.removeUser(id).then(function(response) {
            $scope.Users.forEach(function(value,index){
              if(value.id == id){
               $scope.Users.splice(index,1);
              }
            })
        }, function(error) {
            console.log(error);
        });
}


//single user view
$scope.userProfile=function(id){  
    $location.path('/single_User/'+id);
}

//getuserby current flag
$scope.userNotification =$sessionStorage.userinfo;
$http({
      method : 'GET',
      url    : '/api/Appusers/?filter[where][current_flag]=false'
    }).
    then(function successCallback(response){
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.users = response.data;        
        $sessionStorage.userinfo =$scope.users.length; 
      }
    }, function errorCallback(response) {
        console.log('error',response);
       });


/*$scope.Notify=function(){
	var current_flag ="true";
	$http({
	  method : 'POST',
	  url    : '/api/Appusers/update?where[current_flag]='+current_flag, 
	}).
	then(function successCallback(response){
	  if(response.data.error)
	  {
	    $scope.error = response.data.error;
	  }
	  else
	  {
	    $scope.users_info = response.data;        
	    console.log($scope.users_info); 
	  }
	}, function errorCallback(response) {
	    console.log('error',response);
	   });
}*/

//get messages

  console.log($state.current);

  if($state.current.name == 'single_User'){

    userService.getUserById($stateParams.id).then(function(response) {    
       $scope.one_User = response.data;
       $scope.singleUser =$scope.one_User;       
    });

    console.log($state.current.name);    
    console.log($stateParams.id);

    userService.getMessages($stateParams.id).then(function(response) {    
       $scope.messages = response.data;
       console.log($scope.messages);       
    }); 
    

    //*Send message*//

      $scope.Message = function(){
      $scope.userid =$stateParams.id;
        var date = new Date();
        var status = 'unseen'
        console.log($scope.ctrl.input)
        $http({
          method : 'POST',
          url : 'http://35.165.132.91:3000/api/messages',
          data : {
                   message: $scope.message, status: status, created_at : date,
                   userid:$scope.userid,future_date:$scope.ctrl.datepicker,future_time:$scope.ctrl.timepicker
                 }
        }).then(function sucessCallback(response)
        {
          if(response.data.error)
          {
            $scope.error = response.data.error;
          }
          else{
            $scope.result = response.data;
              userService.getMessages($stateParams.id).then(function(response) {    
               $scope.messages = response.data;
               console.log($scope.messages);       
              }); 
              var modal = document.getElementById('myModal');
              modal.style.display = "none";         
            
          }          
        }, function errorCallback(response){
          console.log(response);
      });

    }

  }     

  $scope.delMsg=function(id){
     $http({
        method : 'DELETE',
        url : 'http://35.165.132.91:3000/api/messages/'+id
        
      }).then(function sucessCallback(response)
      {
        if(response.data.error)
        {
          $scope.error = response.data.error;
        }
        else{         
            $scope.messages.forEach(function(value,index){
              if(value.id == id){
               $scope.messages.splice(index,1);
              }
            })         
        }
        
      }, function errorCallback(response){
        console.log(response);
      });

   }

});

/*************************************** appCtrl ***************************************************/

gentra.controller('appCtrl', function($scope,$http,$location,$localStorage,$sessionStorage,appService,bannerService){

// upload image
$scope.image_info={};
$scope.upload = function () {

  //console.log($scope.image_info.file.name);

            var fd = new FormData();             
             fd.append('file', $scope.image_info.file);     
           
             $http.post('http://35.165.132.91:3000/api/cantainers/genteranfa/upload',fd, {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
            }).then(function successCallback(response) 
            {
              if(response.data.error)
              {
                  $scope.error = response.data.error;
              }
              else{

                  $scope.photo = response.data; 
                       
                       $http({
               method : "POST",
               url    : "/api/banners",
               data   : {
                         name:$scope.image_info.file.name,location:location,
                         from:$scope.image_info.myDate1,to:$scope.image_info.myDate2,
                         postion:$scope.image_info.postion
                        }
             }).            
                      then(function successCallback(response) {
                      $scope.info = response.data;
                      //console.log($scope.info);
                      $location.path('/imagelist');
                      });
               
               } 
             //console.log(response);
             }, function errorCallback(response) {
               console.log('error',response);
            });

};


//list of images
bannerService.getImages().then(function(response) {    
    $scope.images = response.data;
});

/*edit image by id*/
$scope.image = $sessionStorage.one_image;
$scope.imageById=function(id){ 
    bannerService.getById(id).then(function(response) {    
     $scope.one = response.data;
     $sessionStorage.one_image = $scope.one;
     $location.path('/editImage');
  });
}      

/*editsave image data*/
$scope.updateImageinfo=function(id){        
   bannerService.saveUpdateinfo(id,$scope.image).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.Data=response.data;          
        $location.path('/imagelist'); 
      }      
     }, function errorCallback(response) {
      console.log('error',response);
     });   
}

$scope.deleteImage = function(id) 
  { 
    bannerService.removeItem(id).then(function(response) {
            $scope.images.forEach(function(value,index){
              if(value.id == id){
               $scope.images.splice(index,1);
              }
            })
        }, function(error) {
            console.log(error);
        });
  }


//**image view**//
$scope.imageInfo = $sessionStorage.oneImage;
$scope.viewImage=function(id){
     bannerService.getById(id).then(function(response) {    
     $scope.one = response.data;
     $sessionStorage.oneImage = $scope.one;
     $location.path('/bannerView');     
   });
}    



/*add language*/
$scope.all_Language={};
$scope.addLanguage=function(){ 
 appService.createLanguage($scope.name); 
 $scope.all_Language.push({name:$scope.name});
 $scope.name = '';
}      

/*list of languages*/

appService.getAll().then(function(response) {    
    $scope.all_Language = response.data;
});


/*delete language*/
$scope.deleteLan = function(id) {
  appService.removeLanguage(id).then(function(response) {
            $scope.all_Language.forEach(function(value,index){
              if(value.id == id){
               $scope.all_Language.splice(index,1);
              }
            })
        },function(error) {
            console.log(error);
        });
}

/*add Gender*/
$scope.addGender=function(){ 
appService.createGender($scope.name);
}

/*get all gender*/
appService.getAllGenders().then(function(response) {    
    $scope.genders = response.data;
});
       
$scope.deleteGender = function(id){ 
    appService.removeGender(id).then(function(response) {
            $scope.genders.forEach(function(value,index){
              if(value.id == id){
               $scope.genders.splice(index,1);
              }
            })
        },function(error) {
            console.log(error);
        });
    }
  
//add category
$scope.addCategory = function(){       
      $http({
      method: 'POST',
      url: '/api/externalsystemcategories',
      data: {
              name: $scope.category.name,
              description: $scope.category.htmlcontent
            }
    }).
    then(function successCallback(response) 
    {
      console.log(response);
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.data = response.data;
        
      }    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
    };
  

  $http({   
            method:"GET",
            url:'/api/externalsystemcategories'              
        }).then(function successCallback(response) 
            {
              console.log(response);
              if(response.data.error)
              {
                $scope.error = response.data.error;
              }
              else
              {
                $scope.categories = response.data;
                
              }    
            }), function errorCallback(response) 
               {
                console.log('error',response);
               };

  $scope.deleteCategory = function(id) 
   {     
    $http({
    method:"DELETE",
    url:'/api/externalsystemcategories/' + id
   }).then(function successCallback(response) {
    //console.log(response);
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.categories.forEach(function(values,index)
       {
         if(values.id == id)
         {
           $scope.categories.splice(index,1);
         }
       });
       }
      }, function errorCallback(response) {
      console.log('error',response);
    });


    }


//****add product color
$scope.addColor = function(){       
      $http({
      method: 'PUT',
      url: '/api/colors',
      data: {
              name: $scope.name,
              RGB: $scope.RGB,
              Hue: $scope.Hue
             
            }
    }).
    then(function successCallback(response) 
    {
      console.log(response);
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.data = response.data;
        
      }    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
    };
  

  $http({   
            method:"GET",
            url:'/api/colors'              
        }).then(function successCallback(response) 
            {
              console.log(response);
              if(response.data.error)
              {
                $scope.error = response.data.error;
              }
              else
              {
                $scope.colors = response.data;
                
              }    
            }), function errorCallback(response) 
               {
                console.log('error',response);
               };

  $scope.deleteColor = function(id) 
   {     
    $http({
    method:"DELETE",
    url:'/api/colors/' + id
   }).then(function successCallback(response) {
    //console.log(response);
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.colors.forEach(function(values,index)
       {
         if(values.id == id)
         {
           $scope.colors.splice(index,1);
         }
       });
       }
      }, function errorCallback(response) {
      console.log('error',response);
    });


    }

//***add product size
$scope.addSize = function(){       
      $http({
      method: 'PUT',
      url: '/api/sizes',
      data: { 
              name: $scope.name,
              value: $scope.value             
            }
    }).
    then(function successCallback(response) 
    {
      console.log(response);
      if(response.data.error)
      {
        $scope.error = response.data.error;
      }
      else
      {
        $scope.data = response.data;
        
      }    
    }), function errorCallback(response) 
       {
        console.log('error',response);
       };
    };
  

  $http({   
            method:"GET",
            url:'/api/sizes'              
        }).then(function successCallback(response) 
            {
              console.log(response);
              if(response.data.error)
              {
                $scope.error = response.data.error;
              }
              else
              {
                $scope.sizes = response.data;
                
              }    
            }), function errorCallback(response) 
               {
                console.log('error',response);
               };

  $scope.deleteSize = function(id){     
    $http({
    method:"DELETE",
    url:'/api/sizes/' + id
   }).then(function successCallback(response) {
    //console.log(response);
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.sizes.forEach(function(values,index)
       {
         if(values.id == id)
         {
           $scope.sizes.splice(index,1);
         }
       });
       }
      }, function errorCallback(response) {
      console.log('error',response);
    });
  }


 //Add  corportaions

 $scope.addCorporation=function(){ 
  appService.createCorporation($scope.name);    
 }      

/*list of corportaions*/
$scope.all_corportaion={};
appService.getAllCorporation().then(function(response) {    
    $scope.all_corportaion = response.data;
});

/*delete corportaions*/
$scope.deleteCor = function(id) {
  appService.removeCorporation(id).then(function(response) {
            $scope.all_corportaion.forEach(function(value,index){
              if(value.id == id){
               $scope.all_corportaion.splice(index,1);
              }
            })
        },function(error) {
            console.log(error);
        });
}

  


});



/*************************************** page controller ******************************************/

gentra.controller('pageCtrl', function($scope,$http,$location,$localStorage,$sessionStorage,pageService){
/* addpage*/
$scope.page ={};
$scope.addPage = function(){
  pageService.createPage($scope.page);
  $location.path('/pagelist');
}
 
/*list of all pages*/
$scope.pp =0;
pageService.getAllPage().then(function(response) {    
    $scope.Pages = response.data;
    for(var i=0; i<$scope.Pages.length; i++){
      $scope.pp++;
    }
});



//**edit page by id
 $scope.edit_Page = $localStorage.editPage;
 $scope.editPage = function(id){
 pageService.getPageById(id).then(function(response) {    
  $scope.editPage = response.data;
  $localStorage.editPage=  $scope.editPage;
  $location.path('/editP');
});
}


//*save edit page by id
 $scope.updatePage = function(id){
 pageService.saveUpdatepage(id,$scope.edit_Page).then(function successCallback(response) {
      if(response.data.error){
        $scope.error = response.data.error;
      }else{
        $scope.Data=response.data;          
        $location.path('/pagelist'); 
      }
     }, function errorCallback(response) {
      console.log('error',response);
     });   
}


/*delete page*/
$scope.deletePage = function(id) 
  { 
    pageService.removePage(id).then(function(response) {
            $scope.Pages.forEach(function(value,index){
              if(value.id == id){
               $scope.Pages.splice(index,1);
              }
            })
        }, function(error) {
            console.log(error);
        });
}

$scope._page = $sessionStorage.page;
$scope.page_View=function(id){
  pageService.getPageById(id).then(function(response) {    
     $scope.one_Page = response.data;
     $sessionStorage.page = $scope.one_Page;
    $location.path('/single_Page');
  });
}   

});

/************************************ notification controller ***********************************************/
/*gentra.controller('notifyCtrl', function($scope,$http,$location,$localStorage){



});*/





/************************************ main controller ***********************************************/

gentra.controller('mainCtrl', function($scope,$http,$location,$localStorage){
$scope.checkadmin = function(){
  
  if($localStorage.username != ""){    
    return true;
  }else{   
    return false;
  }
}
  $scope.logout = function(){ 
    //$scope.checkadmin = true;
        $http({
            method:'get',
            url:'/api/admins',
        }).then(function successCallback(response){             
          $location.path('/login');
          
          $localStorage.username = null;
          
        }, function errorCallback(res){
          console.log("error");
        });
  };

});