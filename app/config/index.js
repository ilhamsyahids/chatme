const init = function () {

	if(process.env.NODE_ENV === 'production') {
		return {
			db: process.env.dbURI,
			sessionSecret: process.env.sessionSecret,
			accountUsername: process.env.accountUsername,
			accountPassword: process.env.accountPassword
		}
	}
	else {
		return require('./config.json');
	}
}

module.exports = init();
