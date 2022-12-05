const express = require("express");
const multer = require("multer");
const { async } = require("rxjs");
const Post = require('../models/post');

const router = express.Router();
const MIME_TYPE_MAP = {
'image/png': 'png',
'image/jpeg': 'jpeg',
'image/jpg': 'jpg'
};
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Extension no valida");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);

  }
});

router.post("", multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    contentt: req.body.contentt,
    imagePath: url + "/images/" + req.file.filename
  });
  post.save().then(createdPost => {
    //console.log(result);
    res.status(201).json({
      message: 'Post added succesfull',
      // postId: createdPost._id
      post: {
        ...createdPost,
        id: createdPost._id
      }
    });
  });
});

router.put("/:id", multer({ storage: storage }).single("image"), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    contentt: req.body.contentt,
    imagePath: imagePath
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    //console.log(result);
    res.status(200).json({ message: "Post update Succesfully" });
  })
});

router.get("", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Publicaciones expuestas con Exito',
      posts: documents
    });
  })

});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post no encontrado' });
    }
  });
});

/* app.delete('/api.posts.eliminar/:id', (req, res) =>{
  Post.deleteOne({id: req.params.id}).then(result =>{
    console.log(result)
    res.status(200).json({
      //console.log(resultado)
      result
    });
  });
}) */

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Publicacion Eliminada!' })
  });
});
router.post("/Login", async(req, res, next)=>{
  const{usuario,contraseña} =req.body;
  const user = await Postlogin.findOne({usuario})
  if(!user) return res.status(401).send("usuario no existe")
  if(user.contraseña !==contraseña) return res.status(401).send("contraseña incorrenta");

  const token = jwt.sign({_id: user._id}, 'secretkey');
  res.status(200).json({token});

})



module.exports = router;
