/** Inventory Controller */
'use strict';
var DInventoryDetail = angular.module('Department.InventoryDetail', ['ui.router', 'ngCookies', 'cgBusy']);

DInventoryDetail.controller('Department.InventoryDetail.Controller', ['$scope', '$q', 'Department.InventoryDetail.Service.Http', '$stateParams', '$state','$sce', 'API',
  function($scope, $q, Http, $stateParams, $state,$sce ,API) {
    var path = API.path;
    console.log($stateParams.item);
    $scope.InfoItemShow = false;
    Http.getDepartInfoResList({
      resource_id: $stateParams.item
    }).then(function(ResourceRes) {
      $scope.InfoResourceDetail = ResourceRes.data.body[0].results[0];
      Http.getInfoItemList({
        resource_id: $scope.InfoResourceDetail.id
      }).then(function(result) {
        if (result.data.body.length == 0) {
          $scope.InfoItemShow = false;
        } else {
          $scope.InfoItemShow = true;
          $scope.InfoItems = result.data.body;

          _($scope.InfoItems).forEach(function(item) {
            var shareFreqDictName = [];
            _(item.config).forEach(function(config) {
              shareFreqDictName.push(config.dict_name);
            })
            item.update_period_name = shareFreqDictName.toString();
          })
        }
      })
    })

    // Data Quota Example
    Http.getResourceExampleDatas({
      resource_id: $stateParams.item
    }).then(function(result) {
      if (200 == result.data.head.status) {
        if(result.data.body[0]) {
          $scope.detailFrame = result.data.body[0].file_content;
        }
      }
    });


    // // 获取需求拓扑图
    $scope.ResourceReqByDepTotals = Http.getResourceRequirementByDepTotals({
      resource_id: $stateParams.item
    });

  }
])

DInventoryDetail.factory('Department.InventoryDetail.Service.Http', ['$http', '$q', 'API',
  function($http, $q, API) {
    var path = API.path;

    function getResourceExampleDatas(params) {
      return $http.get(
        path + '/info_resource_examples', {
          params: params
        }
      )
    };

    function getResourceRequirementByDepTotals(params) {
      return $http.get(
        path + '/info_item_requirementDeps', {
          params: params
        }
      )
    };

    function getDepartInfoResList(params) {
      return $http.get(
        path + '/info_resource_list', {
          params: params
        }
      )
    }

    function getInfoItemList(params) {
      return $http.get(
        path + '/allitem_detail', {
          params: params
        }
      )
    }
    return {
      getResourceExampleDatas: getResourceExampleDatas,
      getResourceRequirementByDepTotals: getResourceRequirementByDepTotals,
      getDepartInfoResList: getDepartInfoResList,
      getInfoItemList: getInfoItemList
    }
  }
])

DInventoryDetail.directive('wiservReqdepRelationship', [
  function() {
    return {
      restrict: 'AE',
      template: "<div style='width:900px;height:400px;position:relative;top:20px'></div>",
      link: function(scope, element, attr) {
        console.log(scope);
        scope.ResourceReqByDepTotals.then(function(result) {
          if (200 == result.data.head.status) {
            var dataquotaRequirement = result.data.body[0];
            var deptotal = _.size(dataquotaRequirement.depNames);
            var resourceName = dataquotaRequirement.resourceName;
            var depNames = dataquotaRequirement.depNames;
            var obj = {
              name: resourceName,
              x: 500,
              y: 100
            };
            var obj1 = {
              source: resourceName,
              target: ""
            };
            var data1 = [{
              name: resourceName,
              x: 500,
              y: 100
            }];
            var links1 = [{
              source: resourceName,
              target: ""
            }];
            if (deptotal) {
              _(depNames).forEach(function(value, key) {
                console.log(key + ":" + value);
                obj.name = value;
                obj.x = 600;
                obj.y = 100 + (key + 1) * 20;
                data1.push(obj);
                obj1.target = value;
                links1.push(obj1);
              });
              console.log(data1);
              console.log(links1);
            }
            var myChart = echarts.init((element.find('div'))[0]);
            var option = {
              title: {
                text: "'"+resourceName+"'对应的需求部门数:"+deptotal+"个"
              },
              tooltip: {},
              animationDurationUpdate: 1500,
              animationEasingUpdate: 'quinticInOut',
              series: [{
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
              }]
            };
            myChart.setOption(option);
          }
        });
      }
    }
  }
]);
