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
                  window.location.href='/build/#/login';
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
			  window.location.href='/build/#/login';
			};
		  };
		}
    });
}]);
