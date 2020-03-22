var express = require('express');
var router = express.Router();

const path = require('path');
const fs = require('fs');

const User = require('../model/user.js');

router.post('/login', function(req, res, next) {
	User.findOne({
		where: {
			username: req.body.username,
			password: req.body.password
		}
	}).then(data=>{
		if (data) {
			// 是不是要設個token或session啥ㄉ（但目前還不會）
			res.send(data.dataValues);
		} else {
			throw new Error('username or password is wrong.');
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
	User.create({
		username: req.body.username,
		password: req.body.password,
		avatarSrc: '/images/defaultAvatar.jpg',
		description: 'Welcome to my page :).'
	})
		.then(data=>{
			const userFolder = path.join(__dirname, `../../frontend/public/images/uploads/${req.body.username}`);
			fs.mkdir(userFolder, { recursive: true }, (err) => {
			  if (err) throw err;
			});
			return data.dataValues;
		})
		.then(data=>{
			console.log(data);
			res.send(data);
		})
		.catch(err=>{
			console.log(err);
			res
				.status(403)
				.end(err.message);
		})
})

module.exports = router;
