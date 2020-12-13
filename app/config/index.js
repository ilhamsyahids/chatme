const init = function () {

	if(process.env.NODE_ENV === 'production') {
		const redisURI 		= require('url').parse(process.env.REDIS_URL);
		const redisPassword 	= redisURI.auth.split(':')[1];
		return {
			db: process.env.dbURI,
			sessionSecret: process.env.sessionSecret,
			redis: {
				host: redisURI.hostname,
				port: redisURI.port,
				password: redisPassword
			}
		}
	}
	else {
		return require('./config.json');
	}
}

module.exports = init();
