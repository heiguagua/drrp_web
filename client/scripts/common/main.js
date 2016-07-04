'use strict';
var Main = angular.module('Main', ['ui.router', 'ngCookies']);

/** Main Controller */
Main.controller('Main.Controller.Main', ['$scope', '$cookies', 'Main.Service.Http', '$state',
  function($scope, $cookies, Http, $state) {
    $scope.User = JSON.parse($cookies.get('User'));
    $scope.logout = function() {
      console.log($scope.User);
      if(sessionStorage.token){
        sessionStorage.removeItem('token');
        Http.logout().then(function(result) {
          $state.go("welcome");
        })
      }

    }
  }
]);

/* HTTP Factory */
Main.factory('Main.Service.Http', ['$http', 'API',
  function($http, API) {
    var path = API.path;
    function logout() {
      return $http.get(
        path + '/loginOut'
      )
    };
    return {
      logout: logout
    }
  }
]);
