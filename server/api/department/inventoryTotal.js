'use strict';
const Router = require('express').Router(),
  JsonLoader = require('load-json-file'),
  Config = require('../../config');

Router.route('/inventoryTotal')
  .get(function(request, response) {
    let head = {},
      body = {};
  });


Router.route('/inventoryTotal/department')
  .get(function(request, response) {
    let head = {},
      body = {};
    let datas = JsonLoader.sync(Config.path + 'department/getInventoryTotal.json');
    response.json(datas);
  });
module.exports = Router;