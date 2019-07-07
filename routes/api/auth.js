const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const appPassport = require('../../passport')

//login user to the system
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {session: false}, (err, user, info) => {
		if(err || !user) {
			return res.status(422).json({ errors: { msg: "Something is not right" } })
		}

		console.log('success')

		req.login(user, {session:false}, (err) => {
			if(err) {
				res.send(err)
			}

      const token = jwt.sign(user.toJSON(), 'secret-key', {expiresIn: '24h'})
			// console.log(token)
			return res.status(200).json({
				'data' : {
					'user'  : user,
					'token' : token
				}
			})

		})

	}) (req, res)
})

// handle logout
router.get('/logout', function(req,res) {
	console.log('user is logged out')
	req.logout()
	res.json({
		status : 'logout',
		msg  : 'please log in'
	})
})

module.exports = router