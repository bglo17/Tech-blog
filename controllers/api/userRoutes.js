const router = require('express').router();
const { User } = require('../../models');

router.post('/', (req,res) => {
    try {
        const newUser = await User.create({
            username: req.body.username, 
            password: req.body.password, 
        });
        
        req.session.save(() => {
            req.session.user_id = newUser.id; 
            req.seesion.user_username = newUser.username; 
        });
        res.status(200)
            .json(newUser);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/login', async (req,res) => {
    try {
        const userName = await User.findone ({
            where: { username: req.body.username }
        }); 
        if (!userName) {
            res.status(400).json({ message: 'Incorrect Username Used'});
            return; 
        }
        const passWord = await userName.checkPassword(req.body.password);
        
        if (!password) {
            res.status(400).json({ message: 'Incorrect Password Used'}); 
            return; 
        }
        req.session.save(() => {
            req.session.user_id = userName.id; 
            req.session.user_name = newUser.username; 
            req.session.logge_in = true; 

            res.json({ user: userName, message: 'You are now Logged in!'}); 
        }); 
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req,res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end(); 
        }); 
    } else {
        res.status(404).end(); 
    }
}); 

module.exports = router; 