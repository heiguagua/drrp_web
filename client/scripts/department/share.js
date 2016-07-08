'use strict';
var DepartmentShare = angular.module('DepartmentShare', ['ui.router']);

/** InventoryDetail Controller */
DepartmentShare.controller('DepartmentShare.Controller.Main', [ '$scope', 'DepartmentShare.Service.Http',
  function( $scope, Http) {
    $scope.DepartInfoResource = {};

    $scope.Paging = {};
    $scope.Paging.currentPage = 1;
    $scope.Paging.maxSize = 5;
    $scope.Paging.itemsPerPage = 10;

    var _httpParams = {};
    _httpParams.limit = 10;
    _httpParams.skip = 0;

    $scope.Paging.pageChanged = function() {
      _httpParams.skip = ($scope.Paging.currentPage - 1)*_httpParams.limit;
      getDepartmentShareList(_httpParams);
    }

    function getDepartmentShareList(_httpParams) {
      $scope.sharePromise = Http.shareInfoResourceList(_httpParams).then(function(result) {
        $scope.depShareList = result.data.body[0].results;
        $scope.resourceCount = result.data.body[0].count[0].resource_count;
        $scope.Paging.totalItems = result.data.body[0].count[0].resource_count;
      });
    }

    //init
    getDepartmentShareList(_httpParams);

    // resource format all
    $scope.getResFormatAll = function() {
      $scope.resFormatMainSelection = [];
      _httpParams.re_format = null;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDepartmentShareList(_httpParams);
    }

    // share level all
    $scope.getShareLevelAll = function() {
      $scope.shareLvMainSelection = [];
      _httpParams.share_level = null;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDepartmentShareList(_httpParams);
    }

    // social open all
    $scope.getSocialOpenAll = function() {
      $scope.socialOpenMainSelection = [];
      _httpParams.social_open_flag = null;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDepartmentShareList(_httpParams);
    }

    // share frequency all
    $scope.getShareFreqAll = function() {
      $scope.shareFreqSelection = [];
      _httpParams.update_period = null;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDepartmentShareList(_httpParams);
    }

    // secret flag all
    $scope.getSecretFlagAll = function() {
      $scope.secretFlagMainSelection = [];
      _httpParams.issecret = null;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDepartmentShareList(_httpParams);
    }

    // filter by resource format
    $scope.resFormatMainSelection = [];
    $scope.getInfoResourceByResFormat = function(item) {
      var idx = $scope.shareFreqSelection.indexOf(item.id);
      if (idx > -1) {
        $scope.resFormatMainSelection = [];
      } else {
        $scope.resFormatMainSelection = item.id;
      }
      _httpParams.re_format = $scope.resFormatMainSelection;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDepartmentShareList(_httpParams);
    }

    // filter by share frequency
    $scope.shareFreqSelection = [];
    $scope.getInfoResourceListBySF = function(item) {
      var idx = $scope.shareFreqSelection.indexOf(item.id);
      if (idx > -1) {
        $scope.shareFreqSelection.splice(idx, 1);
      } else {
        $scope.shareFreqSelection.push(item.id);
      }
      _httpParams.update_period = $scope.shareFreqSelection;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDepartmentShareList(_httpParams);
    }

    // filter by share level
    $scope.shareLvMainSelection = [];
    $scope.getInfoResourceListBySl = function(item) {
      var idx = $scope.shareLvMainSelection.indexOf(item.id);
      if (idx > -1) {
        $scope.shareLvMainSelection = [];
      } else {
        $scope.shareLvMainSelection = item.id;
      }
      _httpParams.share_level = $scope.shareLvMainSelection;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDepartmentShareList(_httpParams);
    }

    // filter by social open flag
    $scope.socialOpenMainSelection = [];
    $scope.getInfoResourceListBySO = function(item) {
      var idx = $scope.socialOpenMainSelection.indexOf(item.dict_code);
      if (idx > -1) {
        $scope.socialOpenMainSelection = [];
      } else {
        $scope.socialOpenMainSelection = item.dict_code;
      }
      _httpParams.social_open_flag = $scope.socialOpenMainSelection;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDepartmentShareList(_httpParams);
    }

    // filter by secret flag
    $scope.secretFlagMainSelection = [];
    $scope.getInfoResourceListBySecFlag = function(item) {
      var idx = $scope.secretFlagMainSelection.indexOf(item.id);
      if (idx > -1) {
        $scope.secretFlagMainSelection = [];
      } else {
        $scope.secretFlagMainSelection = item.id;
      }
      _httpParams.issecret = $scope.secretFlagMainSelection;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDepartmentShareList(_httpParams);
    }


    // get spatial all
    $scope.getSpatialAll = function() {
      $scope.areaMainSelection = [];
      _httpParams.area_level = null;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDepartmentShareList(_httpParams);
    }

    // filter by partial
    $scope.areaMainSelection = [];
    $scope.getInfoResourceListByAP = function(item) {
      var idx = $scope.areaMainSelection.indexOf(item.id);
      // is currently selected
      if (idx > -1) {
        $scope.areaMainSelection.splice(idx, 1);
      }
      // is newly selected
      else {
        $scope.areaMainSelection.push(item.id);
      }

      _httpParams.area_level = $scope.areaMainSelection;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDepartmentShareList(_httpParams);
    }

    // search by name
    $scope.searchDeptInfoResourceByName = function() {
      _httpParams.resource_name = $scope.DepartInfoResource.resource_name_filter;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDepartmentShareList(_httpParams);
    }

    var SHARE_FREQUENCY = 1;
    var DATA_LEVEL = 2;
    var SHARE_LEVEL = 3;
    var SECRET_FLAG = 5;
    var RESOURCE_FORMAT = 11;
    var SOCIAL_OPEN_FLAG = 14;
    // Get system dict
    Http.getSystemDictByCatagory({
      'dict_category': SECRET_FLAG
    }).then(function(result) {
      $scope.secretFlagList = result.data.body;
    });

    // Get system dict
    Http.getSystemDictByCatagory({
      'dict_category': SHARE_FREQUENCY
    }).then(function(result) {
      $scope.shareFrequencyList = result.data.body;
    });

    Http.getSystemDictByCatagory({
      'dict_category': SHARE_LEVEL
    }).then(function(result) {
      $scope.shareLevelList = result.data.body;
    });

    Http.getSystemDictByCatagory({
      'dict_category': RESOURCE_FORMAT
    }).then(function(result) {
      $scope.resourceFormatList = result.data.body;
    });

    Http.getSystemDictByCatagory({
      'dict_category': DATA_LEVEL
    }).then(function(result) {
      $scope.dataLevelList = result.data.body;
    });

    Http.getSystemDictByCatagory({
      'dict_category': SOCIAL_OPEN_FLAG
    }).then(function(result) {
      $scope.socialOpenList = result.data.body;
    });

  }
])


// Department share detail controller
DepartmentShare.controller('DepartmentShare.Controller.detail', [ '$scope', 'DepartmentShare.Service.Http', '$stateParams', 'API',
  function( $scope, Http, $stateParams, API) {
    var path = API.path;
    console.log($stateParams.item);
    $scope.InfoItemShow = false;
    Http.getShareInfoResDetail({
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
    $scope.ShareDataExamples = Http.getShareResourceExampleDatas({
      resource_id: $stateParams.item
    });


    // // 获取需求拓扑图
    $scope.ShareResourceReqByDepTotals = Http.getShareResourceReqByDepTotals({
      resource_id: $stateParams.item
    });

  }
])

/* HTTP Factory */
DepartmentShare.factory('DepartmentShare.Service.Http', ['$http', 'API',
  function($http, API) {
    var path = API.path;

    function shareInfoResourceList(params) {
      return $http.get(
        path + '/share_list', {
          params: params
        }
      )
    };
    function getQuotaDetail(params) {
      return $http.get(
        path + '/data_quota_detail', {
          params: params
        }
      )
    };
    function followDepartment(id) {
      return $http.post(
        path + '/user_dep', {
          data: id
        }
      )
    };
    function getSystemDictByCatagory(params) {
      return $http.get(
        path + '/sys_dict', {
          params: params
        }
      )
    };
    function cancelFollowDepartment(id) {
      return $http.delete(
        path + '/user_dep', {
          data: id
        }
      )
    };

    function getShareInfoResDetail(params) {
      return $http.get(
        path + '/share_resource_detail', {
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
    function getShareResourceExampleDatas(params) {
      return $http.get(
        path + '/info_resource_examples', {
          params: params
        }
      )
    };

    function getShareResourceReqByDepTotals(params) {
      return $http.get(
        path + '/info_item_requirementDeps', {
          params: params
        }
      )
    };
    return {
      getSystemDictByCatagory: getSystemDictByCatagory,
      shareInfoResourceList: shareInfoResourceList,
      getQuotaDetail: getQuotaDetail,
      followDepartment: followDepartment,
      cancelFollowDepartment: cancelFollowDepartment,
      getShareInfoResDetail: getShareInfoResDetail,
      getInfoItemList: getInfoItemList,
      getShareResourceExampleDatas: getShareResourceExampleDatas,
      getShareResourceReqByDepTotals: getShareResourceReqByDepTotals
    }
  }
]);


DepartmentShare.directive('wiservShareExampleData', [
  function() {
    return {
      restrict: 'AE',
      template: "<div style='width:500px;height:400px;position:relative;top:20px'></div>",
      link: function(scope, element, attr) {
        console.log(scope);
        scope.ShareDataExamples.then(function(result) {
          if(result.data.body && result.data.body[0] && result.data.body[0].file_content) {
            element.html(result.data.body[0].file_content);
          }
        })
      }
    }
  }
]);
DepartmentShare.directive('wiservShareReqdepRelationship', [
  function() {
    return {
      restrict: 'AE',
      template: "<div style='width:900px;height:400px;position:relative;top:20px'></div>",
      link: function(scope, element, attr) {
        console.log(scope);
        scope.ShareResourceReqByDepTotals.then(function(result) {
          if (200 == result.data.head.status) {
            var dataquotaRequirement = result.data.body[0];
            var deptotal = _.size(dataquotaRequirement.depNames) ;
            var resourceName = dataquotaRequirement.resourceName;
            var depNames = dataquotaRequirement.depNames;
            var data1 = [{name: resourceName, x: 500, y:130 }];
            var links1 = [{source: resourceName,target: "" }];
            if(deptotal){
               _(depNames).forEach(function (value,key){
                 console.log(key+":"+value);
                 var dep_obj = {};
                 dep_obj.name = value;
                 dep_obj.x = 600;
                 dep_obj.y = 100 + (key+1)*20;
                 data1.push(dep_obj);

                 var target_obj = {};
                 target_obj.target = value ;
                 target_obj.source = resourceName;
                 links1.push(target_obj);
               });
               console.log(data1);
               console.log(links1);
             }
             var myChart = echarts.init((element.find('div'))[0]);
             var option = {
               title: {
                 text: "对应的需求部门数:"+deptotal+"个"
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
