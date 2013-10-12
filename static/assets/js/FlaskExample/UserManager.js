/*
 * Create a new Angular module for our UserManager application.
 * ngResource is another angular module we are requiring as
 * a dependency here to handle the REST stuff that is normally
 * done manually (see main.js)
 *
 */
var UserManager = angular.module('UserManager', ['ngResource']);

/*
 * Register the UserController with the module
 *
 */
UserManager = UserManager.controller('UserController', UserController);
