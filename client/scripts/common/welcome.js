'use strict';
var Welcome = angular.module('Welcome', ['ui.router']);
/** Main Controller */
Welcome.controller('Welcome.Controller.Main', ['$scope', '$state', 'Welcome.Service.Http',
  function($scope, $state, Http) {
    window.scrollTo(0,0);
    // Menu configration
    $scope.treeOptions = {
      nodeChildren: "nodes",
      dirSelectable: false,
      injectClasses: {
        ul: "a1",
        li: "a2",
        liSelected: "a7",
        iExpanded: "a2",
        iCollapsed: "a4",
        iLeaf: "a5",
        label: "a6",
        labelSelected: "a8"
      }
    }
    function showType(){
      $scope.flag = 1;
      $scope.filterName = "机构类型";
      Http.menu().then(function(result) {
        if (200 === result.data.head.status) {
          $scope.list = result.data.body;
        }
      });
    }
    //init
    showType();
    $scope.typeListOpen = function () {
      showType();
    };

    $scope.ocupationListOpen = function () {
      $scope.filterName = "机构职能";
      $scope.flag = 2;
      // OcupationMenu Generator
      Http.menuRole().then(function(result) {
        if (200 === result.data.head.status) {
          $scope.OcupationList = result.data.body;
        }
      });
    };

    $scope.areaListOpen = function () {
      $scope.filterName = "区域";
      $scope.flag = 3;
      // AreaMenu Generator
      Http.menuArea().then(function(result) {
        if (200 === result.data.head.status) {
          $scope.areaList = result.data.body;
        }
      });
    };

    $scope.themeListOpen = function () {
      $scope.filterName = "主题类";
      $scope.flag = 4;
      // themeMenu Generator
      Http.menuTheme().then(function(result) {
        if (200 === result.data.head.status) {
          $scope.themeList = result.data.body;
        }
      });
    };

    $scope.comparator = false;
    $scope.showSelected = function(sel) {
         $scope.selectedNode = sel;
    };


   <!--listPage-->

    // Get the parameters form ui-router
    var currentDepID = {resource_dep_id:""};
    var currentDepName = {dep_name:""};
    // Selected department name
    $scope.currentDep = currentDepName.dep_name;
    // Params for pagin
    var initPaging = {limit:10, skip: 0};
    $scope.Paging = {};
    $scope.Paging.currentPage = 1;
    $scope.Paging.itemsPerPage = 10;
    $scope.Paging.pageChanged = function() {
      var httpParams = {};
      _.assign(httpParams, currentDepID, {limit:10, skip: ($scope.Paging.currentPage-1) * 10});
      getDataQuotaList(httpParams);
    };
    // Get data quota list
    function getDataQuotaList(_httpParams){
      Http.getDataQuota(_httpParams).then(function(result) {
        $scope.DataQuotas = result.data.body[0].results;
        $scope.DataQuotasTotal = result.data.body[0].count[0].resource_count;
        $scope.Paging.totalItems = result.data.body[0].count[0].item_count;
      });
    };
    // Init data quota talbe
    (function initDataQuotaList(){
        /* Init selected status for filter */
        $scope.resourceFormatActiveAll = $scope.ShareLevelActiveAll = $scope.openToSocietyActiveAll = $scope.ShareFrequencyActiveAll = $scope.DataLevelActiveAll = $scope.isScretActiveAll= 'active';
        /* Init ajax parameters*/
        var httpParams = {};
        (currentDepID==='') ? (httpParams = initPaging) : (httpParams = _.assign(httpParams, currentDepID, initPaging));
        getDataQuotaList(httpParams);
    })();
    // Fetch data quota list by filter
    function getDataQuotaListByFilter(params){
      var httpParams = {};
      (currentDepID.dep_name==='') ? (httpParams = initPaging) : (httpParams = _.assign(httpParams, currentDepID, initPaging));
      _.assign(httpParams, params);
      getDataQuotaList(httpParams);
    };
    // Search for Data Quota Name
    $scope.Retrieval = function(){
      var httpParams = {};
      var searchTarget = {resource_name: $scope.TargetDataQuotaName};
      (currentDepID==='') ? (_.assign(httpParams, initPaging, searchTarget)) : (_.assign(httpParams, currentDepID, initPaging, searchTarget));
      getDataQuotaList(httpParams);
    };
    // Data quota apply info
    $scope.DataQuotaApplyInfo = function(data_quota_id) {
      Http.getDataQuotaApplyInfo({info_resource_id: data_quota_id}).then(function() {
        // alert('申请中，等待审核');
        var httpParams = {};
        _.assign(httpParams, {limit:10, skip: ($scope.Paging.currentPage-1) * 10});
        getDataQuotaList(httpParams);
      });
    };
    // Filter generator
    var SHARE_FREQUENCY = 1, //更新周期
        DATA_LEVEL = 2, //分地区数据级别
        SHARE_LEVEL = 3, //共享级别
        RESOURCE_FORMAT = 11, //信息资源格式
        SOCIAL_OPEN_FLAG  = 14, //面向社会开放
        SECRET_FLAG = 5  //是否涉密
    Http.getSystemDictByCatagory({
      'dict_category': RESOURCE_FORMAT
    }).then(function(result) {
      $scope.resourceFormats = result.data.body;
    });
    Http.getSystemDictByCatagory({
      'dict_category': SECRET_FLAG
    }).then(function(result) {
      $scope.isScrets = result.data.body;
    });
    Http.getSystemDictByCatagory({
      'dict_category': SHARE_LEVEL
    }).then(function(result) {
      $scope.ShareLevels = result.data.body;
    });
    Http.getSystemDictByCatagory({
      'dict_category': SHARE_FREQUENCY
    }).then(function(result) {
      $scope.ShareFrequencys = result.data.body;
    });
    // Handle above filter
    var filterParams = {};

    /*信息资源格式*/
    $scope.resourceFormatFilter = function(id, index){
      $scope.resourceFormatActive = [];
      $scope.resourceFormatActiveAll = '';
      $scope.resourceFormatActive[index] = 'active';
      filterParams.re_format = id;
      if('ALL'===id){
        delete filterParams.re_format;
        $scope.resourceFormatActiveAll = 'active';
        getDataQuotaListByFilter(filterParams);
      }else{
        getDataQuotaListByFilter(filterParams);
      }
    };
    /* 共享级别 */
    $scope.ShareLevelFilter = function(id, index){
      $scope.ShareLevelActive = [];
      $scope.ShareLevelActiveAll = '';
      $scope.ShareLevelActive[index] = 'active';
      filterParams.share_level = id;
      if('ALL'===id){
        delete filterParams.share_level;
        $scope.ShareLevelActiveAll = 'active';
        getDataQuotaListByFilter(filterParams);
      }else{
        getDataQuotaListByFilter(filterParams);
      }
    };

    /* 更新周期（共享频率） */
    filterParams.update_period = [];
    $scope.ShareFrequencyActive = [];
    $scope.ShareFrequencyFilter = function(id, index){
      if('ALL'===id){
        filterParams.update_period = [];
        $scope.ShareFrequencyActiveAll = 'active';
        $scope.ShareFrequencyActive = [];
        getDataQuotaListByFilter(filterParams);
      }else{
        $scope.ShareFrequencyActiveAll = '';
        var idx = filterParams.update_period.indexOf(id);
        ($scope.ShareFrequencyActive[index]==='active')?($scope.ShareFrequencyActive[index]=''):($scope.ShareFrequencyActive[index]='active');
        if(idx > -1){
          if(filterParams.update_period.length ===1){
            $scope.ShareFrequencyActiveAll = 'active';
            filterParams.update_period = [];
          }else{
            filterParams.update_period.splice(idx, 1);
          }
        }else{
          filterParams.update_period.push(id);
        }
        getDataQuotaListByFilter(filterParams);
      }
    };

    /*是否涉密*/
    $scope.isScretFilter = function(id, index){
      $scope.isScretActive = [];
      $scope.isScretActiveAll = '';
      $scope.isScretActive[index] = 'active';
      filterParams.issecret = id;
      if('ALL'===id){
        delete filterParams.issecret;
        $scope.isScretActiveAll = 'active';
        getDataQuotaListByFilter(filterParams);
      }else{
        getDataQuotaListByFilter(filterParams);
      }
    };


  }])

  /* DataQuota Http Factory */
  Welcome.factory('Welcome.Service.Http', ['$http', 'API',
    function($http, API) {
      var path = API.path;

      function menu(params) {
        return $http.get(
          path + '/menu', { params: params }
        )
      };
      function menuRole(params) {
        return $http.get(
          path + '/menu_role', { params: params }
        )
      };
      function menuArea(params) {
        return $http.get(
          path + '/menu_area', { params: params }
        )
      };
      function menuTheme(params) {
        return $http.get(
          path + '/menu_theme', { params: params }
        )
      };

      //listPage
      function getSystemDictByCatagory(params) {
        return $http.get(
          path + '/sys_dict', { params: params }
        )
      };
      function getDataQuota(params){
        return $http.get(
          path + '/resource/sys_dict', { params: params }
        )
      };
      function getDataQuotaApplyInfo(data){
        return $http.post(
          path + '/info_resource_apply_info', { data: data }
        )
      };
      return {
        menu: menu,
        menuRole: menuRole,
        menuArea: menuArea,
        menuTheme: menuTheme,

        getSystemDictByCatagory: getSystemDictByCatagory,
        getDataQuotaApplyInfo: getDataQuotaApplyInfo,
        getDataQuota: getDataQuota
      }
    }
  ]);
  Welcome.directive('wiservMainWrapper', [
    function() {
      return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
          element.find('.toggler').on('click', function() {
            element.find('.sidebar1').toggleClass("sidebar1-collapse");
            element.find('.form-control').toggleClass("form-control-collapse");
            element.find('.content').toggleClass("content-collapse");
          });
        }
      }
    }
  ]);
