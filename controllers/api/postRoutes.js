const router = require('express').Router; 
const { Post } = require('../../models'); 
const withAuth = require ('../../utils/authUser'); 

router.post('/', withAuth, async (req,res) => {
    try {
        const newPost = await Post.create({
            ...req.body, 
            user_id: req.session.user_id, 
        });
        res.status(200).json(newPost); 
    } catch(err) {
        res.status(500).json(err); 
    }
}); 

router.put('/:id', async (req,res) => {
    try {
        const postUpdate = await Post.update({
            title: req.body.title, 
            body: req.body.body, 
        }); 
        res.status(200).json.end();
    } catch (err) {
        res.status(500).json(err)
    }
}); 

router.delete('/:id', withAuth, async (req,res) => {
    try {
        const [editedPost] = await Post.destroy({
            where: {
                user_id: req.params.user_id, 
            }, 
        }); 

        if([editedPost] !== 0) {
            res.status(200).end();
        } else {
            res.status(400).end(); 
        }
    } catch(err) {
        res.status(500).json(err);
    }
});