const express = require('express');
const router = express.Router();

const Album = require('../model/album.js');
const Image = require('../model/image.js');

router.get('/info/:id/:userid', function(req, res, next) {
	Album.findOne({
		where: {
			id: req.params.id,
			userId: req.params.userid
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

router.get('/user/:id', function(req, res, next) {
	console.log(req.params.id)
	Album.findAll({
		where: {
			userId: req.params.id
		}
	}).then(dataArr=>{
		if (dataArr.length!==0) {
			const output = dataArr.reduce((albumArr, data)=>{
				albumArr.push(data.dataValues);
				return albumArr;
			}, [])
			res.send(output);
		} else {
			res.send([]); //沒有這個userId跟這個userId沒有相簿都會到這裡
		}
	}).catch(err=>{
		console.log(err);
	})	
})

router.post('/', function(req, res, next) {
	Album.create({
		name: req.body.name,
		description: req.body.description,
		userId: req.body.userId,
		coverSrc: req.body.images[0].src
	})
		.then(data=>data.dataValues)
		.then(album=>{
			const albumId = album.id;
			const imageObjArr = req.body.images;
			const promises = imageObjArr.map(imageObj=>{
				return Image.create({
					src: imageObj.src,
					deletehash: imageObj.deletehash,
					userId: req.body.userId,
					albumId
				})
			});
			Promise.all(promises)
				.then(()=>{
					res.send(album);
				})
				.catch(err=>{
					console.log(err);
				});
		})	
})

router.patch('/:id/:column', function(req, res, next) {
	if (req.params.column==='info') {
		Album.update({
			name: req.body.name,
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
	} else if (req.params.column==='cover') {
		Image.findOne({
			where: {
				id: req.body.imageId
			}
		}).then(data=>{
			return data.dataValues.src;
		}).then(targetSrc=>{
			Album.update({
				coverSrc: targetSrc
			},{
				where: { 
					id: req.params.id
				}
			}).then(()=>{
				res.send({
					coverSrc: targetSrc
				});
			}).catch(err=>{
				console.log(err);
			})
		}).catch(err=>{
			console.log(err);
		})	
	}	
})

router.delete('/', function(req, res, next) {
	Album.destroy({
		where: {
			id: req.body.idArr
		}
	}).then(()=>{
		const albumIdArr = req.body.idArr;
		const promises = albumIdArr.map(id=>{
			return Image.destroy({
				where: {
					albumId: id
				}
			})
		});
		Promise.all(promises)
			.then(()=>{
				res.status(200).end();
			})
			.catch(err=>{
				console.log(err);
			});
	}).catch(err=>{
		console.log(err);
	})
})

module.exports = router;
