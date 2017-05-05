var gentra = angular.module('gentra', ['ui.router','ngStorage','textAngular','angularFileUpload','ngMaterial','moment-picker']);

gentra.config(function($stateProvider,$urlRouterProvider){

     $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'js/views/login.html',
        controller: 'adminCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'js/views/dashboard.html',
        controller: 'adminCtrl'
      })
      .state('user', {
        url: '/user',
        templateUrl: 'js/views/addUser.html',
        controller: 'adminCtrl'
      })
      .state('userlist', { 
        url: '/userlist',
        templateUrl: 'js/views/userlist.html',
        controller: 'adminCtrl'
      })
      .state('editU', {
        url: '/editU',
        templateUrl: 'js/views/edituser.html',
        controller: 'adminCtrl'
      })
      .state('single_User', {
        url: '/single_User/:id',
        templateUrl: 'js/views/user.html',
        controller: 'adminCtrl'
      })
      .state('business', {
        url: '/business',
        templateUrl: 'js/views/business.html',
        controller: 'adminCtrl'
      })      
      .state('notification', {
        url: '/notification',
        templateUrl: 'js/views/notifiaction.html',
        controller: 'adminCtrl'
      })
      .state('upload_image', {
        url: '/upload_image',
        templateUrl: 'js/views/upload-image.html',
        controller: 'appCtrl'
      })
      .state('imagelist', {
        url: '/imagelist',
        templateUrl: 'js/views/imagelist.html',
        controller: 'appCtrl'
      })
      .state('editImage', {
        url: '/editImage',
        templateUrl: 'js/views/editImage.html',
        controller: 'appCtrl'
      })
      .state('bannerView', {
        url: '/bannerView',
        templateUrl: 'js/views/bannerview.html',
        controller: 'appCtrl'
      })
      .state('gender', {
        url: '/gender',
        templateUrl: 'js/views/gender.html',
        controller: 'appCtrl'
      })
      .state('language', {
        url: '/language',
        templateUrl: 'js/views/language.html',
        controller: 'appCtrl'
      })
      .state('category', {
        url: '/category',
        templateUrl: 'js/views/ExternalSystem_Categories.html',
        controller: 'appCtrl'
      })
      .state('color', {
        url: '/color',
        templateUrl: 'js/views/addcolor.html',
        controller: 'appCtrl'
      })
      .state('sizes', {
        url: '/sizes',
        templateUrl: 'js/views/addProductsize.html',
        controller: 'appCtrl'
      })
      .state('corporation', {
        url: '/corporation',
        templateUrl: 'js/views/addProductsize.html',
        controller: 'appCtrl'
      })

      .state('pagelist', {
        url: '/pagelist',
        templateUrl: 'js/views/pagelist.html',
        controller: 'pageCtrl'
      })
      .state('addpage', {
        url: '/addpage',
        templateUrl: 'js/views/addpage.html',
        controller: 'pageCtrl'
      })
      .state('editP', {
        url: '/editP',
        templateUrl: 'js/views/editP.html',
        controller: 'pageCtrl'
      })
      .state('single_Page', {
        url: '/single_Page',
        templateUrl: 'js/views/page.html',
        controller: 'pageCtrl'
      })
      
      

      

    $urlRouterProvider.otherwise('/login');

});


  

    //Update instances of the model matched by {{where}} from the data source.