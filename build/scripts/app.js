'use strict';
/* Bootstrap Application */
var app = angular.module('app', [
  'Config',
  'ui.router',
  'ui.bootstrap',
  'treeControl',
  'isteven-multi-select',
  'Welcome',
  'Login',
  'Main',
  'Dashboard',
  'Admin',
  'Admin.User',
  'Admin.Department',
  'Admin.DepResource',
  'Department',
  'DataQuota',
  'DataQuotaList',
  'DataQuotaDetail',
  'Department.Inventory',
  'Department.InventoryDetail',
  'Department.InventoryUpload',
  'Department.Audit',
  'Department.Requirement',
  'DepartmentShare'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$provide',
  function($stateProvider, $urlRouterProvider, $httpProvider, $provide) {

    /** HTTP Interceptor */
    $httpProvider.interceptors.push(['$q',
      function($q) {
        return {
          'request': function(config) {
            config.withCredentials = true;
            return config;
          },
          'requestError': function(rejection) {
            return rejection;
          },
          'response': function(response) {
            $q.when(response, function(result){
              if( response.data && typeof response.data==='object'){
                if(result.data.head.status===300){
                  sessionStorage.message = '登录超时，请重新登录！';
                  window.location.href='./#/login';
                };
              };
            });
            return response;
          },
          'responseError': function(rejection) {
            return rejection;
          }
        };
      }
    ]);
    /** Config Router */
    $urlRouterProvider.otherwise('/welcome');
    $stateProvider
      .state('welcome', {
        url: '/welcome?type?titleName',
        templateUrl: 'views/common/welcome.html',
        controller: 'Welcome.Controller.Main'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/common/login.html',
        controller: 'Login.Controller.Main'
      })
      .state('main', {
        url: '/main',
        templateUrl: 'views/common/main.html',
        controller: 'Main.Controller.Main'
      })
      .state('main.dashboard', {
        url: '/dashboard',
        templateUrl: 'views/common/dashboard.html',
        controller: 'Dashboard.Controller.Main'
      })
      .state('main.admin', {
        url: '/admin',
        templateUrl: 'views/admin/main.html',
        controller: 'Admin.Controller.Main'
      })
      .state('main.admin.department', {
        url: '/department',
        templateUrl: 'views/admin/department.html',
        controller: 'Admin.Department.Controller.Main'
      })
      .state('main.admin.dep-resource', {
        url: '/dep-resource',
        templateUrl: 'views/admin/dep-resource.html',
        controller: 'Admin.DepResource.Controller.Main'
      })
      .state('main.admin.user', {
        url: '/user',
        templateUrl: 'views/admin/user.html',
        controller: 'Admin.User.Controller.Main'
      })
      .state('main.data-quota', {
        url: '/data-quota/:type/:titleName',
        templateUrl: 'views/data-quota/main.html',
        controller: 'DataQuota.Controller.Main'
      })
      .state('main.data-quota.list', {
        url: '/list/:resource_dep_id/:dep_name/:type/:titleName',
        templateUrl: 'views/data-quota/list0.html',
        controller: 'DataQuotaList.Controller.Main'
      })
      .state('main.data-quota.detail', {
        url: '/detail/:resource_id',
        templateUrl: 'views/data-quota/detail0.html',
        controller: 'DataQuotaDetail.Controller.Main'
      })
      .state('main.department', {
        url: '/department',
        templateUrl: 'views/department/main.html'
      })
      .state('main.department.summary', {
        url: '/summary',
        cache:'false',
        reload: true,
        templateUrl: 'views/department/summary.html',
        controller: 'Department.Controller.Main'
      })
      .state('main.department.inventory', {
        url: '/inventory',
        cache:'false',
        templateUrl: 'views/department/inventory.html',
        controller: 'Department.Inventory.Controller.Main'
      })
      .state('main.department.inventory.publish', {
        url: '/publish',
        templateUrl: 'views/department/inventory-publish.html',
        controller: 'Department.Inventory.Controller.publish'
      })
      .state('main.department.inventory.update', {
        url: '/update/:item',
        templateUrl: 'views/department/inventory-update.html',
        controller: 'Department.Inventory.Controller.publish'
      })
      .state('main.department.inventory.upload', {
        url: '/upload?ID',
        cache:'false',
        templateUrl: 'views/department/inventory-upload.html',
        controller: 'Department.InventoryUpload.Controller'
      })
      .state('main.department.inventory.uploadExampleData', {
        url: '/uploadExamples?ID',
        cache:'false',
        templateUrl: 'views/department/inventory-upload-examples.html',
        controller: 'Department.InventoryUploadExamples.Controller'
      })
      .state('main.department.detail', {
        url: '/detail/:item',
        cache:'false',
        templateUrl: 'views/department/inventory-detail.html',
        controller: 'Department.InventoryDetail.Controller'
      })
      .state('main.department.share', {
        url: '/share',
        templateUrl: 'views/department/share.html',
        controller: 'DepartmentShare.Controller.Main'
      })
      .state('main.department.share.detail', {
        url: '/detail/:item',
        templateUrl: 'views/department/share-detail.html',
        controller: 'DepartmentShare.Controller.detail'
      })
      .state('main.department.requirementConfirm', {
        url: '/requirement-confirm',
        templateUrl: 'views/department/requirement-confirm.html',
        controller: 'Department.Requirement.Controller.confirm'
      })
      .state('main.department.requirement', {
        url: '/requirement',
        templateUrl: 'views/department/requirement.html',
        controller: 'Department.Requirement.Controller.Main'
      })
      .state('main.department.requirement.publish', {
        url: '/publish',
        templateUrl: 'views/department/requirement-publish.html'
      })
      .state('main.department.requirementConfirm.detail', {
        url: '/detail?ID',
        templateUrl: 'views/department/requirement-detail.html',
        controller: 'Department.Requirement.Controller.detail'
      })
      .state('main.department.requirement.detail', {
        url: '/detail?ID',
        templateUrl: 'views/department/requirement-detail.html',
        controller: 'Department.Requirement.Controller.detail'
      })
      .state('main.department.audit', {
        url: '/audit',
        cache:'false',
        templateUrl: 'views/department/audit.html',
        controller: 'Department.Audit.Controller.Main'
      })
      .state('main.department.auditinfo', {
        url: '/auditinfo/:AUDITID/:RESOURCEID/:APPLYDEP/:APPLYTIME',
        templateUrl: 'views/department/audit-info.html',
        controller: 'Department.Audit.Controller.info'
      })
      .state('main.department.auditdetail', {
        url: '/auditdetail/:AUDITSTATUS/:RESOURCEID/:APPLYTIME/:APPLYDEP/:OPINION',
        templateUrl: 'views/department/audit-detail.html',
        controller: 'Department.Audit.Controller.detail'
      })

  }
]);

app.run(['$rootScope', function($rootScope){
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
		if(toState.name!=='welcome'){
		  if(toState.name!=='login'){
			if(!sessionStorage.token){
			  window.location.href='./#/login';
			};
		  };
		}
    });
}]);

'use strict';
/* Application Configration */
var Config = angular.module('Config', []);

Config.constant('API', {
   path: 'http://localhost:8080/drrp/api' //发布
});

'use strict';
var AdminDepartment = angular.module('Admin.Department', ['ui.router']);

/** DepartmentReq Controller */
AdminDepartment.controller('Admin.Department.Controller.Main', ['$rootScope', '$scope', '$stateParams','AdminDepartment.Service.Http', 'AdminDepartment.Service.Component', '$uibModal', '$state',
  function($rootScope, $scope, $stateParams, Http, Component, $uibModal, $state) {
    $scope.Modal = {}; // Clean scope of modal
    $scope.previousDepNames = [];
    $scope.areaNames = [];
    $scope.themeNames = [];
    $scope.Paging = {};
    $scope.Paging.currentPage = 1;
    $scope.Paging.maxSize = 5;
    $scope.Paging.itemsPerPage = 10;

    var _httpParams = {};
    _httpParams.limit = 10;
    _httpParams.skip = 0;

    $scope.Paging.pageChanged = function() {
      _httpParams.skip = ($scope.Paging.currentPage - 1)*_httpParams.limit;
      _httpParams.sysdepname = $scope.dep_name;
      getDepartmentList(_httpParams);
    }
    //pagination
    function getDepartmentList(_httpParams) {
      Http.getDepartmentList(_httpParams).then(function(result) {
        $scope.AdminDepartments = result.data.body;
      });
    }

    // init
    getDepartmentList(_httpParams);
    function getDepTotal(params){
      Http.getDepTotal(params).then(function(result) {
        $scope.depTotal = result.data.body[0].number;
        $scope.Paging.totalItems = $scope.depTotal;
      });
    }
    getDepTotal();
    Http.getDepartmentList().then(function(result) {
      $scope.AllDepartments = result.data.body;
    });
    <!--depType-->
    Http.getSysDict({
      dict_category:"7"
    }).then(function(result) {
      $scope.types = result.data.body;
    });
    <!--depOcupation-->
    Http.getSysDict({
      dict_category:"8"
    }).then(function(result) {
      $scope.ocupations = result.data.body;
    });
    <!--AreaName-->
    Http.getSysDict({
      dict_category:"9"
    }).then(function(result) {
      $scope.areaNames = result.data.body;
    });
    <!--themeName-->
    Http.getSysDict({
      dict_category:"17"
    }).then(function(result) {
      $scope.themeNames = result.data.body;
    });

    $scope.placeholder = {};
    $scope.placeholder.dep_sn = "必填";
    $scope.placeholder.order_by = "必填";
    $scope.placeholder.dep_name = "必填";
    $scope.placeholder.dep_short_name = "必填";
    $scope.placeholder.dep_en_name = "必填";
    $scope.placeholder.contacts = "必填";
    $scope.placeholder.contact_phone = "必填";

    // add Department
    $scope.addDepartmentModal = function() {
      $scope.Modal = {}; // Clean scope of modal
      $scope.department = {}; // Clean scope of modal
      $scope.department.dep_en_name="anquanting.png";
      $scope.department.parent_id = "0";
      $scope.department.area_code ="2c2934b2-10df-11e6-9b44-507b9d1b58bb";//默认四川省
      $scope.department.dep_type = "aa7772bb-10de-11e6-9b44-507b9d1b58bb";//部门管理机构
      $scope.department.role_type = "d7f3a0df-10de-11e6-9b44-507b9d1b58bb";//机构职能默认监察类
      $scope.department.theme = "7751ba0f-3c4f-11e6-be2b-507b9d1b58bb";//其他
      var promise = Component.popModal($scope, '添加', 'add-department-modal');
      promise.opened.then(function() {
        $scope.Modal.TypeArea = function(){
          <!--parent_id is selected -->
          if($scope.department.parent_id!="0"){
            var index = _.findIndex($scope.AllDepartments, function(o) { return o.id == $scope.department.parent_id; } );
            $scope.department1 = $scope.AllDepartments[index];
          }
          <!--parent_id is selected -->
        }
        $scope.Modal.validDepName = function (depName){
          $scope.validDepName = false;
          $scope.placeholder.dep_name = "必填";
          Http.getDepartmentList().then(function(result) {
             var deps = result.data.body;
             for (var i = 0; i < deps.length; i++) {
               if(deps[i].dep_name === depName){
                 $scope.validDepName = true;
                 $scope.placeholder.dep_name ="该部门已存在,请重新输入";
                 $scope.department.dep_name ="";
               }
             }
          });
        }
        $scope.Modal.validPhone = function (){
          $scope.placeholder.contact_phone = "必填";
          $scope.validPhone = false ;
          var reg =/^(\d{3,4}-)?\d{7,8}$|(^1[3|4|5|7|8]\d{9}$)/;
          if(!reg.test($scope.department.contact_phone)&&($scope.department.contact_phone!=null)){
            $scope.validPhone = true ;
            $scope.placeholder.contact_phone = "电话格式不对";
            $scope.department.contact_phone ="";
          }
        }
      });
      promise.result.then(function() {
        Http.saveDepartment($scope.department).then(function(result) {
          if (200 == result.data.head.status) {
            alert('添加成功');
          }
          else{
            alert('添加失败');
          }
          _httpParams.limit = 10;
          _httpParams.skip = 0;
          $scope.Paging.currentPage = 1 ;
          getDepartmentList(_httpParams);
          getDepTotal();
        })
      });
    }
    $scope.updateDepartment = function(AdminDep) {
      $scope.department = AdminDep;
      $scope.department.parent_id = "0";
      $scope.department.area_code ="2c2934b2-10df-11e6-9b44-507b9d1b58bb";
      $scope.department.dep_type = "aa7772bb-10de-11e6-9b44-507b9d1b58bb";
      $scope.department.role_type = "d7f3a0df-10de-11e6-9b44-507b9d1b58bb";
      $scope.department.theme = "7751ba0f-3c4f-11e6-be2b-507b9d1b58bb";
      $scope.department.dep_en_name="anquanting.png";
      _.remove($scope.AllDepartments, function(dep) {
        return (dep.dep_name == AdminDep.dep_name);
     });
      var promise = Component.popModal($scope, '修改', 'add-department-modal');
      promise.opened.then(function() {
        $scope.Modal.TypeArea = function(){
          <!--parent_id is selected -->
          if($scope.department.parent_id!="0"){
            var index = _.findIndex($scope.AllDepartments, function(o) { return o.id == $scope.department.parent_id; } );
            $scope.department1 = $scope.AllDepartments[index];
          }
          <!--parent_id is selected -->
        }
        $scope.Modal.validDepName = function (depName){
          $scope.validDepName = false;
          $scope.placeholder.dep_name = "必填";
          Http.getDepartmentList().then(function(result) {
             var deps = result.data.body;
             for (var i = 0; i < deps.length; i++) {
               if(deps[i].dep_name === depName){
                 $scope.validDepName = true;
                 $scope.placeholder.dep_name ="该部门已存在,请重新输入";
                 $scope.department.dep_name ="";
               }
             }
          });
        }
        $scope.Modal.validPhone = function (){
          $scope.placeholder.contact_phone = "必填";
          $scope.validPhone = false ;
          var reg =/^(\d{3,4}-)?\d{7,8}$|(^1[3|4|5|7|8]\d{9}$)/;
          if(!reg.test($scope.department.contact_phone)&&($scope.department.contact_phone!=null)){
            $scope.validPhone = true ;
            $scope.placeholder.contact_phone = "电话格式不对";
            $scope.department.contact_phone ="";
          }
        }

      });
      promise.result.then(function() {
        Http.updateDepartment($scope.department).then(function(result) {
          _httpParams.limit = 10;
          _httpParams.skip = 0;
          $scope.Paging.currentPage = 1 ;
          if (200 == result.data.head.status) {
            alert('修改成功');
          }
          else{
            alert('修改失败');
          }
          getDepartmentList(_httpParams);
        })
    });
    }

    $scope.deleteDepartment = function(AdminDep) {
      var flag = confirm("确定要删除吗？");
      if (flag) {
        Http.deleteDepartment(AdminDep).then(function(result) {
          _httpParams.limit = 10;
          _httpParams.skip = 0;
          $scope.Paging.currentPage = 1 ;
          if (200 == result.data.head.status) {
            alert('删除成功');
          }
          else{
            alert('删除失败！');
          }
          $state.go("main.admin.department", {}, {
            reload: true
          });
        })
      }
    }

    //search department
    $scope.searchDepartment = function(){
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      _httpParams.sysdepname = $scope.dep_name;
      if($scope.dep_name==null){
        getDepTotal();
        getDepartmentList(_httpParams);
      }else{
        Http.getDepartmentList(_httpParams).then(function(result) {
          if(result.data.head.total >=1){
            getDepTotal({sysdepname : $scope.dep_name});
            $scope.AdminDepartments = result.data.body;
            // $scope.depTotal = result.data.head.total;
            // $scope.Paging.totalItems =  $scope.depTotal;
          }else {
            alert("系统没有查到'"+$scope.dep_name+"'这个部门，请重新输入");
            $scope.dep_name = "";
            $state.go("main.admin.department", {}, {
              reload: true
            });
          }
        });
      }
    }

  }
])



/* HTTP */
AdminDepartment.factory('AdminDepartment.Service.Http', ['$http', 'API',
  function($http, API) {
    var path = API.path;

    function getDepartmentList(params) {
      return $http.get(
        path + '/sys_dep',{
          params:params
        }
      )
    };

    function getDepTotal(params) {
      return $http.get(
        path + '/sys_dep/count',{
          params: params
        }
      )
    };
    function saveDepartment(data) {
      return $http.post(
        path + '/sys_dep', {
          data: data
        }
      )
    };
    function getSysDict(params){
      return $http.get(
        path + '/sys_dict', {
          params: params
        }
      )
    }
    function updateDepartment(data) {
      return $http.put(
        path + '/sys_dep' , {
          data: data
        }
      )
    }
    function deleteDepartment(data) {
      return $http.delete(
        path + '/sys_dep', {
            data: {"id":data.id}
        }
      )
    }

    return {
      getDepartmentList: getDepartmentList,
      getDepTotal: getDepTotal,
      saveDepartment: saveDepartment,
      getSysDict: getSysDict,
      updateDepartment: updateDepartment,
      deleteDepartment: deleteDepartment
    }
  }
]);

/* Component */
AdminDepartment.service('AdminDepartment.Service.Component', ['$uibModal','$state',
  function($uibModal,$state) {
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
    // prompt Modal
    function popModal(scope, type, templateUrl) {
      scope.Modal.type = type;
      var modalInstance = $uibModal.open({
        animation: true,
        backdrop : 'static',
        templateUrl: templateUrl + '.html',
        scope: scope,
        size: 'md'
      });
      scope.Modal.confirm = function(isValid) {
        if (isValid) {
          modalInstance.close(scope.Modal);
        }

      };
      scope.Modal.cancel = function() {
        modalInstance.dismiss();
        $state.go("main.admin.department", {}, {
          reload: true
        });
      };
      return modalInstance;
    };

    return {
      popAlert: popAlert,
      popModal: popModal
    }
  }
])

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

'use strict';
var Admin = angular.module('Admin', ['ui.router','ngCookies']);

/** DepartmentReq Controller */
Admin.controller('Admin.Controller.Main', ['$cookies', '$scope', '$stateParams',
  function($cookies, $scope, $stateParams) {
       var User = JSON.parse($cookies.get('User'));
       if(User.id === "e147f177-1e83-11e6-ac02-507b9d1b58bb"){
         $scope.titleName ="用户/部门管理";
       }else{
         $scope.titleName = "用户管理";
       }
  }
])

'use strict';
var AdminUser = angular.module('Admin.User', ['ui.router','ngCookies']);

/** DepartmentReq Controller */
AdminUser.controller('Admin.User.Controller.Main', ['$cookies', '$scope', '$q', '$stateParams','AdminUser.Service.Http', 'AdminUser.Service.Component','$uibModal','$state',
  function($cookies, $scope, $q, $stateParams, Http, Component, $uibModal, $state) {
    var LoginUser = JSON.parse($cookies.get('User'));
    var dep_id = ((LoginUser.id==='e147f177-1e83-11e6-ac02-507b9d1b58bb') ? null : LoginUser.dep_id);
    var dep_name= ((LoginUser.id==='e147f177-1e83-11e6-ac02-507b9d1b58bb') ? null : LoginUser.dep_name);
    $scope.Paging = {};
    $scope.Paging.currentPage = 1;
    $scope.Paging.maxSize = 5;
    $scope.Paging.itemsPerPage = 10;

    var _httpParams = {};
    _httpParams.limit =10;
    _httpParams.skip = 0;
    _httpParams.dep_id = ((LoginUser.id==='e147f177-1e83-11e6-ac02-507b9d1b58bb') ? null : dep_id);
    $scope.Paging.pageChanged = function() {
      _httpParams.skip = ($scope.Paging.currentPage - 1)*_httpParams.limit;
      _httpParams.sysusername = $scope.username;
      getUserList(_httpParams);
    }


    $scope.Modal = {}; // Clean scope of modal
    $scope.deptList = [];
    function getUserList(_httpParams) {
      Http.getUserList(_httpParams).then(function(result) {
        $scope.users = result.data.body;
      });
    }
    function getUserTotal(params){
      Http.getUserTotal({
         dep_id : dep_id,
         sysusername : $scope.username
      }).then(function(result) {
        // if (LoginUser.id==='e147f177-1e83-11e6-ac02-507b9d1b58bb') {
        //   var tatol =  result.data.body[0].number  ;
        //   $scope.UserTotal = tatol;
        // }else {
        //   $scope.UserTotal = result.data.body[0].number;
        // }
        $scope.UserTotal = result.data.body[0].number;
        $scope.Paging.totalItems = $scope.UserTotal;
      });
    }
    // init
    getUserTotal();
    getUserList(_httpParams);

    //department
    Http.getDepartmentList({
      'dep_name': dep_name
    }).then(function(result) {
      $scope.deptList = result.data.body;
    });

    $scope.placeholder = {};
    $scope.placeholder.name = "必填";
    $scope.placeholder.password = "必填";
    $scope.placeholder.password1 = "必填";
    $scope.placeholder.personName = "必填";
    $scope.placeholder.organization = "必填";
    $scope.placeholder.organization_code = "必填，根据机构名称自动生成";
    $scope.placeholder.phone = "必填";
    $scope.placeholder.email = "必填";
    $scope.placeholder.remark = "";
    // add user
    $scope.addUserModal = function() {
      $scope.Modal = {}; // Clean scope of modal
      $scope.sysUser = {}; // Clean scope of modal
      $scope.sysUser.remark = "";
      var prom = Component.popModal($scope, '添加', 'add-user-modal');
      prom.opened.then(function() {
        $scope.Modal.validUser = function (user){
          $scope.placeholder.name ="必填";
          $scope.validUser = false;
          Http.getUserList({
            "dep_id":dep_id
          }).then(function(result) {
             var users = result.data.body;
             for (var i = 0; i < users.length; i++) {
               if(users[i].username === user){
                 $scope.validUser = true;
                 $scope.placeholder.name ="用户名已存在,请重新输入";
                 $scope.sysUser.username ="";
               }
             }
          });
        }
        $scope.Modal.organization = function(){
          $scope.placeholder.organization = "必填";
          $scope.placeholder.organization_code = "必填，根据机构名称自动生成";
          $scope.organization = false;
          var organization = $scope.sysUser.organization ;
          if(organization){
            Http.getUserOrganizationCode({
              "organization":organization
            }).then(function (result){
              var organizationArray = result.data.body[0].organization_code.split(",");
              if(organizationArray[1]==0){
                $scope.sysUser.organization_code = organizationArray[0] ;
              }else{
                $scope.placeholder.organization = "机构名称已存在，请重新输入";
                $scope.organization = true;
                $scope.sysUser.organization = "";
              }
            });
          }
        }
        $scope.Modal.validPword = function (){
          $scope.placeholder.password1 ="必填";
          $scope.validPword = false;
          if($scope.sysUser.password!=$scope.sysUser.password1&&$scope.sysUser.password1!=null){
            $scope.validPword = true;
            $scope.placeholder.password1 ="两次输入的密码不同,请重新输入";
            $scope.sysUser.password1 ="";
          }
        }
        $scope.Modal.validPhone = function (){
          $scope.placeholder.phone = "必填";
          $scope.validPhone = false ;
          var reg =/^(\d{3,4}-)?\d{7,8}$|(^1[3|4|5|7|8]\d{9}$)/;
          if(!reg.test($scope.sysUser.phone)&&($scope.sysUser.phone!=null)){
            $scope.validPhone = true ;
            $scope.placeholder.phone = "电话格式不对";
            $scope.sysUser.phone ="";
          }
        }
        $scope.Modal.validEmail = function (invalid){
          $scope.placeholder.email = "必填";
          $scope.validEmail = false ;
          if(invalid){
            $scope.validEmail = true ;
            $scope.placeholder.email = "邮箱格式不对";
            $scope.sysUser.email ="";
          }
        }

      });
      prom.result.then(function() {
        Http.saveUser($scope.sysUser).then(function(result) {
          if (200 == result.data.head.status) {
            alert('添加成功');
          }
          else{
            alert('保存数据库失败');
          }
          _httpParams.limit = 10;
          _httpParams.skip = 0;
          $scope.Paging.currentPage = 1 ;
          getUserList(_httpParams);
          getUserTotal();
        })
      });



    }
    $scope.updateUser = function(user) {
      $scope.sysUser = user;
      $scope.sysUser.password1 =0;
      $scope.sysUser.password = 0;
      $scope.sysUser.remark = ((user.remark) ?user.remark : "");
      var prom = Component.popModal($scope, '修改', 'add-user-modal');
      prom.opened.then(function() {
        $scope.Modal.validUser = function (user){
          $scope.placeholder.name ="必填";
          $scope.validUser = false;
          Http.getUserList({
            "dep_id":dep_id
          }).then(function(result) {
             var users = result.data.body;
             for (var i = 0; i < users.length; i++) {
               if(users[i].username === user){
                 $scope.validUser = true;
                 $scope.placeholder.name ="用户名已存在,请重新输入";
                 $scope.sysUser.username ="";
               }
             }
          });
        }
        $scope.Modal.organization = function(){
          $scope.placeholder.organization = "必填";
          $scope.placeholder.organization_code = "必填，根据机构名称自动生成";
          $scope.organization = false;
          var organization = $scope.sysUser.organization ;
          var dep_id = $scope.sysUser.dep_id ;
          if(organization){
            Http.getUserOrganizationIsEqual({
              "organization":organization,
              "dep_id":dep_id
            }).then(function (result){
              if("false" == result.data.body[0].isexists){
                $scope.placeholder.organization = "机构名称已存在，请重新输入";
                $scope.organization = true;
                $scope.sysUser.organization =""  ;
              }else{
                $scope.organization = false;
              }
            });
          }
        }
        $scope.Modal.validPhone = function (){
          $scope.placeholder.phone = "必填";
          $scope.validPhone = false ;
          var reg =/^(\d{3,4}-)?\d{7,8}$|(^1[3|4|5|7|8]\d{9}$)/;
          if(!reg.test($scope.sysUser.phone)&&$scope.sysUser.phone!=null){
            $scope.validPhone = true ;
            $scope.placeholder.phone = "电话格式不对";
            $scope.sysUser.phone ="";
          }
        }
        $scope.Modal.validEmail = function (invalid){
          $scope.placeholder.email = "必填";
          $scope.validEmail = false ;
          if(invalid){
            $scope.validEmail = true ;
            $scope.placeholder.email = "邮箱格式不对";
            $scope.sysUser.email ="";
          }
        }

      });
      prom.result.then(function() {
        Http.updateUser($scope.sysUser).then(function(result) {
          _httpParams.limit = 10;
          _httpParams.skip = 0;
          $scope.Paging.currentPage = 1 ;
          if (200 == result.data.head.status) {
            alert('修改成功');
          }
          else{
            alert('修改失败');
          }
          getUserList(_httpParams);
        })
      });
    }
    // $scope.deleteUser = function(user) {
    //   if(user.id!=LoginUser.id){
    //     var flag = confirm("确定要删除吗？");
    //     if (flag) {
    //       Http.deleteUser(user).then(function(result) {
    //         _httpParams.limit = 10;
    //         _httpParams.skip = 0;
    //         $scope.Paging.currentPage = 1 ;
    //         if (200 == result.data.head.status) {
    //           alert('删除成功');
    //           getUserTotal();
    //           getUserList(_httpParams);
    //         }
    //         else{
    //           alert('删除失败！');
    //         }
    //         $state.go("main.admin.user", {}, {
    //           reload: true
    //         });
    //       })
    //     }
    //   }else{
    //     alert("当前登录用户不能删除！");
    //   }
    // }

    $scope.Password = function(user) {
      $scope.placeholder.password_1 = "必填";
      $scope.placeholder.password_2 = "必填";
      $scope.placeholder.password_3 = "必填";
      var id = 0;
      id = user.id;
      $scope.Modal.password_pre = "";
      $scope.Modal.p2 = "";
      $scope.Modal.password = "";
      $scope.password_1 = false;
      $scope.password_2 = false;
      $scope.password_3 = false;
      var prom = Component.popModal($scope, '密码', 'update-password-modal');
      prom.opened.then(function() {
        $scope.Modal.validPword1 = function (){
          $scope.password_1 = false;
          $scope.placeholder.password_1 ="必填";
          Http.validatePassword({
            "id":id,
            "password":$scope.Modal.password_pre
          }).then(function(result) {
            if(result.data.head.total == 0) {
              $scope.password_1 = true;
              $scope.placeholder.password_1 ="原密码不对,请重新输入";
              $scope.Modal.password_pre = "";
            }
          });
        }
        $scope.Modal.validPword = function (){
             $scope.password_3 = false;
             $scope.placeholder.password_3 ="必填";
             if($scope.Modal.p2!=$scope.Modal.password){
               $scope.password_3 = true;
               $scope.placeholder.password_3 = "两次输入的密码不同,请重新输入";
               $scope.Modal.password ="";
             }
        }
      });

      prom.result.then(function() {
        Http.UpdatePassword({
          "id": id,
          "password":$scope.Modal.password
        }).then(function(result) {
          if (200 == result.data.head.status) {
            alert('修改成功');
          }
          else{
            alert('修改失败');
          }
          _httpParams.limit = 10;
          _httpParams.skip = 0;
          $scope.Paging.currentPage = 1 ;
          getUserList(_httpParams);
          getUserTotal();
        })
      });
    }

    //search user
    $scope.searchUser = function(){
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      _httpParams.dep_id = dep_id;
      _httpParams.sysusername = $scope.username;
      if($scope.username==null){
        getUserTotal();
        getUserList(_httpParams);
      }else{
        Http.getUserList(_httpParams).then(function(result) {
          getUserTotal({sysusername : $scope.username});
          if(result.data.head.total >= 1){
            $scope.users = result.data.body;
            // $scope.UserTotal = result.data.head.total;
            // $scope.Paging.totalItems = $scope.UserTotal;
          }else{
            alert("系统没有查到'"+$scope.username+"'这个用户名，请重新输入");
            $state.go("main.admin.user", {}, {
              reload: true
            });
          }
        });
      }
    }

  }
])

/* HTTP */
AdminUser.factory('AdminUser.Service.Http', ['$http', 'API',
  function($http, API) {
    var path = API.path;

    function getUserOrganizationCode(params) {
      return $http.get(
        path + '/sys_user/organization_code',{
           params: params
        }
      )
    };
    function getUserOrganizationIsEqual(params) {
      return $http.get(
        path + '/sys_user/organization',{
           params: params
        }
      )
    };
    function getUserList(params) {
      return $http.get(
        path + '/sys_user',{
           params: params
        }
      )
    };
    function getUserTotal(params) {
      return $http.get(
        path + '/sys_user/count',{
           params: params
        }
      )
    };

    function getDepartmentList(params) {
      return $http.get(
        path + '/sys_dep',{
          params: params
        }
      )
    }

    function saveUser(data) {
      return $http.post(
        path + '/sys_user', {
          data: data
        }
      )
    };

    function updateUser(data) {
      return $http.put(
        path + '/sys_user' , {
          data: data
        }
      )
    }

    function deleteUser(data) {
      return $http.delete(
        path + '/sys_user', {
            data: {"id":data.id}
        }
      )
    }
    function validatePassword(params){
      return $http.get(
        path + '/sys_user/password', {
            params: params
        }
      )
    }
    function UpdatePassword(data) {
      return $http.put(
        path + '/sys_user/password' , {
          data: data
        }
      )
    }
    return {
      getUserOrganizationCode: getUserOrganizationCode,
      getUserOrganizationIsEqual: getUserOrganizationIsEqual,
      getUserList: getUserList,
      saveUser: saveUser,
      getDepartmentList: getDepartmentList,
      updateUser: updateUser,
      deleteUser: deleteUser,
      getUserTotal: getUserTotal,
      validatePassword: validatePassword,
      UpdatePassword: UpdatePassword
    }
  }
]);

/* Component */
AdminUser.service('AdminUser.Service.Component', ['$uibModal','$state',
  function($uibModal,$state) {
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
    // prompt Modal
    function popModal(scope, type, templateUrl) {
      scope.Modal.type = type;
      var modalInstance = $uibModal.open({
        animation: true,
        backdrop : 'static',
        templateUrl: templateUrl + '.html',
        scope: scope,
        size: 'md'
      });
      scope.Modal.confirm = function(isValid) {
        if (isValid) {
          modalInstance.close(scope.Modal);
        }

      };

      scope.Modal.cancel = function() {
        modalInstance.dismiss();
        $state.go("main.admin.user", {}, {
          reload: true
        });
      };
      return modalInstance;
    };

    return {
      popAlert: popAlert,
      popModal: popModal
    }
  }
])

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

    //点击未确认按钮

    function getDeptInfoResourceList() {
      Http.getDeptInfoResourceList(_httpModalParams).then(function(result) {
        console.log(result);
        if (200 == result.data.head.status) {
          $scope.depInfoResourceList = result.data.body[0].results;
          $scope.ModalPaging.totalItems = result.data.body[0].count;
        }
        else{
          $scope.depInfoResourceList = [];
        }
      });
    }
    // init
    // 模态框信息资源列表分页
    $scope.ModalPaging = {};
    $scope.ModalPaging.currentPage = 1;
    $scope.ModalPaging.maxSize = 5;
    $scope.ModalPaging.itemsPerPage = 10;

    $scope.resParent = {};
    $scope.resParent.dropListShow = false;

    var _httpModalParams = {};
    _httpModalParams.limit = 10;
    _httpModalParams.skip = 0;
    getDeptInfoResourceList();
    // 模态框中信息资源分页
    $scope.ModalPaging.pageChanged = function() {
      _httpModalParams.skip = ($scope.ModalPaging.currentPage - 1) * _httpModalParams.limit;
      Http.getDeptInfoResourceList(_httpModalParams).then(function(result) {
        console.log(result);
        $scope.depInfoResourceList = result.data.body[0].results;
        $scope.ModalPaging.totalItems = result.data.body[0].count;
      });
    }

    Http.getSystemDictByCatagory({
      'dict_category': 11
    }).then(function(result) {
      $scope.resourceFormatList = result.data.body;
    });

    // 选中信息资源
    $scope.resourceSelection = [];
    $scope.toggleResourceSelection = function(resourceId, resource_name) {
      var idx = $scope.resourceSelection.indexOf(resourceId);
      // is currently selected
      if (idx > -1) {
        $scope.resourceSelection = [];
        $scope.checkedResourceName = '';
      }

      // is newly selected
      else {
        $scope.resourceSelection = resourceId;
        $scope.resource_id = resourceId;
        $scope.resourceItemSelection = []; //清空信息项
        $scope.checkedResourceName = '已选中资源 "' + resource_name + '"';
      }
      console.log($scope.resourceItemSelection);
    };

    // 选中信息项checkbox事件
    $scope.resourceItemSelection = [];
    $scope.toggleResItemSelection = function(resourceId, item, resource_name) {
      if($scope.resource_id != resourceId) {
        $scope.resourceItemSelection = [];
        $scope.resource_id = resourceId;
      }
      var idx = $scope.resourceItemSelection.indexOf(item.id);
      // is currently selected
      if (idx > -1) {
        $scope.resourceItemSelection.splice(idx, 1);
        var selLength = $scope.resourceItemSelection.length;
        console.log(selLength);
        if(selLength == 0) {
          $scope.checkedResourceName = '';
        }
        else {
          $scope.checkedResourceName = '已选中资源 "' + resource_name + '"下的' + selLength +'条信息项';
        }
      }

      // is newly selected
      else {
        $scope.resourceItemSelection.push(item.id);
        var selLength = $scope.resourceItemSelection.length;
        $scope.checkedResourceName = '已选中资源 "' + resource_name + '"下的' + selLength +'条信息项';
        $scope.resourceSelection = [];// 清空信息资源选中项
      }
      console.log($scope.resourceItemSelection);
    };

    // 保存选中的信息资源或信息项
    $scope.saveChooseResource = function() {
      console.log($scope.resourceItemSelection);
      console.log($scope.resourceSelection);
      if($scope.resourceItemSelection.length == 0 && $scope.resourceSelection.length == 0) {
        $scope.errorMsg = '您未选中任何资源。';
      }
      else{
        $scope.resParent.dropListShow = false;
        $scope.errorMsg = '';
      }
    }

    // filter by resource format
    $scope.resFormatMainSelection = [];
    $scope.getInfoResourceByResFormat = function(item) {
      var idx = $scope.resFormatMainSelection.indexOf(item.id);
      if (idx > -1) {
        $scope.resFormatMainSelection = [];
      } else {
        $scope.resFormatMainSelection = item.id;
      }
      _httpModalParams.resource_format = $scope.resFormatMainSelection;
      _httpModalParams.limit = 10;
      _httpModalParams.skip = 0;
      getDeptInfoResourceList(_httpModalParams);
    }

    // resource format all
    $scope.getResFormatAll = function() {
      $scope.resFormatMainSelection = [];
      _httpModalParams.resource_format = null;
      _httpModalParams.limit = 10;
      _httpModalParams.skip = 0;
      getDeptInfoResourceList(_httpModalParams);
    }

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

    // 点击收起
    $scope.closeItems = function(index) {
      $scope.collapseIndex = -1;
      $scope.closeShow = false;
      $scope.InfoItems = [];
    }

    // 隐藏或显示资源列表
    $scope.togglResourceList = function() {
      if($scope.resParent.dropListShow) {
        $scope.resParent.dropListShow = false;
      }
      else {
        $scope.resParent.dropListShow = true;
      }
    }

    //confirm
    $scope.RequirementConfirm = function(item) {
      // get requirement detail
      $scope.Modal ={};
      $scope.Modal.ReqDetail = item;
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
    function getSystemDictByCatagory(params) {
      return $http.get(
        path + '/sys_dict', {
          params: params
        }
      )
    };


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
      getInfoItemList: getInfoItemList,
      getSystemDictByCatagory: getSystemDictByCatagory
    };

  }
]);

/** Dashboard Directive */
Dashboard.directive('wiservDataQuotaOverviewChart', [
  function() {
    return {
      restrict: 'AE',
      template: "<div style='width:300;height:215px;position:relative;top:-1px;'></div>",
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
                      max: ((220-summary.total_resource)<50)? (Math.ceil(summary.total_resource/11)*11+55) : 220,
                      splitNumber: 11,
                      radius: '90%',
                      axisLine: {            // 坐标轴线
                          lineStyle: {       // 属性lineStyle控制线条样式
                              width: 5
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
                        offsetCenter: [0, '-10%'],
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                          fontWeight: '',
                          fontSize: 15,
                          fontStyle: 'italic'
                        }      // x, y，单位px       // x, y，单位px
                      },
                      detail : {
                          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                              fontWeight: ''
                          }
                      },
                      data:[{
                        value: (summary) ? (summary.total_resource) : 0 ,
                        name: '条（资源总数）'
                    }]
                  },
                  {
                      name: '本月新增',
                      type: 'gauge',
                      center: ['23%', '65%'],    // 默认全局居中
                      radius: '65%',
                      min:0,
                      max:((70-summary.month_increment_resource)<10)? (Math.ceil(summary.month_increment_resource/7)*7+14) : 70,
                      endAngle:20,
                      splitNumber:7,
                      axisLine: {            // 坐标轴线
                          lineStyle: {       // 属性lineStyle控制线条样式
                              width: 3
                          }
                      },
                      axisTick: {            // 坐标轴小标记
                          length:10,        // 属性length控制线长
                          lineStyle: {       // 属性lineStyle控制线条样式
                              color: 'auto'
                          }
                      },
                      splitLine: {           // 分隔线
                          length:13,         // 属性length控制线长
                          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                              color: 'auto'
                          }
                      },
                      pointer: {
                          width:3
                      },
                      title: {
                          offsetCenter: [0, '-1%'],
                          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontSize: 10,
                            fontStyle: 'italic'
                         }      // x, y，单位px
                      },
                      detail: {
                      },
                      data:[{
                        value:(summary) ? (summary.month_increment_resource) : 0,
                        name: '条(本月新增)'
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
                      max: ((220-summary.requiement_number)<50)? (Math.ceil(summary.requiement_number/11)*11+55) : 220,
                      splitNumber: 11,
                      radius: '90%',
                      axisLine: {            // 坐标轴线
                          lineStyle: {       // 属性lineStyle控制线条样式
                              width: 5
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
                        offsetCenter: [0, '-10%'],
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                          fontWeight: '',
                          fontSize: 15,
                          fontStyle: 'italic'
                        }      // x, y，单位px       // x, y，单位px
                      },
                      detail : {
                          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                              fontWeight: ''
                          }
                      },
                      data:[{
                        value: (summary) ? (summary.requiement_number) : 0,
                        name: '条（需求总数）'
                    }]
                  },
                  {
                      name: '本月新增',
                      type: 'gauge',
                      center: ['23%', '65%'],    // 默认全局居中
                      radius: '65%',
                      min:0,
                      max:((70-summary.requiement_number_inc)<10)? (Math.ceil(summary.requiement_number_inc/7)*7+14) : 70,
                      endAngle:20,
                      splitNumber:7,
                      axisLine: {            // 坐标轴线
                          lineStyle: {       // 属性lineStyle控制线条样式
                              width: 3
                          }
                      },
                      axisTick: {            // 坐标轴小标记
                          length:10,        // 属性length控制线长
                          lineStyle: {       // 属性lineStyle控制线条样式
                              color: 'auto'
                          }
                      },
                      splitLine: {           // 分隔线
                          length:13,         // 属性length控制线长
                          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                              color: 'auto'
                          }
                      },
                      pointer: {
                          width:3
                      },
                      title: {
                          offsetCenter: [0, '-1%'],
                          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontSize: 10,
                            fontStyle: 'italic'
                         }      // x, y，单位px
                      },
                      detail: {
                      },
                      data:[{
                        value:(summary) ? (summary.requiement_number_inc) : 0,
                        name: '条(本月新增)'
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
        if (scope.resourceSelection.length == 0 && scope.resourceItemSelection.length == 0 && scope.Modal.ReqResponse.status == 1) {
          scope.errorMsg = '请选择信息资源！';
          isValid = false;
        }
        else {
          scope.errorMsg = '';
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

'use strict';
var Login = angular.module('Login', ['ui.router', 'ngCookies']);

/** Main Controller */
Login.controller('Login.Controller.Main', ['$rootScope', '$cookies', '$scope', '$state', 'Login.Service.Http',
  function($rootScope, $cookies, $scope, $state, Http) {
    // Decide login or session delay
    if(sessionStorage.token){
      sessionStorage.removeItem('token');
    }
    if(sessionStorage.message){
      $scope.alerts = [
        {type: 'danger', msg: sessionStorage.message}
      ];
      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };
      sessionStorage.removeItem('message');
    }
    // Login validation
    $scope.Login = {};
    $scope.Login.submit = function(valid) {
      $scope.loginSubmitted = false;
      if (valid) {
        var username = $scope.Login.username; 
        var password = hex_md5($scope.Login.password);
        Http.login({
          username: username,
          password: password
        }).then(function(result) {
          var loginUser = result.data.body[0];
          $rootScope.User = loginUser;
          $cookies.put('User', JSON.stringify(loginUser));
          console.log(JSON.stringify(loginUser));
          var sessionToken = result.data.head.token;
          if(sessionToken){
            sessionStorage.token = sessionToken;
          }
          if (200 == result.data.head.status) {
            $state.go("main.dashboard");
          } else {
            $scope.loginError = true;
          }
        });
      } else {
        $scope.loginSubmitted = true;
      }
    }
  }
]);

/* HTTP Factory */
Login.factory('Login.Service.Http', ['$http', 'API',
  function($http, API) {
    var path = API.path;
    function login(data) {
      return $http.post(
        path + '/login', {
          data: data
        }
      )
    };
    return {
      login: login
    }
  }
]);

'use strict';
var Main = angular.module('Main', ['ui.router', 'ngCookies']);

/** Main Controller */
Main.controller('Main.Controller.Main', ['$scope', '$cookies', 'Main.Service.Http', '$state', 'API',
  function($scope, $cookies, Http, $state, API) {
    $scope.User = JSON.parse($cookies.get('User'));
    $scope.downloadDuide = API.path + '/download?type=guide';
    $scope.downloadInstru = API.path + '/download?type=instruction';
    $scope.logout = function() {
      console.log($scope.User);
      if(sessionStorage.token){
        sessionStorage.removeItem('token');
        Http.logout().then(function(result) {
          $state.go("welcome");
        })
      }

    }
  }
]);

/* HTTP Factory */
Main.factory('Main.Service.Http', ['$http', 'API',
  function($http, API) {
    var path = API.path;
    function logout() {
      return $http.get(
        path + '/loginOut'
      )
    };
    return {
      logout: logout
    }
  }
]);

'use strict';
var Welcome = angular.module('Welcome', ['ui.router']);
/** Main Controller */
Welcome.controller('Welcome.Controller.Main', ['$scope', '$state', 'Welcome.Service.Http', '$stateParams', '$document',
  function($scope, $state, Http, StateParams, $document) {
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
    function treeChangeTypeDefault(){
      $scope.flag = (StateParams.type) ? (StateParams.type) : 1;
      $scope.filterName = (StateParams.titleName) ? (StateParams.titleName) : "机构类型";
      $scope.currentTabFlash = (StateParams.type) ? (StateParams.type) : 1;
      // if($scope.flag==1){
        Http.menu().then(function(result) {
          if (200 === result.data.head.status) {
            $scope.list = result.data.body;
          }
        });

      // }else if ($scope.flag==2) {
        // OcupationMenu Generator
        Http.menuRole().then(function(result) {
          if (200 === result.data.head.status) {
            $scope.OcupationList = result.data.body;
          }
        });

      // }else if ($scope.flag==3) {
        // AreaMenu Generator
        Http.menuArea().then(function(result) {
          if (200 === result.data.head.status) {
            $scope.areaList = result.data.body;
          }
        });

      // }else if ($scope.flag==4) {
        // themeMenu Generator
        Http.menuTheme().then(function(result) {
          if (200 === result.data.head.status) {
            $scope.themeList = result.data.body;
          }
        });
      // }
    }
    treeChangeTypeDefault();
    $scope.treeChangeType = function(type) {
      $scope.predicate = "";
      if(type==1){
        $scope.flag = 1;
        $scope.filterName = "机构类型";
        Http.menu().then(function(result) {
          if (200 === result.data.head.status) {
            $scope.list = result.data.body;
          }
        });

      }else if (type==2) {
        // $document.find('.sidebar2').addClass('sidebar2-collapse');
        $scope.filterName = "机构职能";
        $scope.flag = 2;
        // OcupationMenu Generator
        Http.menuRole().then(function(result) {
          if (200 === result.data.head.status) {
            $scope.OcupationList = result.data.body;
          }
        });

      }else if (type==3) {
        $scope.filterName = "区域";
        $scope.flag = 3;
        // AreaMenu Generator
        Http.menuArea().then(function(result) {
          if (200 === result.data.head.status) {
            $scope.areaList = result.data.body;
          }
        });

      }else if (type==4) {
        $scope.filterName = "主题";
        $scope.flag = 4;
        // themeMenu Generator
        Http.menuTheme().then(function(result) {
          if (200 === result.data.head.status) {
            $scope.themeList = result.data.body;
          }
        });

      }

    }


    $scope.comparator = false;
    $scope.showSelected = function(sel) {
         $scope.selectedNode = sel;
    };


   <!--listPage-->

    // Get the parameters form ui-router
    var currentDepID = {resource_dep_id:StateParams.resource_dep_id};
    var currentDepName = {dep_name:StateParams.dep_name};
    // Selected department name
    $scope.currentDep = currentDepName.dep_name;
    // Params for pagin
    var initPaging = {limit:10, skip: 0};
    $scope.Paging = {};
    $scope.Paging.currentPage = 1;
    $scope.Paging.maxSize = 5;
    $scope.Paging.itemsPerPage = 10;
    $scope.Paging.pageChanged = function() {
      var httpParams = {};
      _.assign(httpParams, currentDepID, {limit:10, skip: ($scope.Paging.currentPage-1) * 10},{resource_name: $scope.TargetDataQuotaName});
      getDataQuotaList(httpParams);
    };
    // Get data quota list
    function getDataQuotaList(_httpParams){
      Http.getDataQuota(_httpParams).then(function(result) {
        $scope.DataQuotas = result.data.body[0].results;
        $scope.DataQuotasTotal = result.data.body[0].count[0].resource_count;
        $scope.Paging.totalItems = result.data.body[0].count[0].resource_count;
      });
    };
    // Init data quota talbe
    function initDataQuotaList(){
        /* Init selected status for filter */
        $scope.resourceFormatActiveAll = $scope.ShareLevelActiveAll = $scope.openToSocietyActiveAll = $scope.ShareFrequencyActiveAll = $scope.DataLevelActiveAll = $scope.isScretActiveAll= 'active';
        /* Init ajax parameters*/
        var httpParams = {};
        (currentDepID==='') ? (httpParams = initPaging) : (httpParams = _.assign(httpParams, currentDepID, initPaging));
        getDataQuotaList(httpParams);
    };
    initDataQuotaList();

   $scope.WelcomeDep = function (resource_dep_id,dep_name){
     if(resource_dep_id){
       $scope.TargetDataQuotaName ="";
       var httpParams = {};
       currentDepID = {resource_dep_id:resource_dep_id};
       currentDepName = {dep_name:dep_name};
       $scope.currentDep = currentDepName.dep_name;
       /* Init selected status for filter */
       $scope.resourceFormatActiveAll = $scope.ShareLevelActiveAll = $scope.openToSocietyActiveAll = $scope.ShareFrequencyActiveAll = $scope.DataLevelActiveAll = $scope.isScretActiveAll= 'active';
       /* Init ajax parameters*/
       (currentDepID==='') ? (httpParams = initPaging) : (httpParams = _.assign(httpParams, currentDepID, initPaging));
       getDataQuotaList(httpParams);
     }
   }


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
    // Filter generator
    var SHARE_FREQUENCY = 1, //更新周期
        DATA_LEVEL = 2, //数据分区级别
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
      'dict_category': SOCIAL_OPEN_FLAG
    }).then(function(result) {
      $scope.openToSocietys = result.data.body;
    });
    Http.getSystemDictByCatagory({
      'dict_category': SECRET_FLAG
    }).then(function(result) {
      $scope.isScrets = result.data.body;
    });
    Http.getSystemDictByCatagory({
      'dict_category': SHARE_LEVEL
    }).then(function(result) {
      var shareLevelPre = result.data.body;
      _.remove(shareLevelPre,function(n){
        return n.dict_name=="暂不开放"
      })
      // console.log(shareLevelPre);
      $scope.ShareLevels = shareLevelPre;
    });
    Http.getSystemDictByCatagory({
      'dict_category': SHARE_FREQUENCY
    }).then(function(result) {
      $scope.ShareFrequencys = result.data.body;
    });
    Http.getSystemDictByCatagory({
      'dict_category': DATA_LEVEL
    }).then(function(result) {
      $scope.DataLevels = result.data.body;
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

    /*面向社会开放*/

    $scope.openToSocietyFilter = function(id, index){
      $scope.openToSocietyActive = [];
      $scope.openToSocietyActiveAll = '';
      $scope.openToSocietyActive[index] = 'active';
      //var idx = filterParams.social_open_flag.indexOf(item.id);
      filterParams.social_open_flag = id;
      if('ALL'===id){
        delete filterParams.social_open_flag;
        $scope.openToSocietyActiveAll = 'active';
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

    /* 数据分区级别 */
    filterParams.area_level = [];
    $scope.DataLevelActive = [];
    $scope.DataLevelFilter = function(id, index){
      if('ALL'===id){
        filterParams.area_level = [];
        $scope.DataLevelActiveAll = 'active';
        $scope.DataLevelActive=[];
        getDataQuotaListByFilter(filterParams);
      }else{
        var idx = filterParams.area_level.indexOf(id);
        $scope.DataLevelActiveAll = '';
        ($scope.DataLevelActive[index]==='active')?($scope.DataLevelActive[index]=''):($scope.DataLevelActive[index]='active');
        if(idx > -1){
          if(filterParams.area_level.length ===1){
            $scope.DataLevelActiveAll = 'active';
            filterParams.area_level = [];
          }else{
            filterParams.area_level.splice(idx, 1);
          }
        }else{
          filterParams.area_level.push(id);
        }
        getDataQuotaListByFilter(filterParams);
      };
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
          path + '/resource_list', { params: params }
        )
      };
      return {
        menu: menu,
        menuRole: menuRole,
        menuArea: menuArea,
        menuTheme: menuTheme,

        getSystemDictByCatagory: getSystemDictByCatagory,
        getDataQuota: getDataQuota
      }
    }
  ]);
  Welcome.directive('wiservMainWrapperUnlogin', [
    function() {
      return {
        restrict: 'AE',
        link: function(scope, element, attrs) {
          scope.currentTab = scope.currentTabFlash;
          element.find('.toggler').on('click', function(ev) {
            // console.log("指令中flag:"+scope.flag);
            // console.log("指令中currentTab:"+scope.currentTab);
            if( scope.currentTab == scope.flag) {
              if((!element.hasClass("content-collapse"))){
                element.find('.searchTree').toggleClass("searchTree-collapse");
                element.find('.content').toggleClass("content-collapse");
              }
            }
            else {
              element.find('.searchTree').removeClass("searchTree-collapse").addClass("searchTree-collapse");
              element.find('.content').removeClass("content-collapse");
            }
            scope.currentTab = scope.flag;
          });
        }
      }
    }
  ]);

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

'use strict';
var DataQuotaList = angular.module('DataQuotaList', ['ui.router']);

/** Main Controller */
DataQuotaList.controller('DataQuotaList.Controller.Main', ['$scope', '$state', 'DataQuotaList.Service.Http', '$stateParams',
  function($scope, $state, Http, StateParams) {
    // Get the parameters form ui-router
    var currentDepID = {resource_dep_id:StateParams.resource_dep_id};
    var currentDepName = {dep_name:StateParams.dep_name};
    // Selected department name
    $scope.currentDep = currentDepName.dep_name;
    // Params for pagin
    var initPaging = {limit:10, skip: 0};
    $scope.Paging = {};
    $scope.Paging.currentPage =1;
    console.log($scope.Paging.currentPage);
    $scope.Paging.maxSize = 5;
    $scope.Paging.itemsPerPage = 10;
    $scope.Paging.pageChanged = function() {
      var httpParams = {};
      _.assign(httpParams, currentDepID, {limit:10, skip: ($scope.Paging.currentPage-1) * 10},{resource_name: $scope.TargetDataQuotaName});
      getDataQuotaList(httpParams);
    };
    // Get data quota list
    function getDataQuotaList(_httpParams){
      Http.getDataQuota(_httpParams).then(function(result) {
        $scope.DataQuotas = result.data.body[0].results;
        $scope.DataQuotasTotal = result.data.body[0].count[0].resource_count;
        $scope.Paging.totalItems = result.data.body[0].count[0].resource_count;
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
        _.assign(httpParams,currentDepID, {limit:10, skip: ($scope.Paging.currentPage-1) * 10},{resource_name: $scope.TargetDataQuotaName});
        getDataQuotaList(httpParams);
      });
    };
    // Filter generator
    var SHARE_FREQUENCY = 1, //更新周期
        DATA_LEVEL = 2, //数据分区级别
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
      'dict_category': SOCIAL_OPEN_FLAG
    }).then(function(result) {
      $scope.openToSocietys = result.data.body;
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
    Http.getSystemDictByCatagory({
      'dict_category': DATA_LEVEL
    }).then(function(result) {
      $scope.DataLevels = result.data.body;
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

    /*面向社会开放*/

    $scope.openToSocietyFilter = function(id, index){
      $scope.openToSocietyActive = [];
      $scope.openToSocietyActiveAll = '';
      $scope.openToSocietyActive[index] = 'active';
      //var idx = filterParams.social_open_flag.indexOf(item.id);
      filterParams.social_open_flag = id;
      if('ALL'===id){
        delete filterParams.social_open_flag;
        $scope.openToSocietyActiveAll = 'active';
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

    /* 数据分区级别 */
    filterParams.area_level = [];
    $scope.DataLevelActive = [];
    $scope.DataLevelFilter = function(id, index){
      if('ALL'===id){
        filterParams.area_level = [];
        $scope.DataLevelActiveAll = 'active';
        $scope.DataLevelActive=[];
        getDataQuotaListByFilter(filterParams);
      }else{
        var idx = filterParams.area_level.indexOf(id);
        $scope.DataLevelActiveAll = '';
        ($scope.DataLevelActive[index]==='active')?($scope.DataLevelActive[index]=''):($scope.DataLevelActive[index]='active');
        if(idx > -1){
          if(filterParams.area_level.length ===1){
            $scope.DataLevelActiveAll = 'active';
            filterParams.area_level = [];
          }else{
            filterParams.area_level.splice(idx, 1);
          }
        }else{
          filterParams.area_level.push(id);
        }
        getDataQuotaListByFilter(filterParams);
      };
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

  }
]);


/* HTTP Factory */
DataQuotaList.factory('DataQuotaList.Service.Http', ['$http', 'API',
  function($http, API) {
    var path = API.path;
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
      getSystemDictByCatagory: getSystemDictByCatagory,
      getDataQuotaApplyInfo: getDataQuotaApplyInfo,
      getDataQuota: getDataQuota
    }
  }
]);

'use strict';
var DataQuota = angular.module('DataQuota', ['ui.router']);

/** Main Controller */
DataQuota.controller('DataQuota.Controller.Main', ['$scope', '$state', 'DataQuota.Service.Http', '$stateParams',
  function($scope, $state, Http, StateParams) {
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
      $scope.predicate="";
      $scope.flag = (StateParams.type) ? (StateParams.type) : 1;
      $scope.filterName = (StateParams.titleName) ? (StateParams.titleName) : "机构类型";
      $scope.currentTabFlash = (StateParams.type) ? (StateParams.type) : 1;
        Http.menu().then(function(result) {
          if (200 === result.data.head.status) {
            $scope.list = result.data.body;
          }
        });
        Http.menuRole().then(function(result) {
          if (200 === result.data.head.status) {
            $scope.OcupationList = result.data.body;
          }
        });

        Http.menuArea().then(function(result) {
          if (200 === result.data.head.status) {
            $scope.areaList = result.data.body;
          }
        });
        Http.menuTheme().then(function(result) {
          if (200 === result.data.head.status) {
            $scope.themeList = result.data.body;
          }
        });
    }
    //init
    showType();
    $scope.typeListOpen = function () {
      $scope.predicate="";
      $scope.flag = 1;
      $scope.filterName = "机构类型";
      Http.menu().then(function(result) {
        if (200 === result.data.head.status) {
          $scope.list = result.data.body;
        }
      });
		};

    $scope.ocupationListOpen = function () {
      $scope.predicate="";
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
      $scope.predicate="";
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
      $scope.predicate="";
      $scope.filterName = "主题";
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


  }
]);

/* DataQuota Http Factory */
DataQuota.factory('DataQuota.Service.Http', ['$http', 'API',
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
    return {
      menu: menu,
      menuRole: menuRole,
      menuArea: menuArea,
      menuTheme: menuTheme
    }
  }
]);
DataQuota.directive('wiservMainWrapper', [
  function() {
    return {
      restrict: 'AE',
      link: function(scope, element, attrs) {
        scope.currentTab = scope.currentTabFlash;
        element.find('.toggler').on('click', function(ev) {
          // console.log(scope.flag);
          if( scope.currentTab == scope.flag) {
            if((!element.hasClass("content-collapse"))){
              element.find('.searchTree').toggleClass("searchTree-collapse");
              element.find('.content').toggleClass("content-collapse");
            }
          }
          else {
            element.find('.searchTree').removeClass("searchTree-collapse").addClass("searchTree-collapse");
            element.find('.content').removeClass("content-collapse");
          }
          scope.currentTab = scope.flag;
        });
      }
    }
  }
]);

'use strict';
var Audit = angular.module('Department.Audit', ['ui.router']);

/** Main Controller */
Audit.controller('Department.Audit.Controller.Main', ['$scope', '$q', 'Department.Audit.Service.Http',
  function($scope, $q, Http) {
    $scope.InfoResource = {};

    $scope.Paging = {};
    $scope.Paging.currentPage = 1;
    $scope.Paging.maxSize = 5;
    $scope.Paging.itemsPerPage = 10;

    var _httpParams = {};
    _httpParams.limit = 10;
    _httpParams.skip = 0;

    $scope.Paging.pageChanged = function() {
      _httpParams.skip = ($scope.Paging.currentPage - 1)*_httpParams.limit;
      getAuditList(_httpParams);
    }

    // init
    getAuditList();

    function getAuditList() {
      $scope.auditPromise = Http.getAuditList(_httpParams).then(function(result) {
        $scope.auditList = result.data.body[0].results;
        $scope.resourceCount = result.data.body[0].count[0].resource_count;
        $scope.Paging.totalItems = result.data.body[0].count[0].resource_count;
      });
    }

    $scope.searchDeptAuditByName = function() {
      _httpParams.resource_name = $scope.InfoResource.resource_name_filter;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getAuditList();
    }

    // 根据审核状态过滤
    $scope.filterByAuditStatus = function(status) {
      _httpParams.auditstatus = status;
      getAuditList();
    }
  }
])


Audit.controller('Department.Audit.Controller.info', ['$scope', '$state', '$q', 'Department.Audit.Service.Http', '$stateParams',
  function( $scope, $state, $q, Http, $stateParams) {
    $scope.TabItemShow = true;
    $scope.TabRequireShow = true;
    $scope.AuditInfo = {};
    $scope.AuditInfo.audit_opinion = '';

    // 根据id查询信息资源详情
    Http.getDepartInfoResList({
      resource_id : $stateParams.RESOURCEID
    }).then(function(ResourceRes) {
      $scope.InfoResourceDetail = ResourceRes.data.body[0].results[0];
      $scope.InfoResourceDetail.apply_dep_name = $stateParams.APPLYDEP;
      $scope.InfoResourceDetail.apply_time = $stateParams.APPLYTIME;
    })


    $scope.InfoItemShow = false;
    Http.getInfoItemList({
      resource_id: $stateParams.RESOURCEID
    }).then(function(result) {
      if (result.data.body.length == 0) {
        $scope.InfoItemShow = false;
      } else {
        $scope.InfoItemShow = true;
        $scope.InfoItems = result.data.body;
      }
    })


    $scope.submitAudit = function() {
      console.log($scope.AuditInfo.audit_status);
      if(!$scope.AuditInfo.audit_status) {
        $scope.auditError = true;
        return;
      }
      $scope.AuditInfo.audit_id = $stateParams.AUDITID;
      Http.updateAuditDetail($scope.AuditInfo).then(function(result) {
        if (200 == result.data.head.status) {
          alert('审核成功');
          $state.go("main.department.audit", {}, {
            reload: true
          });
        } else {
          alert('审核失败');
        }
      });
    }
  }
])

Audit.controller('Department.Audit.Controller.detail', ['$scope', '$state', '$q', 'Department.Audit.Service.Http', '$stateParams',
  function( $scope, $state, $q, Http, $stateParams) {
    $scope.TabItemShow = true;
    $scope.TabRequireShow = true;
    $scope.AuditInfo = {};
    $scope.AuditInfo.audit_opinion = '';

    // 根据id查询信息资源详情
    Http.getDepartInfoResList({
      resource_id : $stateParams.RESOURCEID
    }).then(function(ResourceRes) {
      $scope.InfoResourceDetail = ResourceRes.data.body[0].results[0];
      $scope.InfoResourceDetail.apply_dep_name = $stateParams.APPLYDEP;
      $scope.InfoResourceDetail.apply_time = $stateParams.APPLYTIME;
      $scope.InfoResourceDetail.audit_status = $stateParams.AUDITSTATUS;
      $scope.InfoResourceDetail.audit_opinion = $stateParams.OPINION;
    })


    $scope.InfoItemShow = false;
    Http.getInfoItemList({
      resource_id: $stateParams.RESOURCEID
    }).then(function(result) {
      if (result.data.body.length == 0) {
        $scope.InfoItemShow = false;
      } else {
        $scope.InfoItemShow = true;
        $scope.InfoItems = result.data.body;
      }
    })
  }
])

/* HTTP */
Audit.factory('Department.Audit.Service.Http', ['$http', '$q', 'API',
  function($http, $q, API) {
    var path = API.path;

    function getAuditList(params) {
      return $http.get(
        path + '/openinfo_resourcelist', {
          params: params
        }
      )
    }

    function getInfoResourceDetail(params) {
      return $http.get(
        path + '/data_quota_detail', {
          params: params
        }
      )
    }

    function updateAuditDetail(data) {
      return $http.put(
        path + '/openinfo_resourceok', {
          data: data
        }
      )
    }

    function getQuotaRequirement(params) {
      return $http.get(
        path + '/requiement_detail', {
          params: params
        }
      )
    }
    function getInfoItemList(params) {
      return $http.get(
        path + '/item_detail', {
          params: params
        }
      )
    }
    function getDepartInfoResList(params) {
      return $http.get(
        path + '/info_resource_list', {
          params: params
        }
      )
    }
    return {
      getAuditList: getAuditList,
      getInfoResourceDetail: getInfoResourceDetail,
      updateAuditDetail: updateAuditDetail,
      getQuotaRequirement: getQuotaRequirement,
      getInfoItemList: getInfoItemList,
      getDepartInfoResList: getDepartInfoResList
    }
  }
]);

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
          if('error' == result.data.head.message) {
            alert('上传失败');
          }
          else {
            alert(result.data.head.message);
          }
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
      var uploadflag = false;
      if (!file) {
        alert('您还未选择文件');
        return;
      }
      else {
        Http.checkExistExamples({
          resource_id : $stateParams.ID
        }).then(function(res) {
          if(200 == res.data.head.status) {
            if(res.data.body[0].isexists == 'true') {
              var cover = confirm('该资源已经存在样例数据，继续上传将覆盖已有的样例数据，是否继续？');
              if(cover) {
                uploadflag = true;
              }
            }
            else {
              uploadflag = true;
            }
          }
          if(uploadflag) {
            $scope.uploadPromise = Http.uploadExamplesFile(file,$stateParams.ID).then(function(result) {
              if (200 == result.data.head.status) {
                alert('上传成功！');
                $state.go("main.department.inventory", {}, {
                  reload: true
                });
              }
              else {
                if('error' == result.data.head.message) {
                  alert('上传失败');
                }
                else {
                  alert(result.data.head.message);
                }
              }
            });
          }
        })
      }

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

    function checkExistExamples(id) {
      return $http.get(
        path + '/resource_examples_exists', {
          params: id
        }
      )
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
      uploadExamplesFile: uploadExamplesFile,
      checkExistExamples: checkExistExamples
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

'use strict';
var DInventory = angular.module('Department.Inventory', ['ui.router', 'ngCookies', 'cgBusy']);

/** Inventory Controller */
DInventory.controller('Department.Inventory.Controller.Main', ['$cookies', '$scope', '$q', 'Department.Inventory.Service.Http',
  function($cookies, $scope, $q, Http) {
    var SHARE_FREQUENCY = 1;
    var DATA_LEVEL = 2;
    var SHARE_LEVEL = 3;
    var SECRET_FLAG = 5;
    var RESOURCE_FORMAT = 11;
    var SOCIAL_OPEN_FLAG = 14;

    var LoginUser = JSON.parse($cookies.get('User'));
    var DEP_NAME = LoginUser.dep_id;
    $scope.DepartInfoResource = {};

    $scope.Paging = {};
    $scope.Paging.currentPage = 1;
    $scope.Paging.maxSize = 5;
    $scope.Paging.itemsPerPage = 10;

    var _httpParams = {};
    _httpParams.limit = 10;
    _httpParams.skip = 0;

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

    $scope.Paging.pageChanged = function() {
      _httpParams.skip = ($scope.Paging.currentPage - 1) * _httpParams.limit;
      getDeptInfoResourceList(_httpParams);
    }

    function getDeptInfoResourceList(_httpParams) {
      //_httpParams.dep_name = DEP_NAME;
      $scope.promise = Http.getDepartInfoResList(_httpParams).then(function(result) {
        console.log(result);
        if (200 == result.data.head.status) {
          $scope.infoResourceList = result.data.body[0].results;
          $scope.resourceCount = result.data.body[0].count[0].resource_count;
          $scope.Paging.totalItems = result.data.body[0].count[0].resource_count;
        } else {
          $scope.infoResourceList = [];
        }

      });
    }


    //init
    getDeptInfoResourceList(_httpParams);

    // resource format all
    $scope.getResFormatAll = function() {
      $scope.resFormatMainSelection = [];
      _httpParams.re_format = null;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDeptInfoResourceList(_httpParams);
    }

    // share level all
    $scope.getShareLevelAll = function() {
      $scope.shareLvMainSelection = [];
      _httpParams.share_level = null;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDeptInfoResourceList(_httpParams);
    }

    // social open all
    $scope.getSocialOpenAll = function() {
      $scope.socialOpenMainSelection = [];
      _httpParams.social_open_flag = null;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDeptInfoResourceList(_httpParams);
    }

    // share frequency all
    $scope.getShareFreqAll = function() {
      $scope.shareFreqSelection = [];
      _httpParams.update_period = null;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDeptInfoResourceList(_httpParams);
    }

    // secret flag all
    $scope.getSecretFlagAll = function() {
      $scope.secretFlagMainSelection = [];
      _httpParams.issecret = null;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDeptInfoResourceList(_httpParams);
    }

    // filter by resource format
    $scope.resFormatMainSelection = [];
    $scope.getInfoResourceByResFormat = function(item) {
      var idx = $scope.resFormatMainSelection.indexOf(item.id);
      if (idx > -1) {
        $scope.resFormatMainSelection = [];
      } else {
        $scope.resFormatMainSelection = item.id;
      }
      _httpParams.re_format = $scope.resFormatMainSelection;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDeptInfoResourceList(_httpParams);
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
      getDeptInfoResourceList(_httpParams);
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
      getDeptInfoResourceList(_httpParams);
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
      getDeptInfoResourceList(_httpParams);
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
      getDeptInfoResourceList(_httpParams);
    }


    // get spatial all
    $scope.getSpatialAll = function() {
      $scope.areaMainSelection = [];
      _httpParams.area_level = null;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDeptInfoResourceList(_httpParams);
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
      getDeptInfoResourceList(_httpParams);
    }

    // search by name
    $scope.searchDeptInfoResourceByName = function() {
      _httpParams.resource_name = $scope.DepartInfoResource.resource_name_filter;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDeptInfoResourceList(_httpParams);
    }

    // delete info resource
    $scope.deleteInfoResource = function(resourceId) {
      var deleteConfirm = confirm('确定删除本条信息资源？删除后将不可恢复。');
      if (deleteConfirm) {
        Http.deleteInfoResource({
          resourceid: resourceId
        }).then(function(result) {
          if (200 == result.data.head.status) {
            alert('删除成功！');
            getDeptInfoResourceList(_httpParams);
          } else {
            alert('删除失败');
          }
        })
      }
    }


  }
])



DInventory.controller('Department.Inventory.Controller.publish', ['$cookies', '$scope', '$stateParams', '$state', '$q', '$uibModal', 'Department.Inventory.Service.Component', 'Department.Inventory.Service.Http',
  function($cookies, $scope, $stateParams, $state, $q, $uibModal, Component, Http) {
    var RESOURCE_CATEGORY = 10;
    var SHARE_TYPE = 12;
    var SHARE_METHOD = 13;
    var ITEM_TYPE = 15;
    var LEVEL_AUTH = '250375bd-02f0-11e6-a52a-5cf9dd40ad7e'; // 授权开放
    var LEVEL_ALL_OPEN = '2501e32c-02f0-11e6-a52a-5cf9dd40ad7e'; // 全开放
    var RESOURCE_FORMAT_DATA = 'aaee8194-2614-11e6-a9e9-507b9d1b58bb';
    var RESOURCE_FORMAT_OTHER = 'ab11fdd4-2614-11e6-a9e9-507b9d1b58bb';
    var SHARE_METHOD_OTHER = 'd8d61ff3-2616-11e6-a9e9-507b9d1b58bb';

    var LoginUser = JSON.parse($cookies.get('User'));
    var DEP_ID = LoginUser.dep_id;
    $scope.DEP_NAME = LoginUser.dep_name;
    $scope.ORG_NAME = LoginUser.organization;
    $scope.ORG_CODE = LoginUser.organization_code;
    $scope.InfoResource = {};
    $scope.InfoResource.alias = '';
    $scope.InfoResource.rel_category = '';
    $scope.InfoResource.secret_flag = '';
    $scope.InfoResource.meter_unit = "";
    $scope.InfoResource.calculate_method = '';
    $scope.InfoResource.resource_format_other = '';
    $scope.InfoResource.share_method_other = '';
    $scope.InfoResource.social_open_limit = '';
    $scope.InfoResource.linkman = '';
    $scope.InfoResource.contact_phone = '';
    $scope.InfoResource.resource_format_desc = '';
    $scope.InfoResource.share_method_desc = '';
    // item list
    $scope.ResourceItemList = [];
    $scope.itemTreeList = [];
    //$scope.ResourceItemConfigList = [];

    // $scope.itemTreeList = [{
    //   'id': 'name1',
    //   'item_name': 'name1',
    //   'children': [{
    //     'id': 'name1-1',
    //     'item_name': 'name1-1'
    //   }, {
    //     'id': 'name1-2',
    //     'item_name': 'name1-2'
    //   }]
    // }, {
    //   'id': 'name2',
    //   'item_name': 'name2',
    //   'children': [{
    //     'id': 'name2-1',
    //     'item_name': 'name2-1',
    //     'parent_id': 'name2',
    //     'children': [{
    //       'id': 'name2-1-1',
    //       'item_name': 'name2-1-1',
    //       'parent_id': 'name2-1,name2',
    //     }, {
    //       'id': 'name2-1-2',
    //       'item_name': 'name2-1-2',
    //       'parent_id': 'name2-1,name2',
    //     }]
    //   }, {
    //     'id': 'name2-2',
    //     'item_name': 'name2-2',
    //     'parent_id': 'name2'
    //   }]
    // }, {
    //   'id': 'name3',
    //   'item_name': 'name3',
    //   'children': [{
    //     'id': 'name3-1',
    //     'item_name': 'name3-1'
    //   }, {
    //     'id': 'name3-2',
    //     'item_name': 'name3-2'
    //   }]
    // }]

    $scope.showSelected = function(sel) {
      $scope.parent.selectedItem = sel;
    };

    // resource name duplicate check
    $scope.resNameExist = false;
    $scope.checkResName = function() {
      if ($scope.InfoResource.resource_name && $scope.InfoResource.resource_name != '') {
        Http.checkResName({
          resource_name: $scope.InfoResource.resource_name
        }).then(function(res) {
          if (res.data.body[0].isexists == 'true') {
            $scope.resNameExist = true;
          } else {
            $scope.resNameExist = false;
          }
        })
      }

    }

    function getInfoItemList(resourceId) {
      // 获取信息项列表
      Http.getInfoItemList({
        resource_id: resourceId
      }).then(function(result) {
        if (200 == result.data.head.status) {
          $scope.ResourceItemList = result.data.body;
          // 拼接信息资源所有信息项的多选项
          _($scope.ResourceItemList).forEach(function(item) {
            var shareFreqDictName = [];
            _(item.config).forEach(function(config) {
              shareFreqDictName.push(config.dict_name);
            })
            item.update_period_name = shareFreqDictName.toString();
          })
        }
      })
    }

    // 获取信息项的树结构
    function getInfoItemTreeList(resourceId) {
      // 获取信息项列表
      Http.getInfoItemTreeList({
        resource_id: resourceId
      }).then(function(result) {
        if (200 == result.data.head.status) {
          $scope.itemTreeList = result.data.body;
        }
      })
    }

    Http.getDepartmentList().then(function(result) {
      $scope.deptList = result.data.body;
      var evens = _.remove($scope.deptList, function(item) {
        return item.id == DEP_ID;
      });
    });

    Http.getSystemDictByCatagory({
      'dict_category': RESOURCE_CATEGORY
    }).then(function(result) {
      $scope.resourceCategoryList = result.data.body;
      $scope.resourceCategoryRelList = result.data.body;
    });

    Http.getSystemDictByCatagory({
      'dict_category': SHARE_TYPE
    }).then(function(result) {
      $scope.shareTypeList = result.data.body;
    });

    Http.getSystemDictByCatagory({
      'dict_category': SHARE_METHOD
    }).then(function(result) {
      $scope.shareMethodList = result.data.body;
    });

    Http.getSystemDictByCatagory({
      'dict_category': ITEM_TYPE
    }).then(function(result) {
      $scope.itemTypeList = result.data.body;
    });

    // 从信息项返回到修改信息资源
    $scope.backToUpdate = function() {
      console.log($scope.InfoResource.id);
      $state.go('main.department.inventory.update', {
        item: $scope.InfoResource.id
      }, {
        reload: true
      })
    }
    $scope.close = function(isValid) {
      $state.go("main.department.inventory", {}, {
        reload: true
      });
    }

    $scope.toUpload = function() {
      if ($scope.ResourceItemList.length == 0) {
        alert('您还未添加信息项！');
        return;
      } else {
        $state.go("main.department.inventory.uploadExampleData", {
          ID: $scope.InfoResource.id
        }, {
          reload: true
        });
      }
    }

    // submit add
    $scope.addInfoResource = function(isValid) {
      $scope.submitted = true;
      var InfoResourceAddObj = {};
      var InfoResource_RelationConfig = [];
      var InfoResourceApplyInfo = [];
      console.log($scope.resItemAddBtn);
      //var InfoItem_RelationConfig = [];
      if ($scope.resNameExist) {
        isValid = false;
      }
      if ($scope.shareFreqSelection.length == 0 && !$scope.resItemAddBtn) { // 未选择更新周期
        isValid = false;
      }
      if ($scope.InfoResource.category == $scope.InfoResource.rel_category) { // 信息资源分类和关联及类目名称相同
        isValid = false;
      }
      if ($scope.depShow && ($scope.outputDeptList.length == 0)) { // 未选择指定部门开放
        isValid = false;
      }
      if (isValid) {
        InfoResourceAddObj.InfoResource = $scope.InfoResource;
        _($scope.dataLevelSelection).forEach(function(value) {
          var sys_dict = {};
          sys_dict.InfoResourceId = $scope.InfoResource.resource_name;
          sys_dict.sys_dict_id = value;
          InfoResource_RelationConfig.push(sys_dict);
        });

        _($scope.shareFreqSelection).forEach(function(value) {
          var sys_dict = {};
          sys_dict.InfoResourceId = $scope.InfoResource.resource_name;
          sys_dict.sys_dict_id = value;
          sys_dict.obj_type = 1;
          InfoResource_RelationConfig.push(sys_dict);
        });

        var shareDeps = _.map($scope.outputDeptList, 'id');
        _(shareDeps).forEach(function(value) {
          var share_dep = {};
          share_dep.InfoResourceId = $scope.InfoResource.resource_name;
          share_dep.apply_dep = value;
          InfoResourceApplyInfo.push(share_dep);
        });

        InfoResourceAddObj.InfoResource_RelationConfig = InfoResource_RelationConfig;
        InfoResourceAddObj.InfoResourceApplyInfo = InfoResourceApplyInfo;

        console.log(InfoResourceAddObj);
        $scope.savePromise = Http.saveInfoResource(InfoResourceAddObj).then(function(result) {
          console.log(result.data);
          if (200 == result.data.head.status) {
            if (!$scope.resItemAddBtn) {
              alert('保存成功！');
              $state.go("main.department.inventory", {}, {
                reload: true
              });
            } else {
              $scope.ResItemListShow = true;
              $scope.InfoResource.id = result.data.body[0].id;
            }
          } else {
            alert('保存失败！');
          }
        })
      } else {
        return;
      }
    }


    // submit update
    console.log($stateParams.item);
    $scope.resItemUpdateBtn = false;
    if ($stateParams.item) { // 选择修改
      // 根据id查询信息资源详情
      Http.getDepartInfoResList({
        resource_id: $stateParams.item
      }).then(function(ResourceRes) {
        $scope.InfoResource = ResourceRes.data.body[0].results[0];
        if (LEVEL_AUTH == $scope.InfoResource.share_level) {
          $scope.depShow = true;
        }

        if (RESOURCE_FORMAT_DATA == $scope.InfoResource.resource_format) {
          $scope.resItemUpdateBtn = true;
          $scope.InfoResource.update_period = '';
        }

        //$scope.ResourceItemConfigList = [];
        // 获取资源数据分区级别
        Http.getResourceAreaLevel({
          resource_id: $scope.InfoResource.id
        }).then(function(res) {
          $scope.dataLevelSelection = res.data.body[0].id;
        })

        // 获取资源更新周期
        Http.getResourceUpdatePeriod({
          resource_id: $scope.InfoResource.id
        }).then(function(res) {
          $scope.shareFreqSelection = res.data.body[0].id;
        })

        // 获取指定开放部门列表
        Http.getResourceShareDeps({
          resource_id: $scope.InfoResource.id
        }).then(function(res) {
          var authDepts = res.data.body[0].id;
          if (authDepts.length > 0) {
            $scope.depShow = true;
          }
          _($scope.deptList).forEach(function(allItem) {
            _(authDepts).forEach(function(authItem) {
              if (allItem.id == authItem) {
                allItem.ticked = true;
                $scope.outputDeptList.push(allItem);
              }
            })
          });
        })
      })

    }


    $scope.updateInfoResource = function(isValid) {
      $scope.submitted = true;
      var InfoResourceAddObj = {};
      var InfoResource_RelationConfig = [];
      var InfoResourceApplyInfo = [];
      //  var InfoItem_RelationConfig = [];


      if ($scope.resNameExist) {
        isValid = false;
      }
      if ($scope.shareFreqSelection.length == 0 && !$scope.resItemUpdateBtn) { // 未选择更新周期
        isValid = false;
      }
      if ($scope.InfoResource.category == $scope.InfoResource.rel_category) { // 信息资源分类和关联及类目名称相同
        isValid = false;
      }
      if ($scope.depShow && ($scope.outputDeptList.length == 0)) { // 未选择指定部门开放
        isValid = false;
      }

      if (isValid) {
        InfoResourceAddObj.InfoResource = $scope.InfoResource;
        _($scope.dataLevelSelection).forEach(function(value) {
          var sys_dict = {};
          sys_dict.InfoResourceId = $scope.InfoResource.id;
          sys_dict.sys_dict_id = value;
          InfoResource_RelationConfig.push(sys_dict);
        });

        _($scope.shareFreqSelection).forEach(function(value) {
          var sys_dict = {};
          sys_dict.InfoResourceId = $scope.InfoResource.id;
          sys_dict.sys_dict_id = value;
          sys_dict.obj_type = 1;
          InfoResource_RelationConfig.push(sys_dict);
        });

        var shareDeps = _.map($scope.outputDeptList, 'id');
        _(shareDeps).forEach(function(value) {
          var share_dep = {};
          share_dep.InfoResourceId = $scope.InfoResource.id;
          share_dep.apply_dep = value;
          InfoResourceApplyInfo.push(share_dep);
        });
        _($scope.ResourceItemList).forEach(function(item, index) {
          console.log(index);
          item.item_ord = index;
          item.InfoResourceId = $scope.InfoResource.id;
          console.log($scope.ResourceItemList);
        })

        InfoResourceAddObj.InfoResource_RelationConfig = InfoResource_RelationConfig;
        InfoResourceAddObj.InfoResourceApplyInfo = InfoResourceApplyInfo;

        $scope.updatePromise = Http.updateInfoResource(InfoResourceAddObj).then(function(result) {
          console.log(result.data);
          if (200 == result.data.head.status) {
            if (!$scope.resItemUpdateBtn) {
              alert('保存成功！');
              $state.go("main.department.inventory", {}, {
                reload: true
              });
            } else {
              // 获取信息项列表
              getInfoItemList($scope.InfoResource.id);
              getInfoItemTreeList($scope.InfoResource.id);
              $scope.ResItemListShow = true;
            }

          } else {
            alert('保存失败');
          }

        })
      } else {
        return;
      }
    }

    // $scope.editItems = function(id) {
    //   $scope.ResourceItemList = [];
    //   $scope.parent = {};
    //   Http.getInfoItemList({
    //     resource_id: id
    //   }).then(function(result) {
    //     if (200 == result.data.head.status) {
    //       $scope.ResourceItemList = result.data.body;
    //       // 拼接信息资源所有信息项的多选项
    //       _($scope.ResourceItemList).forEach(function(item) {
    //         var shareFreqDictName = [];
    //         _(item.config).forEach(function(config) {
    //           shareFreqDictName.push(config.dict_name);
    //         })
    //         item.update_period_name = shareFreqDictName.toString();
    //       })
    //     }
    //
    //   })
    //   $scope.ResItemListShow = true;
    // }

    $scope.addResourceItem = function(type) {
      console.log($scope.InfoResource.id);
      $scope.shareFreqEmpty = false;
      $scope.Modal = {};
      $scope.itemAdded = false;
      $scope.ResourceItem = {};
      $scope.ResourceItem.meter_unit = '';
      $scope.ResourceItem.calculate_method = '';
      $scope.ResourceItem.field_standard = '';
      $scope.ResourceItem.shareFreqItemSelection = [];
      $scope.ResourceItem.shareFreqItemObjSelection = [];
      //$scope.ResourceItem.isleaf = 1;
      $scope.parent = {};
      //$scope.parent.itemNameExist = false;
      $scope.parent.childParentConflict = false;

      $scope.data = {};
      $scope.ResourceItem.item_type = $scope.itemTypeList[0].id;
      $scope.ResourceItem.secret_flag = $scope.secretFlagList[0].id;
      $scope.parent.selectedItem = undefined;

      $scope.ResourceItemConfigList = [];
      var ItemCommitObj = {};

      // $scope.$watch('data.parent_id', function(n) {
      //   $scope.parent.childParentConflict = false;
      //   if (n && n.length > 0) {
      //     _($scope.ResourceItemList).forEach(function(item) {
      //       if ((n[0].item_name != $scope.ResourceItem.item_name) && (n[0].item_name == item.item_name) && ($scope.ResourceItem.item_name == item.parent_id)) {
      //         $scope.parent.childParentConflict = true;
      //         return;
      //       }
      //     });
      //     $scope.ResourceItem.parent_id = n[0].id ? n[0].id : '';
      //   } else {
      //     $scope.ResourceItem.parent_id = '';
      //   }
      // })


      // $scope.checkItemName = function() {
      //   if ($scope.ResourceItem.item_name && $scope.ResourceItem.item_name != '') {
      //     console.log($scope.ResourceItem);
      //     console.log($scope.ResourceItemList);
      //     $scope.parent.itemNameExist = false;
      //     _($scope.ResourceItemList).forEach(function(item) {
      //       if (($scope.ResourceItem.item_name == item.item_name) && $scope.ResourceItem !== item) {
      //         $scope.parent.itemNameExist = true;
      //       }
      //     })
      //     if (!$scope.parent.itemNameExist) {
      //       Http.checkItemName({
      //         item_name: $scope.ResourceItem.item_name,
      //         info_resource_id: $scope.InfoResource.id
      //       }).then(function(res) {
      //         if (res.data.body[0].isexists == 'true') {
      //           $scope.parent.itemNameExist = true;
      //         } else {
      //           $scope.parent.itemNameExist = false;
      //         }
      //       })
      //     }
      //
      //   }
      //
      // }

      $scope.opts = {};
      $scope.parent.itemTreeList = $scope.itemTreeList;


      Component.popModal($scope, 'Department.Inventory.Controller.publish', '新增', 'item-add-modal').result.then(function(res) {
        $scope.itemAdded = false;
        console.log($scope.parent.selectedItem);
        $scope.ResourceItem.parent_id = $scope.parent.selectedItem ? $scope.parent.selectedItem.item_id : '';
        var shareFreqDictName = [];
        _($scope.ResourceItem.shareFreqItemObjSelection).forEach(function(item) {
          var sys_dict = {};
          sys_dict.InfoItemId = $scope.ResourceItem.item_name;
          sys_dict.sys_dict_id = item.id;
          sys_dict.parent_id = $scope.ResourceItem.parent_id;
          $scope.ResourceItemConfigList.push(sys_dict);
        });
        $scope.ResourceItem.resource_id = $scope.InfoResource.id;
        ItemCommitObj.InfoItem = $scope.ResourceItem;
        ItemCommitObj.InfoItem_RelationConfig = $scope.ResourceItemConfigList;

        // 新增信息项
        Http.addInfoItem(ItemCommitObj).then(function(res) {
          if (200 == res.data.head.status) {
            alert('保存成功！');
            // 获取信息项列表
            getInfoItemList($scope.InfoResource.id);
            getInfoItemTreeList($scope.InfoResource.id);
            console.log($scope.itemTreeList);
          } else {
            alert('保存失败！');
          }
        })
      })
    }

    // update resource item
    $scope.updateItem = function(id) {
      // 根据id查询信息项
      $scope.InfoItem = null;
      $scope.ResourceItemConfigList = [];
      Http.getInfoItemById({
        info_item_id: id
      }).then(function(result) {
        if (200 == result.data.head.status) {
          $scope.InfoItem = result.data.body[0];

          $scope.Modal = {};
          $scope.itemUpdated = false;
          $scope.ResourceItem = angular.copy($scope.InfoItem);
          $scope.ResourceItem.shareFreqItemSelection = _.map($scope.InfoItem.config, 'id');
          $scope.ResourceItem.shareFreqItemObjSelection = $scope.InfoItem.config;

          $scope.shareFreqEmpty = false;
          $scope.parent = {};
          //$scope.parent.itemNameExist = false;
          $scope.parent.selectedItem = {};
          //$scope.parent.ItemsList = angular.copy($scope.ResourceItemList);
          $scope.parent.itemTreeList = angular.copy($scope.itemTreeList);
          var hasEmpty = false;
          console.log($scope.InfoItem);
          console.log($scope.ResourceItem.shareFreqItemSelection);
          var ItemUpdateObj = {};

          $scope.parent.selectedItem.item_name = $scope.InfoItem.parent_id;
          $scope.parent.selectedItem.item_id = $scope.InfoItem.parent_item_id;
          // var jsonloop = new JSONLoop($scope.itemTreeList, 'id', 'item_name');
          // jsonloop.findNodeById($scope.itemTreeList, 'name2', function(err, node) {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     console.dir(node);
          //   }
          // });
          // _($scope.parent.ItemsList).forEach(function(item) {
          //   if (item.item_name == '') {
          //     hasEmpty = true;
          //   }
          // })
          // if (!hasEmpty) {
          //   $scope.parent.ItemsList.push({
          //     'item_name': ''
          //   });
          // }

          // $scope.data = {};
          // _($scope.parent.ItemsList).forEach(function(resourceItem) {
          //   if ($scope.InfoItem.parent_id == resourceItem.item_name) {
          //     $scope.data.parent_id = [];
          //     resourceItem.ticked = true;
          //     $scope.data.parent_id.push(resourceItem);
          //   }
          // })

          // $scope.$watch('data.parent_id', function(n) {
          //   $scope.parent.childParentConflict = false;
          //   if (n && n.length > 0) {
          //     _($scope.ResourceItemList).forEach(function(item) {
          //       if ((n[0].item_name != $scope.ResourceItem.item_name) && (n[0].item_name == item.item_name) && ($scope.ResourceItem.item_name == item.parent_id)) {
          //         $scope.parent.childParentConflict = true;
          //         return;
          //       }
          //     });
          //     $scope.ResourceItem.parent_id = n[0].id ? n[0].id : '';
          //   } else {
          //     $scope.ResourceItem.parent_id = '';
          //   }
          // })

          // $scope.checkItemName = function() {
          //   if ($scope.ResourceItem.item_name && $scope.ResourceItem.item_name != '') {
          //     $scope.parent.itemNameExist = false;
          //     _($scope.ResourceItemList).forEach(function(item) {
          //       if (($scope.ResourceItem.item_name == item.item_name) && $scope.ResourceItem !== item) {
          //         $scope.parent.itemNameExist = true;
          //       }
          //     })
          //     if (!$scope.parent.itemNameExist) {
          //       Http.checkItemName({
          //         item_name: $scope.ResourceItem.item_name,
          //         info_resource_id: $scope.InfoResource.id
          //       }).then(function(res) {
          //         if (res.data.body[0].isexists == 'true') {
          //           $scope.parent.itemNameExist = true;
          //         } else {
          //           $scope.parent.itemNameExist = false;
          //         }
          //       })
          //     }
          //
          //   }
          //
          // }

          $scope.opts = {
            isSelectable: function(node) {
              var parent_ids = node.parents ? node.parents : '';
              return (node.item_id !== $scope.ResourceItem.id && (parent_ids.indexOf($scope.ResourceItem.id) < 0));
            }
          };

          Component.popModal($scope, 'Department.Inventory.Controller.publish', '修改', 'item-add-modal').result.then(function(res) {
            $scope.itemUpdated = false;
            var shareFreqDictName = [];
            console.log($scope.parent.selectedItem);
            $scope.ResourceItem.parent_id = $scope.parent.selectedItem ? $scope.parent.selectedItem.item_id : '';
            _($scope.ResourceItem.shareFreqItemObjSelection).forEach(function(item) {
              var sys_dict = {};
              sys_dict.InfoItemId = $scope.ResourceItem.id;
              sys_dict.sys_dict_id = item.id;
              sys_dict.parent_id = $scope.ResourceItem.parent_id;
              $scope.ResourceItemConfigList.push(sys_dict);
            });

            $scope.ResourceItem.resource_id = $scope.InfoResource.id;
            ItemUpdateObj.InfoItem = $scope.ResourceItem;
            ItemUpdateObj.InfoItem_RelationConfig = $scope.ResourceItemConfigList;

            // 修改信息项
            Http.updateInfoItem(ItemUpdateObj).then(function(res) {
              if (200 == res.data.head.status) {
                alert('保存成功！');
                // 获取信息项列表
                getInfoItemList($scope.InfoResource.id);
                getInfoItemTreeList($scope.InfoResource.id);
              } else {
                alert('保存失败！');
              }
            })

          })
        } else {
          alert('查询出错！');
          return;
        }
      })

    }

    // delete info item
    $scope.deleteItem = function(id, isleaf) {
      if(isleaf == '0') {
        alert('该信息项包含子信息项，请先删除其子信息项！');
        return;
      }
      var deleteFlag = confirm('确定删除本条信息项？');
      console.log(id);
      if (deleteFlag && id) {
        Http.deleteInfoItem({
          id: id
        }).then(function(result) {
          if (200 == result.data.head.status) {
            alert('删除成功！');
            // 获取信息项列表
            getInfoItemList($scope.InfoResource.id);
            getInfoItemTreeList($scope.InfoResource.id);
          } else {
            alert('删除失败！');
          }
        })
      }
    }



    // show or hide department
    $scope.depShow = false;
    $scope.showHideDeps = function(ev) {
      if (LEVEL_ALL_OPEN != $scope.InfoResource.share_level) { // 不为全开放
        if (LEVEL_AUTH == $scope.InfoResource.share_level) { // 授权开放
          $scope.depShow = true;
          $scope.socialOpenFlag = false;
        } else {
          $scope.depShow = false;
          $scope.socialOpenFlag = true;
          $scope.outputDeptList = [];
        }
        $scope.InfoResource.social_open_flag = 0;
      } else {
        $scope.depShow = false;
        $scope.InfoResource.social_open_flag = 1;
        $scope.outputDeptList = [];
      }

    }

    $scope.shareMethodOtherShow = false;
    $scope.showHideShareMethodOther = function() {
      if (SHARE_METHOD_OTHER == $scope.InfoResource.share_method) {
        $scope.shareMethodOtherShow = true;
      } else {
        $scope.shareMethodOtherShow = false;
      }
    }

    //show or hide resource item add button
    $scope.resItemAddBtn = false;
    $scope.resFormatOtherShow = false;
    $scope.showHideResAddBtn = function() {
      $scope.resFormatOtherShow = false;
      if (RESOURCE_FORMAT_DATA == $scope.InfoResource.resource_format) {
        if ($stateParams.item) { // 修改
          $scope.resItemUpdateBtn = true;
        } else { // 新增
          $scope.resItemAddBtn = true;
        }

        $scope.resFormatOtherShow = false;
        $scope.shareFreqSelection = [];
        $scope.InfoResource.secret_flag = '';
        $scope.InfoResource.meter_unit = "";
        $scope.InfoResource.calculate_method = '';
      } else if (RESOURCE_FORMAT_OTHER == $scope.InfoResource.resource_format) {
        $scope.resFormatOtherShow = true;
        $scope.resItemAddBtn = false;
        $scope.resItemUpdateBtn = false;
      } else {
        $scope.resItemAddBtn = false;
        $scope.resFormatOtherShow = false;
        $scope.resItemUpdateBtn = false;
      }
    }

    $scope.dataLevelSelection = [];
    $scope.toggleDataLevelSelection = function(item) {
      var idx = $scope.dataLevelSelection.indexOf(item.id);
      // is currently selected
      if (idx > -1) {
        $scope.dataLevelSelection.splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.dataLevelSelection.push(item.id);
      }
    };

    $scope.shareFreqSelection = [];
    $scope.toggleShareFreqSelection = function(item) {
      var idx = $scope.shareFreqSelection.indexOf(item.id);
      // is currently selected
      if (idx > -1) {
        $scope.shareFreqSelection.splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.shareFreqSelection.push(item.id);
      }
    };



    $scope.toggleShareFreqItemSelection = function(item) {
      //var shareFreqItemSelectionIds = _.map($scope.shareFreqItemSelection, 'id');
      var idx = $scope.ResourceItem.shareFreqItemSelection.indexOf(item.id);
      console.log(idx);
      // is currently selected
      if (idx > -1) {
        $scope.ResourceItem.shareFreqItemSelection.splice(idx, 1);
        $scope.ResourceItem.shareFreqItemObjSelection.splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.ResourceItem.shareFreqItemSelection.push(item.id);
        $scope.ResourceItem.shareFreqItemObjSelection.push(item);
      }
      console.log($scope.ResourceItem.shareFreqItemObjSelection);
    };


  }

])



/* HTTP */
DInventory.factory('Department.Inventory.Service.Http', ['$http', '$q', 'API',
  function($http, $q, API) {
    var path = API.path;

    function getDepartmentList() {
      return $http.get(
        path + '/sys_dep'
      )
    }

    function getDepartInfoResList(params) {
      return $http.get(
        path + '/info_resource_list', {
          params: params
        }
      )
    }

    function getInfoResourceDetail(params) {
      return $http.get(
        path + '/data_quota_detail', {
          params: params
        }
      )
    }

    function saveInfoResource(data) {
      return $http.post(
        path + '/info_resource', {
          data: data
        }
      )
    };

    function updateInfoResource(data) {
      return $http.put(
        path + '/info_resource', {
          data: data
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

    function getInfoItemTreeList(params) {
      return $http.get(
        path + '/allinfo_item_detail', {
          params: params
        }
      )
    }

    function getSystemDictByCatagory(params) {
      return $http.get(
        path + '/sys_dict', {
          params: params
        }
      )
    };

    function deleteInfoResource(id) {
      return $http.delete(
        path + '/info_resource', {
          data: id
        }
      )
    }

    function getResourceAreaLevel(params) {
      return $http.get(
        path + '/resource_area_level', {
          params: params
        }
      )
    }

    function getResourceUpdatePeriod(params) {
      return $http.get(
        path + '/resource_update_period', {
          params: params
        }
      )
    }

    function getResourceShareDeps(params) {
      return $http.get(
        path + '/resource_share_dep', {
          params: params
        }
      )
    }

    function getInfoItemById(id) {
      return $http.get(
        path + '/info_item', {
          params: id
        }
      )
    }

    function addInfoItem(params) {
      return $http.post(
        path + '/info_item', {
          data: params
        }
      )
    }

    function updateInfoItem(params) {
      return $http.put(
        path + '/info_item', {
          data: params
        }
      )
    }

    function deleteInfoItem(id) {
      return $http.delete(
        path + '/info_item', {
          data: id
        }
      )
    }

    function getItemUpdatePeriod(params) {
      return $http.get(
        path + '/item_update_period', {
          params: params
        }
      )
    }

    function checkResName(params) {
      return $http.get(
        path + '/info_resource_name', {
          params: params
        }
      )
    }

    function checkItemName(params) {
      return $http.get(
        path + '/info_item_name', {
          params: params
        }
      )
    }

    function uploadFile(file, id) {
      var fd = new FormData();
      var uploadUrl = path + '/upload/excel?data_quota_id=' + id;
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
      saveInfoResource: saveInfoResource,
      getDepartmentList: getDepartmentList,
      getDepartInfoResList: getDepartInfoResList,
      getInfoResourceDetail: getInfoResourceDetail,
      getSystemDictByCatagory: getSystemDictByCatagory,
      deleteInfoResource: deleteInfoResource,
      updateInfoResource: updateInfoResource,
      getInfoItemList: getInfoItemList,
      getInfoItemTreeList: getInfoItemTreeList,
      getResourceAreaLevel: getResourceAreaLevel,
      getResourceUpdatePeriod: getResourceUpdatePeriod,
      getResourceShareDeps: getResourceShareDeps,
      addInfoItem: addInfoItem,
      updateInfoItem: updateInfoItem,
      deleteInfoItem: deleteInfoItem,
      getItemUpdatePeriod: getItemUpdatePeriod,
      checkResName: checkResName,
      checkItemName: checkItemName,
      uploadFile: uploadFile,
      getInfoItemById: getInfoItemById
    }
  }
]);



/* Component */
DInventory.service('Department.Inventory.Service.Component', ['$uibModal', '$state',
  function($uibModal, $state) {
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
    // prompt Modal
    function popModal(scope, controller, type, templateUrl) {
      scope.Modal.type = type;
      var modalInstance = $uibModal.open({
        animation: true,
        backdrop: 'static',
        templateUrl: templateUrl + '.html',
        controller: controller,
        size: 'lg',
        scope: scope
      });
      scope.Modal.confirm = function() {
        if (scope.ResourceItem.shareFreqItemSelection.length == 0) {
          scope.shareFreqEmpty = true;
          return;
        }
        // if (scope.parent.itemNameExist) {
        //   return;
        // }
        modalInstance.close(scope.Modal);
      };
      scope.Modal.cancel = function() {
        modalInstance.dismiss();
      };
      return modalInstance;
    };

    return {
      popAlert: popAlert,
      popModal: popModal
    }
  }
])

'use strict';
var Department = angular.module('Department', ['ui.router']);

/** Main Controller */
Department.controller('Department.Controller.Main', ['$cookies', '$scope', '$q', 'Department.Service.Http', '$sce','$state',
  function($cookies, $scope, $q, Http, $sce, $state) {
    var LoginUser = JSON.parse($cookies.get('User'));
    console.log(LoginUser);
    var DEP_ID = LoginUser.dep_id;
    var USERNAME = LoginUser.username;
    var SHARE_FREQUENCY = 1;
    var DATA_LEVEL = 2;
    var SHARE_LEVEL = 3;
    var SECRET_FLAG = 5;
    var RESOURCE_FORMAT = 11;
    var SOCIAL_OPEN_FLAG = 14;
    var _httpParams = {};
    _httpParams.limit = 5;
    _httpParams.skip = 0;
    var _httpConfirmParams = {};
    _httpConfirmParams.limit = 5;
    _httpConfirmParams.skip = 0;

    // follow department
    $scope.depSelect = {};
    $scope.followDeptList = [];
    $scope.parentObj = {};
    function toFollowDep() {
      $scope.depSelect.show = false;
      $scope.followDeptList = $scope.parentObj.outputAllDeptList;
      // send request to add follow department
      var params = [];
      _($scope.followDeptList).forEach(function(item) {
        var followDep = {};
        followDep.follow_dep_id = item.dep_id;
        params.push(followDep);
      });
      Http.followDepts({
        userdep: params
      }).then(function(result) {

      })
    }

    // init
    getAuditList();

    function getAuditList() {
      $scope.mainAuditPromise = Http.getAuditList(_httpParams).then(function(result) {
        $scope.toAuditList = result.data.body[0].results;
        $scope.auditTotal = result.data.body[0].count;
      });
    }

    // init
    getDeptRequirementConfirmList();

    function getDeptRequirementConfirmList() {
      _httpConfirmParams.response_dep_id = DEP_ID;
      console.log(_httpConfirmParams);
      $scope.mainReqPromise = Http.getDepartmentRequirementList(_httpConfirmParams).then(function(result) {
        $scope.requireToConfirmList = result.data.body[0].results;
        $scope.reqTotal = result.data.body[0].count;
      })
    }

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

    Http.getDepDataQuotaTotal().then(function(result) {
      $scope.Count = result.data.body[0];
    });

    // go to audit list page
    $scope.auditMore = function() {
      $state.go("main.department.audit", {}, {
        reload: true
      });
    }

    // go to requirement list page
    $scope.reqMore = function() {
      $state.go("main.department.requirementConfirm", {}, {
        reload: true
      });
    }

    // 已关注部门列表
    Http.getFollowDepList().then(function(result) {
      $scope.parentObj.outputAllDeptList = result.data.body;
      $scope.followDeptList = _.uniq($scope.parentObj.outputAllDeptList);
      //console.log($scope.parentObj.outputAllDeptList);
      Http.getDepartmentFollowList().then(function(result) {
        $scope.parentObj.deptAllList = _.remove(result.data.body, function(item) {
          return item.dep_id != DEP_ID;
        });
        $scope.parentObj.outputDeptList = [];

        _($scope.parentObj.deptAllList).forEach(function(allItem) {
          allItem.icon = '<img  src=styles/images/bureau/'+ allItem.dep_en_name +' />'
          _($scope.parentObj.outputAllDeptList).forEach(function(outItem) {
            if(allItem.dep_id == outItem.dep_id) {
              allItem.ticked = true;
              $scope.parentObj.outputDeptList.push(allItem);
            }
          })
        });

         $scope.$broadcast('someEvent', $scope.parentObj.outputDeptList);
        // $scope.parentObj.deptAllList = _.pullAllWith($scope.parentObj.deptAllList, $scope.parentObj.outputAllDeptList,function(arrItem,othItem) {
        //   return arrItem.dep_id == othItem.dep_id || DEP_ID == arrItem.dep_id;
        // });
        // console.log($scope.parentObj.deptAllList);
      });
    })

    $scope.openFn = function() {
      $scope.parentObj.outputAllDeptList = $scope.parentObj.outputDeptList;
      console.log($scope.parentObj.outputAllDeptList);
    }



    $scope.followDep = function() {
      toFollowDep();
    }
  }
])


/* HTTP */
Department.factory('Department.Service.Http', ['$http', '$q', 'API',
  function($http, $q, API) {
    var path = API.path;

    function getDepartmentFollowList() {
      return $http.get(
        path + '/follow_sys_dep'
      )
    }

    function getDepDataQuotaTotal() {
      return $http.get(
        path + '/depquota/summary'
      )
    };

    function getSystemDictByCatagory(params) {
      return $http.get(
        path + '/sys_dict', {
          params: params
        }
      )
    };

    function getAuditList(params) {
      return $http.get(
        path + '/depresource/wait_audit', {
          params: params
        }
      )
    }

    function getDepartmentRequirementList(params) {
      return $http.get(
        path + '/data_requiement', {
          params: params
        }
      )
    };

    function getFollowDepList() {
      return $http.get(
        path + '/followed_user_dep'
      )
    }

    function followDepts(params) {
      return $http.post(
        path + '/user_dep_batch', {
          data: params
        }
      )
    }
    return {
      getSystemDictByCatagory: getSystemDictByCatagory,
      getAuditList: getAuditList,
      getDepartmentRequirementList: getDepartmentRequirementList,
      getDepartmentFollowList: getDepartmentFollowList,
      getDepDataQuotaTotal: getDepDataQuotaTotal,
      followDepts: followDepts,
      getFollowDepList: getFollowDepList
    }
  }
]);

'use strict';
var DepartmentReq = angular.module('Department.Requirement', ['ui.router']);

/** DepartmentReq Controller */
DepartmentReq.controller('Department.Requirement.Controller.Main', ['$cookies', '$scope', '$stateParams', 'Department.Requirement.Service.Component', 'Department.Requirement.Service.Http',
  function($cookies, $scope, $stateParams, Component, Http) {
    var LoginUser = JSON.parse($cookies.get('User'));
    var DEP_ID = LoginUser.dep_id;
    var USERNAME = LoginUser.username;
    var SHARE_FREQUENCY = 1;
    var DATA_LEVEL = 2;
    $scope.DeptRequirement = {};

    $scope.Paging = {};
    $scope.Paging.currentPage = 1;
    $scope.Paging.maxSize = 5;
    $scope.Paging.itemsPerPage = 10;

    var _httpParams = {};
    _httpParams.limit = 10;
    _httpParams.skip = 0;

    $scope.Paging.pageChanged = function() {
      _httpParams.skip = ($scope.Paging.currentPage - 1) * _httpParams.limit;
      getDeptRequirementList(_httpParams);
    }

    // init
    getDeptRequirementList();

    Http.getDepartmentList().then(function(result) {
      $scope.deptList = result.data.body;
      var evens = _.remove($scope.deptList, function(item) {
        return item.id == DEP_ID;
      });
    });

    Http.getSystemDictByCatagory({
      'dict_category': SHARE_FREQUENCY
    }).then(function(result) {
      $scope.shareFrequencyList = result.data.body;
    });

    Http.getSystemDictByCatagory({
      'dict_category': DATA_LEVEL
    }).then(function(result) {
      $scope.dataLevelList = result.data.body;
    });

    function getDeptRequirementList() {
      _httpParams.dep_id = DEP_ID;
      _httpParams.username = USERNAME;
      $scope.reqPromise = Http.getDepartmentRequirementList(_httpParams).then(function(result) {
        $scope.requirementList = result.data.body[0].results;
        $scope.Paging.totalItems = result.data.body[0].count;
      })
    }


    $scope.toggleDataLevelReqSelection = function(item) {
      var idx = $scope.dataLevelReqSelection.indexOf(item.id);
      // is currently selected
      if (idx > -1) {
        $scope.dataLevelReqSelection.splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.dataLevelReqSelection.push(item.id);
      }
    };


    $scope.toggleShareFreqSelection = function(item) {
      var idx = $scope.shareFreqSelection.indexOf(item.id);
      // is currently selected
      if (idx > -1) {
        $scope.shareFreqSelection.splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.shareFreqSelection.push(item.id);
      }
    };



    $scope.publishReq = function() {
      $scope.Modal = {};
      $scope.Modal.DepRequirment = {};

      var _httpPublishParams = {};
      var dataRelationConfig = [];
      $scope.reqParent = {};
      $scope.reqParent.outputDeptList = [];

      $scope.shareFreqSelection = [];
      $scope.dataLevelReqSelection = [];

      $scope.error = false;
      $scope.submitted = false;

      Component.popModal($scope, '发布', 'add-req-modal').result.then(function() {
        _($scope.dataLevelReqSelection).forEach(function(value) {
          var req_sys_dict = {};
          req_sys_dict.datarequiementId = $scope.Modal.DepRequirment.requiement_name;
          req_sys_dict.sys_dict_id = value;
          req_sys_dict.obj_type = 2;
          dataRelationConfig.push(req_sys_dict);
        });

        _($scope.shareFreqSelection).forEach(function(value) {
          var req_sys_dict = {};
          req_sys_dict.datarequiementId = $scope.Modal.DepRequirment.requiement_name;
          req_sys_dict.sys_dict_id = value;
          req_sys_dict.obj_type = 2;
          dataRelationConfig.push(req_sys_dict);
        });

        var res_dep_id = _.map($scope.reqParent.outputDeptList, 'id');

        console.log(res_dep_id);
        $scope.Modal.DepRequirment.response_dep_id = res_dep_id[0];
        _httpPublishParams.dataRequiement = $scope.Modal.DepRequirment;
        _httpPublishParams.dataRelationConfig = dataRelationConfig;

        Http.publishRequirement(_httpPublishParams).then(function(result) {
          if (200 == result.data.head.status) {
            alert('发布成功');
          } else {
            alert('发布失败');
          }
          getDeptRequirementList();
        })
      });
    }

    $scope.searchDeptReqByName = function() {
      _httpParams.requiement_name = $scope.DeptRequirement.req_name_filter;
      _httpParams.limit = 10;
      _httpParams.skip = 0;
      getDeptRequirementList();
    }


    // delete requirement
    $scope.deleteReq = function(id) {
      var deleteFlag = confirm('确定删除本条需求？删除后将不可恢复。');
      if (deleteFlag) {
        Http.deleteRequirement({
          requiement_id: id
        }).then(function(result) {
          if (200 == result.data.head.status) {
            alert('删除成功！');
            getDeptRequirementList();
          } else {
            alert('删除失败！');
          }
        })
      }
    }

    // update requirement
    $scope.updateReq = function(item) {
      $scope.Modal = {};
      $scope.Modal.DepRequirment = item;

      var _httpPublishParams = {};
      var dataRelationConfig = [];

      $scope.reqParent = {};
      $scope.reqParent.outputDeptList = [];

      $scope.shareFreqSelection = [];
      $scope.dataLevelReqSelection = [];

      _($scope.deptList).forEach(function(outItem) {
        if (item.response_dep_id == outItem.id) {
          outItem.ticked = true;
          $scope.reqParent.outputDeptList.push(outItem);
        }
      })

      // 获取需求对应的共享频率数据
      Http.getReqUpdatePeriod({
        requiement_id: item.id
      }).then(function(res) {
        $scope.shareFreqSelection = res.data.body[0].id;
      })

      // 获取需求对应的数据分区级别
      Http.getReqAreaLevel({
        requiement_id: item.id
      }).then(function(res) {
        $scope.dataLevelReqSelection = res.data.body[0].id;
      })

      $scope.error = false;
      Component.popModal($scope, '修改', 'add-req-modal').result.then(function() {
        _($scope.dataLevelReqSelection).forEach(function(value) {
          var req_sys_dict = {};
          req_sys_dict.datarequiementId = $scope.Modal.DepRequirment.id;
          req_sys_dict.sys_dict_id = value;
          req_sys_dict.obj_type = 2;
          dataRelationConfig.push(req_sys_dict);
        });

        _($scope.shareFreqSelection).forEach(function(value) {
          var req_sys_dict = {};
          req_sys_dict.datarequiementId = $scope.Modal.DepRequirment.id;
          req_sys_dict.sys_dict_id = value;
          req_sys_dict.obj_type = 2;
          dataRelationConfig.push(req_sys_dict);
        });

        var res_dep_id = _.map($scope.reqParent.outputDeptList, 'id');
        $scope.Modal.DepRequirment.response_dep_id = res_dep_id[0];

        _httpPublishParams.dataRequiement = $scope.Modal.DepRequirment;
        _httpPublishParams.dataRelationConfig = dataRelationConfig;

        Http.updateRequirementInfo(_httpPublishParams).then(function(result) {
          if (200 == result.data.head.status) {
            alert('修改成功');
          } else {
            alert('修改失败');
          }
          getDeptRequirementList();
        })
      });
    }

    // 根据确认状态过滤
    $scope.filterByConfirmStatus = function(status) {
      _httpParams.requiement_status = status;
      getDeptRequirementList();
    }



  }
])


/** DepartmentReq Controller */
DepartmentReq.controller('Department.Requirement.Controller.confirm', ['$cookies', '$scope', '$stateParams', 'Department.Requirement.Service.Http', 'Department.Requirement.Service.Component',
  function($cookies, $scope, $stateParams, Http, Component) {
    var RESOURCE_FORMAT = 11;
    $scope.closeShow = false;
    $scope.showIndex = -1;

    $scope.resParent = {};
    $scope.resParent.dropListShow = false;

    $scope.Modal = {};
    $scope.DeptRequirementConfirm = {};

    var LoginUser = JSON.parse($cookies.get('User'));
    var DEP_ID = LoginUser.dep_id;
    var USERNAME = LoginUser.username;
    $scope.DeptRequirement = {};

    $scope.Paging = {};
    $scope.Paging.maxSize = 5;
    $scope.Paging.itemsPerPage = 10;
    $scope.Paging.currentPage = 1;

    // 模态框信息资源列表分页
    $scope.ModalPaging = {};
    $scope.ModalPaging.currentPage = 1;
    $scope.ModalPaging.maxSize = 5;
    $scope.ModalPaging.itemsPerPage = 10;


    var _httpConfirmParams = {};
    _httpConfirmParams.limit = 10;
    _httpConfirmParams.skip = 0;

    var _httpModalParams = {};
    _httpModalParams.limit = 10;
    _httpModalParams.skip = 0;

    $scope.checkedResourceName = '';

    $scope.Paging.pageChanged = function() {
      _httpConfirmParams.skip = ($scope.Paging.currentPage - 1) * _httpConfirmParams.limit;
      getDeptRequirementConfirmList(_httpConfirmParams);
    }

    // 模态框中信息资源分页
    $scope.ModalPaging.pageChanged = function() {
      _httpModalParams.skip = ($scope.ModalPaging.currentPage - 1) * _httpModalParams.limit;
      Http.getDeptInfoResourceList(_httpModalParams).then(function(result) {
        console.log(result);
        $scope.depInfoResourceList = result.data.body[0].results;
        $scope.ModalPaging.totalItems = result.data.body[0].count;
      });
    }

    // init
    getDeptRequirementConfirmList();
    getDeptInfoResourceList();

    function getDeptRequirementConfirmList() {
      _httpConfirmParams.response_dep_id = DEP_ID;
      $scope.reqConfirmPromise = Http.getDepartmentRequirementList(_httpConfirmParams).then(function(result) {
        $scope.requirementConfirmList = result.data.body[0].results;
        $scope.Paging.totalItems = result.data.body[0].count;
      })
    }

    function getDeptInfoResourceList() {
      Http.getDeptInfoResourceList(_httpModalParams).then(function(result) {
        console.log(result);
        if (200 == result.data.head.status) {
          $scope.depInfoResourceList = result.data.body[0].results;
          $scope.ModalPaging.totalItems = result.data.body[0].count;
        }
        else{
          $scope.depInfoResourceList = [];
        }
      });
    }

    $scope.searchDeptReqConfirmByName = function() {
      _httpConfirmParams.requiement_name = $scope.DeptRequirementConfirm.req_name_filter;
      _httpConfirmParams.limit = 10;
      _httpConfirmParams.skip = 0;
      getDeptRequirementConfirmList();
    }

    // 获取信息资源格式字典
    Http.getSystemDictByCatagory({
      'dict_category': RESOURCE_FORMAT
    }).then(function(result) {
      $scope.resourceFormatList = result.data.body;
    });

    // 隐藏或显示资源列表
    $scope.togglResourceList = function() {
      if($scope.resParent.dropListShow) {
        $scope.resParent.dropListShow = false;
      }
      else {
        $scope.resParent.dropListShow = true;
      }
    }

    // filter by resource format
    $scope.resFormatMainSelection = [];
    $scope.getInfoResourceByResFormat = function(item) {
      var idx = $scope.resFormatMainSelection.indexOf(item.id);
      if (idx > -1) {
        $scope.resFormatMainSelection = [];
      } else {
        $scope.resFormatMainSelection = item.id;
      }
      _httpModalParams.resource_format = $scope.resFormatMainSelection;
      _httpModalParams.limit = 10;
      _httpModalParams.skip = 0;
      getDeptInfoResourceList(_httpModalParams);
    }

    // resource format all
    $scope.getResFormatAll = function() {
      $scope.resFormatMainSelection = [];
      _httpModalParams.resource_format = null;
      _httpModalParams.limit = 10;
      _httpModalParams.skip = 0;
      getDeptInfoResourceList(_httpModalParams);
    }

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

    // 点击收起
    $scope.closeItems = function(index) {
      $scope.collapseIndex = -1;
      $scope.closeShow = false;
      $scope.InfoItems = [];
    }

    // 选中信息资源
    $scope.resourceSelection = [];
    $scope.toggleResourceSelection = function(resourceId, resource_name) {
      var idx = $scope.resourceSelection.indexOf(resourceId);
      // is currently selected
      if (idx > -1) {
        $scope.resourceSelection = [];
        $scope.checkedResourceName = '';
      }

      // is newly selected
      else {
        $scope.resourceSelection = resourceId;
        $scope.resource_id = resourceId;
        $scope.resourceItemSelection = []; //清空信息项
        $scope.checkedResourceName = '已选中资源 "' + resource_name + '"';
      }
      console.log($scope.resourceItemSelection);
    };

    // 选中信息项checkbox事件
    $scope.resourceItemSelection = [];
    $scope.toggleResItemSelection = function(resourceId, item, resource_name) {
      if($scope.resource_id != resourceId) {
        $scope.resourceItemSelection = [];
        $scope.resource_id = resourceId;
      }
      var idx = $scope.resourceItemSelection.indexOf(item.id);
      // is currently selected
      if (idx > -1) {
        $scope.resourceItemSelection.splice(idx, 1);
        var selLength = $scope.resourceItemSelection.length;
        console.log(selLength);
        if(selLength == 0) {
          $scope.checkedResourceName = '';
        }
        else {
          $scope.checkedResourceName = '已选中资源 "' + resource_name + '"下的' + selLength +'条信息项';
        }
      }

      // is newly selected
      else {
        $scope.resourceItemSelection.push(item.id);
        var selLength = $scope.resourceItemSelection.length;
        $scope.checkedResourceName = '已选中资源 "' + resource_name + '"下的' + selLength +'条信息项';
        $scope.resourceSelection = [];// 清空信息资源选中项
      }
      console.log($scope.resourceItemSelection);
    };

    // 保存选中的信息资源或信息项
    $scope.saveChooseResource = function() {
      console.log($scope.resourceItemSelection);
      console.log($scope.resourceSelection);
      if($scope.resourceItemSelection.length == 0 && $scope.resourceSelection.length == 0) {
        $scope.errorMsg = '您未选中任何资源。';
      }
      else{
        $scope.resParent.dropListShow = false;
        $scope.errorMsg = '';
      }
    }

    $scope.toConfirm = function(item) {
      // get requirement detail
      $scope.Modal.ReqDetail = item;
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
                  getDeptRequirementConfirmList();
                } else {
                  alert('保存失败！');
                  getDeptRequirementConfirmList();
                }
              })
            } else {
              alert('保存成功！');
              getDeptRequirementConfirmList();
            }

          } else {
            alert('保存失败');
          }
        })
      });
    }

    // 根据确认状态过滤
    $scope.filterByConfirmStatus = function(status) {
      _httpConfirmParams.requiement_status = status;
      getDeptRequirementConfirmList();
    }

  }
])

/** DepartmentReq Controller */
DepartmentReq.controller('Department.Requirement.Controller.detail', ['$scope', '$stateParams', 'Department.Requirement.Service.Http', 'Department.Requirement.Service.Component',
    function($scope, $stateParams, Http, Component) {
      console.log($stateParams.ID);
      $scope.InfoItemShow = false;
      $scope.InfoResourceShow = false;
      Http.getReqDetail({
        requiement_id: $stateParams.ID
      }).then(function(result) {
        console.log(result.data.body[0]);
        $scope.ReqDetail = result.data.body[0];
        if($scope.ReqDetail.resource_id) {
          // 查询需求对应的资源
          Http.getDepartInfoResList({
            resource_id: $scope.ReqDetail.resource_id
          }).then(function(ResourceRes) {
            $scope.InfoResourceDetail = ResourceRes.data.body[0].results[0];
            if($scope.InfoResourceDetail) {
              $scope.InfoResourceShow = true;
            }
          })

          // 查询需求对应的信息项
          Http.getReqResourceItemList({
            resource_id: $scope.ReqDetail.resource_id,
            requiement_id: $stateParams.ID
          }).then(function(ResItems) {
            if (ResItems.data.body.length == 0) {
              $scope.InfoItemShow = false;
            } else {
              $scope.InfoItemShow = true;
              $scope.InfoItems = ResItems.data.body;
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



    }
  ])
  /* HTTP Factory */
DepartmentReq.factory('Department.Requirement.Service.Http', ['$http', 'API',
  function($http, API) {
    var path = API.path;

    function getDepartmentRequirementList(params) {
      return $http.get(
        path + '/data_requiement', {
          params: params
        }
      )
    };

    function publishRequirement(data) {
      return $http.post(
        path + '/data_requiement', {
          data: data
        }
      )
    }

    // 需求确认修改状态
    function updateRequirement(data) {
      return $http.put(
        path + '/data_requiement_ok', {
          data: data
        }
      )
    }

    // 修改需求信息
    function updateRequirementInfo(data) {
      return $http.put(
        path + '/data_requiement', {
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

    function getDeptInfoResourceList(params) {
      return $http.get(
        path + '/dep_resource_list', {
          params: params
        }
      )
    }

    function getReqDetail(params) {
      return $http.get(
        path + '/data_requiement_detail', {
          params: params
        }
      )
    }

    function getResponseList(params) {
      return $http.get(
        path + '/requirement/requireResponseList', {
          params: params
        }
      )
    }

    function getDepartmentList() {
      return $http.get(
        path + '/sys_dep'
      )
    }

    function deleteRequirement(id) {
      return $http.delete(
        path + '/data_requiement', {
          data: id
        }
      )
    }

    function getSystemDictByCatagory(params) {
      return $http.get(
        path + '/sys_dict', {
          params: params
        }
      )
    };

    function getReqUpdatePeriod(params) {
      return $http.get(
        path + '/requiement_update_period', {
          params: params
        }
      )
    }

    function getReqAreaLevel(params) {
      return $http.get(
        path + '/requiement_area_level', {
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
    function getDepartInfoResList(params) {
      return $http.get(
        path + '/info_resource_list', {
          params: params
        }
      )
    }
    function getReqResourceItemList(params) {
      return $http.get(
        path + '/reqResourceItem', {
          params: params
        }
      )
    }

    return {
      getDepartmentRequirementList: getDepartmentRequirementList,
      publishRequirement: publishRequirement,
      getReqDetail: getReqDetail,
      getResponseList: getResponseList,
      updateRequirement: updateRequirement,
      updateRequirementInfo: updateRequirementInfo,
      saveReqResponse: saveReqResponse,
      getDeptInfoResourceList: getDeptInfoResourceList,
      getDepartmentList: getDepartmentList,
      deleteRequirement: deleteRequirement,
      getSystemDictByCatagory: getSystemDictByCatagory,
      getReqUpdatePeriod: getReqUpdatePeriod,
      getReqAreaLevel: getReqAreaLevel,
      getInfoItemList: getInfoItemList,
      getDepartInfoResList: getDepartInfoResList,
      getReqResourceItemList: getReqResourceItemList
    }
  }
]);


/* Component */
DepartmentReq.service('Department.Requirement.Service.Component', ['$uibModal',
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
        if (scope.resourceSelection.length == 0 && scope.resourceItemSelection.length == 0 && scope.Modal.ReqResponse.status == 1) {
          scope.errorMsg = '请选择信息资源！';
          isValid = false;
        }
        else {
          scope.errorMsg = '';
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
        if (scope.reqParent.outputDeptList.length == 0) {
          scope.error = true;
        } else if (scope.shareFreqSelection.length == 0) {} else {
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

'use strict';
var SystemUser = angular.module('Department.SystemUser', ['ui.router']);

/** Main Controller */
SystemUser.controller('Department.SystemUser.Controller.Main', ['$scope', '$q', 'Department.SystemUser.Service.Http', 'Department.SystemUser.Service.Component', '$uibModal',
  function($scope, $q, Http, Component, $uibModal) {
    $scope.Modal = {}; // Clean scope of modal
    $scope.deptList = [];

    function getUserList() {
      Http.getUserList().then(function(result) {
        $scope.users = result.data.body;
        $scope.DepUserTotal =result.data.head.total;
      });
    }
    // Http.getDepartmentList().then(function(result) {
    //   $scope.deptList = result.data.body;
    // });

    // init
    getUserList();

    // add user
    $scope.addUserModal = function() {
      $scope.Modal = {}; // Clean scope of modal
      $scope.sysUser = {}; // Clean scope of modal

      Component.popModal($scope, '添加', 'add-user-modal').result.then(function() {
        Http.saveUser($scope.sysUser).then(function(result) {
          if (200 == result.data.head.status) {
            alert('添加成功');
            getUserList();
          }
          else{
            alert('添加失败');
          }
        })
      });

    }

    $scope.searchUser = function(){
      var username= $scope.username;
      alert(username);
      // http.getUser({
      //   USERNAME: username,
      // })then(function(result) {
      //   if(200 == result.data.head.status){
      //     $scope.users = result.data.body;
      //     $scope.DepUserTotal =result.data.head.total;
      //   }else {
      //     alert("输入错误，请");
      //   }
      //
      // });
    }

    $scope.updateUser = function(user) {
      user.DEP_NAME = null;
      $scope.sysUser = user;
      Component.popModal($scope, '修改', 'add-user-modal').result.then(function() {
        Http.updateUser($scope.sysUser).then(function(result) {
          if (200 == result.data.head.status) {
            alert('修改成功');
            getUserList();
          }
          else{
            alert('修改失败');
          }
        })
      });
    }

    $scope.deleteUser = function(user) {
      console.log(user);
      var fig = confirm("确定要删除吗？");
      if (fig) {
        Http.deleteUser(user).then(function(result) {
          console.log(result.data);
          if (200 == result.data.head.status) {
            alert('删除成功');
            getUserList();
          }
          else{
            alert('删除失败！');
          }
          getUserList();
        })
      }
    }


  }
])


/* HTTP */
SystemUser.factory('Department.SystemUser.Service.Http', ['$http', '$q', 'API',
  function($http, $q, API) {
    var path = API.path;

    function getUserList() {
      return $http.get(
        path + '/user'
      )
    };
    function getUser(params) {
      return $http.get(
        path + '/user', {
          params: params
        }

      )
    };

    function saveUser(data) {
      return $http.post(
        path + '/user', {
          data: data
        }
      )
    };

    function getDepartmentList() {
      return $http.get(
        path + '/dep/'
      )
    }

    function updateUser(data) {
      return $http.put(
        path + '/user/' , {
          data: data
        }
      )
    }

    function deleteUser(data) {
      return $http.delete(
        path + '/user', {
            data: {"ID":data.ID}
        }
      )
    }
    return {
      getUserList: getUserList,
      saveUser: saveUser,
      getDepartmentList: getDepartmentList,
      updateUser: updateUser,
      deleteUser: deleteUser,
      getUser:getUser
    }
  }
]);

/* Component */
SystemUser.service('Department.SystemUser.Service.Component', ['$uibModal',
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
    // prompt Modal
    function popModal(scope, type, templateUrl) {
      scope.Modal.type = type;
      var modalInstance = $uibModal.open({
        animation: true,
        backdrop : 'static',
        templateUrl: templateUrl + '.html',
        scope: scope
      });
      scope.Modal.confirm = function(isValid) {
        if (isValid) {
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
      popModal: popModal
    }
  }
])
