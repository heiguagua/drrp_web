/** Inventory Controller */
'use strict';
var DInventoryDetail = angular.module('Department.InventoryDetail', ['ui.router', 'ngCookies', 'cgBusy']);

DInventoryDetail.controller('Department.InventoryDetail.Controller', ['$scope', '$q', 'Department.InventoryDetail.Service.Http', '$stateParams', '$state', '$sce', 'API',
  function($scope, $q, Http, $stateParams, $state, $sce, API) {
    var path = API.path;
    console.log($stateParams.item);
    $scope.InfoItemShow = false;
    Http.getDepartInfoResList({
      resource_id: $stateParams.item
    }).then(function(ResourceRes) {
      $scope.InfoResourceDetail = ResourceRes.data.body[0].results[0];
      if($scope.InfoResourceDetail && $scope.InfoResourceDetail.resource_format_name.indexOf('数据库类') > -1) {
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
      }

    })

    // Data Quota Example
    $scope.DataExamples = Http.getResourceExampleDatas({
      resource_id: $stateParams.item
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

DInventoryDetail.directive('wiservExampleData', [
  function() {
    return {
      restrict: 'AE',
      template: "<div style='width:500px;height:400px;position:relative;top:20px'></div>",
      link: function(scope, element, attr) {
        console.log(scope);
        scope.DataExamples.then(function(result) {
          console.log(result);
          if(result.data.body && result.data.body[0] && result.data.body[0].file_content) {
            element.html(result.data.body[0].file_content);
          }
        })
      }
    }
  }
]);
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
            var deptotal = _.size(dataquotaRequirement.depNames) ;
            var resourceName = dataquotaRequirement.resourceName;
            var depNames = dataquotaRequirement.depNames;
            // var data1 = [{name: resourceName, x: 500, y:130 }];
            // var links1 = [{source: resourceName,target: "" }];
            // if(deptotal){
            //    _(depNames).forEach(function (value,key){
            //      console.log(key+":"+value);
            //      var dep_obj = {};
            //      dep_obj.name = value;
            //      dep_obj.x = 600;
            //      dep_obj.y = 100 + (key+1)*20;
            //      data1.push(dep_obj);
            //
            //      var target_obj = {};
            //      target_obj.target = value ;
            //      target_obj.source = resourceName;
            //      links1.push(target_obj);
            //    });
            //    console.log(data1);
            //    console.log(links1);
            //  }
            //  var myChart = echarts.init((element.find('div'))[0]);
            //  var option = {
            //    title: {
            //      text: "对应的需求部门数:"+deptotal+"个"
            //    },
            //    tooltip: {},
            //    animationDurationUpdate: 1500,
            //    animationEasingUpdate: 'quinticInOut',
            //    series : [
            //      {
            //        type: 'graph',
            //        layout: 'none',
            //        symbolSize: 50,
            //        roam: true,
            //        label: {
            //          normal: {
            //            show: true,
            //            position: 'insideLeft'
            //          }
            //        },
            //        edgeSymbol: ['circle', 'arrow'],
            //        edgeSymbolSize: [4, 10],
            //        edgeLabel: {
            //          normal: {
            //            textStyle: {
            //              fontSize: 20
            //            }
            //          }
            //        },
            //        data: data1,
            //        links: links1,
            //        lineStyle: {
            //          normal: {
            //            opacity: 0.9,
            //            width: 2,
            //            curveness: 0.3
            //          }
            //        }
            //      }
            //    ]
            //  };
            var data1 = [{category:0, name: '当前信息资源',  value : 10, label: '当前信息资源'}];
            var links1 = [];
            if(deptotal){
               _(depNames).forEach(function (value,key){
                //  console.log(key+":"+value);
                 var dep_obj = {};
                 dep_obj.category = 1;
                 dep_obj.name = value;
                 dep_obj.value = 2;
                 data1.push(dep_obj);
                 var target_obj = {};
                 target_obj.source = '当前信息资源' ;
                 target_obj.target = value;
                 target_obj.weight = 1;
                 links1.push(target_obj);
               });
             }
             var myChart = echarts.init((element.find('div'))[0]);
             var option = {
               title : {
                    text: '当前信息资源对应的需求部门为'+deptotal+'个',
                    x:'center',
                    y:'top'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: '{a} : {b}'
                },
                // toolbox: {
                //     show : true,
                //     feature : {
                //         restore : {show: true},
                //     }
                // },
                legend: {
                    x: 'left',
                    data:['需求部门']
                },
                series : [
                    {
                        type:'force',
                        name : "当前信息资源-需求部门",
                        ribbonType: false,
                        categories : [
                            {
                                name: '当前信息资源'
                            },
                            {
                                name: '需求部门'
                            }

                        ],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#333'
                                    }
                                },
                                nodeStyle : {
                                    brushType : 'both',
                                    borderColor : 'rgba(255,215,0,0.4)',
                                    borderWidth : 1
                                },

                            },
                            emphasis: {
                                label: {
                                    show: false
                                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                                },
                                nodeStyle : {
                                    //r: 30
                                },
                                linkStyle : {}
                            }
                        },
                        // useWorker: false,
                        minRadius : 15,
                        maxRadius :25,
                        gravity: 1.1,
                        scaling: 1.1,
                        draggable: false,
                        linkSymbol: 'arrow',
                        steps: 10,
                        coolDown: 0.9,
                        roam: 'move',
                        nodes:data1,
                        links : links1
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
