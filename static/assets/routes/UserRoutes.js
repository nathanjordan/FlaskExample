/*
 * This configures routes for the application. A route is a
 * way for angular to specify different controllers for
 * different parts of the application.
 *
 */
function UserRoutes($routeProvider) {
    // Since we are only working with users, we only need one
    // controller for the routes
    routeProvider.when('/', { controller: 'UserController' });
}
