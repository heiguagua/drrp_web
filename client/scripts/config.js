'use strict';
/* Application Configration */
var Config = angular.module('Config', []);

Config.constant('API', {
  // path: 'http://localhost:8080/drrp/api' //发布
   path: 'http://172.16.7.64:8080/api' //测试1
  //  path: 'http://172.16.1.78:8080/api' //测试1
  // path: 'http://192.168.9.43:8080/api' //测试2

});
