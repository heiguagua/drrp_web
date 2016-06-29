'use strict';
var DataQuotaDetail = angular.module('DataQuotaDetail', ['ui.router']);

/** Main Controller */
DataQuotaDetail.controller('DataQuotaDetail.Controller.Main', ['$scope', '$state', 'DataQuotaDetail.Service.Http', '$stateParams',
  function($scope, $state, Http, $stateParams) {
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

    //informationResource required by deps
    // $scope.DataquotaRequirementByDepTotals = Http.getDataQuotaRequirementByDepTotals(
    //   {resource_id: $stateParams.resource_id}
    // );


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
    return {
      getDataQuotaDetailByDepID: getDataQuotaDetailByDepID,
      getDataQuotaExampleByDepID: getDataQuotaExampleByDepID,
      getDataQuotaRequirementByDepTotals: getDataQuotaRequirementByDepTotals
    }
  }
]);
DataQuotaDetail.directive('requirementDepatmentRelationship',[
  function(){
    return {
      restrict: 'AE',
      template: "<div style='width:500px;height:400px;position:relative;top:8px'></div>",
      link: function(scope, element, attr){
        // scope.DataquotaRequirementByDepTotals.then(function(result) {
        //   if (200 == result.data.head.status) {
        //     var dataquotaRequirement = result.data.body[0];
        //     vat deptotal = dataquotaRequirement.deptotal;
        //     vat resourceName = dataquotaRequirement.resourceName;
        //     vat depNames = dataquotaRequirement.depNames;
        //     var obj = {name: resourceName,x: 500 y:100 };
        //     var obj1 = {source: resourceName,target: "" };
        //     var data1 = [obj];
        //     var lingks1 = [obj1];
        //     if(deptotal){
        //        depNames.forEach(function (i,item){
        //          console.log("d");
        //          obj.name = item;
        //          obj.x = 600;
        //          obj.y = 100 + (i+1)*20;
        //          data1.push(obj);
        //          obj1.target = item ;
        //          lingks1.push(obj1);
        //        })
        //        console.log(data1);
        //        console.log(lingks1);
        //     }
        //   }
        // }
        var data1 = [{name: "资源1", x: 500, y: 100 },{name: "节点2", x: 600,  y: 120 },{name: "节点3", x: 600,  y: 140 }];
        var links1 = [{source: "资源1", target: "节点1" },
                      {source: "资源1", target: "节点2" },
                      {source: "资源1", target: "节点3"}];
        var myChart = echarts.init((element.find('div'))[0]);
        var option = {
            title: {
                text: '信息资源对应的需求部门数'
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
    }
  }
]);
