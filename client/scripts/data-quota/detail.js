'use strict';
var DataQuotaDetail = angular.module('DataQuotaDetail', ['ui.router']);

/** Main Controller */
DataQuotaDetail.controller('DataQuotaDetail.Controller.Main', ['$scope', '$state', 'DataQuotaDetail.Service.Http', '$stateParams', '$sce',
  function($scope, $state, Http, $stateParams, $sce) {
    // Data Quota Detail
    Http.getDataQuotaDetailByDepID(
      $stateParams
    ).then(function(result) {
      $scope.DataQuotaDetail = result.data.body[0];
    });
    // Data Quota Example
    Http.getDataQuotaExampleByDepID(
      {resource_id: $stateParams.resource_id}
    ).then(function(result) {
      $scope.DataQuotaExample = result.data.body;
    });

    <!--informationResource required by deps-->
    $scope.DataquotaRequirementByDepTotals = Http.getDataQuotaRequirementByDepTotals(
      {resource_id: $stateParams.resource_id}
    );
    <!-- Data Quota Example-->
    Http.getResourceExampleByDepID({
      resource_id: $stateParams.resource_id
    }).then(function(result) {
      $scope.DataQuotaExample = result.data.body;
      $scope.detailFrame = $sce.trustAsResourceUrl('http://www.sohu.com');

    });

  }
]);


/* HTTP Factory */
DataQuotaDetail.factory('DataQuotaDetail.Service.Http', ['$http', 'API',
  function($http, API) {
    var path = API.path;
    function getDataQuotaDetailByDepID(params){
      return $http.get(
        path + '/info_resource_detail', { params: params }
      )
    };
    function getDataQuotaExampleByDepID(params){
      return $http.get(
        path + '/info_item_detail', { params: params }
      )
    };
    function getDataQuotaRequirementByDepTotals(params){
      return $http.get(
        path + '/info_item_requirementDeps', { params: params }
      )
    };
    function getResourceExampleByDepID(params) {
      return $http.get(
        path + '/info_item_detail', {
          params: params
        }
      )
    };
    return {
      getDataQuotaDetailByDepID: getDataQuotaDetailByDepID,
      getDataQuotaExampleByDepID: getDataQuotaExampleByDepID,
      getDataQuotaRequirementByDepTotals: getDataQuotaRequirementByDepTotals,
      getResourceExampleByDepID: getResourceExampleByDepID
    }
  }
]);
DataQuotaDetail.directive('requirementDepatmentRelationship',[
  function(){
    return {
      restrict: 'AE',
      template: "<div style='width:500px;height:400px;position:relative;top:20px'></div>",
      link: function(scope, element, attr){
        scope.DataquotaRequirementByDepTotals.then(function(result) {
          if (200 == result.data.head.status) {
            var dataquotaRequirement = result.data.body[0];
            var deptotal = _.size(dataquotaRequirement.depNames) ;
            var resourceName = dataquotaRequirement.resourceName;
            var depNames = dataquotaRequirement.depNames;
            var obj = {name: resourceName, x: 500, y:100 };
            var obj1 = {source: resourceName,target: "" };
            var data1 = [{name: resourceName, x: 500, y:100 }];
            var links1 = [{source: resourceName,target: "" }];
            if(deptotal){
               _(depNames).forEach(function (value,key){
                 console.log(key+":"+value);
                 obj.name = value;
                 obj.x = 600;
                 obj.y = 100 + (key+1)*20;
                 data1.push(obj);
                 obj1.target = value ;
                 links1.push(obj1);
               });
               console.log(data1);
               console.log(links1);
             }
             var myChart = echarts.init((element.find('div'))[0]);
             var option = {
               title: {
                 text: "信息资源：'"+resourceName+"'对应的需求部门数:"+deptotal+"个"
               },
               tooltip: {},
               animationDurationUpdate: 1500,
               animationEasingUpdate: 'quinticInOut',
               series : [
                 {
                   type: 'graph',
                   layout: 'none',
                   symbolSize: 50,
                   roam: true,
                   label: {
                     normal: {
                       show: true
                     }
                   },
                   edgeSymbol: ['circle', 'arrow'],
                   edgeSymbolSize: [4, 10],
                   edgeLabel: {
                     normal: {
                       textStyle: {
                         fontSize: 20
                       }
                     }
                   },
                   data: data1,
                   links: links1,
                   lineStyle: {
                     normal: {
                       opacity: 0.9,
                       width: 2,
                       curveness: 0.3
                     }
                   }
                 }
               ]
             };
             myChart.setOption(option);
          }
        });
      }
    }
  }
]);
