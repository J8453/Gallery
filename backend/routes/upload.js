var express = require('express');
var router = express.Router();

// Node.js path api
// https://nodejs.org/api/path.html
const path = require('path');

// Node.js file system api
// https://nodejs.org/api/fs.html
const fs = require('fs');

// Node.js middleware for handling `multipart/form-data`.
// https://github.com/expressjs/multer
const multer = require('multer');
const upload = multer({
  dest: "../frontend/public/images/uploads"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


const Album = require('../model/album.js');
const Image = require('../model/image.js');
const User = require('../model/user.js');


const handleError = (err, res) => {
	console.log(err);
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

function getFileName(folder, imgIndex){
	let lastFileName;
	
	fs.readdirSync(folder).forEach((file,index,arr)=>{
		if ( index === arr.length-1 ) lastFileName = file;
	})
	
	let count;
	if (!lastFileName) {
	  	count = 1
	} else {
	  	count = parseInt(lastFileName.replace('img','').replace('.jpg',''));
	  	count++;
	  	count+=imgIndex; /**/
	}
	
	let name='';
	
	let leng = count.toString().length;
	if (leng<5) {
		for (let i=1; i<=(5-leng); i++) {
			name += '0';
		}
		name += count;

	} else {
		name = count.toString();
  	}

  	return name;
}

// post到/upload/album：上傳照片並新建相簿
router.post('/album',
	upload.array('image'),
	(req, res) => {
		
		const formData = req.body;
		let coverSrc;

		// 存圖片進 fs
		const filesArr = req.files;
		filesArr.forEach((file, index)=>{
			const oldPath = file.path;

			const userFolder = path.join(__dirname, '../../frontend/public/images/uploads/testuser');
			const targetPath = path.join(__dirname, `../../frontend/public/images/uploads/testuser/img${getFileName(userFolder, index)}.jpg`);
			// console.log(userFolder, targetPath);

			if (path.extname(file.originalname).toLowerCase() === ".jpg") {
				fs.rename(oldPath, targetPath, err => {
			        if (err) return handleError(err, res);
			    });
			} else {
				fs.unlink(oldPath, err => {
			        if (err) return handleError(err, res);
			    });
			}

			// 預設第一張為封面
			if (index===0) {
				coverSrc = targetPath.replace(__dirname.replace('/backend/routes','/frontend/public'),'');
			}

			filesArr[index].dbSrc = targetPath.replace(__dirname.replace('/backend/routes','/frontend/public'),'');
		})

		// 存資料到 db
		Album.create({
			name: formData.name,
			description: formData.description,
			userId: formData.userId,
			coverSrc
		})
			.then(data=>data.dataValues)
			.then(album=>{
				// console.log('filesArr', filesArr);
				let album_id = album.id;
				filesArr.forEach(file=>{
					Image.create({
						src: file.dbSrc,
						userId: formData.userId,
						albumId: album_id
					})
					.catch(err=>{
						console.log(err);
					})
				})
				return album;
			})
			.then(album=>{
				// console.log(album);
				res.send(album);
			})
			.catch(err=>{
				console.log(err);
			})
});

// post到/upload/image：上傳照片到指定相簿
router.post('/image',
	upload.array('image'), 
	(req, res, next) => {

		const filesArr = req.files;
		filesArr.forEach((file, index)=>{
			const oldPath = file.path;

			const userFolder = path.join(__dirname, '../../frontend/public/images/uploads/testuser');
			const targetPath = path.join(__dirname, `../../frontend/public/images/uploads/testuser/img${getFileName(userFolder, index)}.jpg`);

			if (path.extname(file.originalname).toLowerCase() === ".jpg") {
				fs.rename(oldPath, targetPath, err => {
			        if (err) return handleError(err, res); 
			    });
			} else {
				fs.unlink(oldPath, err => {
			        if (err) return handleError(err, res);
			    });
			}

			filesArr[index].dbSrc = targetPath.replace(__dirname.replace('/backend/routes','/frontend/public'),'');
		})
		
		let imageArr=[];
	
		filesArr.forEach((file,index)=>{
			Image.create({
				src: file.dbSrc,
				userId: req.body.userId,
				albumId: req.body.albumId
			})
			.then(data=>{
				imageArr.push(data.dataValues);
				// 這樣寫合理嗎>.<
				if (index===filesArr.length-1) {
					console.log(imageArr);
					res.send(imageArr);
				}
			})
			.catch(err=>{
				console.log(err);
			})
		});
});

// patch到/upload/avatar：上傳頭貼(上傳單張圖片)
router.patch('/avatar',
  upload.single("image" /* name attribute of <file> element in your form */),
  (req, res) => {

    const oldPath = req.file.path;
    const targetPath = path.join(__dirname, `../../frontend/public/images/uploads/testuser/avatar.jpg`);

    if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
      fs.rename(oldPath, targetPath, err => {
        if (err) return handleError(err, res); 
      });
    } else {
      fs.unlink(oldPath, err => {
        if (err) return handleError(err, res);
      });
    }

    User.update({
			avatarSrc: 'images/uploads/testuser/avatar.jpg'
		},{
			where: { 
				id: req.body.userId
			}
		}).then(()=>{
			res.send({
				avatarSrc: 'images/uploads/testuser/avatar.jpg'
			});
		}).catch(err=>{
			console.log(err);
		})

  }
);


module.exports = router;
