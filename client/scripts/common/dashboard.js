'use strict';
var Dashboard = angular.module('Dashboard', ['ui.router','ui.bootstrap']);

/** Dashboard Controller */
Dashboard.controller('Dashboard.Controller.Main', ['$cookies', '$scope', 'Dashboard.Service.Http', 'Dashboard.Requirement.Service.Component',
  function($cookies,$scope, Http, Component) {

    <!--user infomation-->
    var LoginUser = JSON.parse($cookies.get('User'));
    var DEP_ID = LoginUser.dep_id;

    <!-- Bureaus logo grid -->
    Http.getDepartments().then(function(result) {
      if (200 == result.data.head.status) {
        $scope.Bureaus = result.data.body;
      }
    });
    <!-- #Bureaus logo grid -->

    <!-- ECharts -->
    $scope.DataquotaSummary = Http.getDataquotaSummary();
    $scope.DataRequirementSummary = Http.getDataRequirementSummary();
    Http.getDataquotaSummary().then(function(result){
      $scope.SummaryDataQuota = result.data.body[0];
    });
    Http.getDataRequirementSummary().then(function(result){
      $scope.SummaryRequirement = result.data.body[0];
    });
    <!-- #ECharts -->

    <!-- DataQuota & Requirement Summary -->
    Http.getDataQuotaNew({
      skip: 0, limit: 7
    }).then(function(result) {
      if (200 == result.data.head.status) {
        $scope.NewIndicators = result.data.body;
      }
    });

    //init
    getDataRequirementNew();
    function getDataRequirementNew() {
      Http.getDataRequirementNew({
        skip: 0, limit: 7, response_dep_id: DEP_ID
      }).then(function(result) {
        if(200 == result.data.head.status){
          $scope.Requirements = result.data.body[0].results;
        }
      });
    }

    // Handle Selected Department
    $scope.select = function(param){
      $scope.departmentID = {resource_dep_id: param};
      Http.getDataQuota({
        skip: 0, limit: 5,  dep_name: param
      }).then(function(result){
          $scope.followDepIndicators = result.data.body[0].results;
      });
    }

    Http.getDeptInfoResourceList().then(function(result) {
      console.log(result);
      $scope.depInfoResourceList = result.data.body;

      //  $scope.Paging.totalItems = data.head.total;
    });


    // 点击展开
    $scope.openItems = function(index, resourceId) {
      $scope.collapseIndex = index;
      $scope.closeShow = true;
      $scope.showIndex = index;
      $scope.InfoItems = [];
      Http.getInfoItemList({
        resource_id: resourceId
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

    //confirm
    $scope.RequirementConfirm = function(requirement) {
      // get requirement detail
      $scope.Modal ={};
      $scope.Modal.ReqDetail = requirement;
      // 初始化选项状态
      $scope.Modal.ReqResponse = {};
      $scope.resourceItemSelection = [];
      $scope.resourceSelection = [];
      $scope.resource_id = null;
      $scope.closeShow = false;
      $scope.showIndex = -1;
      $scope.collapseIndex = -1;

      if ($scope.depInfoResourceList.length == 0) {
        $scope.Modal.ReqResponse.resource_id = '';
        $scope.errorMsg = '本部门还未发布任何信息资源';
        $scope.dataQuotaIdNull = true;
      }
      // else{
      //   $scope.Modal.ReqResponse.resource_id = _.map($scope.outputResource,'id');
      // }

      Component.popModalConfirm($scope, '', 'confirm-req-modal').result.then(function() {
        $scope.Modal.ReqResponse.resource_id = $scope.resource_id;

        console.log($scope.Modal.ReqResponse);
        console.log($scope.resourceItemSelection);
        $scope.Modal.ReqResponse.requiement_id = item.id;

        Http.updateRequirement($scope.Modal.ReqResponse).then(function(result) {
          if (200 == result.data.head.status) {
            if ($scope.Modal.ReqResponse.status == 1) {
              var http_params = [];
              if($scope.resourceItemSelection.length == 0) {
                var obj = {};
                obj.requiement_id = item.id;
                obj.resource_id = $scope.Modal.ReqResponse.resource_id,
                obj.item_id = '';
                http_params.push(obj);
              }
              else{
                _($scope.resourceItemSelection).forEach(function(value) {
                  var obj = {};
                  obj.requiement_id = item.id;
                  obj.resource_id = $scope.Modal.ReqResponse.resource_id,
                  obj.item_id = value;
                  http_params.push(obj);
                });
              }
              // 保存需求响应
              Http.saveReqResponse(http_params).then(function(saveResult) {
                if (200 == saveResult.data.head.status) {
                  alert('保存成功！');
                  getDataRequirementNew();
                } else {
                  alert('保存失败！');
                  getDataRequirementNew();
                }
              })
            } else {
              alert('保存成功！');
              getDataRequirementNew();
            }

          } else {
            alert('保存失败');
          }
        })
      });
    }


    // Generoted Department
    Http.getUserDep().then(function(result) {
        if (200 === result.data.head.status && result.data.body.length >= 1) {
          $scope.followDeps = result.data.body;
          return result.data.body[0].id;
        }else{
          return 0;
        }
      }).then(function(followDepId){
        Http.getDataQuota({
          skip: 0,
          limit: 5,
          dep_name: followDepId
        }).then(function(result){
          $scope.followDepIndicators = result.data.body[0].results;
        });
     });

 }
])

/* HTTP Factory */
Dashboard.factory('Dashboard.Service.Http', ['$http', 'API',
  function($http, API) {
    var path = API.path;

    // 需求确认修改状态
    function updateRequirement(data) {
      return $http.put(
        path + '/data_requiement_ok', {
          data: data
        }
      )
    }
    function saveReqResponse(data) {
      return $http.post(
        path + '/data_requiement_response', {
          data: data
        }
      )
    }
    function getDataQuotaNew(params) {
      return $http.get(
        path + '/data_resource/new', {params: params}
      )
    };
    function getDataRequirementNew(params) {
      return $http.get(
        path + '/data_requiement', {params: params}
      )
    };
    function getDepartments() {
      return $http.get(
        path + '/sys_dep'
      )
    };
    function getDataquotaSummary(){
      return $http.get(
        path + '/data_resource/summary'
      )
    };
    function getDataRequirementSummary(){
      return $http.get(
        path + '/data_requiement/summary'
      )
    };
    function getUserDep(params){
      return $http.get(
        path + '/department',{params: params}
      )
    };
    function getDataQuota(params){
      return $http.get(
        path + '/data_quota',{params: params}
      )
    };

    function getDeptInfoResourceList(params) {
      return $http.get(
        path + '/dep_resource_list', {
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
      updateRequirement: updateRequirement,
      saveReqResponse: saveReqResponse,
      getDataQuotaNew: getDataQuotaNew,
      getDataRequirementNew: getDataRequirementNew,
      getDepartments: getDepartments,
      getDataquotaSummary: getDataquotaSummary,
      getDataRequirementSummary: getDataRequirementSummary,
      getUserDep: getUserDep,
      getDataQuota: getDataQuota,
      getDeptInfoResourceList: getDeptInfoResourceList,
      getInfoItemList: getInfoItemList
    };

  }
]);

/** Dashboard Directive */
Dashboard.directive('wiservDataQuotaOverviewChart', [
  function() {
    return {
      restrict: 'AE',
      template: "<div style='width:300;height:215px;position:relative;top:-1px'></div>",
      link: function(scope, element, attr) {
        scope.DataquotaSummary.then(function(result) {
          if (200 == result.data.head.status) {
            var summary = result.data.body[0];
            var myChart = echarts.init((element.find('div'))[0]);
          //   var option = {
          //     tooltip: {
          //       trigger: 'item',
          //       formatter: "{a} <br/>{b}: {c} ({d}%)"
          //     },
          //     series: [{
          //       name: '资源提供部门',
          //       type: 'pie',
          //       // selectedMode: 'single',
          //       radius: [0, '45%'],
          //       label: {
          //         normal: {
          //           position: 'inner',
          //           textStyle :{
          //               color:'#FFAD38'
          //             }
          //         }
          //       },
          //       labelLine: {
          //         normal: {
          //           show: true
          //         }
          //       },
          //       data: [{
          //         value: (summary) ? (summary.dep_resource): '0' ,
          //         name: '提供部门'
          //       }, {
          //         value: (summary) ? (summary.month_increment_dpet_resource) : '0' ,
          //         name: '本月新增',
          //         selected: true
          //       }]
          //     }, {
          //       name: '资源总数',
          //       type: 'pie',
          //       radius: ['60%', '67%'],
          //       data: [{
          //         value: (summary) ? (summary.total_resource) : '0',
          //         name: '资源总数'
          //       }, {
          //         value: (summary) ? (summary.month_increment_resource) : '0',
          //         name: '本月新增',
          //         selected: true
          //       }]
          //     }]
          //   };
          //   myChart.setOption(option);
            var option = {
              tooltip : {
                  formatter: "{a} <br/>{c} {b}"
              },
              series : [
                  {
                      name: '资源总数',
                      type: 'gauge',
                      center: ['69%', '55%'],    // 默认全局居中
                      z: 3,
                      min: 0,
                      max: ((220-summary.total_resource)<50)? (summary.total_resource+50) : 220,
                      splitNumber: 11,
                      radius: '90%',
                      axisLine: {            // 坐标轴线
                          lineStyle: {       // 属性lineStyle控制线条样式
                              width: 10
                          }
                      },
                      axisTick: {            // 坐标轴小标记
                          length: 15,        // 属性length控制线长
                          lineStyle: {       // 属性lineStyle控制线条样式
                              color: 'auto'
                          }
                      },
                      splitLine: {           // 分隔线
                          length: 20,         // 属性length控制线长
                          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                              color: 'auto'
                          }
                      },
                      pointer: {
                          width:3
                      },
                      title : {
                        offsetCenter: [0, '-10%'],       // x, y，单位px
                      },
                      detail : {
                          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                              fontWeight: ''
                          }
                      },
                      data:[{
                        value: (summary) ? (summary.total_resource) : 0 ,
                        name: '/条'
                    }]
                  },
                  {
                      name: '本月新增',
                      type: 'gauge',
                      center: ['23%', '65%'],    // 默认全局居中
                      radius: '65%',
                      min:0,
                      max:((70-summary.month_increment_resource)<10)? (summary.month_increment_resource+10) : 70,
                      endAngle:20,
                      splitNumber:7,
                      axisLine: {            // 坐标轴线
                          lineStyle: {       // 属性lineStyle控制线条样式
                              width: 8
                          }
                      },
                      axisTick: {            // 坐标轴小标记
                          length:12,        // 属性length控制线长
                          lineStyle: {       // 属性lineStyle控制线条样式
                              color: 'auto'
                          }
                      },
                      splitLine: {           // 分隔线
                          length:20,         // 属性length控制线长
                          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                              color: 'auto'
                          }
                      },
                      pointer: {
                          width:3
                      },
                      title: {
                          offsetCenter: [0, '-10%'],       // x, y，单位px
                      },
                      detail: {
                      },
                      data:[{
                        value:(summary) ? (summary.month_increment_resource) : 0,
                        name: '/条'
                      }]
                  }

              ]
            };
            myChart.setOption(option);
            // app.timeTicket = setInterval(function (){
            //     option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
            //     option.series[1].data[0].value = (Math.random()*7).toFixed(2) - 0;
            //     option.series[2].data[0].value = (Math.random()*2).toFixed(2) - 0;
            //     option.series[3].data[0].value = (Math.random()*2).toFixed(2) - 0;
            //     myChart.setOption(option,true);
            // },2000);
          }
        });
      }
    };
  }
]);


Dashboard.directive('wiservRequirementOverviewChart', [
  function() {
    return {
      restrict: 'AE',
      template: "<div style='width:300;height:215px;position:relative;top:-1px'></div>",
      link: function(scope, element, attr) {
        scope.DataRequirementSummary.then(function(result) {
          if (200 == result.data.head.status) {
            var summary = result.data.body[0];
            var myChart = echarts.init((element.find('div'))[0]);
            // var option = {
            //   tooltip: {
            //     trigger: 'item',
            //     formatter: "{a} <br/>{b}: {c} ({d}%)"
            //   },
            //   series: [{
            //     name: '涉及部门',
            //     type: 'pie',
            //     // selectedMode: 'single',
            //     radius: [0, '45%'],
            //     label: {
            //       normal: {
            //         position: 'inner',
            //         textStyle :{
            //             color:'#FFAD38'
            //           }
            //       }
            //     },
            //     labelLine: {
            //       normal: {
            //         show: false
            //       }
            //     },
            //     data: [{
            //       value: (summary) ? (summary.department_number) : '0',
            //       name: '涉及部门'
            //     }, {
            //       value: (summary) ? (summary.department_number) : '0',
            //       name: '本月新增',
            //       selected: true
            //     }]
            //   }, {
            //     name: '需求总数',
            //     type: 'pie',
            //     radius: ['60%', '67%'],
            //     data: [{
            //       value: (summary) ? (summary.requiement_number) : '0',
            //       name: '需求总数'
            //     }, {
            //       value: (summary) ? (summary.requiement_number_inc) : '0',
            //       name: '本月新增',
            //       selected: true
            //     }]
            //   }]
            // };
            // myChart.setOption(option);
            var option = {
              tooltip : {
                  formatter: "{a} <br/>{c} {b}"
              },
              series : [
                  {
                      name: '需求总数',
                      type: 'gauge',
                      center: ['69%', '55%'],    // 默认全局居中
                      z: 3,
                      min: 0,
                      max: ((220-summary.requiement_number)<50)? (summary.requiement_number+50) : 220,
                      splitNumber: 11,
                      radius: '90%',
                      axisLine: {            // 坐标轴线
                          lineStyle: {       // 属性lineStyle控制线条样式
                              width: 10
                          }
                      },
                      axisTick: {            // 坐标轴小标记
                          length: 15,        // 属性length控制线长
                          lineStyle: {       // 属性lineStyle控制线条样式
                              color: 'auto'
                          }
                      },
                      splitLine: {           // 分隔线
                          length: 20,         // 属性length控制线长
                          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                              color: 'auto'
                          }
                      },
                      pointer: {
                          width:3
                      },
                      title : {
                        offsetCenter: [0, '-10%'],       // x, y，单位px
                      },
                      detail : {
                          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                              fontWeight: ''
                          }
                      },
                      data:[{
                        value: (summary) ? (summary.requiement_number) : 0,
                        name: '/条'
                    }]
                  },
                  {
                      name: '本月新增',
                      type: 'gauge',
                      center: ['23%', '65%'],    // 默认全局居中
                      radius: '65%',
                      min:0,
                      max:((70-summary.requiement_number_inc)<10)? (summary.requiement_number_inc+10) : 70,
                      endAngle:20,
                      splitNumber:7,
                      axisLine: {            // 坐标轴线
                          lineStyle: {       // 属性lineStyle控制线条样式
                              width: 8
                          }
                      },
                      axisTick: {            // 坐标轴小标记
                          length:12,        // 属性length控制线长
                          lineStyle: {       // 属性lineStyle控制线条样式
                              color: 'auto'
                          }
                      },
                      splitLine: {           // 分隔线
                          length:20,         // 属性length控制线长
                          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                              color: 'auto'
                          }
                      },
                      pointer: {
                          width:3
                      },
                      title: {
                          offsetCenter: [0, '-10%'],       // x, y，单位px
                      },
                      detail: {
                      },
                      data:[{
                        value:(summary) ? (summary.requiement_number_inc) : 0,
                        name: '/条'
                      }]
                  }

              ]
            };
            myChart.setOption(option);
          }
        });
      }
    };
  }
]);

Dashboard.directive('wiservStatisticChart', [
  function() {
    return {
      restrict: 'AE',
      template: "<div style='width:100%;height:240px;'></div>",
      link: function(scope, element, attr) {
        scope.QInventoryStatistic.then(function(result) {
          var DEPARTMENT = result.data.body[0];
          var INVENTORY = result.data.body[1];
          var REQUIREMENT = result.data.body[2];
          var myChart = echarts.init((element.find('div'))[0]);
          var option = {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['资源', '需求']
            },
            xAxis: [{
              type: 'category',
              name: '数量',
              data: DEPARTMENT.DEPARTMENT
            }],
            yAxis: [{
              type: 'value',
              name: '单位',
              min: 0,
              max: 30,
              interval: 30,
              axisLabel: {
                formatter: '{value} 个'
              }
            }],
            series: [{
              name: '资源',
              type: 'bar',
              data: INVENTORY.INVENTORY
            }, {
              name: '需求',
              type: 'bar',
              data: REQUIREMENT.REQUIREMENT
            }]
          };
          myChart.setOption(option);
        });

      }
    };
  }
]);

/* Component */
Dashboard.service('Dashboard.Requirement.Service.Component', ['$uibModal',
  function($uibModal) {
    // prompt Alert
    function popAlert(scope, info) {
      scope.Alerts = [{
        type: info.type,
        message: info.message,
        timeout: 1200
      }];
      scope.CloseAlert = function(index) {
        scope.Alerts.splice(index, 1);
      };
    };
    // prompt Modal for confirm
    function popModalConfirm(scope, type, templateUrl) {
      scope.Modal.type = type;
      var modalInstanceConfirm = $uibModal.open({
        animation: true,
        backdrop: 'static',
        templateUrl: templateUrl + '.html',
        scope: scope,
        size: 'lg'
      });
      scope.Modal.confirm = function(isValid) {
        console.log(scope);
        if(!scope.confirmParent.outputResource[0] && scope.Modal.ReqResponse.status == 1) {
          scope.errorMsg = '请选择信息资源！';
          isValid = false;
        }
        if (isValid) {
          modalInstanceConfirm.close(scope.Modal);
        } else {
          return;
        }

      };
      scope.Modal.cancel = function() {
        modalInstanceConfirm.dismiss();
      };
      return modalInstanceConfirm;
    };
    // prompt Modal
    function popModal(scope, type, templateUrl) {
      scope.Modal.type = type;
      var modalInstance = $uibModal.open({
        animation: true,
        backdrop: 'static',
        templateUrl: templateUrl + '.html',
        scope: scope,
        size: 'lg'
      });
      scope.Modal.confirm = function(isValid) {
        console.log(scope);
        scope.submitted = true;
        if(scope.reqParent.outputDeptList.length == 0) {
          scope.error = true;
        }
        else if(scope.shareFreqSelection.length == 0) {
        }
        else {
          modalInstance.close(scope.Modal);
        }

      };
      scope.Modal.cancel = function() {
        modalInstance.dismiss();
      };
      return modalInstance;
    };

    return {
      popAlert: popAlert,
      popModal: popModal,
      popModalConfirm: popModalConfirm
    }
  }
])
