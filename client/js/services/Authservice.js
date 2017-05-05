gentra.factory("Auth", function ($q,$http,$localStorage,$window,$sessionStorage) {
	var adminLog;
//var checkAdmin=false;
  function userlogin(user, pass) {
        var deferred = $q.defer();
        $http.post("/api/admins", { username:user,password:pass })
            .then(function (result) {
              adminLog=result
           $window.sessionStorage["adminLog"] = JSON.stringify(adminLog);
            deferred.resolve(adminLog);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }
function adminlogout() {
        var deferred = $q.defer();
        $http({
            method: "get",
            url: "/api/admins"            
        }).then(function (result) {
            adminLog = null;
        // $localStorage.checkAdmin=null;
     $window.sessionStorage["adminLog"] = null;
             //$route.reload();
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
 //function isUserLoggedIn() {
 function isadminLoggedIn() {
//console.log(userLog)
  return (adminLog) ? true : false;
}
//isUserLoggedIn();
 function getClientInfo() {
        return adminLog;
    }

});