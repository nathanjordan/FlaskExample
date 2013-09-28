/*
 * This function runs when the DOM is ready, it initializes
 * the form for creating users, and loads the users
 * present in the Mongo Database
 */
$().ready( function() {
    // Load the existing users from Mongo
    refreshUsers();
    // Make sure the form works
    registerForm();
});

/*
 * This function makes an AJAX call to the REST interface to get
 * the users from the Mongo Database
 */
function getUsers(callback) {
    // Get the current users via AJAX
    $.ajax({ url: '/users', }).done(function(response) {
        var users = JSON.parse(response);
        // since this call is asynchronous, we need to pass the
        // value to a callback function that is run when the
        // AJAX call is done
        callback(users);
    });
}

/*
 * This function creates/updates a user based on the values entered
 * into the form fields in the new user section
 */
function createUser(username, firstName, lastName) {
    var user = {
        username: username,
        firstName: firstName,
        lastName: lastName
    };
    // Send a PUT request to the REST interface with the user data from the form
    $.ajax({ url: '/users/' + username, type: 'PUT', data: JSON.stringify(user) }).done(function(response) {
        // Since a user has been added or changed, let's update the users
        refreshUsers();
    });
}

/*
 * This function deletes a user via AJAX using the REST interface
 */
function deleteUser(username) {
    // Send a DELETE request to the REST interface to remove the selected user
    $.ajax({ url: '/users/' + username, type: 'DELETE' }).done(function(response) {
        // Since that user is gone, we need to update our view
        refreshUsers();
    });
}
/*
 * This function updates the users on the page
 */
function refreshUsers() {
    getUsers(function(users) {
        var name, html, button;
        // This removes the previous list of users
        $('#userList').html('');
        // Loop over the new users we got from the database
        for(var i = 0; i < users.length; i++) {
            // Create the text that will be displayed
            name = users[i].username + ':' + users[i].firstName + ', ' + users[i].lastName;
            // create the delete button with a data-ref attribute set to the username
            button = '<button data-ref="' + users[i].username + '">Delete</button>';
            // finally wrap it in a 'list item' tag (its going in an ordered list)
            html = '<li>' + name + button + '</li>';
            // Put it inside the list element
            $('#userList').append(html);
        }
        // Now lets register these new delete buttons so they work (the old
        // ones are now invalid, since they don't exist!)
        registerDeleteButtons();
    });
}
/*
 * This function tells jquery what to do when the 'Add/Update'
 * button is clicked in the form. It gets the values from the
 * form inputs and calls the createUser Function.
 */
function registerForm() {
    $('#submitButton').click(function() {
        var username, firstName, lastName;
        // Get the values from the form
        username = $('#formUsername').prop('value');
        firstName= $('#formFirstName').prop('value');
        lastName = $('#formLastName').prop('value');
        // Call the createUser function to interact with the REST interface
        createUser(username, firstName, lastName);
    });
}

/*
 * This function is called after the users are refreshed.
 * It registers the new delete buttons that have been added
 * to the DOM after the AJAX call to delete the associated user.
 * This can't be done in the initial function because these buttons
 * were created on the fly by jQuery, and it didn't know they existed
 * when the document was first loaded!
 */
function registerDeleteButtons() {
    $('#userList button').click(function() {
        // Get the data-ref attribute so we know which user we are deleting
        var username = $(this).attr('data-ref');
        // Delete the user via the REST interface
        deleteUser(username);
    });
}
