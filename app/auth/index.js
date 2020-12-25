const passport 	= require('passport');
const config = require('../config');

const LocalStrategy = require('passport-local').Strategy;

const init = function(){

	// Serialize and Deserialize user instances to and from the session.
	passport.serializeUser(function(user, done) {
		done(null, user.username);
	});

	passport.deserializeUser(function(id, done) {
		done(null, id);
	});

	// Plug-in Local Strategy
	passport.use(new LocalStrategy(
	  function(username, password, done) {
		if (username !== config.accountUsername && password !== config.accountPassword) {
	    	return done(null, false, { message: 'Incorrect username or password.' });
		};
		return done(null, {
			username: 'Ilhamsyahids'
		})
	  }
	));

	return passport;
}
	
module.exports = init();