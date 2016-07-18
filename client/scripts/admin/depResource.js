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

    function getDepsTotal(params) {
      Http.getDepCount(params).then(function(result) {
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

    //search department
    $scope.searchDepartment = function(){
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      _httpParams.sysdepname = $scope.dep_name;
      if($scope.dep_name==null){
        getDepsTotal();
        getDepRelRescount(_httpParams);
      }else{
        Http.getDepRelRescount(_httpParams).then(function(result) {
          if(result.data.head.total >=1){
            getDepsTotal({sysdepname : $scope.dep_name});
            $scope.depRecouces = result.data.body;
          }else {
            alert("系统没有查到'"+$scope.dep_name+"'这个部门，请重新输入");
            $scope.dep_name = "";
            $state.go("main.admin.dep-resource", {}, {
              reload: true
            });
          }
        });
      }
    }



  }
  ])

  /* HTTP */
AdminDepResource.factory('AdminDepResource.Service.Http', ['$http', 'API',
  function($http, API) {
    var path = API.path;

    function getDepCount(params) {
      return $http.get(
        path + '/sys_dep/count',{
          params: params
        }
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
