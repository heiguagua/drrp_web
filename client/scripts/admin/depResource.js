  'use strict';
  var AdminDepResource = angular.module('Admin.DepResource', ['ui.router']);

  /** DepartmentReq Controller */
  AdminDepResource.controller('Admin.DepResource.Controller.Main', ['$scope', 'AdminDepResource.Service.Http', '$state',
  function($scope,  Http, $state) {
    $scope.Paging = {};
    $scope.Paging.currentPage = 1;
    $scope.Paging.maxSize = 5;
    $scope.Paging.itemsPerPage = 10;

    var _httpParams = {};
    _httpParams.limit =10;
    _httpParams.skip = 0;
    $scope.Paging.pageChanged = function() {
      _httpParams.skip = ($scope.Paging.currentPage - 1)*_httpParams.limit;
      getDepRelRescount(_httpParams);
    }

    function getDepsTotal() {
      Http.getDepCount().then(function(result) {
        $scope.depTotal = result.data.body[0].number;
        $scope.Paging.totalItems = $scope.depTotal;
      });
    }
    function getDepRelRescount(params) {
      Http.getDepRelRescount(params).then(function(result) {
        $scope.depRecouces = result.data.body;
      });
    }
    //init;
    getDepsTotal();
    getDepRelRescount(_httpParams);



  }
  ])

  /* HTTP */
AdminDepResource.factory('AdminDepResource.Service.Http', ['$http', 'API',
  function($http, API) {
    var path = API.path;

    function getDepCount() {
      return $http.get(
        path + '/sys_dep/count'
      )
    };
    function getDepRelRescount(params) {
      return $http.get(
        path + '/deprelrescount',{
          params: params
        }
      )
    }

    return {
      getDepRelRescount: getDepRelRescount,
      getDepCount: getDepCount
    }
  }
]);
