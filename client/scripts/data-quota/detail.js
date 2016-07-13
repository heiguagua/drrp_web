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

    // 示例数据
    $scope.DataExamples = Http.getResourceExampleDatas({
      resource_id: $stateParams.resource_id
    });
    <!--informationResource required by deps-->
    $scope.DataquotaRequirementByDepTotals = Http.getDataQuotaRequirementByDepTotals(
      {resource_id: $stateParams.resource_id}
    );

  }
]);


/* HTTP Factory */
DataQuotaDetail.factory('DataQuotaDetail.Service.Http', ['$http', 'API',
  function($http, API) {
    var path = API.path;
    function getResourceExampleDatas(params) {
      return $http.get(
        path + '/info_resource_examples', {
          params: params
        }
      )
    };
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
      getResourceExampleDatas: getResourceExampleDatas,
      getDataQuotaDetailByDepID: getDataQuotaDetailByDepID,
      getDataQuotaExampleByDepID: getDataQuotaExampleByDepID,
      getDataQuotaRequirementByDepTotals: getDataQuotaRequirementByDepTotals,
    }
  }
]);

DataQuotaDetail.directive('wiservExampleDataShow', [
  function() {
    return {
      restrict: 'AE',
      template: "<div style='width:500px;height:400px;position:relative;top: -9px;'></div>",
      link: function(scope, element, attr) {
        console.log(scope);
        scope.DataExamples.then(function(result) {
          console.log(result);
          if(result.data.body[0]){
            element.html(result.data.body[0].file_content);
          }
        })
      }
    }
  }
]);
DataQuotaDetail.directive('requirementDepatmentRelationship',[
  function(){
    return {
      restrict: 'AE',
      template: "<div style='width:900px;height:400px;position:relative;top:20px;text-overflow:ellipsis'></div>",
      link: function(scope, element, attr){
        scope.DataquotaRequirementByDepTotals.then(function(result) {
          if (200 == result.data.head.status) {
            var dataquotaRequirement = result.data.body[0];
            var deptotal = _.size(dataquotaRequirement.depNames) ;
            var resourceName = dataquotaRequirement.resourceName;
            var depNames = dataquotaRequirement.depNames;
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
                 target_obj.target = '当前信息资源' ;
                 target_obj.source = value;
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
