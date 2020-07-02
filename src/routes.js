const {Router} = require('express')
const routes = new Router();

const multerConfig = require('./config/multer')
const multer = require('multer');

//yarn multer-s3 , aws-sdk

const Post = require('./models/Post')


routes.get('/posts', async (req, res) => {
    const posts = await Post.find();

    return res.json(posts);
})

routes.post('/posts', multer(multerConfig).single('file') , async (req, res) => {
   
    const {originalname: name, size, key, location: url = ""} = req.file 

    const post = await Post.create({
        name,
        size,
        key,
        url
    })
    return res.json(post)
})

routes.delete("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    console.log(req.params.id);
    console.log(post);
    await post.remove();
  
    return res.send();
  });

module.exports = routes; 