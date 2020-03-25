var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../model/user.js');

router.post('/login', function(req, res, next) {
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(data=>{
		if (data) {
			const plainPassword = req.body.password;
			const hash = data.dataValues.password;
			bcrypt.compare(plainPassword, hash, function(err, result) {
			    if (result) {
			    	// 是不是要設個token或session啥ㄉ（但目前還不會）
			    	res.send({
			    		user: data.dataValues,
			    		jwt: 'test token'
			    	});
			    } else {
			    	// this is wrong but why:
			    	// throw new Error("password is wrong.");
			    	res
			    		.status(401)
			    		.end("password is wrong.")
			    }
			});
		} else {
			throw new Error("username doesn't exists.");
		}
	}).catch(err=>{
		console.log(err);
		res
			.status(401)
			.end(err.message);
	})	
})

// 若username重複要throw new Error('the username has been registered.')
router.post('/register', function(req, res, next) {
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(data=>{
		if (data) {
			throw new Error('username already exists. please replace with a new one.')
		} else {
			const plainPassword = req.body.password;
			bcrypt.genSalt(saltRounds, function(err, salt) {
			    bcrypt.hash(plainPassword, salt, function(err, hash) {
			        User.create({
						username: req.body.username,
						password: hash,
						avatarSrc: '/images/defaultAvatar.jpg',
						description: 'Welcome to my page :).'
					})
						.then(data=>data.dataValues)
						.then(data=>{
							console.log(data);
							res.send({
								user: data,
								jwt: 'test token'
							});
						})
						.catch(err=>{
							console.log(err);
						})
			    });
			});	
		}
	}).catch(err=>{
		console.log(err);
		res
			.status(400)
			.end(err.message);
	})
})

module.exports = router;
