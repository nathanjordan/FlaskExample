$().ready( function() {
    refreshUsers();
});

function getUsers(callback) {
    $.ajax({ url: '/users', }).done(function(response) {
        var users = json.parse(response);
        callback(users);
    });
}

function createUser(username, firstName, lastName) {
    $.ajax({ url: '/users/create', type: 'POST', data: user }).done(function(response) {

    });
}

function refreshUsers() {
    getUsers(function(users) {
        $('#userList').html('');
        for(var i = 0; i < users.users.length; i++) {
            $('#userList').append('<li>' + users.users[i].firstName + '</li>');
        }
    });
}
