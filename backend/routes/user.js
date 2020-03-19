var express = require('express');
var router = express.Router();

const path = require('path');
const fs = require('fs');

const User = require('../model/user.js');

router.get('/:id', function(req, res, next) {
	User.findOne({
		where: {
			id: req.params.id
		}
	}).then(data=>{
		if (data) {
			res.send(data.dataValues);
		} else {
			res.status(404).end()
		}
	}).catch(err=>{
		console.log(err);
	})	
})

router.patch('/:id/:column', function(req, res, next) {
	if (req.params.column==='info') {
		User.update({
			description: req.body.description
		},{
			where: { 
				id: req.params.id
			}
		}).then(()=>{
			res.send(req.body);
		}).catch(err=>{
			console.log(err);
		})
	};		
})

module.exports = router;
