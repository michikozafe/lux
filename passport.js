const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJWT = passportJWT.ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = passportJWT.Strategy
const User = require('./models/User')
const bcrypt = require('bcrypt-nodejs')

passport.use( new LocalStrategy({ usernameField : 'email' }, (email, password, done) => {
	User.findOne({'email' : email})
	.then( (user) => {
		if(!user) {
			return done(null, false, {message : 'Invalid credentials.'})
		}

		if(email == user.email) {
			if(!bcrypt.compareSync(password, user.password)) {
				return done(null, false, {message : 'Invalid credentials.'})
			}
			return done(null, user)
		}
		return done(null, false, {message : 'invalid credentials'})
	})
}))

passport.use(new JWTStrategy({
	jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey : 'secret-key'
},
function(jwtPayload, cb) {
	return User.findOne(jwtPayload.id)
	.then(user => {
		return cb(null, user)
	})
	.catch(err => {
		return cb(err)
	})
}
))













