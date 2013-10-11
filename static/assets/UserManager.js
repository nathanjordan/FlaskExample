var UserManager = angular.module('UserManager', []);

UserManager = UserManager.controller('UserController', UserController);

UserManager = UserManager.routes(UserRoutes);
