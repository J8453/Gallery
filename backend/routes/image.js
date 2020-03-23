var express = require('express');
var router = express.Router();

const path = require('path');
const fs = require('fs');

const Image = require('../model/Image.js');

router.get('/:id', function(req, res, next) {
	Image.findOne({
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

router.get('/album/:id', function(req, res, next) {
	Image.findAll({
		where: {
			albumId: req.params.id
		}
	}).then(dataArr=>{
		if (dataArr.length!==0) {
			const output = dataArr.reduce((imageArr, data)=>{
				imageArr.push(data.dataValues);
				return imageArr;
			}, [])
			res.send(output);
		} else {
			res.send([]); //沒有這個albumId(應該是不會發生)跟這個albumId沒有相簿都會到這裡
		}
	}).catch(err=>{
		console.log(err);
	})	
})

router.post('/', function(req, res, next) {
	// console.log(req.body);
	const imageObjArr = req.body.images;
	const promises = imageObjArr.map(imageObj=>{
		return Image.create({
			src: imageObj.src,
			deletehash: imageObj.deletehash,
			userId: req.body.userId,
			albumId: req.body.albumId,
		})
	});
	Promise.all(promises)
		.then(datas=>{
			const imageArr = [];
			datas.forEach(data=>{
				imageArr.push(data.dataValues);
			});
			return imageArr;
		})
		.then(imageArr=>{
			res.send(imageArr);
		})
		.catch(err=>{
			console.log(err);
		});
})

router.delete('/', function(req, res, next) {
	Image.destroy({
		where: {
			id: req.body.idArr
		}
	}).then(()=>{
		res.status(200).end()
	}).catch(err=>{
		console.log(err);
	})
})

module.exports = router;
