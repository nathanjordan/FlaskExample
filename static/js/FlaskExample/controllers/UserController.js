/*
 * This defines the controller that handles the users
 *
 */
function UserController($scope, $resource) {
    var User = $resource('/users/:username', {}, { save: { method: 'PUT', url: '/users/:username', } });
    var Users = $resource('/users');

    function updateUsers() {
        Users.query({}, function(result) {
            $scope.users = result;
        });
     }

    $scope.addUpdateUser = function() {
        var user = new User({
            username: $scope.username,
            firstName: $scope.firstName,
            lastName: $scope.lastName
        });
        user.$save();
        updateUsers();
    };
    angular.extend(Users.prototype, {
        getFullName: function() {
            return this.lastName + ', ' + this.firstName;
        }
    });
    updateUsers();
}
