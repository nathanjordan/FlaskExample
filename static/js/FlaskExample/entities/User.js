/*
 * This is as close as we get to classes/objects in Javascript.
 * The user prototype contains the users data, and functions relating
 * to that data. To create a User object, one would do the following:
 *
 *     var myUser = new User('bsmith', 'Bob', 'Smith', 'bob@smith.com')
 *
 * Now myUser is an instantiated object with Bob's info. If we want to
 * get his full name, we can use the getFullName function that is part
 * of the User prototype like so:
 *
 *     myUser.getFullName()
 *
 * This would return
 *
 *     'Smith, Bob'
 *
 */
function User(username, firstName, lastName, email) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
}

/*
 * returns the full name of the user
 *
 */
function User.prototype.getFullName() {
    return this.lastName + ', ' + this.firstName;
}
