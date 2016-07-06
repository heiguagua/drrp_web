// upload file
'use strict';
var DInventoryUpload = angular.module('Department.InventoryUpload', ['ui.router', 'ngCookies', 'cgBusy']);

DInventoryUpload.controller('Department.InventoryUpload.Controller', ['$scope', '$q', 'Department.InventoryUpload.Service.Http', '$stateParams', '$state', '$sce', 'API',
  function($scope, $q, Http, $stateParams, $state, $sce, API) {
    $scope.uploadPromise = null;

    $scope.uploadFile = function() {
      var file = $scope.myFile;
      console.log('file is ');
      console.dir(file);
      if (!file) {
        alert('您还未选择文件');
        return;
      }
      $scope.uploadPromise = Http.uploadFile(file).then(function(result) {
        if (200 == result.data.head.status) {
          alert('上传成功！');
          $state.go("main.department.inventory", {}, {
            reload: true
          });
        }
        else {
          alert('上传失败，上传文件格式有误！');
        }
      });
    }

    $scope.downloadUrl = API.path + '/download';

    $scope.toIndex = function() {
      $state.go("main.department.inventory", {}, {
        reload: true
      });
    }
  }
])


DInventoryUpload.controller('Department.InventoryUploadExamples.Controller', ['$scope', '$q', 'Department.InventoryUpload.Service.Http', '$stateParams', '$state', '$sce', 'API',
  function($scope, $q, Http, $stateParams, $state, $sce, API) {
    $scope.uploadPromise = null;

    $scope.htmlPopover = $sce.trustAsHtml("<table class='table table-hover table-striped '>" +
      "<thead><tr><th>序号</th><th>城市</th><th>GDP(亿元)</th><th>增长</th>" +
      "<th>地方公共财政收入(亿元)</th><th>增长</th><th>城镇登记失业率</th>" +
      "<th>农村居民人均纯收入(元)</th><th>增长</th></tr></thead>" +
      "<tbody><tr><td>1</td><td>成都</td><td>9000</td><td>8.54%</td><td>8000</td><td>7.51%</td>" +
      "<td>1.39</td><td>5678</td><td>3.40%</td></tr>" +
      "</tbody></table>");

    $scope.uploadFile = function() {
      var file = $scope.myFile;
      console.log('file is ');
      console.dir(file);
      if (!file) {
        alert('您还未选择文件');
        return;
      }
      $scope.uploadPromise = Http.uploadExamplesFile(file,$stateParams.ID).then(function(result) {
        if (200 == result.data.head.status) {
          alert('上传成功！');
          $state.go("main.department.inventory", {}, {
            reload: true
          });
        }
        else {
          alert('上传失败，上传文件格式有误！');
        }
      });
    }

    $scope.toIndex = function() {
      $state.go("main.department.inventory", {}, {
        reload: true
      });
    }
  }
])


/* HTTP */
DInventoryUpload.factory('Department.InventoryUpload.Service.Http', ['$http', '$q', 'API',
  function($http, $q, API) {
    var path = API.path;

    function uploadFile(file) {
      var fd = new FormData();
      var uploadUrl = path + '/upload/zipFile';
      fd.append('file', file);
      var promise = $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      });
      return promise;
    }

    function uploadExamplesFile(file,id) {
      var fd = new FormData();
      var uploadUrl = path + '/upload/examples?resource_id=' + id;
      fd.append('file', file);
      var promise = $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      });
      return promise;
    }
    return {
      uploadFile: uploadFile,
      uploadExamplesFile: uploadExamplesFile
    }
  }])


  DInventoryUpload.directive('fileModel', ['$parse', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        scope.parentIvntObj = {};
        element.bind('change', function() {
          var rgx = /(zip)/i;
          var fileSuffix = element[0].files[0].name;
          scope.parentIvntObj.fileName = fileSuffix;
          var ext = fileSuffix.substring(fileSuffix.lastIndexOf(".") + 1);
          if (!rgx.test(ext)) {
            scope.$apply(function() {
              scope.parentIvntObj.fileNameError = true;
            })

          } else {
            scope.parentIvntObj.fileNameError = false;
            scope.$apply(function() {
              modelSetter(scope, element[0].files[0]);
            });
          }

        });
      }
    };
  }]);

  DInventoryUpload.directive('fileModelExcel', ['$parse', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModelExcel);
        var modelSetter = model.assign;
        scope.parentIvntObj = {};
        element.bind('change', function() {
          var rgx = /(xls|xlsx)/i;
          var fileSuffix = element[0].files[0].name;
          scope.parentIvntObj.fileName = fileSuffix;
          var ext = fileSuffix.substring(fileSuffix.lastIndexOf(".") + 1);
          if (!rgx.test(ext)) {
            scope.$apply(function() {
              scope.parentIvntObj.fileNameError = true;
            })

          } else {
            scope.parentIvntObj.fileNameError = false;
            scope.$apply(function() {
              modelSetter(scope, element[0].files[0]);
            });
          }

        });
      }
    };
  }]);
